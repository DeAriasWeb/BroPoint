/* =========================================================
   FINALIZAR PEDIDO (checkout.html)
   Reutiliza de app.js: carrito, form, mapa, Yape, sendOrder, etc.
   Aquí solo se dibuja la página y se ajustan 3 cosas de navegación.
   ========================================================= */

/* Navegación: desde esta página se vuelve al index */
window.goMenu = function(){ location.href = "index.html#carta"; };
window.newOrder = function(){
  cart = []; form.foto = null; form.obs = "";
  refresh();
  location.href = "index.html";
};

/* app.js llama a renderDrawer() / renderCheckout() para redibujar:
   aquí ambas dibujan la página completa. */
window.renderDrawer   = function(){ drawPage(); };
window.renderCheckout = function(){ drawPage(); };
window.backToCart     = function(){ location.href = "index.html#carta"; };

/* ---------- Botón de ubicación: escribe la dirección automáticamente ---------- */
let geoState = null;   // {type:"load"|"ok"|"bad", text}

/* Dirección completa (igual que tu otra página) */
async function reverseFull(lat,lng){
  try{
    const r = await fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=18&addressdetails=1&accept-language=es&lat="+lat+"&lon="+lng);
    const j = await r.json();
    return { full: j.display_name || "", hasNumber: !!(j.address && j.address.house_number) };
  }catch(e){ return { full:"", hasNumber:false }; }
}

async function locateMe(){
  geoState = {type:"load", text:"Buscando tu ubicación…"};
  drawPage();
  let c;
  try{ c = await getGps(); }
  catch(e){
    geoState = {type:"bad", text:"No pudimos obtener tu ubicación. Activa la ubicación de tu celular o PC, permite el acceso y vuelve a intentar, o escribe tu dirección."};
    return drawPage();
  }
  if(dist(c.latitude,c.longitude) > CFG.radioMetros){
    form.lat = null; form.lng = null;
    geoState = {type:"bad", text:"Tu ubicación queda fuera de la zona de delivery (solo unas cuadras del local). Puedes elegir recojo en tienda."};
    return drawPage();
  }
  form.lat = c.latitude; form.lng = c.longitude;
  const r = await reverseFull(c.latitude, c.longitude);
  const t = r.full;
  if(t){
    form.dir = t;
    const inp = document.getElementById("fDir");
    if(inp) inp.value = t;   // evita que syncForm() lo pise con el valor vacío
  }
  const msg = (t && r.hasNumber)
    ? "Ubicación detectada. Verifica que la dirección sea correcta."
    : "Ubicación detectada. Completa tu calle y número y verifica que la dirección sea correcta.";
  geoState = {type:"ok", text:msg};
  drawPage();
}
function geoNoteHTML(){
  if(!geoState){
    return `<div class="note">${icon("info")}<span>Delivery disponible cerca del local. Ingresa tu dirección o comparte tu ubicación..</span></div>`;
  }
  const ic = geoState.type==="ok" ? "check" : "info";
  const cls = geoState.type==="ok" ? "note ok" : geoState.type==="bad" ? "note bad" : "note";
  return `<div class="${cls}">${icon(ic)}<span>${esc(geoState.text)}</span></div>`;
}

/* Cambiar cantidad desde el resumen */
function ckQty(key,d){ changeQty(key,d); drawPage(); }

/* ---------- Mantener los datos escritos (como el carrito) ---------- */
const FORM_KEY = "bp_form";
function loadForm(){
  try{
    const s = JSON.parse(localStorage.getItem(FORM_KEY) || "null");
    if(s) Object.assign(form, s, {foto:null});
  }catch(e){}
}
function syncForm(){   // lee lo que hay escrito en los campos
  const g = id => { const el = document.getElementById(id); return el ? el.value : null; };
  if(g("fNombre") !== null) form.nombre = g("fNombre");
  if(g("fTel")    !== null) form.tel    = g("fTel").replace(/\D/g,"");
  if(g("fDir")    !== null) form.dir    = g("fDir");
  if(g("fRef")    !== null) form.ref    = g("fRef");
  if(g("fObs")    !== null) form.obs    = g("fObs");
}
function saveForm(){
  try{ const {foto, ...rest} = form; localStorage.setItem(FORM_KEY, JSON.stringify(rest)); }catch(e){}
}
document.addEventListener("input", ()=>{ syncForm(); saveForm(); });

function drawPage(){
  syncForm();   // guarda lo escrito ANTES de redibujar
  const root = $("ckPage");

  /* Pedido enviado */
  if(view === "done"){
    root.innerHTML = `<div class="ck-wrap"><div class="ck-empty"><div class="done"><div class="okc">${icon("check")}</div>
      <h3>¡Casi listo!</h3>
      <p>${lastSend.withFile
        ? "Enviamos el detalle de tu pedido junto con la captura de tu Yape. Te confirmaremos por WhatsApp."
        : "Se abrió WhatsApp con el detalle de tu pedido. <b>Envía el mensaje y adjunta la captura de tu Yape</b> en el chat para confirmarlo."}</p>
      ${lastSend.withFile?"":`<a class="btn dark block" href="${esc(lastSend.url)}" target="_blank" rel="noopener">Abrir WhatsApp otra vez</a>`}
      <button class="btn pri block" onclick="newOrder()">Hacer otro pedido</button></div></div></div>`;
    return;
  }

  /* Carrito vacío */
  if(!cart.length){
    root.innerHTML = `<div class="ck-wrap"><div class="ck-empty">${icon("bag")}<p style="margin:12px 0 18px">Tu pedido está vacío.<br>Agrega algo de la carta para continuar.</p><a class="btn pri" href="index.html#carta">Ver la carta</a></div></div>`;
    return;
  }

  const d   = form.tipo === "delivery";
  const fee = d ? CFG.costoDelivery : 0;

  const items = cart.map(i=>`<div class="item">${imgHTML(i.img,i.name,"sm")}
    <div class="inf"><span class="icat">${esc(cat(prod(i.id).cat).name)}</span><b>${esc(i.name)}</b>${i.opt?`<small>${esc(i.opt)}</small>`:""}<small>${i.qty} x ${money(i.price)}</small><div class="pr">${money(i.price*i.qty)}</div></div></div>`).join("");

  root.innerHTML = `<div class="ck-wrap">
  <div class="ck-top">
    <h1>Finalizar pedido</h1>
    <a class="ck-back" href="index.html#carta">${icon("back")}Seguir comprando</a>
  </div>

  <div class="ck-grid">
    <!-- IZQUIERDA: datos -->
    <div class="ck-left">

      <div class="fs ck-card"><h3><span class="n">1</span>¿Cómo deseas recibir tu pedido?</h3>
        <div class="rcs">
          <button class="rc ${d?"on":""}" onclick="setTipo('delivery')"><span class="ib">${icon("moto")}</span><span class="rt"><span class="t">Delivery</span></span><span class="rad"></span></button>
          <button class="rc ${!d?"on":""}" onclick="setTipo('recojo')"><span class="ib">${icon("store")}</span><span class="rt"><span class="t">Recoge en local</span></span><span class="rad"></span></button>
        </div>
      </div>

      <div class="fs ck-card"><h3><span class="n">2</span>Tus datos</h3>
        <div class="fld"><label for="fNombre">Nombre completo</label><input class="in" id="fNombre" placeholder="Ej: Juan Pérez" autocomplete="name" value="${esc(form.nombre)}" oninput="form.nombre=this.value;this.classList.remove('bad')"></div>
        <div class="fld"><label for="fTel">Celular</label><input class="in" id="fTel" type="tel" inputmode="numeric" maxlength="9" placeholder="9XXXXXXXX" autocomplete="tel" value="${esc(form.tel)}" oninput="form.tel=this.value.replace(/\\D/g,'');this.value=form.tel;this.classList.remove('bad')"></div>
      </div>

      ${d?`
      <div class="fs ck-card"><h3><span class="n">3</span>Dirección de entrega</h3>
        <div class="fld"><label for="fDir">Dirección <em>(calle y número)</em></label>
          <div class="addrrow">
            <input class="in" id="fDir" placeholder="Ej: Av. Los Sauces 245, Mz B Lt 3" autocomplete="street-address" value="${esc(form.dir)}" oninput="form.dir=this.value;this.classList.remove('bad')">
            <button class="locbtn ${geoState&&geoState.type==="load"?"load":""}" onclick="locateMe()" aria-label="Usar mi ubicación actual" title="Usar mi ubicación actual">${icon("pin")}</button>
          </div>
        </div>
        ${geoNoteHTML()}
        <div class="fld"><label for="fRef">Referencia <em>(opcional)</em></label><input class="in" id="fRef" placeholder="Ej: casa azul, frente al parque" value="${esc(form.ref)}" oninput="form.ref=this.value"></div>
      </div>`:`
      <div class="fs ck-card"><h3><span class="n">3</span>Recojo en local</h3>
        <div class="fld" style="font-size:14px;line-height:1.6"><b>${esc(CFG.nombre)}</b><br>${esc(CFG.direccion)}<br><span style="color:var(--muted)">Jueves a domingo · 7:00 p. m. – 11:59 p. m.</span></div>
      </div>`}

      <div class="fs ck-card"><h3><span class="n">4</span>Observaciones <em style="font-weight:400;color:var(--muted);font-style:normal;font-size:13px">(opcional)</em></h3>
        <textarea class="in" id="fObs" placeholder="Ej: más papas, sin ají, cambio de S/ 50…" oninput="form.obs=this.value">${esc(form.obs)}</textarea>
      </div>
    </div>

    <!-- DERECHA: resumen y pago -->
    <div class="ck-right">
      <div class="fs ck-card ck-sum"><h3>Tu pedido</h3>
        ${items}
        <div class="totals">
          <div><span>Productos</span><span>${money(total())}</span></div>
          <div><span>Método de entrega</span><span>${d?"Delivery":"Recojo en local"}</span></div>
          ${d && CFG.costoDelivery>0?`<div><span>Costo de delivery</span><span>${money(CFG.costoDelivery)}</span></div>`:""}
          <div class="big"><span>Total</span><span>${money(total()+fee)}</span></div>
        </div>
      </div>

      <div class="fs pay ck-card" id="payBox"><h3><span class="n">5</span>Pago con Yape</h3>
        <div class="yp"><span class="yl">Yape</span><div><div class="yn">${esc(CFG.yapeNumero)}</div><small>A nombre de <b>${esc(CFG.yapeNombre)}</b></small></div>
          <button class="copy" onclick="copyYape()">${icon("copy")}Copiar</button></div>
        <ol><li>Yapea <b>${money(total()+fee)}</b> al número indicado.</li><li>Adjunta la captura del pago.</li><li>Envía el pedido por WhatsApp.</li></ol>
        <label class="upl">${icon("upload")}Adjuntar captura del Yape<input type="file" accept="image/*" id="fFoto" onchange="onFoto(this)"></label>
        <div class="shot" id="shot"><img id="shotImg" alt="Captura del pago"><span id="shotName"></span><button class="lnk" onclick="removeFoto()">Quitar</button></div>
      </div>

      <button class="btn pri block ck-confirm" onclick="sendOrder()">Confirmar pedido</button>
    </div>
  </div></div>`;

  if(form.foto) showShot();
  saveForm();
}

/* Inicio */
loadForm();
drawPage();