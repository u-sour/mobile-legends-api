import{A as U}from"./alert-message-757f299f.js";import{d as E,y as n,z as k,g as H,h as Y,N as R,o as c,c as m,b as i,K as P,k as A,M as _,F as z,m as T,O as K,s as G,j as X,B as x,t as J,x as B}from"./index-69cc5271.js";(function(){try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode('.vue3-marquee{display:flex!important;position:relative}.vue3-marquee.horizontal{overflow-x:hidden!important;flex-direction:row!important;width:100%;height:max-content}.vue3-marquee.vertical{overflow-y:hidden!important;flex-direction:column!important;height:100%;width:max-content}.vue3-marquee:hover div{animation-play-state:var(--pauseOnHover)}.vue3-marquee:active div{animation-play-state:var(--pauseOnClick)}.vue3-marquee>.marquee{flex:0 0 auto;min-width:var(--min-width);min-height:var(--min-height);z-index:1;animation:var(--orientation) var(--duration) linear var(--delay) var(--loops);animation-play-state:var(--pauseAnimation);animation-direction:var(--direction)}.vue3-marquee.horizontal>.marquee{display:flex;flex-direction:row;align-items:center}.vue3-marquee.vertical>.marquee{display:flex;flex-direction:column;align-items:center}@keyframes scrollX{0%{transform:translate(0)}to{transform:translate(-100%)}}@keyframes scrollY{0%{transform:translateY(0)}to{transform:translateY(-100%)}}.vue3-marquee>.overlay{position:absolute;width:100%;height:100%}.vue3-marquee>.transparent-overlay{position:absolute;width:100%;height:100%}.vue3-marquee>.overlay:before,.vue3-marquee>.overlay:after{content:"";position:absolute;z-index:2}.vue3-marquee.horizontal>.overlay:before,.vue3-marquee.horizontal>.overlay:after{background:linear-gradient(to right,var(--gradient-color));height:100%;width:var(--gradient-length)}.vue3-marquee.vertical>.overlay:before,.vue3-marquee.vertical>.overlay:after{background:linear-gradient(to bottom,var(--gradient-color));height:var(--gradient-length);width:100%}.vue3-marquee.horizontal>.overlay:after{transform:rotate(180deg)}.vue3-marquee.vertical>.overlay:after{transform:rotate(-180deg)}.vue3-marquee>.overlay:before{left:0;top:0}.vue3-marquee.horizontal>.overlay:after{right:0;top:0}.vue3-marquee.vertical>.overlay:after{left:0;bottom:0}')),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();var Q=Object.defineProperty,M=Object.getOwnPropertySymbols,Z=Object.prototype.hasOwnProperty,ee=Object.prototype.propertyIsEnumerable,W=(e,t,a)=>t in e?Q(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,N=(e,t)=>{for(var a in t||(t={}))Z.call(t,a)&&W(e,a,t[a]);if(M)for(var a of M(t))ee.call(t,a)&&W(e,a,t[a]);return e},te=(e,t)=>{const a=e.__vccOpts||e;for(const[r,o]of t)a[r]=o;return a};const ae=E({props:{vertical:{type:Boolean,default:!1},direction:{type:String,default:"normal"},duration:{type:Number,default:20},delay:{type:Number,default:0},loop:{type:Number,default:0},clone:{type:Boolean,default:!1},gradient:{type:Boolean,default:!1},gradientColor:{type:Array,default:[255,255,255]},gradientWidth:{type:String},gradientLength:{type:String},pauseOnHover:{type:Boolean,default:!1},pauseOnClick:{type:Boolean,default:!1},pause:{type:Boolean,default:!1}},emits:["onComplete","onLoopComplete","onPause","onResume"],setup(e,{emit:t}){const a=n(0),r=n("100%"),o=n("100%"),s=n(0),l=n(!1),f=n(0),h=n(0),p=n(0),C=n(0),q=n(0),g=n(null),w=n("200px"),$=n(!1),d=n(null),v=n(null),y=async()=>{await O(),s.value++},O=async()=>{e.vertical&&(l.value=!0),setInterval(()=>{if(r.value="0%",o.value="0%",d.value!==null&&v.value!==null)if(d.value&&v.value)if(e.vertical&&"clientHeight"in d.value&&"clientHeight"in v.value){C.value=d.value.clientHeight,p.value=v.value.clientHeight;const u=Math.ceil(p.value/C.value);return a.value=isFinite(u)?u:0,l.value=!1,a.value}else if(!e.vertical&&"clientWidth"in d.value&&"clientWidth"in v.value){h.value=d.value.clientWidth,f.value=v.value.clientWidth;const u=Math.ceil(f.value/h.value);return a.value=isFinite(u)?u:0,a.value}else return r.value="100%",o.value="100%",0;else return r.value="100%",o.value="100%",0;else return r.value="100%",o.value="100%",0},100)};k(h,async()=>{e.clone&&y()}),k(f,async()=>{e.clone&&y()}),k(()=>e.pause,(u,b)=>{u!==b&&t(u?"onResume":"onPause")});const L=()=>{e.pauseOnHover&&t("onPause")},I=()=>{e.pauseOnHover&&t("onResume")},F=()=>{e.pauseOnClick&&t("onPause")},V=()=>{e.pauseOnClick&&t("onResume")},j=H(()=>{const u={"--duration":`${e.duration}s`,"--delay":`${e.delay}s`,"--direction":`${e.direction}`,"--pauseOnHover":`${e.pauseOnHover?"paused":"running"}`,"--pauseOnClick":`${e.pauseOnClick?"paused":"running"}`,"--pauseAnimation":`${e.vertical&&l.value||e.pause?"paused":"running"}`,"--loops":`${e.loop===0?"infinite":e.loop}`,"--gradient-color":`rgba(${e.gradientColor[0]}, ${e.gradientColor[1]}, ${e.gradientColor[2]}, 1), rgba(${e.gradientColor[0]}, ${e.gradientColor[1]}, ${e.gradientColor[2]}, 0)`,"--gradient-length":`${w.value}`,"--min-width":`${r.value}`,"--min-height":`${o.value}`},b={"--orientation":"scrollX",orientation:"horizontal"};return e.vertical&&(b["--orientation"]="scrollY"),N(N({},u),b)}),D=H(()=>!!e.gradient),S=async()=>{e.vertical?(o.value="100%",r.value="auto"):(o.value="auto",r.value="100%"),e.gradient&&(e.gradientWidth?(console.warn("The `gradientWidth` prop has been deprecated and will be removed in a future release. Please use `gradientLength` instead."),w.value=e.gradientWidth):e.gradientLength&&(w.value=e.gradientLength)),e.clone&&(await O(),y()),$.value=!0};return Y(async()=>{S(),g.value=setInterval(()=>{q.value++,e.loop!==0&&q.value===e.loop&&(t("onComplete"),clearInterval(g.value)),t("onLoopComplete")},e.duration*1e3)}),R(()=>{clearInterval(g.value)}),{ready:$,contentWidth:h,containerWidth:f,contentHeight:C,containerHeight:p,loopCounter:q,loopInterval:g,minWidth:r,minHeight:o,marqueeContent:d,marqueeOverlayContainer:v,componentKey:s,showGradient:D,cloneAmount:a,ForcesUpdate:y,checkForClone:O,setupMarquee:S,getCurrentStyle:j,hoverStarted:L,hoverEnded:I,mouseDown:F,mouseUp:V}}}),ne={class:"transparent-overlay",ref:"marqueeOverlayContainer","aria-hidden":!0},re={class:"marquee",ref:"marqueeContent"},oe={class:"marquee","aria-hidden":!0};function le(e,t,a,r,o,s){return e.ready?(c(),m("div",{class:P(["vue3-marquee",{vertical:e.vertical,horizontal:!e.vertical}]),style:K(e.getCurrentStyle),key:e.componentKey,onMouseenter:t[0]||(t[0]=(...l)=>e.hoverStarted&&e.hoverStarted(...l)),onMouseleave:t[1]||(t[1]=(...l)=>e.hoverEnded&&e.hoverEnded(...l)),onMousedown:t[2]||(t[2]=(...l)=>e.mouseDown&&e.mouseDown(...l)),onMouseup:t[3]||(t[3]=(...l)=>e.mouseUp&&e.mouseUp(...l))},[i("div",ne,null,512),e.showGradient?(c(),m("div",{key:0,"aria-hidden":!0,class:P(["overlay",{vertical:e.vertical,horizontal:!e.vertical}])},null,2)):A("",!0),i("div",re,[_(e.$slots,"default")],512),i("div",oe,[_(e.$slots,"default")]),(c(!0),m(z,null,T(e.cloneAmount,l=>(c(),m("div",{"aria-hidden":!0,class:"marquee cloned",key:l},[_(e.$slots,"default")]))),128))],38)):A("",!0)}var ie=te(ae,[["render",le]]);const ue={id:"actions",class:"p-1"},se=i("i",{class:"bi bi-exclamation-triangle"},null,-1),de=i("br",null,null,-1),ve=i("i",{class:"bi bi-pencil-square"},null,-1),ce=[ve],me=i("i",{class:"bi bi-trash"},null,-1),fe=[me],be=E({__name:"EasyDataTableActions",setup(e){const t=n(!1),a=()=>{t.value=!0},r=()=>t.value=!1;return(o,s)=>(c(),m("div",ue,[t.value?(c(),m(z,{key:0},[G(B(ie),{duration:5},{default:X(()=>[se,x(" "+J(B(U).deleteConfirm),1)]),_:1}),de,i("button",{class:"btn btn-primary me-1",onClick:s[0]||(s[0]=()=>{o.$emit("delete"),r()}),"aria-label":"yes-button"}," Yes "),i("button",{class:"btn btn-light",onClick:r,"aria-label":"cancel-button"},"Cancel")],64)):(c(),m(z,{key:1},[i("button",{class:"btn btn-warning me-1",onClick:s[1]||(s[1]=l=>o.$emit("edit")),"aria-label":"edit-button"},ce),i("button",{class:"btn btn-danger",onClick:a,"aria-label":"delete-button"},fe)],64))]))}});export{be as _};
