(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();/**
* @vue/shared v3.4.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Cr(t,e){const n=new Set(t.split(","));return e?r=>n.has(r.toLowerCase()):r=>n.has(r)}const X={},Ce=[],pt=()=>{},Lo=()=>!1,En=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),Or=t=>t.startsWith("onUpdate:"),at=Object.assign,Sr=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Ro=Object.prototype.hasOwnProperty,z=(t,e)=>Ro.call(t,e),M=Array.isArray,Oe=t=>On(t)==="[object Map]",Fo=t=>On(t)==="[object Set]",L=t=>typeof t=="function",nt=t=>typeof t=="string",Cn=t=>typeof t=="symbol",Q=t=>t!==null&&typeof t=="object",pi=t=>(Q(t)||L(t))&&L(t.then)&&L(t.catch),zo=Object.prototype.toString,On=t=>zo.call(t),jo=t=>On(t).slice(8,-1),$o=t=>On(t)==="[object Object]",Pr=t=>nt(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,cn=Cr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Sn=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},Ho=/-(\w)/g,ge=Sn(t=>t.replace(Ho,(e,n)=>n?n.toUpperCase():"")),Do=/\B([A-Z])/g,ye=Sn(t=>t.replace(Do,"-$1").toLowerCase()),gi=Sn(t=>t.charAt(0).toUpperCase()+t.slice(1)),Yn=Sn(t=>t?`on${gi(t)}`:""),ne=(t,e)=>!Object.is(t,e),Wn=(t,e)=>{for(let n=0;n<t.length;n++)t[n](e)},vn=(t,e,n)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:n})},Uo=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let ma;const vi=()=>ma||(ma=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Tr(t){if(M(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],a=nt(r)?Bo(r):Tr(r);if(a)for(const i in a)e[i]=a[i]}return e}else if(nt(t)||Q(t))return t}const Vo=/;(?![^(]*\))/g,Yo=/:([^]+)/,Wo=/\/\*[^]*?\*\//g;function Bo(t){const e={};return t.replace(Wo,"").split(Vo).forEach(n=>{if(n){const r=n.split(Yo);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function Ir(t){let e="";if(nt(t))e=t;else if(M(t))for(let n=0;n<t.length;n++){const r=Ir(t[n]);r&&(e+=r+" ")}else if(Q(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Ko="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Go=Cr(Ko);function bi(t){return!!t||t===""}/**
* @vue/reactivity v3.4.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let vt;class Xo{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=vt,!e&&vt&&(this.index=(vt.scopes||(vt.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const n=vt;try{return vt=this,e()}finally{vt=n}}}on(){vt=this}off(){vt=this.parent}stop(e){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!e){const a=this.parent.scopes.pop();a&&a!==this&&(this.parent.scopes[this.index]=a,a.index=this.index)}this.parent=void 0,this._active=!1}}}function qo(t,e=vt){e&&e.active&&e.effects.push(t)}function Jo(){return vt}let te;class Mr{constructor(e,n,r,a){this.fn=e,this.trigger=n,this.scheduler=r,this.active=!0,this.deps=[],this._dirtyLevel=2,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,qo(this,a)}get dirty(){if(this._dirtyLevel===1){ie();for(let e=0;e<this._depsLength;e++){const n=this.deps[e];if(n.computed&&(Qo(n.computed),this._dirtyLevel>=2))break}this._dirtyLevel<2&&(this._dirtyLevel=0),oe()}return this._dirtyLevel>=2}set dirty(e){this._dirtyLevel=e?2:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let e=Dt,n=te;try{return Dt=!0,te=this,this._runnings++,ha(this),this.fn()}finally{pa(this),this._runnings--,te=n,Dt=e}}stop(){var e;this.active&&(ha(this),pa(this),(e=this.onStop)==null||e.call(this),this.active=!1)}}function Qo(t){return t.value}function ha(t){t._trackId++,t._depsLength=0}function pa(t){if(t.deps&&t.deps.length>t._depsLength){for(let e=t._depsLength;e<t.deps.length;e++)yi(t.deps[e],t);t.deps.length=t._depsLength}}function yi(t,e){const n=t.get(e);n!==void 0&&e._trackId!==n&&(t.delete(e),t.size===0&&t.cleanup())}let Dt=!0,nr=0;const xi=[];function ie(){xi.push(Dt),Dt=!1}function oe(){const t=xi.pop();Dt=t===void 0?!0:t}function Nr(){nr++}function Lr(){for(nr--;!nr&&rr.length;)rr.shift()()}function wi(t,e,n){if(e.get(t)!==t._trackId){e.set(t,t._trackId);const r=t.deps[t._depsLength];r!==e?(r&&yi(r,t),t.deps[t._depsLength++]=e):t._depsLength++}}const rr=[];function _i(t,e,n){Nr();for(const r of t.keys())if(t.get(r)===r._trackId){if(r._dirtyLevel<e){const a=r._dirtyLevel;r._dirtyLevel=e,a===0&&(r._shouldSchedule=!0,r.trigger())}r.scheduler&&r._shouldSchedule&&(!r._runnings||r.allowRecurse)&&(r._shouldSchedule=!1,rr.push(r.scheduler))}Lr()}const Ai=(t,e)=>{const n=new Map;return n.cleanup=t,n.computed=e,n},ar=new WeakMap,ee=Symbol(""),ir=Symbol("");function ct(t,e,n){if(Dt&&te){let r=ar.get(t);r||ar.set(t,r=new Map);let a=r.get(n);a||r.set(n,a=Ai(()=>r.delete(n))),wi(te,a)}}function Tt(t,e,n,r,a,i){const o=ar.get(t);if(!o)return;let s=[];if(e==="clear")s=[...o.values()];else if(n==="length"&&M(t)){const l=Number(r);o.forEach((u,d)=>{(d==="length"||!Cn(d)&&d>=l)&&s.push(u)})}else switch(n!==void 0&&s.push(o.get(n)),e){case"add":M(t)?Pr(n)&&s.push(o.get("length")):(s.push(o.get(ee)),Oe(t)&&s.push(o.get(ir)));break;case"delete":M(t)||(s.push(o.get(ee)),Oe(t)&&s.push(o.get(ir)));break;case"set":Oe(t)&&s.push(o.get(ee));break}Nr();for(const l of s)l&&_i(l,2);Lr()}const Zo=Cr("__proto__,__v_isRef,__isVue"),ki=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Cn)),ga=ts();function ts(){const t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...n){const r=D(this);for(let i=0,o=this.length;i<o;i++)ct(r,"get",i+"");const a=r[e](...n);return a===-1||a===!1?r[e](...n.map(D)):a}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...n){ie(),Nr();const r=D(this)[e].apply(this,n);return Lr(),oe(),r}}),t}function es(t){const e=D(this);return ct(e,"has",t),e.hasOwnProperty(t)}class Ei{constructor(e=!1,n=!1){this._isReadonly=e,this._shallow=n}get(e,n,r){const a=this._isReadonly,i=this._shallow;if(n==="__v_isReactive")return!a;if(n==="__v_isReadonly")return a;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(a?i?hs:Pi:i?Si:Oi).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=M(e);if(!a){if(o&&z(ga,n))return Reflect.get(ga,n,r);if(n==="hasOwnProperty")return es}const s=Reflect.get(e,n,r);return(Cn(n)?ki.has(n):Zo(n))||(a||ct(e,"get",n),i)?s:dt(s)?o&&Pr(n)?s:s.value:Q(s)?a?Ti(s):zr(s):s}}class Ci extends Ei{constructor(e=!1){super(!1,e)}set(e,n,r,a){let i=e[n];if(!this._shallow){const l=Ie(i);if(!or(r)&&!Ie(r)&&(i=D(i),r=D(r)),!M(e)&&dt(i)&&!dt(r))return l?!1:(i.value=r,!0)}const o=M(e)&&Pr(n)?Number(n)<e.length:z(e,n),s=Reflect.set(e,n,r,a);return e===D(a)&&(o?ne(r,i)&&Tt(e,"set",n,r):Tt(e,"add",n,r)),s}deleteProperty(e,n){const r=z(e,n);e[n];const a=Reflect.deleteProperty(e,n);return a&&r&&Tt(e,"delete",n,void 0),a}has(e,n){const r=Reflect.has(e,n);return(!Cn(n)||!ki.has(n))&&ct(e,"has",n),r}ownKeys(e){return ct(e,"iterate",M(e)?"length":ee),Reflect.ownKeys(e)}}class ns extends Ei{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const rs=new Ci,as=new ns,is=new Ci(!0),Rr=t=>t,Pn=t=>Reflect.getPrototypeOf(t);function Ge(t,e,n=!1,r=!1){t=t.__v_raw;const a=D(t),i=D(e);n||(ne(e,i)&&ct(a,"get",e),ct(a,"get",i));const{has:o}=Pn(a),s=r?Rr:n?Hr:$r;if(o.call(a,e))return s(t.get(e));if(o.call(a,i))return s(t.get(i));t!==a&&t.get(e)}function Xe(t,e=!1){const n=this.__v_raw,r=D(n),a=D(t);return e||(ne(t,a)&&ct(r,"has",t),ct(r,"has",a)),t===a?n.has(t):n.has(t)||n.has(a)}function qe(t,e=!1){return t=t.__v_raw,!e&&ct(D(t),"iterate",ee),Reflect.get(t,"size",t)}function va(t){t=D(t);const e=D(this);return Pn(e).has.call(e,t)||(e.add(t),Tt(e,"add",t,t)),this}function ba(t,e){e=D(e);const n=D(this),{has:r,get:a}=Pn(n);let i=r.call(n,t);i||(t=D(t),i=r.call(n,t));const o=a.call(n,t);return n.set(t,e),i?ne(e,o)&&Tt(n,"set",t,e):Tt(n,"add",t,e),this}function ya(t){const e=D(this),{has:n,get:r}=Pn(e);let a=n.call(e,t);a||(t=D(t),a=n.call(e,t)),r&&r.call(e,t);const i=e.delete(t);return a&&Tt(e,"delete",t,void 0),i}function xa(){const t=D(this),e=t.size!==0,n=t.clear();return e&&Tt(t,"clear",void 0,void 0),n}function Je(t,e){return function(r,a){const i=this,o=i.__v_raw,s=D(o),l=e?Rr:t?Hr:$r;return!t&&ct(s,"iterate",ee),o.forEach((u,d)=>r.call(a,l(u),l(d),i))}}function Qe(t,e,n){return function(...r){const a=this.__v_raw,i=D(a),o=Oe(i),s=t==="entries"||t===Symbol.iterator&&o,l=t==="keys"&&o,u=a[t](...r),d=n?Rr:e?Hr:$r;return!e&&ct(i,"iterate",l?ir:ee),{next(){const{value:m,done:b}=u.next();return b?{value:m,done:b}:{value:s?[d(m[0]),d(m[1])]:d(m),done:b}},[Symbol.iterator](){return this}}}}function Ft(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function os(){const t={get(i){return Ge(this,i)},get size(){return qe(this)},has:Xe,add:va,set:ba,delete:ya,clear:xa,forEach:Je(!1,!1)},e={get(i){return Ge(this,i,!1,!0)},get size(){return qe(this)},has:Xe,add:va,set:ba,delete:ya,clear:xa,forEach:Je(!1,!0)},n={get(i){return Ge(this,i,!0)},get size(){return qe(this,!0)},has(i){return Xe.call(this,i,!0)},add:Ft("add"),set:Ft("set"),delete:Ft("delete"),clear:Ft("clear"),forEach:Je(!0,!1)},r={get(i){return Ge(this,i,!0,!0)},get size(){return qe(this,!0)},has(i){return Xe.call(this,i,!0)},add:Ft("add"),set:Ft("set"),delete:Ft("delete"),clear:Ft("clear"),forEach:Je(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(i=>{t[i]=Qe(i,!1,!1),n[i]=Qe(i,!0,!1),e[i]=Qe(i,!1,!0),r[i]=Qe(i,!0,!0)}),[t,n,e,r]}const[ss,ls,fs,cs]=os();function Fr(t,e){const n=e?t?cs:fs:t?ls:ss;return(r,a,i)=>a==="__v_isReactive"?!t:a==="__v_isReadonly"?t:a==="__v_raw"?r:Reflect.get(z(n,a)&&a in r?n:r,a,i)}const us={get:Fr(!1,!1)},ds={get:Fr(!1,!0)},ms={get:Fr(!0,!1)},Oi=new WeakMap,Si=new WeakMap,Pi=new WeakMap,hs=new WeakMap;function ps(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function gs(t){return t.__v_skip||!Object.isExtensible(t)?0:ps(jo(t))}function zr(t){return Ie(t)?t:jr(t,!1,rs,us,Oi)}function vs(t){return jr(t,!1,is,ds,Si)}function Ti(t){return jr(t,!0,as,ms,Pi)}function jr(t,e,n,r,a){if(!Q(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=a.get(t);if(i)return i;const o=gs(t);if(o===0)return t;const s=new Proxy(t,o===2?r:n);return a.set(t,s),s}function me(t){return Ie(t)?me(t.__v_raw):!!(t&&t.__v_isReactive)}function Ie(t){return!!(t&&t.__v_isReadonly)}function or(t){return!!(t&&t.__v_isShallow)}function Ii(t){return me(t)||Ie(t)}function D(t){const e=t&&t.__v_raw;return e?D(e):t}function Mi(t){return vn(t,"__v_skip",!0),t}const $r=t=>Q(t)?zr(t):t,Hr=t=>Q(t)?Ti(t):t;class Ni{constructor(e,n,r,a){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new Mr(()=>e(this._value),()=>wa(this,1)),this.effect.computed=this,this.effect.active=this._cacheable=!a,this.__v_isReadonly=r}get value(){const e=D(this);return(!e._cacheable||e.effect.dirty)&&ne(e._value,e._value=e.effect.run())&&wa(e,2),ys(e),e._value}set value(e){this._setter(e)}get _dirty(){return this.effect.dirty}set _dirty(e){this.effect.dirty=e}}function bs(t,e,n=!1){let r,a;const i=L(t);return i?(r=t,a=pt):(r=t.get,a=t.set),new Ni(r,a,i||!a,n)}function ys(t){Dt&&te&&(t=D(t),wi(te,t.dep||(t.dep=Ai(()=>t.dep=void 0,t instanceof Ni?t:void 0))))}function wa(t,e=2,n){t=D(t);const r=t.dep;r&&_i(r,e)}function dt(t){return!!(t&&t.__v_isRef===!0)}function xs(t){return dt(t)?t.value:t}const ws={get:(t,e,n)=>xs(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const a=t[e];return dt(a)&&!dt(n)?(a.value=n,!0):Reflect.set(t,e,n,r)}};function Li(t){return me(t)?t:new Proxy(t,ws)}/**
* @vue/runtime-core v3.4.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ut(t,e,n,r){let a;try{a=r?t(...r):t()}catch(i){Tn(i,e,n)}return a}function yt(t,e,n,r){if(L(t)){const i=Ut(t,e,n,r);return i&&pi(i)&&i.catch(o=>{Tn(o,e,n)}),i}const a=[];for(let i=0;i<t.length;i++)a.push(yt(t[i],e,n,r));return a}function Tn(t,e,n,r=!0){const a=e?e.vnode:null;if(e){let i=e.parent;const o=e.proxy,s=`https://vuejs.org/errors/#runtime-${n}`;for(;i;){const u=i.ec;if(u){for(let d=0;d<u.length;d++)if(u[d](t,o,s)===!1)return}i=i.parent}const l=e.appContext.config.errorHandler;if(l){Ut(l,null,10,[t,o,s]);return}}_s(t,n,a,r)}function _s(t,e,n,r=!0){console.error(t)}let Me=!1,sr=!1;const rt=[];let kt=0;const he=[];let jt=null,Jt=0;const Ri=Promise.resolve();let Dr=null;function As(t){const e=Dr||Ri;return t?e.then(this?t.bind(this):t):e}function ks(t){let e=kt+1,n=rt.length;for(;e<n;){const r=e+n>>>1,a=rt[r],i=Ne(a);i<t||i===t&&a.pre?e=r+1:n=r}return e}function Ur(t){(!rt.length||!rt.includes(t,Me&&t.allowRecurse?kt+1:kt))&&(t.id==null?rt.push(t):rt.splice(ks(t.id),0,t),Fi())}function Fi(){!Me&&!sr&&(sr=!0,Dr=Ri.then(ji))}function Es(t){const e=rt.indexOf(t);e>kt&&rt.splice(e,1)}function Cs(t){M(t)?he.push(...t):(!jt||!jt.includes(t,t.allowRecurse?Jt+1:Jt))&&he.push(t),Fi()}function _a(t,e,n=Me?kt+1:0){for(;n<rt.length;n++){const r=rt[n];if(r&&r.pre){if(t&&r.id!==t.uid)continue;rt.splice(n,1),n--,r()}}}function zi(t){if(he.length){const e=[...new Set(he)].sort((n,r)=>Ne(n)-Ne(r));if(he.length=0,jt){jt.push(...e);return}for(jt=e,Jt=0;Jt<jt.length;Jt++)jt[Jt]();jt=null,Jt=0}}const Ne=t=>t.id==null?1/0:t.id,Os=(t,e)=>{const n=Ne(t)-Ne(e);if(n===0){if(t.pre&&!e.pre)return-1;if(e.pre&&!t.pre)return 1}return n};function ji(t){sr=!1,Me=!0,rt.sort(Os);try{for(kt=0;kt<rt.length;kt++){const e=rt[kt];e&&e.active!==!1&&Ut(e,null,14)}}finally{kt=0,rt.length=0,zi(),Me=!1,Dr=null,(rt.length||he.length)&&ji()}}function Ss(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||X;let a=n;const i=e.startsWith("update:"),o=i&&e.slice(7);if(o&&o in r){const d=`${o==="modelValue"?"model":o}Modifiers`,{number:m,trim:b}=r[d]||X;b&&(a=n.map(A=>nt(A)?A.trim():A)),m&&(a=n.map(Uo))}let s,l=r[s=Yn(e)]||r[s=Yn(ge(e))];!l&&i&&(l=r[s=Yn(ye(e))]),l&&yt(l,t,6,a);const u=r[s+"Once"];if(u){if(!t.emitted)t.emitted={};else if(t.emitted[s])return;t.emitted[s]=!0,yt(u,t,6,a)}}function $i(t,e,n=!1){const r=e.emitsCache,a=r.get(t);if(a!==void 0)return a;const i=t.emits;let o={},s=!1;if(!L(t)){const l=u=>{const d=$i(u,e,!0);d&&(s=!0,at(o,d))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!i&&!s?(Q(t)&&r.set(t,null),null):(M(i)?i.forEach(l=>o[l]=null):at(o,i),Q(t)&&r.set(t,o),o)}function In(t,e){return!t||!En(e)?!1:(e=e.slice(2).replace(/Once$/,""),z(t,e[0].toLowerCase()+e.slice(1))||z(t,ye(e))||z(t,e))}let Et=null,Hi=null;function bn(t){const e=Et;return Et=t,Hi=t&&t.type.__scopeId||null,e}function Ps(t,e=Et,n){if(!e||t._n)return t;const r=(...a)=>{r._d&&Ma(-1);const i=bn(e);let o;try{o=t(...a)}finally{bn(i),r._d&&Ma(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function Bn(t){const{type:e,vnode:n,proxy:r,withProxy:a,props:i,propsOptions:[o],slots:s,attrs:l,emit:u,render:d,renderCache:m,data:b,setupState:A,ctx:R,inheritAttrs:T}=t;let j,$;const V=bn(t);try{if(n.shapeFlag&4){const H=a||r,Y=H;j=At(d.call(Y,H,m,i,A,b,R)),$=l}else{const H=e;j=At(H.length>1?H(i,{attrs:l,slots:s,emit:u}):H(i,null)),$=e.props?l:Ts(l)}}catch(H){Tn(H,t,1),j=Vt(Le)}let I=j;if($&&T!==!1){const H=Object.keys($),{shapeFlag:Y}=I;H.length&&Y&7&&(o&&H.some(Or)&&($=Is($,o)),I=ve(I,$))}return n.dirs&&(I=ve(I),I.dirs=I.dirs?I.dirs.concat(n.dirs):n.dirs),n.transition&&(I.transition=n.transition),j=I,bn(V),j}const Ts=t=>{let e;for(const n in t)(n==="class"||n==="style"||En(n))&&((e||(e={}))[n]=t[n]);return e},Is=(t,e)=>{const n={};for(const r in t)(!Or(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function Ms(t,e,n){const{props:r,children:a,component:i}=t,{props:o,children:s,patchFlag:l}=e,u=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return r?Aa(r,o,u):!!o;if(l&8){const d=e.dynamicProps;for(let m=0;m<d.length;m++){const b=d[m];if(o[b]!==r[b]&&!In(u,b))return!0}}}else return(a||s)&&(!s||!s.$stable)?!0:r===o?!1:r?o?Aa(r,o,u):!0:!!o;return!1}function Aa(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let a=0;a<r.length;a++){const i=r[a];if(e[i]!==t[i]&&!In(n,i))return!0}return!1}function Ns({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const Ls=Symbol.for("v-ndc"),Rs=t=>t.__isSuspense;function Fs(t,e){e&&e.pendingBranch?M(t)?e.effects.push(...t):e.effects.push(t):Cs(t)}const zs=Symbol.for("v-scx"),js=()=>dn(zs),Ze={};function Kn(t,e,n){return Di(t,e,n)}function Di(t,e,{immediate:n,deep:r,flush:a,once:i,onTrack:o,onTrigger:s}=X){if(e&&i){const N=e;e=(...et)=>{N(...et),Y()}}const l=st,u=N=>r===!0?N:fe(N,r===!1?1:void 0);let d,m=!1,b=!1;if(dt(t)?(d=()=>t.value,m=or(t)):me(t)?(d=()=>u(t),m=!0):M(t)?(b=!0,m=t.some(N=>me(N)||or(N)),d=()=>t.map(N=>{if(dt(N))return N.value;if(me(N))return u(N);if(L(N))return Ut(N,l,2)})):L(t)?e?d=()=>Ut(t,l,2):d=()=>(A&&A(),yt(t,l,3,[R])):d=pt,e&&r){const N=d;d=()=>fe(N())}let A,R=N=>{A=I.onStop=()=>{Ut(N,l,4),A=I.onStop=void 0}},T;if(Rn)if(R=pt,e?n&&yt(e,l,3,[d(),b?[]:void 0,R]):d(),a==="sync"){const N=js();T=N.__watcherHandles||(N.__watcherHandles=[])}else return pt;let j=b?new Array(t.length).fill(Ze):Ze;const $=()=>{if(!(!I.active||!I.dirty))if(e){const N=I.run();(r||m||(b?N.some((et,lt)=>ne(et,j[lt])):ne(N,j)))&&(A&&A(),yt(e,l,3,[N,j===Ze?void 0:b&&j[0]===Ze?[]:j,R]),j=N)}else I.run()};$.allowRecurse=!!e;let V;a==="sync"?V=$:a==="post"?V=()=>ft($,l&&l.suspense):($.pre=!0,l&&($.id=l.uid),V=()=>Ur($));const I=new Mr(d,pt,V),H=Jo(),Y=()=>{I.stop(),H&&Sr(H.effects,I)};return e?n?$():j=I.run():a==="post"?ft(I.run.bind(I),l&&l.suspense):I.run(),T&&T.push(Y),Y}function $s(t,e,n){const r=this.proxy,a=nt(t)?t.includes(".")?Ui(r,t):()=>r[t]:t.bind(r,r);let i;L(e)?i=e:(i=e.handler,n=e);const o=He(this),s=Di(a,i.bind(r),n);return o(),s}function Ui(t,e){const n=e.split(".");return()=>{let r=t;for(let a=0;a<n.length&&r;a++)r=r[n[a]];return r}}function fe(t,e,n=0,r){if(!Q(t)||t.__v_skip)return t;if(e&&e>0){if(n>=e)return t;n++}if(r=r||new Set,r.has(t))return t;if(r.add(t),dt(t))fe(t.value,e,n,r);else if(M(t))for(let a=0;a<t.length;a++)fe(t[a],e,n,r);else if(Fo(t)||Oe(t))t.forEach(a=>{fe(a,e,n,r)});else if($o(t))for(const a in t)fe(t[a],e,n,r);return t}function Xt(t,e,n,r){const a=t.dirs,i=e&&e.dirs;for(let o=0;o<a.length;o++){const s=a[o];i&&(s.oldValue=i[o].value);let l=s.dir[r];l&&(ie(),yt(l,n,8,[t.el,s,t,e]),oe())}}const un=t=>!!t.type.__asyncLoader,Vi=t=>t.type.__isKeepAlive;function Hs(t,e){Yi(t,"a",e)}function Ds(t,e){Yi(t,"da",e)}function Yi(t,e,n=st){const r=t.__wdc||(t.__wdc=()=>{let a=n;for(;a;){if(a.isDeactivated)return;a=a.parent}return t()});if(Mn(e,r,n),n){let a=n.parent;for(;a&&a.parent;)Vi(a.parent.vnode)&&Us(r,e,n,a),a=a.parent}}function Us(t,e,n,r){const a=Mn(e,t,r,!0);Wi(()=>{Sr(r[e],a)},n)}function Mn(t,e,n=st,r=!1){if(n){const a=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{if(n.isUnmounted)return;ie();const s=He(n),l=yt(e,n,t,o);return s(),oe(),l});return r?a.unshift(i):a.push(i),i}}const Lt=t=>(e,n=st)=>(!Rn||t==="sp")&&Mn(t,(...r)=>e(...r),n),Vs=Lt("bm"),Ys=Lt("m"),Ws=Lt("bu"),Bs=Lt("u"),Ks=Lt("bum"),Wi=Lt("um"),Gs=Lt("sp"),Xs=Lt("rtg"),qs=Lt("rtc");function Js(t,e=st){Mn("ec",t,e)}const lr=t=>t?no(t)?Kr(t)||t.proxy:lr(t.parent):null,Se=at(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>lr(t.parent),$root:t=>lr(t.root),$emit:t=>t.emit,$options:t=>Vr(t),$forceUpdate:t=>t.f||(t.f=()=>{t.effect.dirty=!0,Ur(t.update)}),$nextTick:t=>t.n||(t.n=As.bind(t.proxy)),$watch:t=>$s.bind(t)}),Gn=(t,e)=>t!==X&&!t.__isScriptSetup&&z(t,e),Qs={get({_:t},e){const{ctx:n,setupState:r,data:a,props:i,accessCache:o,type:s,appContext:l}=t;let u;if(e[0]!=="$"){const A=o[e];if(A!==void 0)switch(A){case 1:return r[e];case 2:return a[e];case 4:return n[e];case 3:return i[e]}else{if(Gn(r,e))return o[e]=1,r[e];if(a!==X&&z(a,e))return o[e]=2,a[e];if((u=t.propsOptions[0])&&z(u,e))return o[e]=3,i[e];if(n!==X&&z(n,e))return o[e]=4,n[e];fr&&(o[e]=0)}}const d=Se[e];let m,b;if(d)return e==="$attrs"&&ct(t,"get",e),d(t);if((m=s.__cssModules)&&(m=m[e]))return m;if(n!==X&&z(n,e))return o[e]=4,n[e];if(b=l.config.globalProperties,z(b,e))return b[e]},set({_:t},e,n){const{data:r,setupState:a,ctx:i}=t;return Gn(a,e)?(a[e]=n,!0):r!==X&&z(r,e)?(r[e]=n,!0):z(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:a,propsOptions:i}},o){let s;return!!n[o]||t!==X&&z(t,o)||Gn(e,o)||(s=i[0])&&z(s,o)||z(r,o)||z(Se,o)||z(a.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:z(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function ka(t){return M(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let fr=!0;function Zs(t){const e=Vr(t),n=t.proxy,r=t.ctx;fr=!1,e.beforeCreate&&Ea(e.beforeCreate,t,"bc");const{data:a,computed:i,methods:o,watch:s,provide:l,inject:u,created:d,beforeMount:m,mounted:b,beforeUpdate:A,updated:R,activated:T,deactivated:j,beforeDestroy:$,beforeUnmount:V,destroyed:I,unmounted:H,render:Y,renderTracked:N,renderTriggered:et,errorCaptured:lt,serverPrefetch:ht,expose:Ot,inheritAttrs:we,components:Ye,directives:We,filters:Hn}=e;if(u&&tl(u,r,null),o)for(const q in o){const W=o[q];L(W)&&(r[q]=W.bind(n))}if(a){const q=a.call(n,n);Q(q)&&(t.data=zr(q))}if(fr=!0,i)for(const q in i){const W=i[q],Kt=L(W)?W.bind(n,n):L(W.get)?W.get.bind(n,n):pt,Be=!L(W)&&L(W.set)?W.set.bind(n):pt,Gt=Ml({get:Kt,set:Be});Object.defineProperty(r,q,{enumerable:!0,configurable:!0,get:()=>Gt.value,set:xt=>Gt.value=xt})}if(s)for(const q in s)Bi(s[q],r,n,q);if(l){const q=L(l)?l.call(n):l;Reflect.ownKeys(q).forEach(W=>{ol(W,q[W])})}d&&Ea(d,t,"c");function it(q,W){M(W)?W.forEach(Kt=>q(Kt.bind(n))):W&&q(W.bind(n))}if(it(Vs,m),it(Ys,b),it(Ws,A),it(Bs,R),it(Hs,T),it(Ds,j),it(Js,lt),it(qs,N),it(Xs,et),it(Ks,V),it(Wi,H),it(Gs,ht),M(Ot))if(Ot.length){const q=t.exposed||(t.exposed={});Ot.forEach(W=>{Object.defineProperty(q,W,{get:()=>n[W],set:Kt=>n[W]=Kt})})}else t.exposed||(t.exposed={});Y&&t.render===pt&&(t.render=Y),we!=null&&(t.inheritAttrs=we),Ye&&(t.components=Ye),We&&(t.directives=We)}function tl(t,e,n=pt){M(t)&&(t=cr(t));for(const r in t){const a=t[r];let i;Q(a)?"default"in a?i=dn(a.from||r,a.default,!0):i=dn(a.from||r):i=dn(a),dt(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function Ea(t,e,n){yt(M(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function Bi(t,e,n,r){const a=r.includes(".")?Ui(n,r):()=>n[r];if(nt(t)){const i=e[t];L(i)&&Kn(a,i)}else if(L(t))Kn(a,t.bind(n));else if(Q(t))if(M(t))t.forEach(i=>Bi(i,e,n,r));else{const i=L(t.handler)?t.handler.bind(n):e[t.handler];L(i)&&Kn(a,i,t)}}function Vr(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:a,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,s=i.get(e);let l;return s?l=s:!a.length&&!n&&!r?l=e:(l={},a.length&&a.forEach(u=>yn(l,u,o,!0)),yn(l,e,o)),Q(e)&&i.set(e,l),l}function yn(t,e,n,r=!1){const{mixins:a,extends:i}=e;i&&yn(t,i,n,!0),a&&a.forEach(o=>yn(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const s=el[o]||n&&n[o];t[o]=s?s(t[o],e[o]):e[o]}return t}const el={data:Ca,props:Oa,emits:Oa,methods:ke,computed:ke,beforeCreate:ot,created:ot,beforeMount:ot,mounted:ot,beforeUpdate:ot,updated:ot,beforeDestroy:ot,beforeUnmount:ot,destroyed:ot,unmounted:ot,activated:ot,deactivated:ot,errorCaptured:ot,serverPrefetch:ot,components:ke,directives:ke,watch:rl,provide:Ca,inject:nl};function Ca(t,e){return e?t?function(){return at(L(t)?t.call(this,this):t,L(e)?e.call(this,this):e)}:e:t}function nl(t,e){return ke(cr(t),cr(e))}function cr(t){if(M(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function ot(t,e){return t?[...new Set([].concat(t,e))]:e}function ke(t,e){return t?at(Object.create(null),t,e):e}function Oa(t,e){return t?M(t)&&M(e)?[...new Set([...t,...e])]:at(Object.create(null),ka(t),ka(e??{})):e}function rl(t,e){if(!t)return e;if(!e)return t;const n=at(Object.create(null),t);for(const r in e)n[r]=ot(t[r],e[r]);return n}function Ki(){return{app:null,config:{isNativeTag:Lo,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let al=0;function il(t,e){return function(r,a=null){L(r)||(r=at({},r)),a!=null&&!Q(a)&&(a=null);const i=Ki(),o=new WeakSet;let s=!1;const l=i.app={_uid:al++,_component:r,_props:a,_container:null,_context:i,_instance:null,version:Nl,get config(){return i.config},set config(u){},use(u,...d){return o.has(u)||(u&&L(u.install)?(o.add(u),u.install(l,...d)):L(u)&&(o.add(u),u(l,...d))),l},mixin(u){return i.mixins.includes(u)||i.mixins.push(u),l},component(u,d){return d?(i.components[u]=d,l):i.components[u]},directive(u,d){return d?(i.directives[u]=d,l):i.directives[u]},mount(u,d,m){if(!s){const b=Vt(r,a);return b.appContext=i,m===!0?m="svg":m===!1&&(m=void 0),d&&e?e(b,u):t(b,u,m),s=!0,l._container=u,u.__vue_app__=l,Kr(b.component)||b.component.proxy}},unmount(){s&&(t(null,l._container),delete l._container.__vue_app__)},provide(u,d){return i.provides[u]=d,l},runWithContext(u){xn=l;try{return u()}finally{xn=null}}};return l}}let xn=null;function ol(t,e){if(st){let n=st.provides;const r=st.parent&&st.parent.provides;r===n&&(n=st.provides=Object.create(r)),n[t]=e}}function dn(t,e,n=!1){const r=st||Et;if(r||xn){const a=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:xn._context.provides;if(a&&t in a)return a[t];if(arguments.length>1)return n&&L(e)?e.call(r&&r.proxy):e}}function sl(t,e,n,r=!1){const a={},i={};vn(i,Ln,1),t.propsDefaults=Object.create(null),Gi(t,e,a,i);for(const o in t.propsOptions[0])o in a||(a[o]=void 0);n?t.props=r?a:vs(a):t.type.props?t.props=a:t.props=i,t.attrs=i}function ll(t,e,n,r){const{props:a,attrs:i,vnode:{patchFlag:o}}=t,s=D(a),[l]=t.propsOptions;let u=!1;if((r||o>0)&&!(o&16)){if(o&8){const d=t.vnode.dynamicProps;for(let m=0;m<d.length;m++){let b=d[m];if(In(t.emitsOptions,b))continue;const A=e[b];if(l)if(z(i,b))A!==i[b]&&(i[b]=A,u=!0);else{const R=ge(b);a[R]=ur(l,s,R,A,t,!1)}else A!==i[b]&&(i[b]=A,u=!0)}}}else{Gi(t,e,a,i)&&(u=!0);let d;for(const m in s)(!e||!z(e,m)&&((d=ye(m))===m||!z(e,d)))&&(l?n&&(n[m]!==void 0||n[d]!==void 0)&&(a[m]=ur(l,s,m,void 0,t,!0)):delete a[m]);if(i!==s)for(const m in i)(!e||!z(e,m))&&(delete i[m],u=!0)}u&&Tt(t,"set","$attrs")}function Gi(t,e,n,r){const[a,i]=t.propsOptions;let o=!1,s;if(e)for(let l in e){if(cn(l))continue;const u=e[l];let d;a&&z(a,d=ge(l))?!i||!i.includes(d)?n[d]=u:(s||(s={}))[d]=u:In(t.emitsOptions,l)||(!(l in r)||u!==r[l])&&(r[l]=u,o=!0)}if(i){const l=D(n),u=s||X;for(let d=0;d<i.length;d++){const m=i[d];n[m]=ur(a,l,m,u[m],t,!z(u,m))}}return o}function ur(t,e,n,r,a,i){const o=t[n];if(o!=null){const s=z(o,"default");if(s&&r===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&L(l)){const{propsDefaults:u}=a;if(n in u)r=u[n];else{const d=He(a);r=u[n]=l.call(null,e),d()}}else r=l}o[0]&&(i&&!s?r=!1:o[1]&&(r===""||r===ye(n))&&(r=!0))}return r}function Xi(t,e,n=!1){const r=e.propsCache,a=r.get(t);if(a)return a;const i=t.props,o={},s=[];let l=!1;if(!L(t)){const d=m=>{l=!0;const[b,A]=Xi(m,e,!0);at(o,b),A&&s.push(...A)};!n&&e.mixins.length&&e.mixins.forEach(d),t.extends&&d(t.extends),t.mixins&&t.mixins.forEach(d)}if(!i&&!l)return Q(t)&&r.set(t,Ce),Ce;if(M(i))for(let d=0;d<i.length;d++){const m=ge(i[d]);Sa(m)&&(o[m]=X)}else if(i)for(const d in i){const m=ge(d);if(Sa(m)){const b=i[d],A=o[m]=M(b)||L(b)?{type:b}:at({},b);if(A){const R=Ia(Boolean,A.type),T=Ia(String,A.type);A[0]=R>-1,A[1]=T<0||R<T,(R>-1||z(A,"default"))&&s.push(m)}}}const u=[o,s];return Q(t)&&r.set(t,u),u}function Sa(t){return t[0]!=="$"}function Pa(t){const e=t&&t.toString().match(/^\s*(function|class) (\w+)/);return e?e[2]:t===null?"null":""}function Ta(t,e){return Pa(t)===Pa(e)}function Ia(t,e){return M(e)?e.findIndex(n=>Ta(n,t)):L(e)&&Ta(e,t)?0:-1}const qi=t=>t[0]==="_"||t==="$stable",Yr=t=>M(t)?t.map(At):[At(t)],fl=(t,e,n)=>{if(e._n)return e;const r=Ps((...a)=>Yr(e(...a)),n);return r._c=!1,r},Ji=(t,e,n)=>{const r=t._ctx;for(const a in t){if(qi(a))continue;const i=t[a];if(L(i))e[a]=fl(a,i,r);else if(i!=null){const o=Yr(i);e[a]=()=>o}}},Qi=(t,e)=>{const n=Yr(e);t.slots.default=()=>n},cl=(t,e)=>{if(t.vnode.shapeFlag&32){const n=e._;n?(t.slots=D(e),vn(e,"_",n)):Ji(e,t.slots={})}else t.slots={},e&&Qi(t,e);vn(t.slots,Ln,1)},ul=(t,e,n)=>{const{vnode:r,slots:a}=t;let i=!0,o=X;if(r.shapeFlag&32){const s=e._;s?n&&s===1?i=!1:(at(a,e),!n&&s===1&&delete a._):(i=!e.$stable,Ji(e,a)),o=e}else e&&(Qi(t,e),o={default:1});if(i)for(const s in a)!qi(s)&&o[s]==null&&delete a[s]};function dr(t,e,n,r,a=!1){if(M(t)){t.forEach((b,A)=>dr(b,e&&(M(e)?e[A]:e),n,r,a));return}if(un(r)&&!a)return;const i=r.shapeFlag&4?Kr(r.component)||r.component.proxy:r.el,o=a?null:i,{i:s,r:l}=t,u=e&&e.r,d=s.refs===X?s.refs={}:s.refs,m=s.setupState;if(u!=null&&u!==l&&(nt(u)?(d[u]=null,z(m,u)&&(m[u]=null)):dt(u)&&(u.value=null)),L(l))Ut(l,s,12,[o,d]);else{const b=nt(l),A=dt(l);if(b||A){const R=()=>{if(t.f){const T=b?z(m,l)?m[l]:d[l]:l.value;a?M(T)&&Sr(T,i):M(T)?T.includes(i)||T.push(i):b?(d[l]=[i],z(m,l)&&(m[l]=d[l])):(l.value=[i],t.k&&(d[t.k]=l.value))}else b?(d[l]=o,z(m,l)&&(m[l]=o)):A&&(l.value=o,t.k&&(d[t.k]=o))};o?(R.id=-1,ft(R,n)):R()}}}const ft=Fs;function dl(t){return ml(t)}function ml(t,e){const n=vi();n.__VUE__=!0;const{insert:r,remove:a,patchProp:i,createElement:o,createText:s,createComment:l,setText:u,setElementText:d,parentNode:m,nextSibling:b,setScopeId:A=pt,insertStaticContent:R}=t,T=(f,c,h,p=null,g=null,x=null,_=void 0,y=null,w=!!c.dynamicChildren)=>{if(f===c)return;f&&!Ae(f,c)&&(p=Ke(f),xt(f,g,x,!0),f=null),c.patchFlag===-2&&(w=!1,c.dynamicChildren=null);const{type:v,ref:E,shapeFlag:S}=c;switch(v){case Nn:j(f,c,h,p);break;case Le:$(f,c,h,p);break;case mn:f==null&&V(c,h,p,_);break;case Pt:Ye(f,c,h,p,g,x,_,y,w);break;default:S&1?Y(f,c,h,p,g,x,_,y,w):S&6?We(f,c,h,p,g,x,_,y,w):(S&64||S&128)&&v.process(f,c,h,p,g,x,_,y,w,se)}E!=null&&g&&dr(E,f&&f.ref,x,c||f,!c)},j=(f,c,h,p)=>{if(f==null)r(c.el=s(c.children),h,p);else{const g=c.el=f.el;c.children!==f.children&&u(g,c.children)}},$=(f,c,h,p)=>{f==null?r(c.el=l(c.children||""),h,p):c.el=f.el},V=(f,c,h,p)=>{[f.el,f.anchor]=R(f.children,c,h,p,f.el,f.anchor)},I=({el:f,anchor:c},h,p)=>{let g;for(;f&&f!==c;)g=b(f),r(f,h,p),f=g;r(c,h,p)},H=({el:f,anchor:c})=>{let h;for(;f&&f!==c;)h=b(f),a(f),f=h;a(c)},Y=(f,c,h,p,g,x,_,y,w)=>{c.type==="svg"?_="svg":c.type==="math"&&(_="mathml"),f==null?N(c,h,p,g,x,_,y,w):ht(f,c,g,x,_,y,w)},N=(f,c,h,p,g,x,_,y)=>{let w,v;const{props:E,shapeFlag:S,transition:O,dirs:P}=f;if(w=f.el=o(f.type,x,E&&E.is,E),S&8?d(w,f.children):S&16&&lt(f.children,w,null,p,g,Xn(f,x),_,y),P&&Xt(f,null,p,"created"),et(w,f,f.scopeId,_,p),E){for(const U in E)U!=="value"&&!cn(U)&&i(w,U,null,E[U],x,f.children,p,g,St);"value"in E&&i(w,"value",null,E.value,x),(v=E.onVnodeBeforeMount)&&_t(v,p,f)}P&&Xt(f,null,p,"beforeMount");const F=hl(g,O);F&&O.beforeEnter(w),r(w,c,h),((v=E&&E.onVnodeMounted)||F||P)&&ft(()=>{v&&_t(v,p,f),F&&O.enter(w),P&&Xt(f,null,p,"mounted")},g)},et=(f,c,h,p,g)=>{if(h&&A(f,h),p)for(let x=0;x<p.length;x++)A(f,p[x]);if(g){let x=g.subTree;if(c===x){const _=g.vnode;et(f,_,_.scopeId,_.slotScopeIds,g.parent)}}},lt=(f,c,h,p,g,x,_,y,w=0)=>{for(let v=w;v<f.length;v++){const E=f[v]=y?$t(f[v]):At(f[v]);T(null,E,c,h,p,g,x,_,y)}},ht=(f,c,h,p,g,x,_)=>{const y=c.el=f.el;let{patchFlag:w,dynamicChildren:v,dirs:E}=c;w|=f.patchFlag&16;const S=f.props||X,O=c.props||X;let P;if(h&&qt(h,!1),(P=O.onVnodeBeforeUpdate)&&_t(P,h,c,f),E&&Xt(c,f,h,"beforeUpdate"),h&&qt(h,!0),v?Ot(f.dynamicChildren,v,y,h,p,Xn(c,g),x):_||W(f,c,y,null,h,p,Xn(c,g),x,!1),w>0){if(w&16)we(y,c,S,O,h,p,g);else if(w&2&&S.class!==O.class&&i(y,"class",null,O.class,g),w&4&&i(y,"style",S.style,O.style,g),w&8){const F=c.dynamicProps;for(let U=0;U<F.length;U++){const G=F[U],tt=S[G],gt=O[G];(gt!==tt||G==="value")&&i(y,G,tt,gt,g,f.children,h,p,St)}}w&1&&f.children!==c.children&&d(y,c.children)}else!_&&v==null&&we(y,c,S,O,h,p,g);((P=O.onVnodeUpdated)||E)&&ft(()=>{P&&_t(P,h,c,f),E&&Xt(c,f,h,"updated")},p)},Ot=(f,c,h,p,g,x,_)=>{for(let y=0;y<c.length;y++){const w=f[y],v=c[y],E=w.el&&(w.type===Pt||!Ae(w,v)||w.shapeFlag&70)?m(w.el):h;T(w,v,E,null,p,g,x,_,!0)}},we=(f,c,h,p,g,x,_)=>{if(h!==p){if(h!==X)for(const y in h)!cn(y)&&!(y in p)&&i(f,y,h[y],null,_,c.children,g,x,St);for(const y in p){if(cn(y))continue;const w=p[y],v=h[y];w!==v&&y!=="value"&&i(f,y,v,w,_,c.children,g,x,St)}"value"in p&&i(f,"value",h.value,p.value,_)}},Ye=(f,c,h,p,g,x,_,y,w)=>{const v=c.el=f?f.el:s(""),E=c.anchor=f?f.anchor:s("");let{patchFlag:S,dynamicChildren:O,slotScopeIds:P}=c;P&&(y=y?y.concat(P):P),f==null?(r(v,h,p),r(E,h,p),lt(c.children||[],h,E,g,x,_,y,w)):S>0&&S&64&&O&&f.dynamicChildren?(Ot(f.dynamicChildren,O,h,g,x,_,y),(c.key!=null||g&&c===g.subTree)&&Zi(f,c,!0)):W(f,c,h,E,g,x,_,y,w)},We=(f,c,h,p,g,x,_,y,w)=>{c.slotScopeIds=y,f==null?c.shapeFlag&512?g.ctx.activate(c,h,p,_,w):Hn(c,h,p,g,x,_,w):sa(f,c,w)},Hn=(f,c,h,p,g,x,_)=>{const y=f.component=Cl(f,p,g);if(Vi(f)&&(y.ctx.renderer=se),Ol(y),y.asyncDep){if(g&&g.registerDep(y,it),!f.el){const w=y.subTree=Vt(Le);$(null,w,c,h)}}else it(y,f,c,h,g,x,_)},sa=(f,c,h)=>{const p=c.component=f.component;if(Ms(f,c,h))if(p.asyncDep&&!p.asyncResolved){q(p,c,h);return}else p.next=c,Es(p.update),p.effect.dirty=!0,p.update();else c.el=f.el,p.vnode=c},it=(f,c,h,p,g,x,_)=>{const y=()=>{if(f.isMounted){let{next:E,bu:S,u:O,parent:P,vnode:F}=f;{const le=to(f);if(le){E&&(E.el=F.el,q(f,E,_)),le.asyncDep.then(()=>{f.isUnmounted||y()});return}}let U=E,G;qt(f,!1),E?(E.el=F.el,q(f,E,_)):E=F,S&&Wn(S),(G=E.props&&E.props.onVnodeBeforeUpdate)&&_t(G,P,E,F),qt(f,!0);const tt=Bn(f),gt=f.subTree;f.subTree=tt,T(gt,tt,m(gt.el),Ke(gt),f,g,x),E.el=tt.el,U===null&&Ns(f,tt.el),O&&ft(O,g),(G=E.props&&E.props.onVnodeUpdated)&&ft(()=>_t(G,P,E,F),g)}else{let E;const{el:S,props:O}=c,{bm:P,m:F,parent:U}=f,G=un(c);if(qt(f,!1),P&&Wn(P),!G&&(E=O&&O.onVnodeBeforeMount)&&_t(E,U,c),qt(f,!0),S&&Vn){const tt=()=>{f.subTree=Bn(f),Vn(S,f.subTree,f,g,null)};G?c.type.__asyncLoader().then(()=>!f.isUnmounted&&tt()):tt()}else{const tt=f.subTree=Bn(f);T(null,tt,h,p,f,g,x),c.el=tt.el}if(F&&ft(F,g),!G&&(E=O&&O.onVnodeMounted)){const tt=c;ft(()=>_t(E,U,tt),g)}(c.shapeFlag&256||U&&un(U.vnode)&&U.vnode.shapeFlag&256)&&f.a&&ft(f.a,g),f.isMounted=!0,c=h=p=null}},w=f.effect=new Mr(y,pt,()=>Ur(v),f.scope),v=f.update=()=>{w.dirty&&w.run()};v.id=f.uid,qt(f,!0),v()},q=(f,c,h)=>{c.component=f;const p=f.vnode.props;f.vnode=c,f.next=null,ll(f,c.props,p,h),ul(f,c.children,h),ie(),_a(f),oe()},W=(f,c,h,p,g,x,_,y,w=!1)=>{const v=f&&f.children,E=f?f.shapeFlag:0,S=c.children,{patchFlag:O,shapeFlag:P}=c;if(O>0){if(O&128){Be(v,S,h,p,g,x,_,y,w);return}else if(O&256){Kt(v,S,h,p,g,x,_,y,w);return}}P&8?(E&16&&St(v,g,x),S!==v&&d(h,S)):E&16?P&16?Be(v,S,h,p,g,x,_,y,w):St(v,g,x,!0):(E&8&&d(h,""),P&16&&lt(S,h,p,g,x,_,y,w))},Kt=(f,c,h,p,g,x,_,y,w)=>{f=f||Ce,c=c||Ce;const v=f.length,E=c.length,S=Math.min(v,E);let O;for(O=0;O<S;O++){const P=c[O]=w?$t(c[O]):At(c[O]);T(f[O],P,h,null,g,x,_,y,w)}v>E?St(f,g,x,!0,!1,S):lt(c,h,p,g,x,_,y,w,S)},Be=(f,c,h,p,g,x,_,y,w)=>{let v=0;const E=c.length;let S=f.length-1,O=E-1;for(;v<=S&&v<=O;){const P=f[v],F=c[v]=w?$t(c[v]):At(c[v]);if(Ae(P,F))T(P,F,h,null,g,x,_,y,w);else break;v++}for(;v<=S&&v<=O;){const P=f[S],F=c[O]=w?$t(c[O]):At(c[O]);if(Ae(P,F))T(P,F,h,null,g,x,_,y,w);else break;S--,O--}if(v>S){if(v<=O){const P=O+1,F=P<E?c[P].el:p;for(;v<=O;)T(null,c[v]=w?$t(c[v]):At(c[v]),h,F,g,x,_,y,w),v++}}else if(v>O)for(;v<=S;)xt(f[v],g,x,!0),v++;else{const P=v,F=v,U=new Map;for(v=F;v<=O;v++){const ut=c[v]=w?$t(c[v]):At(c[v]);ut.key!=null&&U.set(ut.key,v)}let G,tt=0;const gt=O-F+1;let le=!1,ca=0;const _e=new Array(gt);for(v=0;v<gt;v++)_e[v]=0;for(v=P;v<=S;v++){const ut=f[v];if(tt>=gt){xt(ut,g,x,!0);continue}let wt;if(ut.key!=null)wt=U.get(ut.key);else for(G=F;G<=O;G++)if(_e[G-F]===0&&Ae(ut,c[G])){wt=G;break}wt===void 0?xt(ut,g,x,!0):(_e[wt-F]=v+1,wt>=ca?ca=wt:le=!0,T(ut,c[wt],h,null,g,x,_,y,w),tt++)}const ua=le?pl(_e):Ce;for(G=ua.length-1,v=gt-1;v>=0;v--){const ut=F+v,wt=c[ut],da=ut+1<E?c[ut+1].el:p;_e[v]===0?T(null,wt,h,da,g,x,_,y,w):le&&(G<0||v!==ua[G]?Gt(wt,h,da,2):G--)}}},Gt=(f,c,h,p,g=null)=>{const{el:x,type:_,transition:y,children:w,shapeFlag:v}=f;if(v&6){Gt(f.component.subTree,c,h,p);return}if(v&128){f.suspense.move(c,h,p);return}if(v&64){_.move(f,c,h,se);return}if(_===Pt){r(x,c,h);for(let S=0;S<w.length;S++)Gt(w[S],c,h,p);r(f.anchor,c,h);return}if(_===mn){I(f,c,h);return}if(p!==2&&v&1&&y)if(p===0)y.beforeEnter(x),r(x,c,h),ft(()=>y.enter(x),g);else{const{leave:S,delayLeave:O,afterLeave:P}=y,F=()=>r(x,c,h),U=()=>{S(x,()=>{F(),P&&P()})};O?O(x,F,U):U()}else r(x,c,h)},xt=(f,c,h,p=!1,g=!1)=>{const{type:x,props:_,ref:y,children:w,dynamicChildren:v,shapeFlag:E,patchFlag:S,dirs:O}=f;if(y!=null&&dr(y,null,h,f,!0),E&256){c.ctx.deactivate(f);return}const P=E&1&&O,F=!un(f);let U;if(F&&(U=_&&_.onVnodeBeforeUnmount)&&_t(U,c,f),E&6)No(f.component,h,p);else{if(E&128){f.suspense.unmount(h,p);return}P&&Xt(f,null,c,"beforeUnmount"),E&64?f.type.remove(f,c,h,g,se,p):v&&(x!==Pt||S>0&&S&64)?St(v,c,h,!1,!0):(x===Pt&&S&384||!g&&E&16)&&St(w,c,h),p&&la(f)}(F&&(U=_&&_.onVnodeUnmounted)||P)&&ft(()=>{U&&_t(U,c,f),P&&Xt(f,null,c,"unmounted")},h)},la=f=>{const{type:c,el:h,anchor:p,transition:g}=f;if(c===Pt){Mo(h,p);return}if(c===mn){H(f);return}const x=()=>{a(h),g&&!g.persisted&&g.afterLeave&&g.afterLeave()};if(f.shapeFlag&1&&g&&!g.persisted){const{leave:_,delayLeave:y}=g,w=()=>_(h,x);y?y(f.el,x,w):w()}else x()},Mo=(f,c)=>{let h;for(;f!==c;)h=b(f),a(f),f=h;a(c)},No=(f,c,h)=>{const{bum:p,scope:g,update:x,subTree:_,um:y}=f;p&&Wn(p),g.stop(),x&&(x.active=!1,xt(_,f,c,h)),y&&ft(y,c),ft(()=>{f.isUnmounted=!0},c),c&&c.pendingBranch&&!c.isUnmounted&&f.asyncDep&&!f.asyncResolved&&f.suspenseId===c.pendingId&&(c.deps--,c.deps===0&&c.resolve())},St=(f,c,h,p=!1,g=!1,x=0)=>{for(let _=x;_<f.length;_++)xt(f[_],c,h,p,g)},Ke=f=>f.shapeFlag&6?Ke(f.component.subTree):f.shapeFlag&128?f.suspense.next():b(f.anchor||f.el);let Dn=!1;const fa=(f,c,h)=>{f==null?c._vnode&&xt(c._vnode,null,null,!0):T(c._vnode||null,f,c,null,null,null,h),Dn||(Dn=!0,_a(),zi(),Dn=!1),c._vnode=f},se={p:T,um:xt,m:Gt,r:la,mt:Hn,mc:lt,pc:W,pbc:Ot,n:Ke,o:t};let Un,Vn;return e&&([Un,Vn]=e(se)),{render:fa,hydrate:Un,createApp:il(fa,Un)}}function Xn({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function qt({effect:t,update:e},n){t.allowRecurse=e.allowRecurse=n}function hl(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Zi(t,e,n=!1){const r=t.children,a=e.children;if(M(r)&&M(a))for(let i=0;i<r.length;i++){const o=r[i];let s=a[i];s.shapeFlag&1&&!s.dynamicChildren&&((s.patchFlag<=0||s.patchFlag===32)&&(s=a[i]=$t(a[i]),s.el=o.el),n||Zi(o,s)),s.type===Nn&&(s.el=o.el)}}function pl(t){const e=t.slice(),n=[0];let r,a,i,o,s;const l=t.length;for(r=0;r<l;r++){const u=t[r];if(u!==0){if(a=n[n.length-1],t[a]<u){e[r]=a,n.push(r);continue}for(i=0,o=n.length-1;i<o;)s=i+o>>1,t[n[s]]<u?i=s+1:o=s;u<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function to(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:to(e)}const gl=t=>t.__isTeleport,Pt=Symbol.for("v-fgt"),Nn=Symbol.for("v-txt"),Le=Symbol.for("v-cmt"),mn=Symbol.for("v-stc");let ce=null,Wr=1;function Ma(t){Wr+=t}function vl(t){return t?t.__v_isVNode===!0:!1}function Ae(t,e){return t.type===e.type&&t.key===e.key}const Ln="__vInternal",eo=({key:t})=>t??null,hn=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?nt(t)||dt(t)||L(t)?{i:Et,r:t,k:e,f:!!n}:t:null);function bl(t,e=null,n=null,r=0,a=null,i=t===Pt?0:1,o=!1,s=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&eo(e),ref:e&&hn(e),scopeId:Hi,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:a,dynamicChildren:null,appContext:null,ctx:Et};return s?(Br(l,n),i&128&&t.normalize(l)):n&&(l.shapeFlag|=nt(n)?8:16),Wr>0&&!o&&ce&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&ce.push(l),l}const Vt=yl;function yl(t,e=null,n=null,r=0,a=null,i=!1){if((!t||t===Ls)&&(t=Le),vl(t)){const s=ve(t,e,!0);return n&&Br(s,n),Wr>0&&!i&&ce&&(s.shapeFlag&6?ce[ce.indexOf(t)]=s:ce.push(s)),s.patchFlag|=-2,s}if(Il(t)&&(t=t.__vccOpts),e){e=xl(e);let{class:s,style:l}=e;s&&!nt(s)&&(e.class=Ir(s)),Q(l)&&(Ii(l)&&!M(l)&&(l=at({},l)),e.style=Tr(l))}const o=nt(t)?1:Rs(t)?128:gl(t)?64:Q(t)?4:L(t)?2:0;return bl(t,e,n,r,a,o,i,!0)}function xl(t){return t?Ii(t)||Ln in t?at({},t):t:null}function ve(t,e,n=!1){const{props:r,ref:a,patchFlag:i,children:o}=t,s=e?Al(r||{},e):r;return{__v_isVNode:!0,__v_skip:!0,type:t.type,props:s,key:s&&eo(s),ref:e&&e.ref?n&&a?M(a)?a.concat(hn(e)):[a,hn(e)]:hn(e):a,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:o,target:t.target,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Pt?i===-1?16:i|16:i,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:t.transition,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&ve(t.ssContent),ssFallback:t.ssFallback&&ve(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce}}function wl(t=" ",e=0){return Vt(Nn,null,t,e)}function _l(t,e){const n=Vt(mn,null,t);return n.staticCount=e,n}function At(t){return t==null||typeof t=="boolean"?Vt(Le):M(t)?Vt(Pt,null,t.slice()):typeof t=="object"?$t(t):Vt(Nn,null,String(t))}function $t(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:ve(t)}function Br(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(M(e))n=16;else if(typeof e=="object")if(r&65){const a=e.default;a&&(a._c&&(a._d=!1),Br(t,a()),a._c&&(a._d=!0));return}else{n=32;const a=e._;!a&&!(Ln in e)?e._ctx=Et:a===3&&Et&&(Et.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else L(e)?(e={default:e,_ctx:Et},n=32):(e=String(e),r&64?(n=16,e=[wl(e)]):n=8);t.children=e,t.shapeFlag|=n}function Al(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const a in r)if(a==="class")e.class!==r.class&&(e.class=Ir([e.class,r.class]));else if(a==="style")e.style=Tr([e.style,r.style]);else if(En(a)){const i=e[a],o=r[a];o&&i!==o&&!(M(i)&&i.includes(o))&&(e[a]=i?[].concat(i,o):o)}else a!==""&&(e[a]=r[a])}return e}function _t(t,e,n,r=null){yt(t,e,7,[n,r])}const kl=Ki();let El=0;function Cl(t,e,n){const r=t.type,a=(e?e.appContext:t.appContext)||kl,i={uid:El++,vnode:t,type:r,parent:e,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,scope:new Xo(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(a.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Xi(r,a),emitsOptions:$i(r,a),emit:null,emitted:null,propsDefaults:X,inheritAttrs:r.inheritAttrs,ctx:X,data:X,props:X,attrs:X,slots:X,refs:X,setupState:X,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=Ss.bind(null,i),t.ce&&t.ce(i),i}let st=null,wn,mr;{const t=vi(),e=(n,r)=>{let a;return(a=t[n])||(a=t[n]=[]),a.push(r),i=>{a.length>1?a.forEach(o=>o(i)):a[0](i)}};wn=e("__VUE_INSTANCE_SETTERS__",n=>st=n),mr=e("__VUE_SSR_SETTERS__",n=>Rn=n)}const He=t=>{const e=st;return wn(t),t.scope.on(),()=>{t.scope.off(),wn(e)}},Na=()=>{st&&st.scope.off(),wn(null)};function no(t){return t.vnode.shapeFlag&4}let Rn=!1;function Ol(t,e=!1){e&&mr(e);const{props:n,children:r}=t.vnode,a=no(t);sl(t,n,a,e),cl(t,r);const i=a?Sl(t,e):void 0;return e&&mr(!1),i}function Sl(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=Mi(new Proxy(t.ctx,Qs));const{setup:r}=n;if(r){const a=t.setupContext=r.length>1?Tl(t):null,i=He(t);ie();const o=Ut(r,t,0,[t.props,a]);if(oe(),i(),pi(o)){if(o.then(Na,Na),e)return o.then(s=>{La(t,s,e)}).catch(s=>{Tn(s,t,0)});t.asyncDep=o}else La(t,o,e)}else ro(t,e)}function La(t,e,n){L(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Q(e)&&(t.setupState=Li(e)),ro(t,n)}let Ra;function ro(t,e,n){const r=t.type;if(!t.render){if(!e&&Ra&&!r.render){const a=r.template||Vr(t).template;if(a){const{isCustomElement:i,compilerOptions:o}=t.appContext.config,{delimiters:s,compilerOptions:l}=r,u=at(at({isCustomElement:i,delimiters:s},o),l);r.render=Ra(a,u)}}t.render=r.render||pt}{const a=He(t);ie();try{Zs(t)}finally{oe(),a()}}}function Pl(t){return t.attrsProxy||(t.attrsProxy=new Proxy(t.attrs,{get(e,n){return ct(t,"get","$attrs"),e[n]}}))}function Tl(t){const e=n=>{t.exposed=n||{}};return{get attrs(){return Pl(t)},slots:t.slots,emit:t.emit,expose:e}}function Kr(t){if(t.exposed)return t.exposeProxy||(t.exposeProxy=new Proxy(Li(Mi(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Se)return Se[n](t)},has(e,n){return n in e||n in Se}}))}function Il(t){return L(t)&&"__vccOpts"in t}const Ml=(t,e)=>bs(t,e,Rn),Nl="3.4.13";/**
* @vue/runtime-dom v3.4.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const Ll="http://www.w3.org/2000/svg",Rl="http://www.w3.org/1998/Math/MathML",Ht=typeof document<"u"?document:null,Fa=Ht&&Ht.createElement("template"),Fl={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const a=e==="svg"?Ht.createElementNS(Ll,t):e==="mathml"?Ht.createElementNS(Rl,t):Ht.createElement(t,n?{is:n}:void 0);return t==="select"&&r&&r.multiple!=null&&a.setAttribute("multiple",r.multiple),a},createText:t=>Ht.createTextNode(t),createComment:t=>Ht.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>Ht.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,a,i){const o=n?n.previousSibling:e.lastChild;if(a&&(a===i||a.nextSibling))for(;e.insertBefore(a.cloneNode(!0),n),!(a===i||!(a=a.nextSibling)););else{Fa.innerHTML=r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t;const s=Fa.content;if(r==="svg"||r==="mathml"){const l=s.firstChild;for(;l.firstChild;)s.appendChild(l.firstChild);s.removeChild(l)}e.insertBefore(s,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},zl=Symbol("_vtc");function jl(t,e,n){const r=t[zl];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const $l=Symbol("_vod"),Hl=Symbol("");function Dl(t,e,n){const r=t.style,a=r.display,i=nt(n);if(n&&!i){if(e&&!nt(e))for(const o in e)n[o]==null&&hr(r,o,"");for(const o in n)hr(r,o,n[o])}else if(i){if(e!==n){const o=r[Hl];o&&(n+=";"+o),r.cssText=n}}else e&&t.removeAttribute("style");$l in t&&(r.display=a)}const za=/\s*!important$/;function hr(t,e,n){if(M(n))n.forEach(r=>hr(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=Ul(t,e);za.test(n)?t.setProperty(ye(r),n.replace(za,""),"important"):t[r]=n}}const ja=["Webkit","Moz","ms"],qn={};function Ul(t,e){const n=qn[e];if(n)return n;let r=ge(e);if(r!=="filter"&&r in t)return qn[e]=r;r=gi(r);for(let a=0;a<ja.length;a++){const i=ja[a]+r;if(i in t)return qn[e]=i}return e}const $a="http://www.w3.org/1999/xlink";function Vl(t,e,n,r,a){if(r&&e.startsWith("xlink:"))n==null?t.removeAttributeNS($a,e.slice(6,e.length)):t.setAttributeNS($a,e,n);else{const i=Go(e);n==null||i&&!bi(n)?t.removeAttribute(e):t.setAttribute(e,i?"":n)}}function Yl(t,e,n,r,a,i,o){if(e==="innerHTML"||e==="textContent"){r&&o(r,a,i),t[e]=n??"";return}const s=t.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){t._value=n;const u=s==="OPTION"?t.getAttribute("value"):t.value,d=n??"";u!==d&&(t.value=d),n==null&&t.removeAttribute(e);return}let l=!1;if(n===""||n==null){const u=typeof t[e];u==="boolean"?n=bi(n):n==null&&u==="string"?(n="",l=!0):u==="number"&&(n=0,l=!0)}try{t[e]=n}catch{}l&&t.removeAttribute(e)}function Wl(t,e,n,r){t.addEventListener(e,n,r)}function Bl(t,e,n,r){t.removeEventListener(e,n,r)}const Ha=Symbol("_vei");function Kl(t,e,n,r,a=null){const i=t[Ha]||(t[Ha]={}),o=i[e];if(r&&o)o.value=r;else{const[s,l]=Gl(e);if(r){const u=i[e]=Jl(r,a);Wl(t,s,u,l)}else o&&(Bl(t,s,o,l),i[e]=void 0)}}const Da=/(?:Once|Passive|Capture)$/;function Gl(t){let e;if(Da.test(t)){e={};let r;for(;r=t.match(Da);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):ye(t.slice(2)),e]}let Jn=0;const Xl=Promise.resolve(),ql=()=>Jn||(Xl.then(()=>Jn=0),Jn=Date.now());function Jl(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;yt(Ql(r,n.value),e,5,[r])};return n.value=t,n.attached=ql(),n}function Ql(t,e){if(M(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>a=>!a._stopped&&r&&r(a))}else return e}const Ua=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,Zl=(t,e,n,r,a,i,o,s,l)=>{const u=a==="svg";e==="class"?jl(t,r,u):e==="style"?Dl(t,n,r):En(e)?Or(e)||Kl(t,e,n,r,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):tf(t,e,r,u))?Yl(t,e,r,i,o,s,l):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),Vl(t,e,r,u))};function tf(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&Ua(e)&&L(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const a=t.tagName;if(a==="IMG"||a==="VIDEO"||a==="CANVAS"||a==="SOURCE")return!1}return Ua(e)&&nt(n)?!1:e in t}const ef=at({patchProp:Zl},Fl);let Va;function nf(){return Va||(Va=dl(ef))}const rf=(...t)=>{const e=nf().createApp(...t),{mount:n}=e;return e.mount=r=>{const a=of(r);if(!a)return;const i=e._component;!L(i)&&!i.render&&!i.template&&(i.template=a.innerHTML),a.innerHTML="";const o=n(a,!1,af(a));return a instanceof Element&&(a.removeAttribute("v-cloak"),a.setAttribute("data-v-app","")),o},e};function af(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function of(t){return nt(t)?document.querySelector(t):t}const sf="/dc-calendar/mooving-mint.webp",lf=(t,e)=>{const n=t.__vccOpts||t;for(const[r,a]of e)n[r]=a;return n},ff={},cf=_l('<header id="top" class="max-content" data-v-16dbc57b><h1 id="site-title" data-v-16dbc57b>Dragon Cave Calendar</h1></header><main class="max-content" data-v-16dbc57b><section class="section" id="moved" data-v-16dbc57b><img src="'+sf+'" alt="Mooving Mint" id="mooving-mint" data-v-16dbc57b><p data-v-16dbc57b>We&#39;ve &quot;moo&quot; ved!</p><p data-v-16dbc57b> The calendar is now in the same place as the rest of the tools. <a href="https://chazza.me/dc/calendar" data-v-16dbc57b>Find it here</a>. </p><p data-v-16dbc57b>Remember to update your bookmarks!</p><p data-v-16dbc57b>Art by 04uni</p></section></main>',2);function uf(t,e){return cf}const df=lf(ff,[["render",uf],["__scopeId","data-v-16dbc57b"]]);function Ya(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable})),n.push.apply(n,r)}return n}function k(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Ya(Object(n),!0).forEach(function(r){Z(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Ya(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function _n(t){"@babel/helpers - typeof";return _n=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_n(t)}function mf(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Wa(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function hf(t,e,n){return e&&Wa(t.prototype,e),n&&Wa(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function Z(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Gr(t,e){return gf(t)||bf(t,e)||ao(t,e)||xf()}function De(t){return pf(t)||vf(t)||ao(t)||yf()}function pf(t){if(Array.isArray(t))return pr(t)}function gf(t){if(Array.isArray(t))return t}function vf(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function bf(t,e){var n=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(n!=null){var r=[],a=!0,i=!1,o,s;try{for(n=n.call(t);!(a=(o=n.next()).done)&&(r.push(o.value),!(e&&r.length===e));a=!0);}catch(l){i=!0,s=l}finally{try{!a&&n.return!=null&&n.return()}finally{if(i)throw s}}return r}}function ao(t,e){if(t){if(typeof t=="string")return pr(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return pr(t,e)}}function pr(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function yf(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function xf(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Ba=function(){},Xr={},io={},oo=null,so={mark:Ba,measure:Ba};try{typeof window<"u"&&(Xr=window),typeof document<"u"&&(io=document),typeof MutationObserver<"u"&&(oo=MutationObserver),typeof performance<"u"&&(so=performance)}catch{}var wf=Xr.navigator||{},Ka=wf.userAgent,Ga=Ka===void 0?"":Ka,Yt=Xr,K=io,Xa=oo,tn=so;Yt.document;var Rt=!!K.documentElement&&!!K.head&&typeof K.addEventListener=="function"&&typeof K.createElement=="function",lo=~Ga.indexOf("MSIE")||~Ga.indexOf("Trident/"),en,nn,rn,an,on,It="___FONT_AWESOME___",gr=16,fo="fa",co="svg-inline--fa",re="data-fa-i2svg",vr="data-fa-pseudo-element",_f="data-fa-pseudo-element-pending",qr="data-prefix",Jr="data-icon",qa="fontawesome-i2svg",Af="async",kf=["HTML","HEAD","STYLE","SCRIPT"],uo=function(){try{return!0}catch{return!1}}(),B="classic",J="sharp",Qr=[B,J];function Ue(t){return new Proxy(t,{get:function(n,r){return r in n?n[r]:n[B]}})}var Re=Ue((en={},Z(en,B,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit",fakd:"kit","fa-kit":"kit","fa-kit-duotone":"kit"}),Z(en,J,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"}),en)),Fe=Ue((nn={},Z(nn,B,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),Z(nn,J,{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"}),nn)),ze=Ue((rn={},Z(rn,B,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),Z(rn,J,{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"}),rn)),Ef=Ue((an={},Z(an,B,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),Z(an,J,{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"}),an)),Cf=/fa(s|r|l|t|d|b|k|ss|sr|sl|st)?[\-\ ]/,mo="fa-layers-text",Of=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,Sf=Ue((on={},Z(on,B,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),Z(on,J,{900:"fass",400:"fasr",300:"fasl",100:"fast"}),on)),ho=[1,2,3,4,5,6,7,8,9,10],Pf=ho.concat([11,12,13,14,15,16,17,18,19,20]),Tf=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],Qt={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},je=new Set;Object.keys(Fe[B]).map(je.add.bind(je));Object.keys(Fe[J]).map(je.add.bind(je));var If=[].concat(Qr,De(je),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",Qt.GROUP,Qt.SWAP_OPACITY,Qt.PRIMARY,Qt.SECONDARY]).concat(ho.map(function(t){return"".concat(t,"x")})).concat(Pf.map(function(t){return"w-".concat(t)})),Pe=Yt.FontAwesomeConfig||{};function Mf(t){var e=K.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function Nf(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}if(K&&typeof K.querySelector=="function"){var Lf=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];Lf.forEach(function(t){var e=Gr(t,2),n=e[0],r=e[1],a=Nf(Mf(n));a!=null&&(Pe[r]=a)})}var po={styleDefault:"solid",familyDefault:"classic",cssPrefix:fo,replacementClass:co,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};Pe.familyPrefix&&(Pe.cssPrefix=Pe.familyPrefix);var be=k(k({},po),Pe);be.autoReplaceSvg||(be.observeMutations=!1);var C={};Object.keys(po).forEach(function(t){Object.defineProperty(C,t,{enumerable:!0,set:function(n){be[t]=n,Te.forEach(function(r){return r(C)})},get:function(){return be[t]}})});Object.defineProperty(C,"familyPrefix",{enumerable:!0,set:function(e){be.cssPrefix=e,Te.forEach(function(n){return n(C)})},get:function(){return be.cssPrefix}});Yt.FontAwesomeConfig=C;var Te=[];function Rf(t){return Te.push(t),function(){Te.splice(Te.indexOf(t),1)}}var zt=gr,Ct={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Ff(t){if(!(!t||!Rt)){var e=K.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;for(var n=K.head.childNodes,r=null,a=n.length-1;a>-1;a--){var i=n[a],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(r=i)}return K.head.insertBefore(e,r),t}}var zf="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function $e(){for(var t=12,e="";t-- >0;)e+=zf[Math.random()*62|0];return e}function xe(t){for(var e=[],n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function Zr(t){return t.classList?xe(t.classList):(t.getAttribute("class")||"").split(" ").filter(function(e){return e})}function go(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function jf(t){return Object.keys(t||{}).reduce(function(e,n){return e+"".concat(n,'="').concat(go(t[n]),'" ')},"").trim()}function Fn(t){return Object.keys(t||{}).reduce(function(e,n){return e+"".concat(n,": ").concat(t[n].trim(),";")},"")}function ta(t){return t.size!==Ct.size||t.x!==Ct.x||t.y!==Ct.y||t.rotate!==Ct.rotate||t.flipX||t.flipY}function $f(t){var e=t.transform,n=t.containerWidth,r=t.iconWidth,a={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(e.x*32,", ").concat(e.y*32,") "),o="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),s="rotate(".concat(e.rotate," 0 0)"),l={transform:"".concat(i," ").concat(o," ").concat(s)},u={transform:"translate(".concat(r/2*-1," -256)")};return{outer:a,inner:l,path:u}}function Hf(t){var e=t.transform,n=t.width,r=n===void 0?gr:n,a=t.height,i=a===void 0?gr:a,o=t.startCentered,s=o===void 0?!1:o,l="";return s&&lo?l+="translate(".concat(e.x/zt-r/2,"em, ").concat(e.y/zt-i/2,"em) "):s?l+="translate(calc(-50% + ".concat(e.x/zt,"em), calc(-50% + ").concat(e.y/zt,"em)) "):l+="translate(".concat(e.x/zt,"em, ").concat(e.y/zt,"em) "),l+="scale(".concat(e.size/zt*(e.flipX?-1:1),", ").concat(e.size/zt*(e.flipY?-1:1),") "),l+="rotate(".concat(e.rotate,"deg) "),l}var Df=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function vo(){var t=fo,e=co,n=C.cssPrefix,r=C.replacementClass,a=Df;if(n!==t||r!==e){var i=new RegExp("\\.".concat(t,"\\-"),"g"),o=new RegExp("\\--".concat(t,"\\-"),"g"),s=new RegExp("\\.".concat(e),"g");a=a.replace(i,".".concat(n,"-")).replace(o,"--".concat(n,"-")).replace(s,".".concat(r))}return a}var Ja=!1;function Qn(){C.autoAddCss&&!Ja&&(Ff(vo()),Ja=!0)}var Uf={mixout:function(){return{dom:{css:vo,insertCss:Qn}}},hooks:function(){return{beforeDOMElementCreation:function(){Qn()},beforeI2svg:function(){Qn()}}}},Mt=Yt||{};Mt[It]||(Mt[It]={});Mt[It].styles||(Mt[It].styles={});Mt[It].hooks||(Mt[It].hooks={});Mt[It].shims||(Mt[It].shims=[]);var bt=Mt[It],bo=[],Vf=function t(){K.removeEventListener("DOMContentLoaded",t),An=1,bo.map(function(e){return e()})},An=!1;Rt&&(An=(K.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(K.readyState),An||K.addEventListener("DOMContentLoaded",Vf));function Yf(t){Rt&&(An?setTimeout(t,0):bo.push(t))}function Ve(t){var e=t.tag,n=t.attributes,r=n===void 0?{}:n,a=t.children,i=a===void 0?[]:a;return typeof t=="string"?go(t):"<".concat(e," ").concat(jf(r),">").concat(i.map(Ve).join(""),"</").concat(e,">")}function Qa(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var Wf=function(e,n){return function(r,a,i,o){return e.call(n,r,a,i,o)}},Zn=function(e,n,r,a){var i=Object.keys(e),o=i.length,s=a!==void 0?Wf(n,a):n,l,u,d;for(r===void 0?(l=1,d=e[i[0]]):(l=0,d=r);l<o;l++)u=i[l],d=s(d,e[u],u,e);return d};function Bf(t){for(var e=[],n=0,r=t.length;n<r;){var a=t.charCodeAt(n++);if(a>=55296&&a<=56319&&n<r){var i=t.charCodeAt(n++);(i&64512)==56320?e.push(((a&1023)<<10)+(i&1023)+65536):(e.push(a),n--)}else e.push(a)}return e}function br(t){var e=Bf(t);return e.length===1?e[0].toString(16):null}function Kf(t,e){var n=t.length,r=t.charCodeAt(e),a;return r>=55296&&r<=56319&&n>e+1&&(a=t.charCodeAt(e+1),a>=56320&&a<=57343)?(r-55296)*1024+a-56320+65536:r}function Za(t){return Object.keys(t).reduce(function(e,n){var r=t[n],a=!!r.icon;return a?e[r.iconName]=r.icon:e[n]=r,e},{})}function yr(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=n.skipHooks,a=r===void 0?!1:r,i=Za(e);typeof bt.hooks.addPack=="function"&&!a?bt.hooks.addPack(t,Za(e)):bt.styles[t]=k(k({},bt.styles[t]||{}),i),t==="fas"&&yr("fa",e)}var sn,ln,fn,ue=bt.styles,Gf=bt.shims,Xf=(sn={},Z(sn,B,Object.values(ze[B])),Z(sn,J,Object.values(ze[J])),sn),ea=null,yo={},xo={},wo={},_o={},Ao={},qf=(ln={},Z(ln,B,Object.keys(Re[B])),Z(ln,J,Object.keys(Re[J])),ln);function Jf(t){return~If.indexOf(t)}function Qf(t,e){var n=e.split("-"),r=n[0],a=n.slice(1).join("-");return r===t&&a!==""&&!Jf(a)?a:null}var ko=function(){var e=function(i){return Zn(ue,function(o,s,l){return o[l]=Zn(s,i,{}),o},{})};yo=e(function(a,i,o){if(i[3]&&(a[i[3]]=o),i[2]){var s=i[2].filter(function(l){return typeof l=="number"});s.forEach(function(l){a[l.toString(16)]=o})}return a}),xo=e(function(a,i,o){if(a[o]=o,i[2]){var s=i[2].filter(function(l){return typeof l=="string"});s.forEach(function(l){a[l]=o})}return a}),Ao=e(function(a,i,o){var s=i[2];return a[o]=o,s.forEach(function(l){a[l]=o}),a});var n="far"in ue||C.autoFetchSvg,r=Zn(Gf,function(a,i){var o=i[0],s=i[1],l=i[2];return s==="far"&&!n&&(s="fas"),typeof o=="string"&&(a.names[o]={prefix:s,iconName:l}),typeof o=="number"&&(a.unicodes[o.toString(16)]={prefix:s,iconName:l}),a},{names:{},unicodes:{}});wo=r.names,_o=r.unicodes,ea=zn(C.styleDefault,{family:C.familyDefault})};Rf(function(t){ea=zn(t.styleDefault,{family:C.familyDefault})});ko();function na(t,e){return(yo[t]||{})[e]}function Zf(t,e){return(xo[t]||{})[e]}function Zt(t,e){return(Ao[t]||{})[e]}function Eo(t){return wo[t]||{prefix:null,iconName:null}}function tc(t){var e=_o[t],n=na("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function Wt(){return ea}var ra=function(){return{prefix:null,iconName:null,rest:[]}};function zn(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.family,r=n===void 0?B:n,a=Re[r][t],i=Fe[r][t]||Fe[r][a],o=t in bt.styles?t:null;return i||o||null}var ti=(fn={},Z(fn,B,Object.keys(ze[B])),Z(fn,J,Object.keys(ze[J])),fn);function jn(t){var e,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.skipLookups,a=r===void 0?!1:r,i=(e={},Z(e,B,"".concat(C.cssPrefix,"-").concat(B)),Z(e,J,"".concat(C.cssPrefix,"-").concat(J)),e),o=null,s=B;(t.includes(i[B])||t.some(function(u){return ti[B].includes(u)}))&&(s=B),(t.includes(i[J])||t.some(function(u){return ti[J].includes(u)}))&&(s=J);var l=t.reduce(function(u,d){var m=Qf(C.cssPrefix,d);if(ue[d]?(d=Xf[s].includes(d)?Ef[s][d]:d,o=d,u.prefix=d):qf[s].indexOf(d)>-1?(o=d,u.prefix=zn(d,{family:s})):m?u.iconName=m:d!==C.replacementClass&&d!==i[B]&&d!==i[J]&&u.rest.push(d),!a&&u.prefix&&u.iconName){var b=o==="fa"?Eo(u.iconName):{},A=Zt(u.prefix,u.iconName);b.prefix&&(o=null),u.iconName=b.iconName||A||u.iconName,u.prefix=b.prefix||u.prefix,u.prefix==="far"&&!ue.far&&ue.fas&&!C.autoFetchSvg&&(u.prefix="fas")}return u},ra());return(t.includes("fa-brands")||t.includes("fab"))&&(l.prefix="fab"),(t.includes("fa-duotone")||t.includes("fad"))&&(l.prefix="fad"),!l.prefix&&s===J&&(ue.fass||C.autoFetchSvg)&&(l.prefix="fass",l.iconName=Zt(l.prefix,l.iconName)||l.iconName),(l.prefix==="fa"||o==="fa")&&(l.prefix=Wt()||"fas"),l}var ec=function(){function t(){mf(this,t),this.definitions={}}return hf(t,[{key:"add",value:function(){for(var n=this,r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];var o=a.reduce(this._pullDefinitions,{});Object.keys(o).forEach(function(s){n.definitions[s]=k(k({},n.definitions[s]||{}),o[s]),yr(s,o[s]);var l=ze[B][s];l&&yr(l,o[s]),ko()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,r){var a=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(a).map(function(i){var o=a[i],s=o.prefix,l=o.iconName,u=o.icon,d=u[2];n[s]||(n[s]={}),d.length>0&&d.forEach(function(m){typeof m=="string"&&(n[s][m]=u)}),n[s][l]=u}),n}}]),t}(),ei=[],de={},pe={},nc=Object.keys(pe);function rc(t,e){var n=e.mixoutsTo;return ei=t,de={},Object.keys(pe).forEach(function(r){nc.indexOf(r)===-1&&delete pe[r]}),ei.forEach(function(r){var a=r.mixout?r.mixout():{};if(Object.keys(a).forEach(function(o){typeof a[o]=="function"&&(n[o]=a[o]),_n(a[o])==="object"&&Object.keys(a[o]).forEach(function(s){n[o]||(n[o]={}),n[o][s]=a[o][s]})}),r.hooks){var i=r.hooks();Object.keys(i).forEach(function(o){de[o]||(de[o]=[]),de[o].push(i[o])})}r.provides&&r.provides(pe)}),n}function xr(t,e){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];var i=de[t]||[];return i.forEach(function(o){e=o.apply(null,[e].concat(r))}),e}function ae(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];var a=de[t]||[];a.forEach(function(i){i.apply(null,n)})}function Nt(){var t=arguments[0],e=Array.prototype.slice.call(arguments,1);return pe[t]?pe[t].apply(null,e):void 0}function wr(t){t.prefix==="fa"&&(t.prefix="fas");var e=t.iconName,n=t.prefix||Wt();if(e)return e=Zt(n,e)||e,Qa(Co.definitions,n,e)||Qa(bt.styles,n,e)}var Co=new ec,ac=function(){C.autoReplaceSvg=!1,C.observeMutations=!1,ae("noAuto")},ic={i2svg:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Rt?(ae("beforeI2svg",e),Nt("pseudoElements2svg",e),Nt("i2svg",e)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.autoReplaceSvgRoot;C.autoReplaceSvg===!1&&(C.autoReplaceSvg=!0),C.observeMutations=!0,Yf(function(){sc({autoReplaceSvgRoot:n}),ae("watch",e)})}},oc={icon:function(e){if(e===null)return null;if(_n(e)==="object"&&e.prefix&&e.iconName)return{prefix:e.prefix,iconName:Zt(e.prefix,e.iconName)||e.iconName};if(Array.isArray(e)&&e.length===2){var n=e[1].indexOf("fa-")===0?e[1].slice(3):e[1],r=zn(e[0]);return{prefix:r,iconName:Zt(r,n)||n}}if(typeof e=="string"&&(e.indexOf("".concat(C.cssPrefix,"-"))>-1||e.match(Cf))){var a=jn(e.split(" "),{skipLookups:!0});return{prefix:a.prefix||Wt(),iconName:Zt(a.prefix,a.iconName)||a.iconName}}if(typeof e=="string"){var i=Wt();return{prefix:i,iconName:Zt(i,e)||e}}}},mt={noAuto:ac,config:C,dom:ic,parse:oc,library:Co,findIconDefinition:wr,toHtml:Ve},sc=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.autoReplaceSvgRoot,r=n===void 0?K:n;(Object.keys(bt.styles).length>0||C.autoFetchSvg)&&Rt&&C.autoReplaceSvg&&mt.dom.i2svg({node:r})};function $n(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(function(r){return Ve(r)})}}),Object.defineProperty(t,"node",{get:function(){if(Rt){var r=K.createElement("div");return r.innerHTML=t.html,r.children}}}),t}function lc(t){var e=t.children,n=t.main,r=t.mask,a=t.attributes,i=t.styles,o=t.transform;if(ta(o)&&n.found&&!r.found){var s=n.width,l=n.height,u={x:s/l/2,y:.5};a.style=Fn(k(k({},i),{},{"transform-origin":"".concat(u.x+o.x/16,"em ").concat(u.y+o.y/16,"em")}))}return[{tag:"svg",attributes:a,children:e}]}function fc(t){var e=t.prefix,n=t.iconName,r=t.children,a=t.attributes,i=t.symbol,o=i===!0?"".concat(e,"-").concat(C.cssPrefix,"-").concat(n):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:k(k({},a),{},{id:o}),children:r}]}]}function aa(t){var e=t.icons,n=e.main,r=e.mask,a=t.prefix,i=t.iconName,o=t.transform,s=t.symbol,l=t.title,u=t.maskId,d=t.titleId,m=t.extra,b=t.watchable,A=b===void 0?!1:b,R=r.found?r:n,T=R.width,j=R.height,$=a==="fak",V=[C.replacementClass,i?"".concat(C.cssPrefix,"-").concat(i):""].filter(function(ht){return m.classes.indexOf(ht)===-1}).filter(function(ht){return ht!==""||!!ht}).concat(m.classes).join(" "),I={children:[],attributes:k(k({},m.attributes),{},{"data-prefix":a,"data-icon":i,class:V,role:m.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(T," ").concat(j)})},H=$&&!~m.classes.indexOf("fa-fw")?{width:"".concat(T/j*16*.0625,"em")}:{};A&&(I.attributes[re]=""),l&&(I.children.push({tag:"title",attributes:{id:I.attributes["aria-labelledby"]||"title-".concat(d||$e())},children:[l]}),delete I.attributes.title);var Y=k(k({},I),{},{prefix:a,iconName:i,main:n,mask:r,maskId:u,transform:o,symbol:s,styles:k(k({},H),m.styles)}),N=r.found&&n.found?Nt("generateAbstractMask",Y)||{children:[],attributes:{}}:Nt("generateAbstractIcon",Y)||{children:[],attributes:{}},et=N.children,lt=N.attributes;return Y.children=et,Y.attributes=lt,s?fc(Y):lc(Y)}function ni(t){var e=t.content,n=t.width,r=t.height,a=t.transform,i=t.title,o=t.extra,s=t.watchable,l=s===void 0?!1:s,u=k(k(k({},o.attributes),i?{title:i}:{}),{},{class:o.classes.join(" ")});l&&(u[re]="");var d=k({},o.styles);ta(a)&&(d.transform=Hf({transform:a,startCentered:!0,width:n,height:r}),d["-webkit-transform"]=d.transform);var m=Fn(d);m.length>0&&(u.style=m);var b=[];return b.push({tag:"span",attributes:u,children:[e]}),i&&b.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),b}function cc(t){var e=t.content,n=t.title,r=t.extra,a=k(k(k({},r.attributes),n?{title:n}:{}),{},{class:r.classes.join(" ")}),i=Fn(r.styles);i.length>0&&(a.style=i);var o=[];return o.push({tag:"span",attributes:a,children:[e]}),n&&o.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),o}var tr=bt.styles;function _r(t){var e=t[0],n=t[1],r=t.slice(4),a=Gr(r,1),i=a[0],o=null;return Array.isArray(i)?o={tag:"g",attributes:{class:"".concat(C.cssPrefix,"-").concat(Qt.GROUP)},children:[{tag:"path",attributes:{class:"".concat(C.cssPrefix,"-").concat(Qt.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(C.cssPrefix,"-").concat(Qt.PRIMARY),fill:"currentColor",d:i[1]}}]}:o={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:e,height:n,icon:o}}var uc={found:!1,width:512,height:512};function dc(t,e){!uo&&!C.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function Ar(t,e){var n=e;return e==="fa"&&C.styleDefault!==null&&(e=Wt()),new Promise(function(r,a){if(Nt("missingIconAbstract"),n==="fa"){var i=Eo(t)||{};t=i.iconName||t,e=i.prefix||e}if(t&&e&&tr[e]&&tr[e][t]){var o=tr[e][t];return r(_r(o))}dc(t,e),r(k(k({},uc),{},{icon:C.showMissingIcons&&t?Nt("missingIconAbstract")||{}:{}}))})}var ri=function(){},kr=C.measurePerformance&&tn&&tn.mark&&tn.measure?tn:{mark:ri,measure:ri},Ee='FA "6.5.1"',mc=function(e){return kr.mark("".concat(Ee," ").concat(e," begins")),function(){return Oo(e)}},Oo=function(e){kr.mark("".concat(Ee," ").concat(e," ends")),kr.measure("".concat(Ee," ").concat(e),"".concat(Ee," ").concat(e," begins"),"".concat(Ee," ").concat(e," ends"))},ia={begin:mc,end:Oo},pn=function(){};function ai(t){var e=t.getAttribute?t.getAttribute(re):null;return typeof e=="string"}function hc(t){var e=t.getAttribute?t.getAttribute(qr):null,n=t.getAttribute?t.getAttribute(Jr):null;return e&&n}function pc(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(C.replacementClass)}function gc(){if(C.autoReplaceSvg===!0)return gn.replace;var t=gn[C.autoReplaceSvg];return t||gn.replace}function vc(t){return K.createElementNS("http://www.w3.org/2000/svg",t)}function bc(t){return K.createElement(t)}function So(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.ceFn,r=n===void 0?t.tag==="svg"?vc:bc:n;if(typeof t=="string")return K.createTextNode(t);var a=r(t.tag);Object.keys(t.attributes||[]).forEach(function(o){a.setAttribute(o,t.attributes[o])});var i=t.children||[];return i.forEach(function(o){a.appendChild(So(o,{ceFn:r}))}),a}function yc(t){var e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}var gn={replace:function(e){var n=e[0];if(n.parentNode)if(e[1].forEach(function(a){n.parentNode.insertBefore(So(a),n)}),n.getAttribute(re)===null&&C.keepOriginalSource){var r=K.createComment(yc(n));n.parentNode.replaceChild(r,n)}else n.remove()},nest:function(e){var n=e[0],r=e[1];if(~Zr(n).indexOf(C.replacementClass))return gn.replace(e);var a=new RegExp("".concat(C.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var i=r[0].attributes.class.split(" ").reduce(function(s,l){return l===C.replacementClass||l.match(a)?s.toSvg.push(l):s.toNode.push(l),s},{toNode:[],toSvg:[]});r[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?n.removeAttribute("class"):n.setAttribute("class",i.toNode.join(" "))}var o=r.map(function(s){return Ve(s)}).join(`
`);n.setAttribute(re,""),n.innerHTML=o}};function ii(t){t()}function Po(t,e){var n=typeof e=="function"?e:pn;if(t.length===0)n();else{var r=ii;C.mutateApproach===Af&&(r=Yt.requestAnimationFrame||ii),r(function(){var a=gc(),i=ia.begin("mutate");t.map(a),i(),n()})}}var oa=!1;function To(){oa=!0}function Er(){oa=!1}var kn=null;function oi(t){if(Xa&&C.observeMutations){var e=t.treeCallback,n=e===void 0?pn:e,r=t.nodeCallback,a=r===void 0?pn:r,i=t.pseudoElementsCallback,o=i===void 0?pn:i,s=t.observeMutationsRoot,l=s===void 0?K:s;kn=new Xa(function(u){if(!oa){var d=Wt();xe(u).forEach(function(m){if(m.type==="childList"&&m.addedNodes.length>0&&!ai(m.addedNodes[0])&&(C.searchPseudoElements&&o(m.target),n(m.target)),m.type==="attributes"&&m.target.parentNode&&C.searchPseudoElements&&o(m.target.parentNode),m.type==="attributes"&&ai(m.target)&&~Tf.indexOf(m.attributeName))if(m.attributeName==="class"&&hc(m.target)){var b=jn(Zr(m.target)),A=b.prefix,R=b.iconName;m.target.setAttribute(qr,A||d),R&&m.target.setAttribute(Jr,R)}else pc(m.target)&&a(m.target)})}}),Rt&&kn.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function xc(){kn&&kn.disconnect()}function wc(t){var e=t.getAttribute("style"),n=[];return e&&(n=e.split(";").reduce(function(r,a){var i=a.split(":"),o=i[0],s=i.slice(1);return o&&s.length>0&&(r[o]=s.join(":").trim()),r},{})),n}function _c(t){var e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),r=t.innerText!==void 0?t.innerText.trim():"",a=jn(Zr(t));return a.prefix||(a.prefix=Wt()),e&&n&&(a.prefix=e,a.iconName=n),a.iconName&&a.prefix||(a.prefix&&r.length>0&&(a.iconName=Zf(a.prefix,t.innerText)||na(a.prefix,br(t.innerText))),!a.iconName&&C.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(a.iconName=t.firstChild.data)),a}function Ac(t){var e=xe(t.attributes).reduce(function(a,i){return a.name!=="class"&&a.name!=="style"&&(a[i.name]=i.value),a},{}),n=t.getAttribute("title"),r=t.getAttribute("data-fa-title-id");return C.autoA11y&&(n?e["aria-labelledby"]="".concat(C.replacementClass,"-title-").concat(r||$e()):(e["aria-hidden"]="true",e.focusable="false")),e}function kc(){return{iconName:null,title:null,titleId:null,prefix:null,transform:Ct,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function si(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=_c(t),r=n.iconName,a=n.prefix,i=n.rest,o=Ac(t),s=xr("parseNodeAttributes",{},t),l=e.styleParser?wc(t):[];return k({iconName:r,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:a,transform:Ct,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:l,attributes:o}},s)}var Ec=bt.styles;function Io(t){var e=C.autoReplaceSvg==="nest"?si(t,{styleParser:!1}):si(t);return~e.extra.classes.indexOf(mo)?Nt("generateLayersText",t,e):Nt("generateSvgReplacementMutation",t,e)}var Bt=new Set;Qr.map(function(t){Bt.add("fa-".concat(t))});Object.keys(Re[B]).map(Bt.add.bind(Bt));Object.keys(Re[J]).map(Bt.add.bind(Bt));Bt=De(Bt);function li(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!Rt)return Promise.resolve();var n=K.documentElement.classList,r=function(m){return n.add("".concat(qa,"-").concat(m))},a=function(m){return n.remove("".concat(qa,"-").concat(m))},i=C.autoFetchSvg?Bt:Qr.map(function(d){return"fa-".concat(d)}).concat(Object.keys(Ec));i.includes("fa")||i.push("fa");var o=[".".concat(mo,":not([").concat(re,"])")].concat(i.map(function(d){return".".concat(d,":not([").concat(re,"])")})).join(", ");if(o.length===0)return Promise.resolve();var s=[];try{s=xe(t.querySelectorAll(o))}catch{}if(s.length>0)r("pending"),a("complete");else return Promise.resolve();var l=ia.begin("onTree"),u=s.reduce(function(d,m){try{var b=Io(m);b&&d.push(b)}catch(A){uo||A.name==="MissingIcon"&&console.error(A)}return d},[]);return new Promise(function(d,m){Promise.all(u).then(function(b){Po(b,function(){r("active"),r("complete"),a("pending"),typeof e=="function"&&e(),l(),d()})}).catch(function(b){l(),m(b)})})}function Cc(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Io(t).then(function(n){n&&Po([n],e)})}function Oc(t){return function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(e||{}).icon?e:wr(e||{}),a=n.mask;return a&&(a=(a||{}).icon?a:wr(a||{})),t(r,k(k({},n),{},{mask:a}))}}var Sc=function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.transform,a=r===void 0?Ct:r,i=n.symbol,o=i===void 0?!1:i,s=n.mask,l=s===void 0?null:s,u=n.maskId,d=u===void 0?null:u,m=n.title,b=m===void 0?null:m,A=n.titleId,R=A===void 0?null:A,T=n.classes,j=T===void 0?[]:T,$=n.attributes,V=$===void 0?{}:$,I=n.styles,H=I===void 0?{}:I;if(e){var Y=e.prefix,N=e.iconName,et=e.icon;return $n(k({type:"icon"},e),function(){return ae("beforeDOMElementCreation",{iconDefinition:e,params:n}),C.autoA11y&&(b?V["aria-labelledby"]="".concat(C.replacementClass,"-title-").concat(R||$e()):(V["aria-hidden"]="true",V.focusable="false")),aa({icons:{main:_r(et),mask:l?_r(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:Y,iconName:N,transform:k(k({},Ct),a),symbol:o,title:b,maskId:d,titleId:R,extra:{attributes:V,styles:H,classes:j}})})}},Pc={mixout:function(){return{icon:Oc(Sc)}},hooks:function(){return{mutationObserverCallbacks:function(n){return n.treeCallback=li,n.nodeCallback=Cc,n}}},provides:function(e){e.i2svg=function(n){var r=n.node,a=r===void 0?K:r,i=n.callback,o=i===void 0?function(){}:i;return li(a,o)},e.generateSvgReplacementMutation=function(n,r){var a=r.iconName,i=r.title,o=r.titleId,s=r.prefix,l=r.transform,u=r.symbol,d=r.mask,m=r.maskId,b=r.extra;return new Promise(function(A,R){Promise.all([Ar(a,s),d.iconName?Ar(d.iconName,d.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(T){var j=Gr(T,2),$=j[0],V=j[1];A([n,aa({icons:{main:$,mask:V},prefix:s,iconName:a,transform:l,symbol:u,maskId:m,title:i,titleId:o,extra:b,watchable:!0})])}).catch(R)})},e.generateAbstractIcon=function(n){var r=n.children,a=n.attributes,i=n.main,o=n.transform,s=n.styles,l=Fn(s);l.length>0&&(a.style=l);var u;return ta(o)&&(u=Nt("generateAbstractTransformGrouping",{main:i,transform:o,containerWidth:i.width,iconWidth:i.width})),r.push(u||i.icon),{children:r,attributes:a}}}},Tc={mixout:function(){return{layer:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.classes,i=a===void 0?[]:a;return $n({type:"layer"},function(){ae("beforeDOMElementCreation",{assembler:n,params:r});var o=[];return n(function(s){Array.isArray(s)?s.map(function(l){o=o.concat(l.abstract)}):o=o.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(C.cssPrefix,"-layers")].concat(De(i)).join(" ")},children:o}]})}}}},Ic={mixout:function(){return{counter:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.title,i=a===void 0?null:a,o=r.classes,s=o===void 0?[]:o,l=r.attributes,u=l===void 0?{}:l,d=r.styles,m=d===void 0?{}:d;return $n({type:"counter",content:n},function(){return ae("beforeDOMElementCreation",{content:n,params:r}),cc({content:n.toString(),title:i,extra:{attributes:u,styles:m,classes:["".concat(C.cssPrefix,"-layers-counter")].concat(De(s))}})})}}}},Mc={mixout:function(){return{text:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.transform,i=a===void 0?Ct:a,o=r.title,s=o===void 0?null:o,l=r.classes,u=l===void 0?[]:l,d=r.attributes,m=d===void 0?{}:d,b=r.styles,A=b===void 0?{}:b;return $n({type:"text",content:n},function(){return ae("beforeDOMElementCreation",{content:n,params:r}),ni({content:n,transform:k(k({},Ct),i),title:s,extra:{attributes:m,styles:A,classes:["".concat(C.cssPrefix,"-layers-text")].concat(De(u))}})})}}},provides:function(e){e.generateLayersText=function(n,r){var a=r.title,i=r.transform,o=r.extra,s=null,l=null;if(lo){var u=parseInt(getComputedStyle(n).fontSize,10),d=n.getBoundingClientRect();s=d.width/u,l=d.height/u}return C.autoA11y&&!a&&(o.attributes["aria-hidden"]="true"),Promise.resolve([n,ni({content:n.innerHTML,width:s,height:l,transform:i,title:a,extra:o,watchable:!0})])}}},Nc=new RegExp('"',"ug"),fi=[1105920,1112319];function Lc(t){var e=t.replace(Nc,""),n=Kf(e,0),r=n>=fi[0]&&n<=fi[1],a=e.length===2?e[0]===e[1]:!1;return{value:br(a?e[0]:e),isSecondary:r||a}}function ci(t,e){var n="".concat(_f).concat(e.replace(":","-"));return new Promise(function(r,a){if(t.getAttribute(n)!==null)return r();var i=xe(t.children),o=i.filter(function(et){return et.getAttribute(vr)===e})[0],s=Yt.getComputedStyle(t,e),l=s.getPropertyValue("font-family").match(Of),u=s.getPropertyValue("font-weight"),d=s.getPropertyValue("content");if(o&&!l)return t.removeChild(o),r();if(l&&d!=="none"&&d!==""){var m=s.getPropertyValue("content"),b=~["Sharp"].indexOf(l[2])?J:B,A=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(l[2])?Fe[b][l[2].toLowerCase()]:Sf[b][u],R=Lc(m),T=R.value,j=R.isSecondary,$=l[0].startsWith("FontAwesome"),V=na(A,T),I=V;if($){var H=tc(T);H.iconName&&H.prefix&&(V=H.iconName,A=H.prefix)}if(V&&!j&&(!o||o.getAttribute(qr)!==A||o.getAttribute(Jr)!==I)){t.setAttribute(n,I),o&&t.removeChild(o);var Y=kc(),N=Y.extra;N.attributes[vr]=e,Ar(V,A).then(function(et){var lt=aa(k(k({},Y),{},{icons:{main:et,mask:ra()},prefix:A,iconName:I,extra:N,watchable:!0})),ht=K.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?t.insertBefore(ht,t.firstChild):t.appendChild(ht),ht.outerHTML=lt.map(function(Ot){return Ve(Ot)}).join(`
`),t.removeAttribute(n),r()}).catch(a)}else r()}else r()})}function Rc(t){return Promise.all([ci(t,"::before"),ci(t,"::after")])}function Fc(t){return t.parentNode!==document.head&&!~kf.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(vr)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function ui(t){if(Rt)return new Promise(function(e,n){var r=xe(t.querySelectorAll("*")).filter(Fc).map(Rc),a=ia.begin("searchPseudoElements");To(),Promise.all(r).then(function(){a(),Er(),e()}).catch(function(){a(),Er(),n()})})}var zc={hooks:function(){return{mutationObserverCallbacks:function(n){return n.pseudoElementsCallback=ui,n}}},provides:function(e){e.pseudoElements2svg=function(n){var r=n.node,a=r===void 0?K:r;C.searchPseudoElements&&ui(a)}}},di=!1,jc={mixout:function(){return{dom:{unwatch:function(){To(),di=!0}}}},hooks:function(){return{bootstrap:function(){oi(xr("mutationObserverCallbacks",{}))},noAuto:function(){xc()},watch:function(n){var r=n.observeMutationsRoot;di?Er():oi(xr("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},mi=function(e){var n={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return e.toLowerCase().split(" ").reduce(function(r,a){var i=a.toLowerCase().split("-"),o=i[0],s=i.slice(1).join("-");if(o&&s==="h")return r.flipX=!0,r;if(o&&s==="v")return r.flipY=!0,r;if(s=parseFloat(s),isNaN(s))return r;switch(o){case"grow":r.size=r.size+s;break;case"shrink":r.size=r.size-s;break;case"left":r.x=r.x-s;break;case"right":r.x=r.x+s;break;case"up":r.y=r.y-s;break;case"down":r.y=r.y+s;break;case"rotate":r.rotate=r.rotate+s;break}return r},n)},$c={mixout:function(){return{parse:{transform:function(n){return mi(n)}}}},hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-transform");return a&&(n.transform=mi(a)),n}}},provides:function(e){e.generateAbstractTransformGrouping=function(n){var r=n.main,a=n.transform,i=n.containerWidth,o=n.iconWidth,s={transform:"translate(".concat(i/2," 256)")},l="translate(".concat(a.x*32,", ").concat(a.y*32,") "),u="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),d="rotate(".concat(a.rotate," 0 0)"),m={transform:"".concat(l," ").concat(u," ").concat(d)},b={transform:"translate(".concat(o/2*-1," -256)")},A={outer:s,inner:m,path:b};return{tag:"g",attributes:k({},A.outer),children:[{tag:"g",attributes:k({},A.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:k(k({},r.icon.attributes),A.path)}]}]}}}},er={x:0,y:0,width:"100%",height:"100%"};function hi(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function Hc(t){return t.tag==="g"?t.children:[t]}var Dc={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-mask"),i=a?jn(a.split(" ").map(function(o){return o.trim()})):ra();return i.prefix||(i.prefix=Wt()),n.mask=i,n.maskId=r.getAttribute("data-fa-mask-id"),n}}},provides:function(e){e.generateAbstractMask=function(n){var r=n.children,a=n.attributes,i=n.main,o=n.mask,s=n.maskId,l=n.transform,u=i.width,d=i.icon,m=o.width,b=o.icon,A=$f({transform:l,containerWidth:m,iconWidth:u}),R={tag:"rect",attributes:k(k({},er),{},{fill:"white"})},T=d.children?{children:d.children.map(hi)}:{},j={tag:"g",attributes:k({},A.inner),children:[hi(k({tag:d.tag,attributes:k(k({},d.attributes),A.path)},T))]},$={tag:"g",attributes:k({},A.outer),children:[j]},V="mask-".concat(s||$e()),I="clip-".concat(s||$e()),H={tag:"mask",attributes:k(k({},er),{},{id:V,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[R,$]},Y={tag:"defs",children:[{tag:"clipPath",attributes:{id:I},children:Hc(b)},H]};return r.push(Y,{tag:"rect",attributes:k({fill:"currentColor","clip-path":"url(#".concat(I,")"),mask:"url(#".concat(V,")")},er)}),{children:r,attributes:a}}}},Uc={provides:function(e){var n=!1;Yt.matchMedia&&(n=Yt.matchMedia("(prefers-reduced-motion: reduce)").matches),e.missingIconAbstract=function(){var r=[],a={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:k(k({},a),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var o=k(k({},i),{},{attributeName:"opacity"}),s={tag:"circle",attributes:k(k({},a),{},{cx:"256",cy:"364",r:"28"}),children:[]};return n||s.children.push({tag:"animate",attributes:k(k({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:k(k({},o),{},{values:"1;0;1;1;0;1;"})}),r.push(s),r.push({tag:"path",attributes:k(k({},a),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:n?[]:[{tag:"animate",attributes:k(k({},o),{},{values:"1;0;0;0;0;1;"})}]}),n||r.push({tag:"path",attributes:k(k({},a),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:k(k({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},Vc={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-symbol"),i=a===null?!1:a===""?!0:a;return n.symbol=i,n}}}},Yc=[Uf,Pc,Tc,Ic,Mc,zc,jc,$c,Dc,Uc,Vc];rc(Yc,{mixoutsTo:mt});mt.noAuto;mt.config;var Wc=mt.library;mt.dom;mt.parse;mt.findIconDefinition;mt.toHtml;mt.icon;mt.layer;mt.text;mt.counter;var Bc={prefix:"fas",iconName:"gem",icon:[512,512,[128142],"f3a5","M116.7 33.8c4.5-6.1 11.7-9.8 19.3-9.8H376c7.6 0 14.8 3.6 19.3 9.8l112 152c6.8 9.2 6.1 21.9-1.5 30.4l-232 256c-4.5 5-11 7.9-17.8 7.9s-13.2-2.9-17.8-7.9l-232-256c-7.7-8.5-8.3-21.2-1.5-30.4l112-152zm38.5 39.8c-3.3 2.5-4.2 7-2.1 10.5l57.4 95.6L63.3 192c-4.1 .3-7.3 3.8-7.3 8s3.2 7.6 7.3 8l192 16c.4 0 .9 0 1.3 0l192-16c4.1-.3 7.3-3.8 7.3-8s-3.2-7.6-7.3-8L301.5 179.8l57.4-95.6c2.1-3.5 1.2-8.1-2.1-10.5s-7.9-2-10.7 1L256 172.2 165.9 74.6c-2.8-3-7.4-3.4-10.7-1z"]},Kc={prefix:"fas",iconName:"snowflake",icon:[448,512,[10052,10054],"f2dc","M224 0c17.7 0 32 14.3 32 32V62.1l15-15c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-49 49v70.3l61.4-35.8 17.7-66.1c3.4-12.8 16.6-20.4 29.4-17s20.4 16.6 17 29.4l-5.2 19.3 23.6-13.8c15.3-8.9 34.9-3.7 43.8 11.5s3.8 34.9-11.5 43.8l-25.3 14.8 21.7 5.8c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17l-67.7-18.1L287.5 256l60.9 35.5 67.7-18.1c12.8-3.4 26 4.2 29.4 17s-4.2 26-17 29.4l-21.7 5.8 25.3 14.8c15.3 8.9 20.4 28.5 11.5 43.8s-28.5 20.4-43.8 11.5l-23.6-13.8 5.2 19.3c3.4 12.8-4.2 26-17 29.4s-26-4.2-29.4-17l-17.7-66.1L256 311.7v70.3l49 49c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-15-15V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V449.9l-15 15c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l49-49V311.7l-61.4 35.8-17.7 66.1c-3.4 12.8-16.6 20.4-29.4 17s-20.4-16.6-17-29.4l5.2-19.3L48.1 395.6c-15.3 8.9-34.9 3.7-43.8-11.5s-3.7-34.9 11.5-43.8l25.3-14.8-21.7-5.8c-12.8-3.4-20.4-16.6-17-29.4s16.6-20.4 29.4-17l67.7 18.1L160.5 256 99.6 220.5 31.9 238.6c-12.8 3.4-26-4.2-29.4-17s4.2-26 17-29.4l21.7-5.8L15.9 171.6C.6 162.7-4.5 143.1 4.4 127.9s28.5-20.4 43.8-11.5l23.6 13.8-5.2-19.3c-3.4-12.8 4.2-26 17-29.4s26 4.2 29.4 17l17.7 66.1L192 200.3V129.9L143 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l15 15V32c0-17.7 14.3-32 32-32z"]},Gc={prefix:"fas",iconName:"leaf",icon:[512,512,[],"f06c","M272 96c-78.6 0-145.1 51.5-167.7 122.5c33.6-17 71.5-26.5 111.7-26.5h88c8.8 0 16 7.2 16 16s-7.2 16-16 16H288 216s0 0 0 0c-16.6 0-32.7 1.9-48.3 5.4c-25.9 5.9-49.9 16.4-71.4 30.7c0 0 0 0 0 0C38.3 298.8 0 364.9 0 440v16c0 13.3 10.7 24 24 24s24-10.7 24-24V440c0-48.7 20.7-92.5 53.8-123.2C121.6 392.3 190.3 448 272 448l1 0c132.1-.7 239-130.9 239-291.4c0-42.6-7.5-83.1-21.1-119.6c-2.6-6.9-12.7-6.6-16.2-.1C455.9 72.1 418.7 96 376 96L272 96z"]},Xc={prefix:"fas",iconName:"clock",icon:[512,512,[128339,"clock-four"],"f017","M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"]},qc={prefix:"fas",iconName:"skull",icon:[512,512,[128128],"f54c","M416 398.9c58.5-41.1 96-104.1 96-174.9C512 100.3 397.4 0 256 0S0 100.3 0 224c0 70.7 37.5 133.8 96 174.9c0 .4 0 .7 0 1.1v64c0 26.5 21.5 48 48 48h48V464c0-8.8 7.2-16 16-16s16 7.2 16 16v48h64V464c0-8.8 7.2-16 16-16s16 7.2 16 16v48h48c26.5 0 48-21.5 48-48V400c0-.4 0-.7 0-1.1zM96 256a64 64 0 1 1 128 0A64 64 0 1 1 96 256zm256-64a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"]},Jc={prefix:"fas",iconName:"sun",icon:[512,512,[9728],"f185","M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"]},Qc={prefix:"fas",iconName:"toolbox",icon:[512,512,[129520],"f552","M176 88v40H336V88c0-4.4-3.6-8-8-8H184c-4.4 0-8 3.6-8 8zm-48 40V88c0-30.9 25.1-56 56-56H328c30.9 0 56 25.1 56 56v40h28.1c12.7 0 24.9 5.1 33.9 14.1l51.9 51.9c9 9 14.1 21.2 14.1 33.9V304H384V288c0-17.7-14.3-32-32-32s-32 14.3-32 32v16H192V288c0-17.7-14.3-32-32-32s-32 14.3-32 32v16H0V227.9c0-12.7 5.1-24.9 14.1-33.9l51.9-51.9c9-9 21.2-14.1 33.9-14.1H128zM0 416V336H128v16c0 17.7 14.3 32 32 32s32-14.3 32-32V336H320v16c0 17.7 14.3 32 32 32s32-14.3 32-32V336H512v80c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64z"]},Zc={prefix:"fas",iconName:"moon",icon:[384,512,[127769,9214],"f186","M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"]},tu={prefix:"fas",iconName:"mug-saucer",icon:[640,512,["coffee"],"f0f4","M96 64c0-17.7 14.3-32 32-32H448h64c70.7 0 128 57.3 128 128s-57.3 128-128 128H480c0 53-43 96-96 96H192c-53 0-96-43-96-96V64zM480 224h32c35.3 0 64-28.7 64-64s-28.7-64-64-64H480V224zM32 416H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32z"]},eu=tu,nu={prefix:"fab",iconName:"github",icon:[496,512,[],"f09b","M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"]},ru={prefix:"fab",iconName:"canadian-maple-leaf",icon:[512,512,[],"f785","M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"]};Wc.add(Kc,Jc,Xc,qc,Bc,Zc,Qc,eu,nu,ru,Gc);const au=rf(df);au.mount("#app");
