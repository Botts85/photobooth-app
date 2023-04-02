"use strict";(globalThis["webpackChunkqPhotobooth"]=globalThis["webpackChunkqPhotobooth"]||[]).push([[787],{5787:(e,o,l)=>{l.r(o),l.d(o,{default:()=>O});var t=l(9835),n=l(6970);const r={class:"q-mt-md row justify-center"},a={class:"col-12 col-md-8 q-mb-xl"},s={class:"text-h5"},c={class:"col-12 col-md-8 q-mb-xl"},i={class:"q-gutter-sm"};function u(e,o,l,u,m,g){const d=(0,t.up)("q-tab"),p=(0,t.up)("q-tabs"),f=(0,t.up)("q-separator"),b=(0,t.up)("blitz-form"),v=(0,t.up)("q-btn"),h=(0,t.up)("q-page-sticky"),y=(0,t.up)("q-page");return(0,t.wg)(),(0,t.j4)(y,{padding:""},{default:(0,t.w5)((()=>[(0,t.Wm)(p,{modelValue:u.selected_group,"onUpdate:modelValue":o[0]||(o[0]=e=>u.selected_group=e),class:"text-grey","active-color":"secondary","indicator-color":"secondary","mobile-arrows":"",align:"justify"},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(u.main_groups,(e=>((0,t.wg)(),(0,t.j4)(d,{key:e,label:e,name:e},null,8,["label","name"])))),128))])),_:1},8,["modelValue"]),(0,t.Wm)(f),(0,t._)("div",r,[(0,t._)("div",a,[(0,t._)("div",s,(0,n.zw)(u.group_title),1),(0,t._)("p",null,(0,n.zw)(u.group_description),1)]),(0,t._)("div",c,[u.renderBlitzForm?((0,t.wg)(),(0,t.j4)(b,{modelValue:u.serverConfig[u.selected_group],"onUpdate:modelValue":o[1]||(o[1]=e=>u.serverConfig[u.selected_group]=e),key:u.selected_group,schema:u.schema_blitzar,internalLabels:!1,"label-position":"left",class:"blitzar-form"},null,8,["modelValue","schema"])):(0,t.kq)("",!0)])]),(0,t.Wm)(h,{position:"bottom-right",offset:[25,25]},{default:(0,t.w5)((()=>[(0,t._)("div",i,[(0,t.Wm)(v,{label:"reset",onClick:o[2]||(o[2]=e=>u.remoteProcedureCall("/cmd/config/reset"))}),(0,t.Wm)(v,{label:"restore",onClick:o[3]||(o[3]=e=>u.getConfig("current"))}),(0,t.Wm)(v,{color:"primary",label:"persist",onClick:o[4]||(o[4]=e=>u.uploadConfigAndPersist())})])])),_:1})])),_:1})}l(8964),l(6727),l(9665);var m=l(499),g=l(1569),d=l(9302),p=l(6380);const f={components:{BlitzForm:p.lU},setup(){const e=(0,d.Z)(),o=(0,m.iH)({});let l={};const n=(0,m.iH)([]),r=(0,m.iH)(!1),a=(0,m.iH)(""),s=(0,t.Fl)((()=>""!=a.value?l[a.value]["allOf"][0]["title"]:"-")),c=(0,t.Fl)((()=>""!=a.value?l[a.value]["allOf"][0]["description"]:"-")),i=(0,t.Fl)((()=>""!=a.value?u(l[a.value]):[])),u=e=>{const o=e=>e.replace(/[&<>'"]/g,(e=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[e])));console.log("creating blitzar schema"),console.log(e);let l=[];return console.log("allOf"in e),"allOf"in e?Object.entries(e["allOf"][0]["properties"]).forEach((e=>{const[t,n]=e;let r={id:t,label:n["title"],component:"QInput",filled:!0};"boolean"==n["type"]&&(r["component"]="QToggle"),"integer"!=n["type"]&&"float"!=n["type"]||(r["component"]="QInput",r["ui_component"]&&(r["component"]=n["ui_component"]),r["type"]="number",r["labelAlways"]=!0,n["exclusiveMinimum"]&&(r["min"]=n["exclusiveMinimum"]),n["exclusiveMaximum"]&&(r["max"]=n["exclusiveMaximum"]),n["minimum"]&&(r["min"]=n["minimum"]),n["maximum"]&&(r["max"]=n["maximum"])),n["allOf"]&&Object.keys(n["allOf"][0]).includes("enum")&&(r["component"]="QSelect",r["options"]=n["allOf"][0]["enum"]),r["subLabel"]=`${n["description"]||""} (default=${o((n["default"]||"undefined").toString())})`,l.push(r)})):console.log("error, wrong format!, no direct props on main level"),console.log(l),l},p=()=>{g.api.get("/config/schema?schema_type=dereferenced").then((async e=>{console.log(e.data),l=e.data.properties,n.value=Object.keys(l),a.value=n.value[0]})).catch((o=>{console.log(o),console.log("error"),e.notify({message:"error getting scheme! check logs",color:"red"})}))},f=(l="current")=>{r.value=!1,g.api.get(`/config/${l}`).then((async t=>{console.log(t.data),console.log(o.value),o.value=t.data,r.value=!0,e.notify({message:`${l} config loaded from server`,color:"green"})})).catch((o=>{console.log(o),console.log("error"),e.notify({message:"error getting config!",color:"red"})}))};p(),f("currentActive");const b=()=>{console.log("sync config to server"),console.log(o.value),g.api.post("/config/current",o.value).then((o=>{e.notify({message:"Persisted config, trying to restart service",color:"green"}),console.log(o)})).catch((o=>{if(o.response.data.detail){let l="check following fields:<br/>";return Object.values(o.response.data.detail).forEach((e=>{l+=e["loc"].join(" -> "),l+=`: ${e["msg"]}`,l+="<br/>"})),void e.notify({caption:"validation error",icon:"error",html:!0,message:`${l}`,color:"red"})}e.notify({message:"error saving config, check browser console and logs",color:"red"})}))};return(0,t.wF)((()=>console.log("Composition API beforemounted"))),(0,t.bv)((()=>console.log("Composition API mounted"))),{schema_blitzar:i,renderBlitzForm:r,main_groups:n,group_title:s,group_description:c,selected_group:a,serverConfig:o,remoteProcedureCall:g.remoteProcedureCall,getConfig:f,uploadConfigAndPersist:b}}};var b=l(1639),v=l(9885),h=l(7817),y=l(7661),_=l(926),w=l(627),k=l(8879),C=l(9984),q=l.n(C);const x=(0,b.Z)(f,[["render",u]]),O=x;q()(f,"components",{QPage:v.Z,QTabs:h.Z,QTab:y.Z,QSeparator:_.Z,QPageSticky:w.Z,QBtn:k.Z})}}]);