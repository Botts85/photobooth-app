import{N as b,r as h,bp as y,w as p,av as g,a4 as F,e as x,bq as m,br as v,bb as B,aA as C}from"./index-RlBL7fbI.js";let i=0;const I={fullscreen:Boolean,noRouteFullscreenExit:Boolean},A=["update:fullscreen","fullscreen"];function V(){const r=b(),{props:n,emit:s,proxy:e}=r;let o,u,c;const t=h(!1);y(r)===!0&&p(()=>e.$route.fullPath,()=>{n.noRouteFullscreenExit!==!0&&l()}),p(()=>n.fullscreen,a=>{t.value!==a&&f()}),p(t,a=>{s("update:fullscreen",a),s("fullscreen",a)});function f(){t.value===!0?l():d()}function d(){t.value!==!0&&(t.value=!0,c=e.$el.parentNode,c.replaceChild(u,e.$el),document.body.appendChild(e.$el),i++,i===1&&document.body.classList.add("q-body--fullscreen-mixin"),o={handler:l},m.add(o))}function l(){t.value===!0&&(o!==void 0&&(m.remove(o),o=void 0),c.replaceChild(e.$el,u),t.value=!1,i=Math.max(0,i-1),i===0&&(document.body.classList.remove("q-body--fullscreen-mixin"),e.$el.scrollIntoView!==void 0&&setTimeout(()=>{e.$el.scrollIntoView()})))}return g(()=>{u=document.createElement("span")}),F(()=>{n.fullscreen===!0&&d()}),x(l),Object.assign(e,{toggleFullscreen:f,setFullscreen:d,exitFullscreen:l}),{inFullscreen:t,toggleFullscreen:f}}function $(r){const n=Object.assign({noopener:!0},r),s=[];for(const e in n){const o=n[e];o===!0?s.push(e):(C(o)||typeof o=="string"&&o!=="")&&s.push(e+"="+o)}return s.join(",")}function w(r,n,s){let e=window.open;if(v.is.cordova===!0){if(cordova!==void 0&&cordova.InAppBrowser!==void 0&&cordova.InAppBrowser.open!==void 0)e=cordova.InAppBrowser.open;else if(navigator!==void 0&&navigator.app!==void 0)return navigator.app.loadUrl(r,{openExternal:!0})}const o=e(r,"_blank",$(s));if(o)return v.is.desktop&&o.focus(),o;n&&n()}const N=(r,n,s)=>{if(v.is.ios===!0&&window.SafariViewController!==void 0){window.SafariViewController.isAvailable(e=>{e?window.SafariViewController.show({url:r},B,n):w(r,n,s)});return}return w(r,n,s)};export{A as a,V as b,N as o,I as u};
