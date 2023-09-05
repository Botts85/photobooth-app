(()=>{"use strict";var e={33671:(e,t,o)=>{var n=o(61957),r=o(71947),i=o(60499),l=o(59835);function a(e,t,o,n,r,i){const a=(0,l.up)("router-view"),s=(0,l.up)("connection-overlay"),c=(0,l.up)("q-dialog");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l.Wm)(a),(0,l.Wm)(c,{modelValue:e.showConnectionOverlay,"onUpdate:modelValue":t[0]||(t[0]=t=>e.showConnectionOverlay=t),persistent:""},{default:(0,l.w5)((()=>[(0,l.Wm)(s)])),_:1},8,["modelValue"])],64)}o(86890),o(69665);var s=o(67575),c=o(96694),d=o(33630),u=o(28339);const p=(0,l._)("span",{class:"q-ml-sm"},"Connecting to server. Please wait for autoconnect or try reload.",-1);function h(e,t,o,n,r,i){const a=(0,l.up)("q-spinner"),s=(0,l.up)("q-card-section"),c=(0,l.up)("q-btn"),d=(0,l.up)("q-card-actions"),u=(0,l.up)("q-card"),h=(0,l.Q2)("close-popup");return(0,l.wg)(),(0,l.j4)(u,{class:"q-pa-sm"},{default:(0,l.w5)((()=>[(0,l.Wm)(s,{class:"row items-center"},{default:(0,l.w5)((()=>[(0,l.Wm)(a,{color:"negative",size:"2em"}),p])),_:1}),(0,l.Wm)(d,{align:"right"},{default:(0,l.w5)((()=>[(0,l.wy)((0,l.Wm)(c,{label:"Reload",color:"primary",onClick:i.reloadPage},null,8,["onClick"]),[[h]])])),_:1})])),_:1})}const m={setup(){return{}},methods:{reloadPage(){window.location.reload()}}};var f=o(11639),g=o(44458),v=o(63190),b=o(13902),y=o(11821),S=o(68879),w=o(62146),_=o(69984),P=o.n(_);const O=(0,f.Z)(m,[["render",h]]),E=O;P()(m,"components",{QCard:g.Z,QCardSection:v.Z,QSpinner:b.Z,QCardActions:y.Z,QBtn:S.Z}),P()(m,"directives",{ClosePopup:w.Z});const C=(0,l.aZ)({name:"App",components:{ConnectionOverlay:E},data(){return{}},computed:{showConnectionOverlay(){return!this.connected}},setup(){const e=(0,s.h)(),t=(0,c.R)(),o=(0,d.r)(),n=(0,u.tv)();const r=(0,i.iH)(!1),l=(0,i.iH)(!1);return console.log(t.isLoaded),setInterval((function(){const t=2e3;Date.now()-e.lastHeartbeat>t&&(r.value=!1)}),200),{connected:r,lineEstablished:l,router:n,store:e,uiSettingsStore:t,mediacollectionStore:o,ConnectionOverlay:E}},methods:{async init(){this.uiSettingsStore.initStore(),this.mediacollectionStore.initStore(),await this.until((e=>1==this.uiSettingsStore.isLoaded)),await this.until((e=>1==this.mediacollectionStore.isLoaded)),this.initSseClient()},until(e){const t=o=>{e()?o():setTimeout((e=>t(o)),400)};return new Promise(t)},initSseClient(){this.sseClient=this.$sse.create("/sse").on("error",(e=>console.error("Failed to parse or lost connection:",e))).on("FrontendNotification",((e,t)=>{console.warn(e,t)})).on("LogRecord",(e=>{this.store.logrecords=[JSON.parse(e),...this.store.logrecords.slice(0,99)]})).on("ProcessStateinfo",(e=>{const t=JSON.parse(e);console.log(t),this.store.statemachine=t})).on("DbInsert",(e=>{const t=JSON.parse(e);console.log("received new item to add to collection:",t),this.mediacollectionStore.collection.unshift(t["mediaitem"]),this.$route.path.indexOf("/admin")>=0||(t["present"]||t["to_confirm_or_reject"])&&this.$router.push({path:`/itemviewer/${t["mediaitem"]["id"]}`,query:{approval:t["to_confirm_or_reject"]}})})).on("InformationRecord",(e=>{Object.assign(this.store.information,JSON.parse(e))})).on("ping",(()=>{this.store.lastHeartbeat=Date.now(),this.connected=!0})).connect().then((e=>{console.log(e),console.log("SSE connected!"),this.lineEstablished=!0})).catch((e=>{console.error("Failed make initial SSE connection!",e)}))}},async created(){console.log("app created, waiting for stores to init first dataset"),this.init(),console.log("data initialization finished")}});var I=o(32074);const N=(0,f.Z)(C,[["render",a]]),T=N;P()(C,"components",{QDialog:I.Z});var L=o(23340),R=o(81809);const A=(0,L.h)((()=>{const e=(0,R.WB)();return e})),k=[{path:"/",component:()=>Promise.all([o.e(736),o.e(353)]).then(o.bind(o,25353)),children:[{path:"",component:()=>Promise.all([o.e(736),o.e(854)]).then(o.bind(o,51854))},{path:"gallery",component:()=>Promise.all([o.e(736),o.e(390)]).then(o.bind(o,64390))},{path:"itemviewer/:id",component:()=>Promise.all([o.e(736),o.e(625)]).then(o.bind(o,27625))}]},{path:"/admin",name:"admin",meta:{requiresAuth:!0,requiresAdmin:!0},component:()=>Promise.all([o.e(736),o.e(377)]).then(o.bind(o,21377)),children:[{path:"",component:()=>Promise.all([o.e(736),o.e(444)]).then(o.bind(o,6444)),name:"admin_index"},{path:"gallery",component:()=>Promise.all([o.e(736),o.e(390)]).then(o.bind(o,64390))},{path:"status",component:()=>Promise.all([o.e(736),o.e(889)]).then(o.bind(o,30889))},{path:"help",component:()=>Promise.all([o.e(736),o.e(830)]).then(o.bind(o,71830))},{path:"playground",component:()=>Promise.all([o.e(736),o.e(799)]).then(o.bind(o,69799))},{path:"config",component:()=>Promise.all([o.e(736),o.e(53)]).then(o.bind(o,84053))}]},{path:"/:catchAll(.*)*",component:()=>o.e(134).then(o.bind(o,34134))}],Z=k,j=(0,L.BC)((function(){const e=u.r5,t=(0,u.p7)({scrollBehavior:(e,t,o)=>o?{savedPosition:o}:{left:0,top:0},routes:Z,history:e("")});return t}));async function D(e,t){const o=e(T);o.use(r.Z,t);const n="function"===typeof A?await A({}):A;o.use(n);const l=(0,i.Xl)("function"===typeof j?await j({store:n}):j);return n.use((({store:e})=>{e.router=l})),{app:o,store:n,router:l}}var Q=o(66611),W=o(28423),x=o(80592),q=o(6764),H=o(46858),F=o(6827);const B={config:{notify:{}},components:{QInput:Q.Z,QSlider:W.Z,QToggle:x.Z,QSelect:q.Z,QTooltip:H.Z},plugins:{Notify:F.Z}},M="";async function U({app:e,router:t,store:o},n){let r=!1;const i=e=>{try{return t.resolve(e).href}catch(o){}return Object(e)===e?null:e},l=e=>{if(r=!0,"string"===typeof e&&/^https?:\/\//.test(e))return void(window.location.href=e);const t=i(e);null!==t&&(window.location.href=t,window.location.reload())},a=window.location.href.replace(window.location.origin,"");for(let c=0;!1===r&&c<n.length;c++)try{await n[c]({app:e,router:t,store:o,ssrContext:null,redirect:l,urlPath:a,publicPath:M})}catch(s){return s&&s.url?void l(s.url):void console.error("[Quasar] boot error:",s)}!0!==r&&(e.use(t),e.mount("#q-app"))}D(n.ri,B).then((e=>{const[t,n]=void 0!==Promise.allSettled?["allSettled",e=>e.map((e=>{if("rejected"!==e.status)return e.value.default;console.error("[Quasar] boot error:",e.reason)}))]:["all",e=>e.map((e=>e.default))];return Promise[t]([Promise.resolve().then(o.bind(o,36372)),Promise.resolve().then(o.bind(o,91569)),Promise.resolve().then(o.bind(o,65955))]).then((t=>{const o=n(t).filter((e=>"function"===typeof e));U(e,o)}))}))},91569:(e,t,o)=>{o.r(t),o.d(t,{api:()=>i,default:()=>a,remoteProcedureCall:()=>l});var n=o(23340),r=o(37524);const i=r.Z.create({baseURL:"/"});function l(e){i.get(e).then((e=>{console.log(e)})).catch((e=>{console.log("error remoteprocedurecall"),console.log(e)}))}const a=(0,n.xr)((({app:e})=>{e.config.globalProperties.$axios=r.Z,e.config.globalProperties.$api=i}))},36372:(e,t,o)=>{o.r(t),o.d(t,{default:()=>i});var n=o(23340),r=o(32395);const i=(0,n.xr)((async({app:e})=>{e.component("BlitzForm",r.lU),e.component("BlitzListForm",r.$C)}))},65955:(e,t,o)=>{o.r(t),o.d(t,{default:()=>i});var n=o(23340),r=o(32681);const i=(0,n.xr)((({app:e})=>{e.use(r.ZP)}))},67575:(e,t,o)=>{o.d(t,{h:()=>i});var n=o(81809),r=(o(91569),o(60499));o(6827);const i=(0,n.Q_)("main-store",(()=>{const e=(0,r.iH)({sharpness:[],geolocation:{},metadata:{}}),t=(0,r.iH)([]),o=(0,r.iH)({countdown:0,duration:0,state:null,processing:!1}),n=(0,r.iH)({cpu1_5_15:[null,null,null],active_threads:null,memory:{total:null,available:null,percent:null,used:null,free:null},cma:{CmaTotal:null,CmaFree:null},disk:{total:null,used:null,free:null,percent:null},imageserver_stats:{primary:null,secondary:null}}),i=(0,r.iH)(null);return{stats:e,information:n,lastHeartbeat:i,logrecords:t,statemachine:o}}))},33630:(e,t,o)=>{o.d(t,{r:()=>l});var n=o(81809),r=o(91569);const i={INIT:0,DONE:1,WIP:2,ERROR:3},l=(0,n.Q_)("mediacollection-store",{state:()=>({collection:[],mostRecentItemId:null,storeState:i.INIT}),actions:{initStore(e=!1){console.log("loading store"),this.isLoaded&&0==e?console.log("items loaded once already, skipping"):(this.storeState=i.WIP,r.api.get("/mediacollection/getitems").then((e=>{console.log(e),this.collection=e.data,this.storeState=i.DONE})).catch((e=>{console.log(e),this.storeState=i.ERROR})))},getIndexOfItemId(e){return this.collection.findIndex((t=>t.id===e))}},getters:{isLoaded(){return this.storeState===i.DONE},isLoading(){return this.storeState===i.WIP},collection_number_of_items(){return this.collection.length}}})},96694:(e,t,o)=>{o.d(t,{R:()=>l});var n=o(81809),r=o(91569);const i={INIT:0,DONE:1,WIP:2,ERROR:3},l=(0,n.Q_)("ui-settings-store",{state:()=>({uiSettings:{FRONTPAGE_TEXT:null,GALLERY_ENABLE:null,GALLERY_EMPTY_MSG:null,TAKEPIC_MSG:null,TAKEPIC_MSG_TIME:null,AUTOCLOSE_NEW_ITEM_ARRIVED:null,SHOW_ADMIN_LINK_ON_FRONTPAGE:null,EXT_DOWNLOAD_URL:null,gallery_show_filter:null,gallery_filter_userselectable:null,gallery_show_download:null,gallery_show_delete:null,gallery_show_print:null},storeState:i.INIT}),actions:{initStore(e=!1){console.log("loadUiSettings"),this.isLoaded&&0==e?console.log("settings loaded once already, skipping"):(this.storeState=i.WIP,r.api.get("/config/ui").then((e=>{console.log("loadUiSettings finished successfully"),console.log(e.data),this.uiSettings=e.data,this.storeState=i.DONE})).catch((e=>{console.log("loadUiSettings failed"),this.storeState=i.ERROR})))}},getters:{isLoaded(){return this.storeState===i.DONE},isLoading(){return this.storeState===i.WIP}}})}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,o),i.exports}o.m=e,(()=>{var e=[];o.O=(t,n,r,i)=>{if(!n){var l=1/0;for(d=0;d<e.length;d++){for(var[n,r,i]=e[d],a=!0,s=0;s<n.length;s++)(!1&i||l>=i)&&Object.keys(o.O).every((e=>o.O[e](n[s])))?n.splice(s--,1):(a=!1,i<l&&(l=i));if(a){e.splice(d--,1);var c=r();void 0!==c&&(t=c)}}return t}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[n,r,i]}})(),(()=>{o.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return o.d(t,{a:t}),t}})(),(()=>{o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}})(),(()=>{o.f={},o.e=e=>Promise.all(Object.keys(o.f).reduce(((t,n)=>(o.f[n](e,t),t)),[]))})(),(()=>{o.u=e=>"js/"+e+"."+{53:"fd363a23",134:"b6f7274e",353:"623b210b",377:"2d378fff",390:"a3e2d06d",444:"0633a5f6",625:"b657d538",799:"4048d552",830:"ee78e793",854:"45b6a91a",889:"be292103"}[e]+".js"})(),(()=>{o.miniCssF=e=>"css/"+e+"."+{53:"0be6c807",390:"ba6eb533",625:"26c5534b"}[e]+".css"})(),(()=>{o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="photobooth-app-frontend:";o.l=(n,r,i,l)=>{if(e[n])e[n].push(r);else{var a,s;if(void 0!==i)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var u=c[d];if(u.getAttribute("src")==n||u.getAttribute("data-webpack")==t+i){a=u;break}}a||(s=!0,a=document.createElement("script"),a.charset="utf-8",a.timeout=120,o.nc&&a.setAttribute("nonce",o.nc),a.setAttribute("data-webpack",t+i),a.src=n),e[n]=[r];var p=(t,o)=>{a.onerror=a.onload=null,clearTimeout(h);var r=e[n];if(delete e[n],a.parentNode&&a.parentNode.removeChild(a),r&&r.forEach((e=>e(o))),t)return t(o)},h=setTimeout(p.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=p.bind(null,a.onerror),a.onload=p.bind(null,a.onload),s&&document.head.appendChild(a)}}})(),(()=>{o.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{o.p=""})(),(()=>{if("undefined"!==typeof document){var e=(e,t,o,n,r)=>{var i=document.createElement("link");i.rel="stylesheet",i.type="text/css";var l=o=>{if(i.onerror=i.onload=null,"load"===o.type)n();else{var l=o&&("load"===o.type?"missing":o.type),a=o&&o.target&&o.target.href||t,s=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");s.code="CSS_CHUNK_LOAD_FAILED",s.type=l,s.request=a,i.parentNode.removeChild(i),r(s)}};return i.onerror=i.onload=l,i.href=t,o?o.parentNode.insertBefore(i,o.nextSibling):document.head.appendChild(i),i},t=(e,t)=>{for(var o=document.getElementsByTagName("link"),n=0;n<o.length;n++){var r=o[n],i=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(i===e||i===t))return r}var l=document.getElementsByTagName("style");for(n=0;n<l.length;n++){r=l[n],i=r.getAttribute("data-href");if(i===e||i===t)return r}},n=n=>new Promise(((r,i)=>{var l=o.miniCssF(n),a=o.p+l;if(t(l,a))return r();e(n,a,null,r,i)})),r={143:0};o.f.miniCss=(e,t)=>{var o={53:1,390:1,625:1};r[e]?t.push(r[e]):0!==r[e]&&o[e]&&t.push(r[e]=n(e).then((()=>{r[e]=0}),(t=>{throw delete r[e],t})))}}})(),(()=>{var e={143:0};o.f.j=(t,n)=>{var r=o.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var i=new Promise(((o,n)=>r=e[t]=[o,n]));n.push(r[2]=i);var l=o.p+o.u(t),a=new Error,s=n=>{if(o.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var i=n&&("load"===n.type?"missing":n.type),l=n&&n.target&&n.target.src;a.message="Loading chunk "+t+" failed.\n("+i+": "+l+")",a.name="ChunkLoadError",a.type=i,a.request=l,r[1](a)}};o.l(l,s,"chunk-"+t,t)}},o.O.j=t=>0===e[t];var t=(t,n)=>{var r,i,[l,a,s]=n,c=0;if(l.some((t=>0!==e[t]))){for(r in a)o.o(a,r)&&(o.m[r]=a[r]);if(s)var d=s(o)}for(t&&t(n);c<l.length;c++)i=l[c],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(d)},n=globalThis["webpackChunkphotobooth_app_frontend"]=globalThis["webpackChunkphotobooth_app_frontend"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var n=o.O(void 0,[736],(()=>o(33671)));n=o.O(n)})();