
/* =========================================================
   CONFIGURACIÓN DEL NEGOCIO (cambia aquí)
   ========================================================= */
const CFG = {
  nombre: "BroPoint",
  whatsapp: "51901681546",            // número que recibe los pedidos
  yapeNumero: "901 681 546",
  yapeNombre: "BroPoint",              // ← nombre EXACTO que sale en Yape
  direccion: 'Jr. Pedro Silva Mz "C" Lt 1, San Martín de Porres 15108',
  tiendaLink: "-12.0228113, -77.0810114",  // enlace largo de Google Maps o coordenadas del local
  tienda: { lat: -12.0228113, lng: -77.0810114 }, // se usa si tiendaLink está vacío
  carpetaImg: "",           // carpeta donde están las fotos (foto1.png, foto2.png…)
  radioMetros: 800,                    // hasta dónde llega el delivery (unas cuadras)
  costoDelivery: 0,                    // S/ (0 = se confirma por WhatsApp)
  abre: [4,5,6,0],                     // jueves(4), viernes, sábado, domingo
  horaAbre: 19, horaCierra: 24
};
if(CFG.tiendaLink){ const c0=parseGmaps(CFG.tiendaLink); if(c0 && typeof c0.lat==="number") CFG.tienda={lat:c0.lat,lng:c0.lng}; }

/* =========================================================
   CARTA
   img: foto1.png, foto2.png… (las fotos van en assets/img/, junto con hero.png y logo.png)
   Hamburguesas 1-6 · Broaster 7-9 · Salchipapas 10-12 · Plancha 13 · Wings 14-16
   Helados 17-18 · Bebidas 19-25 · Complementos 26-31
   ========================================================= */
const CATS = [
  {id:"hamb",   name:"Hamburguesas"},
  {id:"broa",   name:"Broaster"},
  {id:"salchi", name:"Salchipapas"},
  {id:"plancha",name:"A la plancha"},
  {id:"wings",  name:"Wings"},
  {id:"helados",name:"Helados"},
  {id:"bebidas",name:"Bebidas"},
  {id:"comp",   name:"Complementos"}
];
const SALSAS = ["Acevichada","BBQ","Buffalo"];
const SABORES = ["Vainilla","Chocolate","Mixto"];


const P = [
  {id:"h1",cat:"hamb",name:"Clásica de Carne",price:10,desc:"Hamburguesa clásica de carne",img:"assets/img/Burger_Pobre.png"},
  {id:"h2",cat:"hamb",name:"Doble Carne",price:15,desc:"Doble carne, doble sabor",img:"assets/img/Doble_Carne.png"},
  {id:"h3",cat:"hamb",name:"Sánguche de Pollo",price:10,desc:"Pollo crocante en pan",img:"assets/img/Sanguche_Pollo.png"},
  {id:"h4",cat:"hamb",name:"Royal Carne",price:13,desc:"Carne con huevo y jamón",img:"assets/img/Royal_Carne.png"},
  {id:"h5",cat:"hamb",name:"Royal Pollo",price:13,desc:"Pollo con huevo y jamón",img:"assets/img/Royal_Pollo.png"},
  {id:"h6",cat:"hamb",name:"Burger a lo Pobre",price:13,desc:"Con huevo frito y plátano",img:"assets/img/Burger_Pobre.png"},

  {id:"b1",cat:"broa",name:"Broaster Pecho",price:15,desc:"Con papas y ensalada",img:"assets/img/Pecho_Broaster.png"},
  {id:"b2",cat:"broa",name:"Broaster Muslo",price:13,desc:"Con papas y ensalada",img:"assets/img/Muslo_Broaster.png"},
  {id:"b3",cat:"broa",name:"Broaster Alita",price:12,desc:"Con papas y ensalada",img:"assets/img/Alita_Broaster.png"},

  {id:"s1",cat:"salchi",name:"Salchi Clásica",price:10,desc:"Papas y hotdog",img:"assets/img/Salchi_Clásica.png"},
  {id:"s2",cat:"salchi",name:"Salchi Pobre",price:13,desc:"Con huevo y plátano",img:"assets/img/Salchi_Pobre.png"},
  {id:"s3",cat:"salchi",name:"Salchi Royal",price:14,desc:"Con huevo y jamón",img:"assets/img/Salchi_Royal.png"},

  {id:"p1",cat:"plancha",name:"Pecho a la Plancha",price:16,desc:"Con papas y ensalada",img:"assets/img/Pecho_Plancha.png"},

  {id:"w1",cat:"wings",name:"Alitas x 6",price:18,desc:"6 alitas con la salsa que elijas",img:"assets/img/Alitas_12.png",opt:{label:"Elige la salsa",list:SALSAS}},
  {id:"w2",cat:"wings",name:"Alitas x 9",price:25,desc:"9 alitas con la salsa que elijas",img:"assets/img/Alitas_12.png",opt:{label:"Elige la salsa",list:SALSAS}},
  {id:"w3",cat:"wings",name:"Alitas x 12",price:32,desc:"12 alitas con la salsa que elijas",img:"assets/img/Alitas_12.png",opt:{label:"Elige la salsa",list:SALSAS}},

  {id:"i1",cat:"helados",name:"Cono",price:3,desc:"Helado suave en cono",img:"assets/img/Cono.png",opt:{label:"Elige el sabor",list:SABORES}},
  {id:"i2",cat:"helados",name:"Sundae",price:6,desc:"Helado con topping",img:"assets/img/Sundae.png",opt:{label:"Elige el sabor",list:SABORES}},

  {id:"d1",cat:"bebidas",name:"Coca Cola 500 ml",price:4,desc:"",img:"assets/img/Coca_Cola_500ml.png"},
  {id:"d2",cat:"bebidas",name:"Inka Cola 500 ml",price:4,desc:"",img:"assets/img/Inka_Cola_500ml.png"},
  {id:"d3",cat:"bebidas",name:"Agua 500 ml",price:3,desc:"",img:"assets/img/Agua_500ml.png"},
  {id:"d4",cat:"bebidas",name:"Coca Cola 1.5 L",price:10,desc:"",img:"assets/img/Coca_Cola_1.5L.png"},
  {id:"d5",cat:"bebidas",name:"Inka Cola 1.5 L",price:10,desc:"",img:"assets/img/Inka_Cola_1.5L.png"},
  {id:"d6",cat:"bebidas",name:"Chicha 1 L",price:10,desc:"Chicha morada",img:"assets/img/Chicha_Morada.png"},
  {id:"d7",cat:"bebidas",name:"Infusión",price:3,desc:"Anís, manzanilla o té",img:"assets/img/Infusion.png",opt:{label:"Elige la infusión",list:["Anís","Manzanilla","Té"]}},

  {id:"c1",cat:"comp",name:"Huevo",price:1.5,desc:"Adicional",img:"assets/img/Huevo.png"},
  {id:"c2",cat:"comp",name:"Jamón",price:1.5,desc:"Adicional",img:"assets/img/Jamon.png"},
  {id:"c3",cat:"comp",name:"Queso",price:2,desc:"Adicional",img:"assets/img/Queso.png"},
  {id:"c4",cat:"comp",name:"Hotdog",price:2,desc:"Adicional",img:"assets/img/Hotdog.png"},
  {id:"c5",cat:"comp",name:"Arroz",price:3,desc:"Adicional",img:"assets/img/Arroz.png"},
  {id:"c6",cat:"comp",name:"Carne",price:5,desc:"Adicional",img:"assets/img/Carne.png"}
];
const CREMAS = [
  {id:"cr1", name:"Ají pollero",  desc:"La clásica",         img:"assets/img/Crema_Aji_Pollero.png"},
  {id:"cr2", name:"Mayonesa",     desc:"Suave",              img:"assets/img/Crema_Mayonesa.png"},
  {id:"cr3", name:"Kétchup",      desc:"Dulce",              img:"assets/img/Crema_Ketchup.png"},
  {id:"cr4", name:"Mostaza",      desc:"Ácida",              img:"assets/img/Crema_Mostaza.png"},
  {id:"cr5", name:"Aceituna",     desc:"Suave",            img:"assets/img/Crema_Aceituna.png"},
  {id:"cr6", name:"Huacatay",     desc:"Aromática",          img:"assets/img/Crema_Huacatay.png"},
  {id:"cr7", name:"Ají amarillo", desc:"Sabor peruano",      img:"assets/img/Crema_Aji_Amarillo.png"},
  {id:"cr8", name:"Tártara",      desc:"Cremosa",            img:"assets/img/Crema_Tartara.png"},
  {id:"cr9", name:"Golf",         desc:"Dulce y cremosa",    img:"assets/img/Crema_Golf.png"},
  {id:"cr10",name:"BBQ",          desc:"Ahumada",            img:"assets/img/Crema_BBQ.png"},
  {id:"cr11",name:"Ajo",          desc:"Intensa",            img:"assets/img/Crema_Ajo.png"},
  {id:"cr12",name:"Chimichurri",  desc:"Hierbas y especias", img:"assets/img/Crema_Chimichurri.png"}
];
/* Sugerencias dentro del carrito */
const UPSELL = [
  {title:"¿Algo para tomar?", cat:"bebidas"},
  {title:"¿Un helado de postre?", cat:"helados"},
  {title:"Complementa tu pedido", cat:"comp"}
];

/* =========================================================
   ESTADO Y UTILIDADES
   ========================================================= */
let cart = [];
try{ cart = JSON.parse(localStorage.getItem("bp_cart")||"[]"); }catch(e){ cart = []; }               // {key,id,name,opt,price,qty,img}
let activeCat = "all";
let query = "";
let view = "cart";             // cart | checkout | done
let form = {tipo:"delivery",nombre:"",tel:"",dir:"",ref:"",obs:"",lat:null,lng:null,foto:null};
let lastSend = {withFile:false,url:""};

const $ = id => document.getElementById(id);
const money = n => "S/ " + n.toFixed(2);
const esc = s => String(s==null?"":s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
const total = () => cart.reduce((s,i)=>s+i.price*i.qty,0);
const count = () => cart.reduce((s,i)=>s+i.qty,0);
const prod = id => P.find(p=>p.id===id);
const cat = id => CATS.find(c=>c.id===id);
const qtyOf = id => cart.filter(i=>i.id===id).reduce((s,i)=>s+i.qty,0);
const icon = (n,cls) => `<svg class="ic ${cls||""}"><use href="#i-${n}"/></svg>`;

let toastT=null;
function toast(msg,type){
  const t=$("toast"); t.textContent=msg; t.className="toast show"+(type==="err"?" err":"");
  clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove("show"),type==="err"?2800:1800);
}
function lock(){
  const any = $("drawer").classList.contains("on") || document.querySelector(".modal.on");
  document.body.style.overflow = any ? "hidden" : "";
}

/* ---------- Horario ---------- */
function updateStatus(){
  const now = new Date(new Date().toLocaleString("en-US",{timeZone:"America/Lima"}));
  const open = CFG.abre.includes(now.getDay()) && now.getHours()>=CFG.horaAbre && now.getHours()<CFG.horaCierra;
  $("topbar").classList.toggle("open",open);
  $("stText").textContent = open ? "Abierto ahora · hasta las 11:59 p. m." : "Cerrado ahora · abrimos jueves a domingo desde las 7:00 p. m.";
}

/* ---------- Header: buscador ---------- */
function setHH(){ document.documentElement.style.setProperty("--hh",$("hdr").offsetHeight+"px"); }
function toggleSearch(){
  const h=$("hdr"); h.classList.toggle("sopen");
  if(h.classList.contains("sopen")) setTimeout(()=>$("searchInput").focus(),50);
  setHH();
}
function onSearch(v){
  const was=query.trim();
  query=v; $("searchClr").classList.toggle("show",!!v);
  renderMenu();
  if(!was && v.trim()){
    const r=$("menuTop").getBoundingClientRect();
    if(r.top>window.innerHeight*0.6 || r.top<0) goMenu();
  }
}
function clearSearch(){ query=""; $("searchInput").value=""; $("searchClr").classList.remove("show"); renderMenu(); }
function goMenu(){ $("menuTop").scrollIntoView({behavior:"smooth",block:"start"}); }

/* ---------- Categorías y productos ---------- */
function renderChips(){
  const all=[{id:"all",name:"Todos"}].concat(CATS);
  $("chips").innerHTML=all.map(c=>`<button class="chip ${c.id===activeCat?"on":""}" onclick="pickCat('${c.id}')">${c.name}</button>`).join("");
}
function pickCat(id){
  activeCat=id; if(query){clearSearch();}
  renderChips(); renderMenu();
  const el=document.querySelector(".chip.on"); if(el) el.scrollIntoView({inline:"center",block:"nearest",behavior:"smooth"});
  goMenu();
}
function imgHTML(src,alt,cls){
  return `<div class="pimg ${cls||""}"><img src="${esc(CFG.carpetaImg+src)}" alt="${esc(alt)}" loading="lazy" onerror="this.parentNode.classList.add('noimg')">${icon("image","ph")}</div>`;
}
function openProduct(id){ location.href = "producto.html?id=" + id; }
function cardHTML(p){
  const q=qtyOf(p.id);
  return `<article class="card" style="cursor:pointer" onclick="openProduct('${p.id}')">${imgHTML(p.img,p.name)}
    <div class="cbody"><h4>${esc(p.name)}</h4>${p.desc?`<div class="d">${esc(p.desc)}</div>`:""}
    ${q>0?`<span class="inc">${q} en tu pedido</span>`:""}
    <div class="crow"><span class="price">${money(p.price)}</span>
  <button class="addbtn" aria-label="Agregar ${esc(p.name)}" onclick="event.stopPropagation();onAdd('${p.id}')">${icon("plus")}</button></div></div></article>`;
}
function renderMenu(){
  const box=$("menu"); const qn=norm(query.trim());
  let h="";
  if(qn){
    const list=P.filter(p=>norm(p.name+" "+(p.desc||"")+" "+cat(p.cat).name).includes(qn));
    h=`<div class="resinfo"><span>${list.length} resultado${list.length===1?"":"s"} para “${esc(query.trim())}”</span><button class="lnk" onclick="clearSearch()">Limpiar búsqueda</button></div>`;
    h+= list.length ? `<div class="grid">${list.map(cardHTML).join("")}</div>`
      : `<div class="empty">${icon("search")}<p>No encontramos productos con ese nombre.</p><button class="btn ghost sm" onclick="clearSearch()">Ver toda la carta</button></div>`;
  } else if(activeCat==="all"){
    h=CATS.map(c=>{const l=P.filter(p=>p.cat===c.id);return `<section class="group"><h3>${c.name}<span>${l.length} producto${l.length===1?"":"s"}</span></h3><div class="grid">${l.map(cardHTML).join("")}</div></section>`}).join("");
  } else {
    const c=cat(activeCat), l=P.filter(p=>p.cat===activeCat);
    h=`<section class="group"><h3>${c.name}<span>${l.length} producto${l.length===1?"":"s"}</span></h3><div class="grid">${l.map(cardHTML).join("")}</div></section>`;
  }
  box.innerHTML=h;
}

/* ---------- Agregar ---------- */
const MAINCATS = ["hamb","broa","salchi","plancha","wings"];

function exTxt(ex){
  const parts = Object.keys(ex).map(id=>prod(id).name + (ex[id]>1 ? " x"+ex[id] : ""));
  return parts.length ? "+ "+parts.join(", ") : null;
}
function mkItem(p,sel,cremaTxt,cremas,ex,qty){
  ex = ex||{};
  let price = p.price;
  Object.keys(ex).forEach(id=>{ price += prod(id).price*ex[id]; });
  const opt = [sel, exTxt(ex), cremaTxt].filter(Boolean).join(" · ") || null;
  return {key:p.id+"|"+(opt||""), id:p.id, name:p.name, opt, price, qty, img:p.img,
          sel:sel||null, cremaTxt:cremaTxt||null, cremas:cremas||null, ex};
}
function putItem(n){
  const f = cart.find(i=>i.key===n.key);
  if(f) f.qty += n.qty; else cart.push(n);
}

/* Botón redondo de la carta */
function onAdd(id){
  const p = prod(id);
  if(p.cat==="comp") return openCompPick(p);
  if(p.opt) openProduct(id); else addItem(p,null);
}
function addItem(p,opt){
  const main = MAINCATS.includes(p.cat);
  putItem(mkItem(p, opt, main?"Todas las cremas":null, main?CREMAS.map(c=>c.id):null, {}, 1));
  refresh();
}

/* Adicional desde la carta: primero se elige a qué producto se suma */
function openCompPick(p){
  const lines = cart.map((i,ix)=>({i,ix})).filter(o=>MAINCATS.includes(prod(o.i.id).cat));
  if(!lines.length){ toast("Primero agrega una hamburguesa o un plato para sumarle el adicional.","err"); return; }
  optProd = p; optSel = null;
  $("optTitle").textContent = "¿A cuál producto lo sumamos?";
  $("optLabel").textContent = p.name + " (+ " + money(p.price) + ")";
  $("optList").innerHTML = lines.map(o=>`<button onclick="selComp(this,${o.ix})">${esc(o.i.name)}${o.i.qty>1?" (x"+o.i.qty+")":""}${o.i.opt?" · "+esc(o.i.opt):""}</button>`).join("");
  $("optAdd").disabled = true;
  $("optAdd").textContent = "Sumar adicional";
  $("optAdd").onclick = ()=>{ attachComp(optSel,optProd); closeModal("optModal"); };
  openModal("optModal");
}
function selComp(btn,ix){
  optSel = ix;
  document.querySelectorAll("#optList button").forEach(b=>b.classList.remove("on"));
  btn.classList.add("on"); $("optAdd").disabled = false;
}
function attachComp(ix,p){
  const it = cart[ix]; if(!it) return;
  const ex = Object.assign({}, it.ex||{});
  ex[p.id] = (ex[p.id]||0) + 1;
  const base = prod(it.id), sel = it.sel!==undefined ? it.sel : it.opt;
  if(it.qty>1) it.qty--; else cart.splice(ix,1);   // solo a UNA unidad
  putItem(mkItem(base, sel, it.cremaTxt||null, it.cremas||null, ex, 1));
  refresh();
}
/* ---------- Aviso de confirmación (modal propio, amarillo y negro) ---------- */
(function(){
  const s=document.createElement("style");
  s.textContent=`
.cfm-scrim{position:fixed;inset:0;z-index:9999;background:rgba(22,22,22,.6);display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;pointer-events:none;transition:opacity .18s}
.cfm-scrim.on{opacity:1;pointer-events:auto}
.cfm-box{background:#fff;border-radius:18px;max-width:360px;width:100%;padding:26px 22px 20px;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.35);transform:translateY(10px) scale(.97);transition:transform .18s}
.cfm-scrim.on .cfm-box{transform:none}
.cfm-ic{width:56px;height:56px;border-radius:50%;background:#FDB515;display:flex;align-items:center;justify-content:center;margin:0 auto 14px}
.cfm-ic svg{width:26px;height:26px;stroke:#161616;fill:none;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.cfm-box h3{font-size:19px;font-weight:800;color:#161616;margin-bottom:8px}
.cfm-box p{font-size:14.5px;color:#6b6556;line-height:1.5;margin-bottom:20px}
.cfm-btns{display:flex;gap:10px}
.cfm-btns button{flex:1;height:46px;border-radius:12px;font-weight:700;font-size:14.5px;cursor:pointer;font-family:inherit}
.cfm-btns .no{background:#fff;border:1.5px solid #161616;color:#161616}
.cfm-btns .yes{background:#161616;border:1.5px solid #161616;color:#FDB515}
`;
  document.head.appendChild(s);
})();

function showConfirm(o){
  const old=document.getElementById("cfm"); if(old) old.remove();
  const el=document.createElement("div");
  el.className="cfm-scrim"; el.id="cfm";
  el.innerHTML=`<div class="cfm-box" role="alertdialog" aria-modal="true">
    <div class="cfm-ic">${icon("x")}</div>
    <h3>${esc(o.title)}</h3>
    <p>${esc(o.text)}</p>
    <div class="cfm-btns">
      <button type="button" class="no" id="cfmNo">${esc(o.cancel||"Cancelar")}</button>
      <button type="button" class="yes" id="cfmYes">${esc(o.ok||"Aceptar")}</button>
    </div></div>`;
  document.body.appendChild(el);
  const onKey=e=>{ if(e.key==="Escape"){ e.stopPropagation(); close(); } };
  const close=()=>{ el.classList.remove("on"); document.removeEventListener("keydown",onKey,true); setTimeout(()=>el.remove(),200); };
  document.addEventListener("keydown",onKey,true);
  el.addEventListener("click",e=>{ if(e.target===el) close(); });
  el.querySelector("#cfmNo").onclick=close;
  el.querySelector("#cfmYes").onclick=()=>{ close(); if(o.onOk) o.onOk(); };
  requestAnimationFrame(()=>{ el.classList.add("on"); el.querySelector("#cfmNo").focus(); });
}

function askRemove(key){
  const i=cart.find(x=>x.key===key); if(!i) return;
  showConfirm({
    title:"¿Eliminar producto?",
    text:"¿Deseas eliminar \""+i.name+"\" de tu pedido?",
    ok:"Sí, eliminar",
    cancel:"Cancelar",
    onOk:()=>removeItem(key)
  });
}

function changeQty(key,d){
  const i=cart.find(x=>x.key===key); if(!i) return;
  if(i.qty+d<=0){ askRemove(key); return; }
  i.qty+=d; refresh();
}
function removeItem(key){ cart=cart.filter(x=>x.key!==key); refresh(); }

/* ---------- Ventanas ---------- */
function openModal(id){ $(id).classList.add("on"); $("mscrim").classList.add("on"); lock(); }
function closeModal(id){ $(id).classList.remove("on"); if(!document.querySelector(".modal.on")) $("mscrim").classList.remove("on"); lock(); }
function closeTopModal(){ if($("mapModal").classList.contains("on")) closeMap(); else closeModal("optModal"); }

let optSel=null, optProd=null;
function openOpt(p){
  optProd=p; optSel=null;
  $("optTitle").textContent=p.name; $("optLabel").textContent=p.opt.label;
  $("optList").innerHTML=p.opt.list.map(o=>`<button onclick="selOpt(this,'${o}')">${o}</button>`).join("");
  $("optAdd").disabled=true;
  $("optAdd").onclick=()=>{ addItem(optProd,optSel); closeModal("optModal"); };
  openModal("optModal");
}
function selOpt(btn,o){
  optSel=o; document.querySelectorAll("#optList button").forEach(b=>b.classList.remove("on"));
  btn.classList.add("on"); $("optAdd").disabled=false;
}

/* ---------- Actualizar todo ---------- */
function refresh(){
  const n=count(), t=total();
  $("hdrCnt").textContent=n; $("hdrCnt").classList.toggle("show",n>0);
  $("hdrTotal").textContent = n>0 ? "Mi pedido · "+money(t) : "Mi pedido";
  $("cbN").textContent=n; $("cbT").textContent=money(t);
  updateBar();
  renderMenu();
  if($("drawer").classList.contains("on")) renderDrawer();
  try{ localStorage.setItem("bp_cart", JSON.stringify(cart)); }catch(e){}
}
function updateBar(){
  $("cartbar").classList.toggle("show", count()>0 && !$("drawer").classList.contains("on"));
}

/* =========================================================
   CARRITO LATERAL
   ========================================================= */
function openDrawer(v){
  if(v) view=v; if(view==="done"&&v==="cart") view="cart";
  renderDrawer(); $("drawer").classList.add("on"); $("scrim").classList.add("on"); lock(); updateBar();
}
function closeDrawer(){ $("drawer").classList.remove("on"); $("scrim").classList.remove("on"); lock(); updateBar(); }
function backToCart(){ view="cart"; renderDrawer(); $("dbody").scrollTop=0; }

function renderDrawer(){
  $("dback").classList.toggle("hidden",view!=="checkout");
  if(view==="checkout") return renderCheckout();
  if(view==="done") return renderDone();
  $("dtitle").textContent="Tu pedido";
  if(!cart.length){
    $("dbody").innerHTML=`<div class="empty" style="padding-top:60px">${icon("bag")}<p>Tu pedido está vacío.<br>Agrega algo de la carta para comenzar.</p></div>`;
    $("dfoot").innerHTML=`<button class="btn pri block" onclick="closeDrawer();goMenu()">Ver la carta</button>`;
    return;
  }
  let h=cart.map(i=>`<div class="item">${imgHTML(i.img,i.name,"sm")}
    <div class="inf"><span class="icat">${esc(cat(prod(i.id).cat).name)}</span><b>${esc(i.name)}</b>${i.opt?`<small>${esc(i.opt)}</small>`:`<small>${money(i.price)} c/u</small>`}<div class="pr">${money(i.price*i.qty)}</div></div>
    <div class="ctl">
      <div class="step"><button onclick="changeQty('${i.key}',-1)" aria-label="Quitar uno">${icon("minus")}</button><span>${i.qty}</span><button onclick="changeQty('${i.key}',1)" aria-label="Agregar uno">${icon("plus")}</button></div>
      <button class="rm" onclick="askRemove('${i.key}')">Eliminar</button>
    </div></div>`).join("");

$("dbody").innerHTML=h;
$("dfoot").innerHTML=`
  <div class="totals" style="margin:0 0 14px;padding:0;background:none;border:0;box-shadow:none">
    <div><span>Subtotal</span><span>${money(total())}</span></div>
    <div class="big"><span>Total</span><span>${money(total())}</span></div>
  </div>
  <button class="btn pri block" onclick="goCheckout()">Continuar</button>
  <button class="lnk" onclick="closeDrawer()">Seguir comprando</button>`;
}

/* ---------- Checkout ---------- */
function goCheckout(){ location.href = "checkout.html"; }
function setTipo(t){ form.tipo=t; renderCheckout(); }
function renderCheckout(){
  $("dtitle").textContent="Finalizar pedido";
  const d=form.tipo==="delivery";
  const fee=d?CFG.costoDelivery:0;
  $("dbody").innerHTML=`
  <div class="fs"><h3><span class="n">1</span>Tipo de pedido</h3>
    <div class="rcs">
      <button class="rc ${d?"on":""}" onclick="setTipo('delivery')"><span class="ib">${icon("truck")}</span><span><span class="t">Delivery</span><br><span class="s">Te lo llevamos a tu puerta. Solo a pocas cuadras del local.</span></span><span class="rad"></span></button>
      <button class="rc ${!d?"on":""}" onclick="setTipo('recojo')"><span class="ib">${icon("store")}</span><span><span class="t">Recojo en tienda</span><br><span class="s">Pasa a recogerlo, sin costo adicional.</span></span><span class="rad"></span></button>
    </div>
  </div>

  <div class="fs"><h3><span class="n">2</span>Tus datos</h3>
    <div class="fld"><label for="fNombre">Nombre completo</label><input class="in" id="fNombre" placeholder="Ej: Juan Pérez" autocomplete="name" value="${esc(form.nombre)}" oninput="form.nombre=this.value;this.classList.remove('bad')"></div>
    <div class="fld"><label for="fTel">Celular</label><input class="in" id="fTel" type="tel" inputmode="numeric" maxlength="9" placeholder="9XXXXXXXX" autocomplete="tel" value="${esc(form.tel)}" oninput="form.tel=this.value.replace(/\\D/g,'');this.value=form.tel;this.classList.remove('bad')"></div>
  </div>

  ${d?`
  <div class="fs"><h3><span class="n">3</span>Dirección de entrega</h3>
    <div class="fld"><label for="fDir">Dirección <em>(calle y número)</em></label><input class="in" id="fDir" placeholder="Ej: Av. Los Sauces 245, Mz B Lt 3" autocomplete="street-address" value="${esc(form.dir)}" oninput="form.dir=this.value;this.classList.remove('bad')"></div>
    <div class="fld"><label for="fRef">Referencia <em>(opcional)</em></label><input class="in" id="fRef" placeholder="Ej: casa azul, frente al parque" value="${esc(form.ref)}" oninput="form.ref=this.value"></div>
    <div class="addrbtns">
      <button class="btn ghost sm" onclick="openMap()">${icon("pin")}Marcar en el mapa</button>
      <button class="btn ghost sm" onclick="autoLocate=true;openMap()">${icon("nav")}Mi ubicación</button>
    </div>
    ${form.lat!==null
      ? `<div class="note ok">${icon("check")}<span>Pin marcado en el mapa, dentro de la zona de reparto. Escribe arriba tu calle y número.</span></div>`
      : `<div class="note">${icon("info")}<span>Repartimos solo a pocas cuadras del local (aprox. ${CFG.radioMetros} m). Marca tu ubicación en el mapa para confirmar que estás dentro de la zona.</span></div>`}
  </div>`:`
  <div class="fs"><h3><span class="n">3</span>Recojo en tienda</h3>
    <div class="fld" style="font-size:14px;line-height:1.6"><b>${esc(CFG.nombre)}</b><br>${esc(CFG.direccion)}<br><span style="color:var(--muted)">Jueves a domingo · 7:00 p. m. – 11:59 p. m.</span></div>
  </div>`}

  <div class="fs"><h3><span class="n">4</span>Observaciones <em style="font-weight:400;color:var(--muted);font-style:normal;font-size:13px">(opcional)</em></h3>
    <textarea class="in" id="fObs" placeholder="Ej: más papas, sin ají, cambio de S/ 50…" oninput="form.obs=this.value">${esc(form.obs)}</textarea>
  </div>

  <div class="fs pay" id="payBox"><h3><span class="n">5</span>Pago con Yape</h3>
    <div class="yp"><span class="yl">Yape</span><div><div class="yn">${esc(CFG.yapeNumero)}</div><small>A nombre de <b>${esc(CFG.yapeNombre)}</b></small></div>
      <button class="copy" onclick="copyYape()">${icon("copy")}Copiar</button></div>
    <ol><li>Yapea <b>${money(total()+fee)}</b> al número indicado.</li><li>Adjunta la captura del pago.</li><li>Envía el pedido por WhatsApp.</li></ol>
    <label class="upl">${icon("upload")}Adjuntar captura del Yape<input type="file" accept="image/*" id="fFoto" onchange="onFoto(this)"></label>
    <div class="shot" id="shot"><img id="shotImg" alt="Captura del pago"><span id="shotName"></span><button class="lnk" onclick="removeFoto()">Quitar</button></div>
  </div>

  <div class="totals" style="margin-top:0">
    <div><span>Productos</span><span>${money(total())}</span></div>
    ${d?`<div><span>Delivery</span><span>${CFG.costoDelivery>0?money(CFG.costoDelivery):"Se confirma por WhatsApp"}</span></div>`:""}
    <div class="big"><span>Total</span><span>${money(total()+fee)}</span></div>
  </div>`;
  if(form.foto) showShot();
  $("dfoot").innerHTML=`<button class="btn pri block" onclick="sendOrder()">Enviar pedido por WhatsApp</button><button class="lnk" onclick="backToCart()">Volver al pedido</button>`;
}
function copyYape(){
  const n=CFG.yapeNumero.replace(/\s/g,"");
  if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(n).then(()=>toast("Número copiado"),()=>toast("No se pudo copiar","err")); }
  else toast("Número: "+CFG.yapeNumero);
}
function onFoto(inp){ const f=inp.files[0]; if(!f) return; form.foto=f; showShot(); $("payBox").classList.remove("bad"); }
function showShot(){ $("shotImg").src=URL.createObjectURL(form.foto); $("shotName").textContent=form.foto.name; $("shot").classList.add("show"); }
function removeFoto(){ form.foto=null; $("shot").classList.remove("show"); const f=$("fFoto"); if(f) f.value=""; }
function fail(msg,id){
  toast(msg,"err");
  const el=id&&$(id); if(!el) return;
  el.classList.add("bad"); el.scrollIntoView({block:"center",behavior:"smooth"});
  try{ el.focus({preventScroll:true}); }catch(e){}
}


/* ---------- Enviar pedido ---------- */
async function sendOrder(){
  const d=form.tipo==="delivery";

  // Lee lo que está escrito en los campos
  const g=id=>{ const el=document.getElementById(id); return el?el.value:null; };
  if(g("fNombre")!==null) form.nombre=g("fNombre");
  if(g("fTel")!==null)    form.tel=g("fTel").replace(/\D/g,"");
  if(g("fDir")!==null)    form.dir=g("fDir");
  if(g("fRef")!==null)    form.ref=g("fRef");
  if(g("fObs")!==null)    form.obs=g("fObs");

  if(!form.nombre.trim()) return fail("Escribe tu nombre.","fNombre");
  if(!/^9\d{8}$/.test(form.tel)) return fail("Escribe un celular de 9 dígitos que empiece con 9.","fTel");
  if(d && !form.dir.trim()) return fail("Escribe tu dirección de entrega (calle y número).","fDir");
  if(d && form.lat!==null && dist(form.lat,form.lng)>CFG.radioMetros) return fail("Tu ubicación está fuera de la zona de delivery. Elige recojo en local.");
  if(!form.foto) return fail("Adjunta la captura de tu pago con Yape.","payBox");

  let t=`*NUEVO PEDIDO – ${CFG.nombre}*\n\n`;
  cart.forEach(i=>{ t+=`• ${i.qty} x ${i.name}${i.opt?` (${i.opt})`:""} – ${money(i.price*i.qty)}\n`; });
  t+=`\n*Total productos:* ${money(total())}`;
  if(d && CFG.costoDelivery>0) t+=`\n*Delivery:* ${money(CFG.costoDelivery)}\n*TOTAL:* ${money(total()+CFG.costoDelivery)}`;
  t+=`\n\n*Cliente:* ${form.nombre}\n*Celular:* ${form.tel}\n*Tipo:* ${d?"Delivery":"Recojo en local"}`;
  if(d){
    t+=`\n*Dirección:* ${form.dir}`;
    if(form.ref) t+=`\n*Referencia:* ${form.ref}`;
    if(form.lat!==null) t+=`\n*Pin exacto (abrir en Google Maps):* https://maps.google.com/?q=${form.lat},${form.lng}`;
  }
  if(form.obs) t+=`\n*Observaciones:* ${form.obs}`;
  t+=`\n*Pago:* Yape (captura adjunta)`;

    if(enviando) return;
  enviando=true;
  const pedido={
    fecha:new Date().toISOString(),
    cliente:{nombre:form.nombre.trim(),celular:form.tel},
    tipo:form.tipo,
    direccion:d?form.dir.trim():null,
    referencia:d?form.ref:null,
    ubicacion:(d&&form.lat!==null)?{lat:form.lat,lng:form.lng}:null,
    observaciones:form.obs,
    productos:cart.map(i=>({id:i.id,nombre:i.name,opcion:i.opt,cantidad:i.qty,precio:i.price,cremas:i.cremas})),
    total:total()+(d?CFG.costoDelivery:0),
    captura:form.foto
  };
  try{
    await enviarPedido(pedido);
  }catch(e){
    enviando=false;
    return toast("No pudimos enviar tu pedido. Intenta de nuevo.","err");
  }
  enviando=false;
  lastSend={withFile:true,url:""}; view="done"; renderDrawer(); limpiarPedido();
}

let enviando=false;

/* AQUÍ se conectará el panel de administrador.
   Por ahora solo simula el envío. */
async function enviarPedido(pedido){
  await new Promise(r=>setTimeout(r,800));
  console.log("Pedido simulado:",pedido);
}
function limpiarPedido(){
  cart=[];
  form.nombre=""; form.tel=""; form.dir=""; form.ref=""; form.obs="";
  form.lat=null; form.lng=null; form.foto=null;
  try{ localStorage.removeItem("bp_form"); }catch(e){}
  refresh();
}

function renderDone(){
  $("dtitle").textContent="Pedido enviado";
  $("dbody").innerHTML=`<div class="done"><div class="okc">${icon("check")}</div>
    <h3>¡Casi listo!</h3>
        <p>Recibimos tu pedido. Te confirmaremos en unos minutos.</p>
    ${lastSend.withFile?"":`<a class="btn dark block" href="${esc(lastSend.url)}" target="_blank" rel="noopener">Abrir WhatsApp otra vez</a>`}
    <button class="btn pri block" onclick="newOrder()">Hacer otro pedido</button></div>`;
  $("dfoot").innerHTML="";
}
function newOrder(){
  cart=[]; form.foto=null; form.obs=""; view="cart";
  closeDrawer(); refresh(); goMenu();
}

/* =========================================================
   MAPA (Leaflet; calles Esri / OpenStreetMap, sin clave)
   ========================================================= */
let map=null, pin=null, circle=null, picked=null, geoTimer=null;
let autoLocate=false, tileLayer=null, tilesOk=false, tileErr=0, provIdx=0, tileTimer=null, mapDead=false;

function dist(lat,lng){ // metros (Haversine)
  const R=6371000,toR=x=>x*Math.PI/180;
  const a=Math.sin(toR(lat-CFG.tienda.lat)/2)**2+Math.cos(toR(CFG.tienda.lat))*Math.cos(toR(lat))*Math.sin(toR(lng-CFG.tienda.lng)/2)**2;
  return 2*R*Math.asin(Math.sqrt(a));
}
const LEAFLET_SRC=[
  ["https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js","https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"],
  ["https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js","https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css"],
  ["https://unpkg.com/leaflet@1.9.4/dist/leaflet.js","https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"]
];
const PROVIDERS=[
  {url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",opt:{maxZoom:19,attribution:"Tiles © Esri"}},
  {url:"https://tile.openstreetmap.org/{z}/{x}/{y}.png",opt:{maxZoom:19,attribution:"© OpenStreetMap"}}
];
function switchMap(){ if(!map) return; provIdx=(provIdx+1)%PROVIDERS.length; addTiles(); toast("Mapa cambiado"); }

function loadScript(src){
  return new Promise((ok,fail)=>{
    const s=document.createElement("script"); s.src=src; s.onload=ok; s.onerror=()=>{s.remove();fail()};
    document.head.appendChild(s);
  });
}
async function loadLeaflet(){
  if(window.L) return true;
  for(const [js,css] of LEAFLET_SRC){
    try{
      if(!document.querySelector('link[href="'+css+'"]')){
        const l=document.createElement("link"); l.rel="stylesheet"; l.href=css; document.head.appendChild(l);
      }
      await loadScript(js);
      if(window.L) return true;
    }catch(e){}
  }
  return false;
}
async function openMap(){
  openModal("mapModal");
  $("mapFail").classList.add("hidden"); $("mapBox").classList.remove("hidden");
  $("mapOk").disabled=true; $("mapTxt").className="maptxt"; $("mapTxt").textContent="Cargando mapa…";
  if(mapDead) return mapFailed("No se pudo mostrar el mapa en este momento.");
  const ok=await loadLeaflet();
  if(!ok) return mapFailed("No se pudo cargar el mapa.");
  setTimeout(initMap,250);
}
function initMap(){
  if(!map){
    map=L.map("map").setView([CFG.tienda.lat,CFG.tienda.lng],17);
    addTiles();
    L.marker([CFG.tienda.lat,CFG.tienda.lng],{interactive:false,icon:L.divIcon({html:"<div style='background:#161616;color:#FDB515;font:700 11px Poppins,sans-serif;padding:5px 9px;border-radius:8px;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,.35)'>BroPoint</div>",className:"",iconSize:[70,24],iconAnchor:[35,12]})}).addTo(map);
    map.on("click",e=>setPin(e.latlng.lat,e.latlng.lng));
  }
  map.invalidateSize();
  $("mapTxt").textContent="Busca tu calle arriba, o toca el mapa y arrastra el pin hasta la puerta de tu casa.";
  if(form.lat!==null) setPin(form.lat,form.lng,true);
  if(autoLocate){ autoLocate=false; gpsInMap(); }
}
function addTiles(){
  if(tileLayer) map.removeLayer(tileLayer);
  clearTimeout(tileTimer); tilesOk=false; tileErr=0;
  const pv=PROVIDERS[provIdx];
  tileLayer=L.tileLayer(pv.url,pv.opt).addTo(map);
  tileLayer.on("tileload",()=>{ if(!tilesOk){tilesOk=true;clearTimeout(tileTimer);showCircle();} });
  tileLayer.on("tileerror",()=>{ tileErr++; if(!tilesOk && tileErr>=4) nextProvider(); });
  tileTimer=setTimeout(()=>{ if(!tilesOk) nextProvider(); },7000);
}
function nextProvider(){
  clearTimeout(tileTimer);
  if(provIdx<PROVIDERS.length-1){ provIdx++; addTiles(); }
  else { mapDead=true; mapFailed("No se pudieron cargar las calles del mapa en este momento."); }
}
function showCircle(){
  if(circle || !map) return;
  circle=L.circle([CFG.tienda.lat,CFG.tienda.lng],{radius:CFG.radioMetros,color:"#E63322",weight:3,fillColor:"#E63322",fillOpacity:.06,interactive:false}).addTo(map);
  if(!picked) map.fitBounds(circle.getBounds(),{padding:[10,10]});
}
function mapFailed(msg){
  $("mapBox").classList.add("hidden"); $("mapFail").classList.remove("hidden");
  $("mapFailTxt").textContent=msg+" Usa tu ubicación actual o escribe tu dirección a mano.";
  $("mapTxt").textContent=""; $("mapOk").disabled=true;
}
function setPin(lat,lng,noGeo){
  picked={lat,lng};
  const icon=L.divIcon({html:"<svg width='34' height='42' viewBox='0 0 24 30'><path d='M12 0C5.4 0 0 5.2 0 11.7 0 20 12 30 12 30s12-10 12-18.3C24 5.2 18.6 0 12 0z' fill='#D92D20'/><circle cx='12' cy='11.5' r='4.5' fill='#fff'/></svg>",className:"",iconSize:[34,42],iconAnchor:[17,40]});
  if(!pin){
    pin=L.marker([lat,lng],{draggable:true,icon}).addTo(map);
    pin.on("dragend",()=>{const q=pin.getLatLng();setPin(q.lat,q.lng)});
  } else pin.setLatLng([lat,lng]);
  const ok=dist(lat,lng)<=CFG.radioMetros;
  const tx=$("mapTxt");
  if(!ok){ tx.className="maptxt bad"; tx.textContent="Esa ubicación queda fuera de la zona de delivery (solo unas cuadras a la redonda)."; $("mapOk").disabled=true; return; }
  tx.className="maptxt"; $("mapOk").disabled=false;
  if(noGeo){ tx.textContent="Ubicación marcada."; return; }
  tx.textContent="Buscando dirección de referencia…";
  clearTimeout(geoTimer);
  geoTimer=setTimeout(async()=>{
    const t=await reverseText(lat,lng);
    if(picked && picked.lat===lat && picked.lng===lng){
      picked.text=t;
      $("mapTxt").textContent= t ? "Cerca de: "+t+" (solo referencia; tu dirección exacta la escribes después)." : "Pin marcado. Tu dirección exacta la escribes después.";
    }
  },400);
}
async function reverseText(lat,lng){
  try{
    const r=await fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=18&accept-language=es&lat="+lat+"&lon="+lng);
    const j=await r.json(); const a=j.address||{};
    const calle=[a.road,a.house_number].filter(Boolean).join(" ");
    const zona=a.neighbourhood||a.suburb||a.quarter||"";
    return [calle,zona].filter(Boolean).join(", ") || "";
  }catch(e){ return ""; }
}
async function searchAddr(){
  const q=$("mapQ").value.trim(); if(!q) return;
  if(!map || !tilesOk) return toast("El mapa aún no está listo");
  try{
    const vb=[CFG.tienda.lng-0.03,CFG.tienda.lat+0.03,CFG.tienda.lng+0.03,CFG.tienda.lat-0.03].join(",");
    const url="https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=pe&accept-language=es&viewbox="+vb+"&q="+encodeURIComponent(q+", San Martín de Porres, Lima");
    const r=await fetch(url); const j=await r.json();
    if(!j.length) return toast("No encontré esa calle. Mueve el pin a mano.","err");
    const lat=parseFloat(j[0].lat), lng=parseFloat(j[0].lon);
    map.setView([lat,lng],18); setPin(lat,lng);
  }catch(e){ toast("No se pudo buscar. Mueve el pin a mano.","err"); }
}

/* Ubicación actual (GPS) */
function getGps(){
  return new Promise((ok,fail)=>{
    if(!navigator.geolocation) return fail();
    navigator.geolocation.getCurrentPosition(p=>ok(p.coords),fail,{enableHighAccuracy:true,timeout:12000,maximumAge:0});
  });
}
async function gpsInMap(){
  if(!map) return useGpsDirect();
  try{
    const c=await getGps(); map.setView([c.latitude,c.longitude],18); setPin(c.latitude,c.longitude);
    if(c.accuracy>100) toast("Tu celular da una ubicación aproximada (±"+Math.round(c.accuracy)+" m). Mueve el pin a tu puerta.","err");
  }catch(e){ toast("Activa la ubicación del celular o toca el mapa.","err"); }
}
async function useGpsDirect(){
  toast("Buscando tu ubicación…");
  try{
    const c=await getGps();
    if(dist(c.latitude,c.longitude)>CFG.radioMetros) return toast("Tu ubicación queda fuera de la zona de delivery. Puedes elegir recojo en tienda.","err");
    form.lat=c.latitude; form.lng=c.longitude;
    closeMap(); renderDrawer();
    toast("Pin guardado. Ahora escribe tu calle y número.");
  }catch(e){
    toast("No pude obtener tu ubicación. Activa la ubicación del celular o escribe tu dirección.","err");
  }
}
function confirmMap(){
  if(!picked) return;
  form.lat=picked.lat; form.lng=picked.lng;
  closeMap(); renderDrawer();
  toast("Pin guardado. Ahora escribe tu calle y número.");
}
function closeMap(){ closeModal("mapModal"); }

/* ---------- Google Maps: leer enlaces / coordenadas pegadas ---------- */
function parseGmaps(t){
  t=String(t||"").trim(); if(!t) return null;
  if(/(goo\.gl|maps\.app)/i.test(t)) return {short:true};
  let d=t; try{ d=decodeURIComponent(t); }catch(e){}
  const pats=[
    /!3d(-?\d{1,3}(?:\.\d+)?)!4d(-?\d{1,3}(?:\.\d+)?)/,
    /@(-?\d{1,3}(?:\.\d+)?),(-?\d{1,3}(?:\.\d+)?)/,
    /[?&](?:q|query|ll|destination|center)=(-?\d{1,3}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)/,
    /(-?\d{1,3}\.\d+)\s*[, ]\s*(-?\d{1,3}\.\d+)/
  ];
  for(const r of pats){
    const m=d.match(r);
    if(m){ const lat=parseFloat(m[1]), lng=parseFloat(m[2]);
      if(Math.abs(lat)<=90 && Math.abs(lng)<=180) return {lat,lng}; }
  }
  return null;
}
function openGoogleMaps(){
  window.open("https://www.google.com/maps/search/?api=1&query="+encodeURIComponent("BroPoint, "+CFG.direccion),"_blank");
}
async function pasteGmaps(){
  let t=$("gLink").value.trim();
  if(!t && navigator.clipboard && navigator.clipboard.readText){
    try{ t=(await navigator.clipboard.readText()).trim(); if(t) $("gLink").value=t; }catch(e){}
  }
  if(!t) return toast("Pega primero el enlace o las coordenadas","err");
  const c=parseGmaps(t);
  if(!c) return toast("No pude leer esa ubicación. Copia las coordenadas o el enlace largo de Google Maps.","err");
  if(c.short) return toast("Ese enlace corto no se puede leer. Copia las coordenadas o el enlace largo.","err");
  applyCoords(c.lat,c.lng);
}
function applyCoords(lat,lng){
  if(map && tilesOk){ map.setView([lat,lng],18); setPin(lat,lng); return; }
  if(dist(lat,lng)>CFG.radioMetros) return toast("Esa ubicación queda fuera de la zona de delivery.","err");
  form.lat=lat; form.lng=lng;
  closeMap(); renderDrawer(); toast("Pin guardado. Ahora escribe tu calle y número.");
}

/* =========================================================
   INICIO
   ========================================================= */
document.addEventListener("keydown",e=>{
  if(e.key!=="Escape") return;
  if(document.querySelector(".modal.on")) closeTopModal(); else if($("drawer").classList.contains("on")) closeDrawer();
});
window.addEventListener("resize",setHH);
const qParam = new URLSearchParams(location.search).get("q");
if(qParam && $("searchInput")){ $("searchInput").value = qParam; onSearch(qParam); }
$("ftDir").textContent=CFG.direccion;
$("yr").textContent=new Date().getFullYear();
updateStatus(); setInterval(updateStatus,60000);
renderChips(); refresh(); setHH();
if(window.ResizeObserver) new ResizeObserver(setHH).observe($("hdr"));
