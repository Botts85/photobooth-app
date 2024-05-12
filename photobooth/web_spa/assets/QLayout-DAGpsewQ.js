import{v as $,N as L,ac as I,a$ as C,an as D,d as g,t as m,P as _,bv as V,by as G,au as J,w as H,a4 as T,e as q,bb as k,ay as X,az as E,bz as Y,bA as Z,r as y,U as A,aC as W,bg as R,aK as x,ad as ee,ag as te}from"./index-RlBL7fbI.js";const re=$({name:"QPageContainer",setup(t,{slots:p}){const{proxy:{$q:n}}=L(),e=I(V,C);if(e===C)return console.error("QPageContainer needs to be child of QLayout"),C;D(G,!0);const r=g(()=>{const a={};return e.header.space===!0&&(a.paddingTop=`${e.header.size}px`),e.right.space===!0&&(a[`padding${n.lang.rtl===!0?"Left":"Right"}`]=`${e.right.size}px`),e.footer.space===!0&&(a.paddingBottom=`${e.footer.size}px`),e.left.space===!0&&(a[`padding${n.lang.rtl===!0?"Right":"Left"}`]=`${e.left.size}px`),a});return()=>m("div",{class:"q-page-container",style:r.value},_(p.default))}}),{passive:M}=E,ne=["both","horizontal","vertical"],ie=$({name:"QScrollObserver",props:{axis:{type:String,validator:t=>ne.includes(t),default:"vertical"},debounce:[String,Number],scrollTarget:J},emits:["scroll"],setup(t,{emit:p}){const n={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let e=null,r,a;H(()=>t.scrollTarget,()=>{l(),v()});function s(){e!==null&&e();const c=Math.max(0,Y(r)),z=Z(r),d={top:c-n.position.top,left:z-n.position.left};if(t.axis==="vertical"&&d.top===0||t.axis==="horizontal"&&d.left===0)return;const w=Math.abs(d.top)>=Math.abs(d.left)?d.top<0?"up":"down":d.left<0?"left":"right";n.position={top:c,left:z},n.directionChanged=n.direction!==w,n.delta=d,n.directionChanged===!0&&(n.direction=w,n.inflectionPoint=n.position),p("scroll",{...n})}function v(){r=X(a,t.scrollTarget),r.addEventListener("scroll",o,M),o(!0)}function l(){r!==void 0&&(r.removeEventListener("scroll",o,M),r=void 0)}function o(c){if(c===!0||t.debounce===0||t.debounce==="0")s();else if(e===null){const[z,d]=t.debounce?[setTimeout(s,t.debounce),clearTimeout]:[requestAnimationFrame(s),cancelAnimationFrame];e=()=>{d(z),e=null}}}const{proxy:h}=L();return H(()=>h.$q.lang.rtl,s),T(()=>{a=h.$el.parentNode,v()}),q(()=>{e!==null&&e(),l()}),Object.assign(h,{trigger:o,getPosition:()=>n}),k}});function oe(){const t=y(!A.value);return t.value===!1&&T(()=>{t.value=!0}),{isHydrated:t}}const B=typeof ResizeObserver<"u",N=B===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"},j=$({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(t,{emit:p}){let n=null,e,r={width:-1,height:-1};function a(l){l===!0||t.debounce===0||t.debounce==="0"?s():n===null&&(n=setTimeout(s,t.debounce))}function s(){if(n!==null&&(clearTimeout(n),n=null),e){const{offsetWidth:l,offsetHeight:o}=e;(l!==r.width||o!==r.height)&&(r={width:l,height:o},p("resize",r))}}const{proxy:v}=L();if(v.trigger=a,B===!0){let l;const o=h=>{e=v.$el.parentNode,e?(l=new ResizeObserver(a),l.observe(e),s()):h!==!0&&W(()=>{o(!0)})};return T(()=>{o()}),q(()=>{n!==null&&clearTimeout(n),l!==void 0&&(l.disconnect!==void 0?l.disconnect():e&&l.unobserve(e))}),k}else{let l=function(){n!==null&&(clearTimeout(n),n=null),c!==void 0&&(c.removeEventListener!==void 0&&c.removeEventListener("resize",a,E.passive),c=void 0)},o=function(){l(),e&&e.contentDocument&&(c=e.contentDocument.defaultView,c.addEventListener("resize",a,E.passive),s())};const{isHydrated:h}=oe();let c;return T(()=>{W(()=>{e=v.$el,e&&o()})}),q(l),()=>{if(h.value===!0)return m("object",{class:"q--avoid-card-border",style:N.style,tabindex:-1,type:"text/html",data:N.url,"aria-hidden":"true",onLoad:o})}}}}),ae=$({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:t=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(t.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(t,{slots:p,emit:n}){const{proxy:{$q:e}}=L(),r=y(null),a=y(e.screen.height),s=y(t.container===!0?0:e.screen.width),v=y({position:0,direction:"down",inflectionPoint:0}),l=y(0),o=y(A.value===!0?0:R()),h=g(()=>"q-layout q-layout--"+(t.container===!0?"containerized":"standard")),c=g(()=>t.container===!1?{minHeight:e.screen.height+"px"}:null),z=g(()=>o.value!==0?{[e.lang.rtl===!0?"left":"right"]:`${o.value}px`}:null),d=g(()=>o.value!==0?{[e.lang.rtl===!0?"right":"left"]:0,[e.lang.rtl===!0?"left":"right"]:`-${o.value}px`,width:`calc(100% + ${o.value}px)`}:null);function w(i){if(t.container===!0||document.qScrollPrevented!==!0){const u={position:i.position.top,direction:i.direction,directionChanged:i.directionChanged,inflectionPoint:i.inflectionPoint.top,delta:i.delta.top};v.value=u,t.onScroll!==void 0&&n("scroll",u)}}function K(i){const{height:u,width:b}=i;let f=!1;a.value!==u&&(f=!0,a.value=u,t.onScrollHeight!==void 0&&n("scrollHeight",u),Q()),s.value!==b&&(f=!0,s.value=b),f===!0&&t.onResize!==void 0&&n("resize",i)}function U({height:i}){l.value!==i&&(l.value=i,Q())}function Q(){if(t.container===!0){const i=a.value>l.value?R():0;o.value!==i&&(o.value=i)}}let S=null;const O={instances:{},view:g(()=>t.view),isContainer:g(()=>t.container),rootRef:r,height:a,containerHeight:l,scrollbarWidth:o,totalWidth:g(()=>s.value+o.value),rows:g(()=>{const i=t.view.toLowerCase().split(" ");return{top:i[0].split(""),middle:i[1].split(""),bottom:i[2].split("")}}),header:x({size:0,offset:0,space:!1}),right:x({size:300,offset:0,space:!1}),footer:x({size:0,offset:0,space:!1}),left:x({size:300,offset:0,space:!1}),scroll:v,animate(){S!==null?clearTimeout(S):document.body.classList.add("q-body--layout-animate"),S=setTimeout(()=>{S=null,document.body.classList.remove("q-body--layout-animate")},155)},update(i,u,b){O[i][u]=b}};if(D(V,O),R()>0){let i=function(){f=null,P.classList.remove("hide-scrollbar")},u=function(){if(f===null){if(P.scrollHeight>e.screen.height)return;P.classList.add("hide-scrollbar")}else clearTimeout(f);f=setTimeout(i,300)},b=function(F){f!==null&&F==="remove"&&(clearTimeout(f),i()),window[`${F}EventListener`]("resize",u)},f=null;const P=document.body;H(()=>t.container!==!0?"add":"remove",b),t.container!==!0&&b("add"),ee(()=>{b("remove")})}return()=>{const i=te(p.default,[m(ie,{onScroll:w}),m(j,{onResize:K})]),u=m("div",{class:h.value,style:c.value,ref:t.container===!0?void 0:r,tabindex:-1},i);return t.container===!0?m("div",{class:"q-layout-container overflow-hidden",ref:r},[m(j,{onResize:U}),m("div",{class:"absolute-full",style:z.value},[m("div",{class:"scroll",style:d.value},[u])])]):u}}});export{re as Q,ae as a,j as b,ie as c};
