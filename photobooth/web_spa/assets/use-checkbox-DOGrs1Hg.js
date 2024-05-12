import{f as ce,b as re,g as de,h as fe,i as ve,j as ge,k as ee,l as me,d as he}from"./QSelect-BUB5N-EI.js";import{r as G,w as D,aC as Q,b2 as ke,d as m,v as ie,N as J,e as xe,a4 as be,t as z,ap as ye,a6 as te,b5 as Me,M as ue,O as oe,aG as we,ag as Se,P as Ce,aF as Ve,b6 as H,ak as ae}from"./index-RlBL7fbI.js";const ne={date:"####/##/##",datetime:"####/##/## ##:##",time:"##:##",fulltime:"##:##:##",phone:"(###) ### - ####",card:"#### #### #### ####"},W={"#":{pattern:"[\\d]",negate:"[^\\d]"},S:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]"},N:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]"},A:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleUpperCase()},a:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleLowerCase()},X:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleUpperCase()},x:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleLowerCase()}},se=Object.keys(W);se.forEach(e=>{W[e].regex=new RegExp(W[e].pattern)});const Fe=new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|(["+se.join("")+"])|(.)","g"),le=/[.*+?^${}()|[\]\\]/g,w="",Re={mask:String,reverseFillMask:Boolean,fillMask:[Boolean,String],unmaskedValue:Boolean};function Ee(e,C,r,b){let c,s,y,T,F,h;const M=G(null),f=G(R());function B(){return e.autogrow===!0||["textarea","text","search","url","tel","password"].includes(e.type)}D(()=>e.type+e.autogrow,I),D(()=>e.mask,l=>{if(l!==void 0)q(f.value,!0);else{const n=A(f.value);I(),e.modelValue!==n&&C("update:modelValue",n)}}),D(()=>e.fillMask+e.reverseFillMask,()=>{M.value===!0&&q(f.value,!0)}),D(()=>e.unmaskedValue,()=>{M.value===!0&&q(f.value)});function R(){if(I(),M.value===!0){const l=N(A(e.modelValue));return e.fillMask!==!1?Z(l):l}return e.modelValue}function V(l){if(l<c.length)return c.slice(-l);let n="",i=c;const t=i.indexOf(w);if(t!==-1){for(let u=l-i.length;u>0;u--)n+=w;i=i.slice(0,t)+n+i.slice(t)}return i}function I(){if(M.value=e.mask!==void 0&&e.mask.length!==0&&B(),M.value===!1){T=void 0,c="",s="";return}const l=ne[e.mask]===void 0?e.mask:ne[e.mask],n=typeof e.fillMask=="string"&&e.fillMask.length!==0?e.fillMask.slice(0,1):"_",i=n.replace(le,"\\$&"),t=[],u=[],o=[];let x=e.reverseFillMask===!0,d="",v="";l.replace(Fe,(S,a,k,j,O)=>{if(j!==void 0){const $=W[j];o.push($),v=$.negate,x===!0&&(u.push("(?:"+v+"+)?("+$.pattern+"+)?(?:"+v+"+)?("+$.pattern+"+)?"),x=!1),u.push("(?:"+v+"+)?("+$.pattern+")?")}else if(k!==void 0)d="\\"+(k==="\\"?"":k),o.push(k),t.push("([^"+d+"]+)?"+d+"?");else{const $=a!==void 0?a:O;d=$==="\\"?"\\\\\\\\":$.replace(le,"\\\\$&"),o.push($),t.push("([^"+d+"]+)?"+d+"?")}});const K=new RegExp("^"+t.join("")+"("+(d===""?".":"[^"+d+"]")+"+)?"+(d===""?"":"["+d+"]*")+"$"),_=u.length-1,g=u.map((S,a)=>a===0&&e.reverseFillMask===!0?new RegExp("^"+i+"*"+S):a===_?new RegExp("^"+S+"("+(v===""?".":v)+"+)?"+(e.reverseFillMask===!0?"$":i+"*")):new RegExp("^"+S));y=o,T=S=>{const a=K.exec(e.reverseFillMask===!0?S:S.slice(0,o.length+1));a!==null&&(S=a.slice(1).join(""));const k=[],j=g.length;for(let O=0,$=S;O<j;O++){const U=g[O].exec($);if(U===null)break;$=$.slice(U.shift().length),k.push(...U)}return k.length!==0?k.join(""):S},c=o.map(S=>typeof S=="string"?S:w).join(""),s=c.split(w).join(n)}function q(l,n,i){const t=b.value,u=t.selectionEnd,o=t.value.length-u,x=A(l);n===!0&&I();const d=N(x),v=e.fillMask!==!1?Z(d):d,K=f.value!==v;t.value!==v&&(t.value=v),K===!0&&(f.value=v),document.activeElement===t&&Q(()=>{if(v===s){const g=e.reverseFillMask===!0?s.length:0;t.setSelectionRange(g,g,"forward");return}if(i==="insertFromPaste"&&e.reverseFillMask!==!0){const g=t.selectionEnd;let S=u-1;for(let a=F;a<=S&&a<g;a++)c[a]!==w&&S++;E.right(t,S);return}if(["deleteContentBackward","deleteContentForward"].indexOf(i)!==-1){const g=e.reverseFillMask===!0?u===0?v.length>d.length?1:0:Math.max(0,v.length-(v===s?0:Math.min(d.length,o)+1))+1:u;t.setSelectionRange(g,g,"forward");return}if(e.reverseFillMask===!0)if(K===!0){const g=Math.max(0,v.length-(v===s?0:Math.min(d.length,o+1)));g===1&&u===1?t.setSelectionRange(g,g,"forward"):E.rightReverse(t,g)}else{const g=v.length-o;t.setSelectionRange(g,g,"backward")}else if(K===!0){const g=Math.max(0,c.indexOf(w),Math.min(d.length,u)-1);E.right(t,g)}else{const g=u-1;E.right(t,g)}});const _=e.unmaskedValue===!0?A(v):v;String(e.modelValue)!==_&&(e.modelValue!==null||_!=="")&&r(_,!0)}function Y(l,n,i){const t=N(A(l.value));n=Math.max(0,c.indexOf(w),Math.min(t.length,n)),F=n,l.setSelectionRange(n,i,"forward")}const E={left(l,n){const i=c.slice(n-1).indexOf(w)===-1;let t=Math.max(0,n-1);for(;t>=0;t--)if(c[t]===w){n=t,i===!0&&n++;break}if(t<0&&c[n]!==void 0&&c[n]!==w)return E.right(l,0);n>=0&&l.setSelectionRange(n,n,"backward")},right(l,n){const i=l.value.length;let t=Math.min(i,n+1);for(;t<=i;t++)if(c[t]===w){n=t;break}else c[t-1]===w&&(n=t);if(t>i&&c[n-1]!==void 0&&c[n-1]!==w)return E.left(l,i);l.setSelectionRange(n,n,"forward")},leftReverse(l,n){const i=V(l.value.length);let t=Math.max(0,n-1);for(;t>=0;t--)if(i[t-1]===w){n=t;break}else if(i[t]===w&&(n=t,t===0))break;if(t<0&&i[n]!==void 0&&i[n]!==w)return E.rightReverse(l,0);n>=0&&l.setSelectionRange(n,n,"backward")},rightReverse(l,n){const i=l.value.length,t=V(i),u=t.slice(0,n+1).indexOf(w)===-1;let o=Math.min(i,n+1);for(;o<=i;o++)if(t[o-1]===w){n=o,n>0&&u===!0&&n--;break}if(o>i&&t[n-1]!==void 0&&t[n-1]!==w)return E.leftReverse(l,i);l.setSelectionRange(n,n,"forward")}};function p(l){C("click",l),h=void 0}function L(l){if(C("keydown",l),ke(l)===!0||l.altKey===!0)return;const n=b.value,i=n.selectionStart,t=n.selectionEnd;if(l.shiftKey||(h=void 0),l.keyCode===37||l.keyCode===39){l.shiftKey&&h===void 0&&(h=n.selectionDirection==="forward"?i:t);const u=E[(l.keyCode===39?"right":"left")+(e.reverseFillMask===!0?"Reverse":"")];if(l.preventDefault(),u(n,h===i?t:i),l.shiftKey){const o=n.selectionStart;n.setSelectionRange(Math.min(h,o),Math.max(h,o),"forward")}}else l.keyCode===8&&e.reverseFillMask!==!0&&i===t?(E.left(n,i),n.setSelectionRange(n.selectionStart,t,"backward")):l.keyCode===46&&e.reverseFillMask===!0&&i===t&&(E.rightReverse(n,t),n.setSelectionRange(i,n.selectionEnd,"forward"))}function N(l){if(l==null||l==="")return"";if(e.reverseFillMask===!0)return P(l);const n=y;let i=0,t="";for(let u=0;u<n.length;u++){const o=l[i],x=n[u];if(typeof x=="string")t+=x,o===x&&i++;else if(o!==void 0&&x.regex.test(o))t+=x.transform!==void 0?x.transform(o):o,i++;else return t}return t}function P(l){const n=y,i=c.indexOf(w);let t=l.length-1,u="";for(let o=n.length-1;o>=0&&t!==-1;o--){const x=n[o];let d=l[t];if(typeof x=="string")u=x+u,d===x&&t--;else if(d!==void 0&&x.regex.test(d))do u=(x.transform!==void 0?x.transform(d):d)+u,t--,d=l[t];while(i===o&&d!==void 0&&x.regex.test(d));else return u}return u}function A(l){return typeof l!="string"||T===void 0?typeof l=="number"?T(""+l):l:T(l)}function Z(l){return s.length-l.length<=0?l:e.reverseFillMask===!0&&l.length!==0?s.slice(0,-l.length)+l:l+s.slice(l.length)}return{innerValue:f,hasMask:M,moveCursorForPaste:Y,updateMaskValue:q,onMaskedKeydown:L,onMaskedClick:p}}function Ae(e,C){function r(){const b=e.modelValue;try{const c="DataTransfer"in window?new DataTransfer:"ClipboardEvent"in window?new ClipboardEvent("").clipboardData:void 0;return Object(b)===b&&("length"in b?Array.from(b):[b]).forEach(s=>{c.items.add(s)}),{files:c.files}}catch{return{files:void 0}}}return m(()=>{if(e.type==="file")return r()})}const Pe=ie({name:"QInput",inheritAttrs:!1,props:{...ce,...Re,...re,modelValue:[String,Number,FileList],shadowText:String,type:{type:String,default:"text"},debounce:[String,Number],autogrow:Boolean,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...de,"paste","change","keydown","click","animationend"],setup(e,{emit:C,attrs:r}){const{proxy:b}=J(),{$q:c}=b,s={};let y=NaN,T,F,h=null,M;const f=G(null),B=fe(e),{innerValue:R,hasMask:V,moveCursorForPaste:I,updateMaskValue:q,onMaskedKeydown:Y,onMaskedClick:E}=Ee(e,C,d,f),p=Ae(e),L=m(()=>ee(R.value)),N=me(o),P=ve({changeEvent:!0}),A=m(()=>e.type==="textarea"||e.autogrow===!0),Z=m(()=>A.value===!0||["text","search","url","tel","password"].includes(e.type)),l=m(()=>{const a={...P.splitAttrs.listeners.value,onInput:o,onPaste:u,onChange:K,onBlur:_,onFocus:te};return a.onCompositionstart=a.onCompositionupdate=a.onCompositionend=N,V.value===!0&&(a.onKeydown=Y,a.onClick=E),e.autogrow===!0&&(a.onAnimationend=x),a}),n=m(()=>{const a={tabindex:0,"data-autofocus":e.autofocus===!0||void 0,rows:e.type==="textarea"?6:void 0,"aria-label":e.label,name:B.value,...P.splitAttrs.attributes.value,id:P.targetUid.value,maxlength:e.maxlength,disabled:e.disable===!0,readonly:e.readonly===!0};return A.value===!1&&(a.type=e.type),e.autogrow===!0&&(a.rows=1),a});D(()=>e.type,()=>{f.value&&(f.value.value=e.modelValue)}),D(()=>e.modelValue,a=>{if(V.value===!0){if(F===!0&&(F=!1,String(a)===y))return;q(a)}else R.value!==a&&(R.value=a,e.type==="number"&&s.hasOwnProperty("value")===!0&&(T===!0?T=!1:delete s.value));e.autogrow===!0&&Q(v)}),D(()=>e.autogrow,a=>{a===!0?Q(v):f.value!==null&&r.rows>0&&(f.value.style.height="auto")}),D(()=>e.dense,()=>{e.autogrow===!0&&Q(v)});function i(){Me(()=>{const a=document.activeElement;f.value!==null&&f.value!==a&&(a===null||a.id!==P.targetUid.value)&&f.value.focus({preventScroll:!0})})}function t(){f.value!==null&&f.value.select()}function u(a){if(V.value===!0&&e.reverseFillMask!==!0){const k=a.target;I(k,k.selectionStart,k.selectionEnd)}C("paste",a)}function o(a){if(!a||!a.target)return;if(e.type==="file"){C("update:modelValue",a.target.files);return}const k=a.target.value;if(a.target.qComposing===!0){s.value=k;return}if(V.value===!0)q(k,!1,a.inputType);else if(d(k),Z.value===!0&&a.target===document.activeElement){const{selectionStart:j,selectionEnd:O}=a.target;j!==void 0&&O!==void 0&&Q(()=>{a.target===document.activeElement&&k.indexOf(a.target.value)===0&&a.target.setSelectionRange(j,O)})}e.autogrow===!0&&v()}function x(a){C("animationend",a),v()}function d(a,k){M=()=>{h=null,e.type!=="number"&&s.hasOwnProperty("value")===!0&&delete s.value,e.modelValue!==a&&y!==a&&(y=a,k===!0&&(F=!0),C("update:modelValue",a),Q(()=>{y===a&&(y=NaN)})),M=void 0},e.type==="number"&&(T=!0,s.value=a),e.debounce!==void 0?(h!==null&&clearTimeout(h),s.value=a,h=setTimeout(M,e.debounce)):M()}function v(){requestAnimationFrame(()=>{const a=f.value;if(a!==null){const k=a.parentNode.style,{scrollTop:j}=a,{overflowY:O,maxHeight:$}=c.platform.is.firefox===!0?{}:window.getComputedStyle(a),U=O!==void 0&&O!=="scroll";U===!0&&(a.style.overflowY="hidden"),k.marginBottom=a.scrollHeight-1+"px",a.style.height="1px",a.style.height=a.scrollHeight+"px",U===!0&&(a.style.overflowY=parseInt($,10)<a.scrollHeight?"auto":"hidden"),k.marginBottom="",a.scrollTop=j}})}function K(a){N(a),h!==null&&(clearTimeout(h),h=null),M!==void 0&&M(),C("change",a.target.value)}function _(a){a!==void 0&&te(a),h!==null&&(clearTimeout(h),h=null),M!==void 0&&M(),T=!1,F=!1,delete s.value,e.type!=="file"&&setTimeout(()=>{f.value!==null&&(f.value.value=R.value!==void 0?R.value:"")})}function g(){return s.hasOwnProperty("value")===!0?s.value:R.value!==void 0?R.value:""}xe(()=>{_()}),be(()=>{e.autogrow===!0&&v()}),Object.assign(P,{innerValue:R,fieldClass:m(()=>`q-${A.value===!0?"textarea":"input"}`+(e.autogrow===!0?" q-textarea--autogrow":"")),hasShadow:m(()=>e.type!=="file"&&typeof e.shadowText=="string"&&e.shadowText.length!==0),inputRef:f,emitValue:d,hasValue:L,floatingLabel:m(()=>L.value===!0&&(e.type!=="number"||isNaN(R.value)===!1)||ee(e.displayValue)),getControl:()=>z(A.value===!0?"textarea":"input",{ref:f,class:["q-field__native q-placeholder",e.inputClass],style:e.inputStyle,...n.value,...l.value,...e.type!=="file"?{value:g()}:p.value}),getShadowControl:()=>z("div",{class:"q-field__native q-field__shadow absolute-bottom no-pointer-events"+(A.value===!0?"":" text-no-wrap")},[z("span",{class:"invisible"},g()),z("span",e.shadowText)])});const S=ge(P);return Object.assign(b,{focus:i,select:t,getNativeElement:()=>f.value}),ye(b,"nativeEl",()=>f.value),S}}),$e={true:"inset",item:"item-inset","item-thumbnail":"item-thumbnail-inset"},X={xs:2,sm:4,md:8,lg:16,xl:24},Be=ie({name:"QSeparator",props:{...ue,spaced:[Boolean,String],inset:[Boolean,String],vertical:Boolean,color:String,size:String},setup(e){const C=J(),r=oe(e,C.proxy.$q),b=m(()=>e.vertical===!0?"vertical":"horizontal"),c=m(()=>` q-separator--${b.value}`),s=m(()=>e.inset!==!1?`${c.value}-${$e[e.inset]}`:""),y=m(()=>`q-separator${c.value}${s.value}`+(e.color!==void 0?` bg-${e.color}`:"")+(r.value===!0?" q-separator--dark":"")),T=m(()=>{const F={};if(e.size!==void 0&&(F[e.vertical===!0?"width":"height"]=e.size),e.spaced!==!1){const h=e.spaced===!0?`${X.md}px`:e.spaced in X?`${X[e.spaced]}px`:e.spaced,M=e.vertical===!0?["Left","Right"]:["Top","Bottom"];F[`margin${M[0]}`]=F[`margin${M[1]}`]=h}return F});return()=>z("hr",{class:y.value,style:T.value,"aria-orientation":b.value})}});function Te(e,C){const r=G(null),b=m(()=>e.disable===!0?null:z("span",{ref:r,class:"no-outline",tabindex:-1}));function c(s){const y=C.value;s!==void 0&&s.type.indexOf("key")===0?y!==null&&document.activeElement!==y&&y.contains(document.activeElement)===!0&&y.focus():r.value!==null&&(s===void 0||y!==null&&y.contains(s.target)===!0)&&r.value.focus()}return{refocusTargetEl:b,refocusTarget:c}}const Ie={xs:30,sm:35,md:40,lg:50,xl:60},je={...ue,...Ve,...re,modelValue:{required:!0,default:null},val:{},trueValue:{default:!0},falseValue:{default:!1},indeterminateValue:{default:null},checkedIcon:String,uncheckedIcon:String,indeterminateIcon:String,toggleOrder:{type:String,validator:e=>e==="tf"||e==="ft"},toggleIndeterminate:Boolean,label:String,leftLabel:Boolean,color:String,keepColor:Boolean,dense:Boolean,disable:Boolean,tabindex:[String,Number]},ze=["update:modelValue"];function Ne(e,C){const{props:r,slots:b,emit:c,proxy:s}=J(),{$q:y}=s,T=oe(r,y),F=G(null),{refocusTargetEl:h,refocusTarget:M}=Te(r,F),f=we(r,Ie),B=m(()=>r.val!==void 0&&Array.isArray(r.modelValue)),R=m(()=>{const t=H(r.val);return B.value===!0?r.modelValue.findIndex(u=>H(u)===t):-1}),V=m(()=>B.value===!0?R.value!==-1:H(r.modelValue)===H(r.trueValue)),I=m(()=>B.value===!0?R.value===-1:H(r.modelValue)===H(r.falseValue)),q=m(()=>V.value===!1&&I.value===!1),Y=m(()=>r.disable===!0?-1:r.tabindex||0),E=m(()=>`q-${e} cursor-pointer no-outline row inline no-wrap items-center`+(r.disable===!0?" disabled":"")+(T.value===!0?` q-${e}--dark`:"")+(r.dense===!0?` q-${e}--dense`:"")+(r.leftLabel===!0?" reverse":"")),p=m(()=>{const t=V.value===!0?"truthy":I.value===!0?"falsy":"indet",u=r.color!==void 0&&(r.keepColor===!0||(e==="toggle"?V.value===!0:I.value!==!0))?` text-${r.color}`:"";return`q-${e}__inner relative-position non-selectable q-${e}__inner--${t}${u}`}),L=m(()=>{const t={type:"checkbox"};return r.name!==void 0&&Object.assign(t,{".checked":V.value,"^checked":V.value===!0?"checked":void 0,name:r.name,value:B.value===!0?r.val:r.trueValue}),t}),N=he(L),P=m(()=>{const t={tabindex:Y.value,role:e==="toggle"?"switch":"checkbox","aria-label":r.label,"aria-checked":q.value===!0?"mixed":V.value===!0?"true":"false"};return r.disable===!0&&(t["aria-disabled"]="true"),t});function A(t){t!==void 0&&(ae(t),M(t)),r.disable!==!0&&c("update:modelValue",Z(),t)}function Z(){if(B.value===!0){if(V.value===!0){const t=r.modelValue.slice();return t.splice(R.value,1),t}return r.modelValue.concat([r.val])}if(V.value===!0){if(r.toggleOrder!=="ft"||r.toggleIndeterminate===!1)return r.falseValue}else if(I.value===!0){if(r.toggleOrder==="ft"||r.toggleIndeterminate===!1)return r.trueValue}else return r.toggleOrder!=="ft"?r.trueValue:r.falseValue;return r.indeterminateValue}function l(t){(t.keyCode===13||t.keyCode===32)&&ae(t)}function n(t){(t.keyCode===13||t.keyCode===32)&&A(t)}const i=C(V,q);return Object.assign(s,{toggle:A}),()=>{const t=i();r.disable!==!0&&N(t,"unshift",` q-${e}__native absolute q-ma-none q-pa-none`);const u=[z("div",{class:p.value,style:f.value,"aria-hidden":"true"},t)];h.value!==null&&u.push(h.value);const o=r.label!==void 0?Se(b.default,[r.label]):Ce(b.default);return o!==void 0&&u.push(z("div",{class:`q-${e}__label q-anchor--skip`},o)),z("div",{ref:F,class:E.value,...P.value,onClick:A,onKeydown:l,onKeyup:n},u)}}export{Be as Q,ze as a,Ne as b,Pe as c,je as u};
