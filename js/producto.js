/* =========================================================
   PÁGINA DE PRODUCTO (producto.html?id=h1)
   Usa las funciones de app.js (carrito, checkout, mapa, etc.)
   Orden: imagen → descripción (izquierda) · opciones, cremas,
   complementos y tarjeta "Agregar al pedido" (derecha).
   ========================================================= */

/* Complementos que se ofrecen y en qué orden */
const XSECT = {
  hamb:    ["comp","bebidas"],
  broa:    ["comp","bebidas"],
  salchi:  ["comp","bebidas"],
  plancha: ["comp","bebidas"],
  wings:   ["comp","bebidas"]
};
const XINFO = {
  bebidas: {t:"Bebidas",     s:"Agrega las que quieras"},
  comp:    {t:"Adicionales", s:"Se suman a tu producto"}
};

let pm = null;   // {p, opt, qty, extras, cremas}

/* Desde esta página, "Ver la carta" y el buscador llevan al index */
window.goMenu = function(){ location.href = "index.html#carta"; };
window.onSearch = function(){ /* la búsqueda se envía con Enter */ };
window.clearSearch = function(){ $("searchInput").value=""; $("searchClr").classList.remove("show"); };
$("searchInput").addEventListener("keydown", e=>{
  if(e.key==="Enter" && e.target.value.trim()) location.href = "index.html?q=" + encodeURIComponent(e.target.value.trim());
});

/* ---------- Inicio ---------- */
(function init(){
  const params = new URLSearchParams(location.search);
  const p = prod(params.get("id"));
  if(!p){
    $("prodPage").innerHTML = `<div class="pp-wrap"><div class="empty" style="padding:60px 0">${icon("search")}<p>No encontramos ese producto.</p><a class="btn pri sm" href="index.html#carta">Ver la carta</a></div></div>`;
    return;
  }
  pm = {p, opt:null, qty:1, extras:{}, cremas:CREMAS.map(c=>c.id)};
  document.title = p.name + " · BroPoint";
  renderProductPage();
})();

/* ---------- Contenido ---------- */
function extrasFor(p){
  return (XSECT[p.cat]||[]).map(cid=>({cid,list:P.filter(x=>x.cat===cid && !x.opt)})).filter(s=>s.list.length);
}
function xctrl(id){
  const q = pm.extras[id]||0;
  if(!q) return `<button class="xplus" onclick="pmX('${id}',1)" aria-label="Agregar">${icon("plus")}</button>`;
  return `<div class="step"><button onclick="pmX('${id}',-1)" aria-label="Quitar uno">${icon("minus")}</button><span>${q}</span><button onclick="pmX('${id}',1)" aria-label="Agregar uno">${icon("plus")}</button></div>`;
}
function renderProductPage(){
  const p = pm.p, secs = extrasFor(p);
  let right = "";

  if(p.opt){
    right += `<div class="xcard"><div class="xhead"><div><b>${esc(p.opt.label)}</b><small>Elige 1 opción</small></div><span class="tag" id="pmTag">Requerido</span></div><div class="xrows">`
      + p.opt.list.map(o=>`<div class="xr opt ${pm.opt===o?"on":""}" data-o="${esc(o)}" onclick="pmPick(this)"><div class="xn"><b>${esc(o)}</b></div><span class="xrad"></span></div>`).join("")
      + `</div></div>`;
  }

  /* Cremas (gratis, todas marcadas al inicio) */
  if(XSECT[p.cat]){
    right += `<div class="xcard"><div class="xhead" style="cursor:pointer" onclick="pmToggleCremas()"><div><b>Cremas</b><small>Incluidas. Desmarca las que quieras</small></div><span style="display:inline-flex;align-items:center;gap:8px"><span class="tag opc" id="pmCnt">${cremasCount()}</span><svg id="pmArrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="transition:transform .2s"><path d="m6 9 6 6 6-6"/></svg></span></div><div class="xrows" id="pmCrRows" style="display:none">`
      + CREMAS.map(c=>`<div class="xr opt ${pm.cremas.includes(c.id)?"on":""}" data-c="${c.id}" onclick="pmCrema(this)">${imgHTML(c.img,c.name,"sm")}<div class="xn"><b>${esc(c.name)}</b><small>${esc(c.desc)}</small></div><span class="xrad"></span></div>`).join("")
      + `</div></div>`;
  }

  if(secs.length){
    right += `<h2 class="pm-h">Complementos</h2>` + secs.map(s=>{
      const inf = XINFO[s.cid];
      return `<div class="xcard"><div class="xhead"><div><b>${inf.t}</b><small>${inf.s}</small></div><span class="tag opc">Opcional</span></div><div class="xrows">`
        + s.list.map(x=>`<div class="xr">${imgHTML(x.img,x.name,"sm")}<div class="xn"><b>${esc(x.name)}</b><small>+ ${money(x.price)}</small></div><div class="xc" id="xc-${x.id}">${xctrl(x.id)}</div></div>`).join("")
        + `</div></div>`;
    }).join("");
  }

  $("prodPage").innerHTML = `<div class="pp-wrap">
    <a class="pp-back" href="index.html#carta">${icon("back")}Volver a la carta</a>
    <div class="pp-grid">
      <div class="pp-left">
        ${imgHTML(p.img,p.name)}
        <div class="pp-cat">${esc(cat(p.cat).name)}</div>
        <h1>${esc(p.name)}</h1>
        <div class="pp-price">${money(p.price)}</div>
        ${p.desc?`<div class="pp-desc">${esc(p.desc)}</div>`:""}
      </div>
      <div class="pp-right">
        ${right}
        <div class="buy" id="buyBox"></div>
      </div>
    </div></div>`;
  renderBuy();
}

function pmPick(el){
  pm.opt = el.dataset.o;
  document.querySelectorAll("#prodPage .xr.opt[data-o]").forEach(r=>r.classList.toggle("on", r===el));
  const t = $("pmTag"); if(t){ t.textContent="Completado"; t.classList.add("ok"); }
  renderBuy();
}
function pmToggleCremas(){
  const r = $("pmCrRows"), a = $("pmArrow"); if(!r) return;
  const abrir = r.style.display === "none";
  r.style.display = abrir ? "" : "none";
  if(a) a.style.transform = abrir ? "rotate(180deg)" : "";
}
function cremasCount(){
  const n = pm.cremas.length;
  if(n===CREMAS.length) return "Todas";
  if(n===0) return "Ninguna";
  return n + (n===1 ? " crema" : " cremas");
}
function pmCrema(el){
  const id = el.dataset.c, i = pm.cremas.indexOf(id);
  if(i>=0) pm.cremas.splice(i,1); else pm.cremas.push(id);
  el.classList.toggle("on", i<0);
  const t = $("pmCnt"); if(t) t.textContent = cremasCount();
}
function pmX(id,d){
  const q = Math.max(0,(pm.extras[id]||0)+d);
  if(q) pm.extras[id]=q; else delete pm.extras[id];
  const c = $("xc-"+id); if(c) c.innerHTML = xctrl(id);
  renderBuy();
}
function pmQty(d){ pm.qty = Math.max(1, pm.qty+d); renderBuy(); }
function pmTotal(){
  let porUnidad = pm.p.price, bebidas = 0;
  Object.keys(pm.extras).forEach(id=>{
    const x = prod(id), q = pm.extras[id];
    if(x.cat==="comp") porUnidad += x.price*q; else bebidas += x.price*q;
  });
  return porUnidad*pm.qty + bebidas;
}
function renderBuy(){
  const need = pm.p.opt && !pm.opt;
  $("buyBox").innerHTML = `
    <div class="sum"><span>Total</span><b>${money(pmTotal())}</b></div>
    <div class="brow">
      <div class="step"><button onclick="pmQty(-1)" aria-label="Menos">${icon("minus")}</button><span>${pm.qty}</span><button onclick="pmQty(1)" aria-label="Más">${icon("plus")}</button></div>
      <button class="btn pri" ${need?"disabled":""} onclick="pmConfirm()">${need?esc(pm.p.opt.label):"Agregar Pedido"}</button>
    </div>
    <a class="lnk" href="index.html#carta">Seguir viendo la carta</a>`;
}

function pmConfirm(){
  if(!pm || (pm.p.opt && !pm.opt)) return;

  /* Un complemento no va solo: se suma a un producto del pedido */
  if(pm.p.cat==="comp"){ openCompPick(pm.p); return; }

  /* Texto que se ve en el carrito: opción elegida + cremas */
  let cremaTxt = null;
  if(XSECT[pm.p.cat]){
    const quitadas = CREMAS.filter(c=>!pm.cremas.includes(c.id)).map(c=>c.name);
    const puestas  = CREMAS.filter(c=> pm.cremas.includes(c.id)).map(c=>c.name);
    cremaTxt = quitadas.length===0 ? "Todas las cremas"
             : puestas.length===0  ? "Sin cremas"
             : quitadas.length<=puestas.length ? "Sin " + quitadas.join(", ")
             : "Solo " + puestas.join(", ");
  }
  /* Adicionales (comp) van pegados al producto; bebidas van aparte */
  const ex = {}, bebidas = {};
  Object.keys(pm.extras).forEach(id=>{
    if(prod(id).cat==="comp") ex[id] = pm.extras[id]; else bebidas[id] = pm.extras[id];
  });

  putItem(mkItem(pm.p, pm.opt, cremaTxt, XSECT[pm.p.cat] ? pm.cremas.slice() : null, ex, pm.qty));
  Object.keys(bebidas).forEach(id=>{ putItem(mkItem(prod(id), null, null, null, {}, bebidas[id])); });
  refresh();
  pm = {p:pm.p, opt:null, qty:1, extras:{}, cremas:CREMAS.map(c=>c.id)};
  renderProductPage();
  window.scrollTo({top:0, behavior:"smooth"});
  openDrawer("cart");
}