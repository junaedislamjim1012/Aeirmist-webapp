const $I=()=>{};var Id={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sp=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},GI=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Pp={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,u=s+2<n.length,l=u?n[s+2]:0,d=i>>2,p=(i&3)<<4|c>>4;let g=(c&15)<<2|l>>6,w=l&63;u||(w=64,o||(g=64)),r.push(t[d],t[p],t[g],t[w])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Sp(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):GI(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const l=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||l==null||p==null)throw new HI;const g=i<<2|c>>4;if(r.push(g),l!==64){const w=c<<4&240|l>>2;if(r.push(w),p!==64){const C=l<<6&192|p;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class HI extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const KI=function(n){const e=Sp(n);return Pp.encodeByteArray(e,!0)},Qo=function(n){return KI(n).replace(/\./g,"")},Cp=function(n){try{return Pp.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WI=()=>kp().__FIREBASE_DEFAULTS__,QI=()=>{if(typeof process>"u"||typeof Id>"u")return;const n=Id.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},JI=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Cp(n[1]);return e&&JSON.parse(e)},Ia=()=>{try{return $I()||WI()||QI()||JI()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Dp=n=>Ia()?.emulatorHosts?.[n],Np=n=>{const e=Dp(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Vp=()=>Ia()?.config,Op=n=>Ia()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YI{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xp(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Qo(JSON.stringify(t)),Qo(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ce(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function XI(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ce())}function Lp(){const n=Ia()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function ZI(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function eE(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function tE(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function nE(){const n=Ce();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Mp(){return!Lp()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Fp(){return!Lp()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function Up(){try{return typeof indexedDB=="object"}catch{return!1}}function rE(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sE="FirebaseError";class kt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=sE,Object.setPrototypeOf(this,kt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,zi.prototype.create)}}class zi{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?iE(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new kt(s,c,r)}}function iE(n,e){return n.replace(oE,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const oE=/\{\$([^}]+)}/g;function aE(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function pt(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(Ed(i)&&Ed(o)){if(!pt(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Ed(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fs(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ri(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function si(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function cE(n,e){const t=new uE(n,e);return t.subscribe.bind(t)}class uE{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");lE(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Sc),s.error===void 0&&(s.error=Sc),s.complete===void 0&&(s.complete=Sc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function lE(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Sc(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ea(n){return(await fetch(n,{credentials:"include"})).ok}class wn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hE{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new YI;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(fE(e))try{this.getOrInitializeService({instanceIdentifier:Kn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Kn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Kn){return this.instances.has(e)}getOptions(e=Kn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:dE(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Kn){return this.component?this.component.multipleInstances?e:Kn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function dE(n){return n===Kn?void 0:n}function fE(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pE{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new hE(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var X;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(X||(X={}));const mE={debug:X.DEBUG,verbose:X.VERBOSE,info:X.INFO,warn:X.WARN,error:X.ERROR,silent:X.SILENT},gE=X.INFO,_E={[X.DEBUG]:"log",[X.VERBOSE]:"log",[X.INFO]:"info",[X.WARN]:"warn",[X.ERROR]:"error"},yE=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=_E[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Lu{constructor(e){this.name=e,this._logLevel=gE,this._logHandler=yE,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in X))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?mE[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,X.DEBUG,...e),this._logHandler(this,X.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,X.VERBOSE,...e),this._logHandler(this,X.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,X.INFO,...e),this._logHandler(this,X.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,X.WARN,...e),this._logHandler(this,X.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,X.ERROR,...e),this._logHandler(this,X.ERROR,...e)}}const IE=(n,e)=>e.some(t=>n instanceof t);let Td,wd;function EE(){return Td||(Td=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function TE(){return wd||(wd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Bp=new WeakMap,Yc=new WeakMap,qp=new WeakMap,Pc=new WeakMap,Mu=new WeakMap;function wE(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(gn(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Bp.set(t,n)}).catch(()=>{}),Mu.set(e,n),e}function vE(n){if(Yc.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});Yc.set(n,e)}let Xc={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Yc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||qp.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return gn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function AE(n){Xc=n(Xc)}function RE(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Cc(this),e,...t);return qp.set(r,e.sort?e.sort():[e]),gn(r)}:TE().includes(n)?function(...e){return n.apply(Cc(this),e),gn(Bp.get(this))}:function(...e){return gn(n.apply(Cc(this),e))}}function bE(n){return typeof n=="function"?RE(n):(n instanceof IDBTransaction&&vE(n),IE(n,EE())?new Proxy(n,Xc):n)}function gn(n){if(n instanceof IDBRequest)return wE(n);if(Pc.has(n))return Pc.get(n);const e=bE(n);return e!==n&&(Pc.set(n,e),Mu.set(e,n)),e}const Cc=n=>Mu.get(n);function SE(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),c=gn(o);return r&&o.addEventListener("upgradeneeded",u=>{r(gn(o.result),u.oldVersion,u.newVersion,gn(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const PE=["get","getKey","getAll","getAllKeys","count"],CE=["put","add","delete","clear"],kc=new Map;function vd(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(kc.get(e))return kc.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=CE.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||PE.includes(t)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let l=u.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[t](...c),s&&u.done]))[0]};return kc.set(e,i),i}AE(n=>({...n,get:(e,t,r)=>vd(e,t)||n.get(e,t,r),has:(e,t)=>!!vd(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kE{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(DE(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function DE(n){return n.getComponent()?.type==="VERSION"}const Zc="@firebase/app",Ad="0.14.12";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qt=new Lu("@firebase/app"),NE="@firebase/app-compat",VE="@firebase/analytics-compat",OE="@firebase/analytics",xE="@firebase/app-check-compat",LE="@firebase/app-check",ME="@firebase/auth",FE="@firebase/auth-compat",UE="@firebase/database",BE="@firebase/data-connect",qE="@firebase/database-compat",zE="@firebase/functions",jE="@firebase/functions-compat",$E="@firebase/installations",GE="@firebase/installations-compat",HE="@firebase/messaging",KE="@firebase/messaging-compat",WE="@firebase/performance",QE="@firebase/performance-compat",JE="@firebase/remote-config",YE="@firebase/remote-config-compat",XE="@firebase/storage",ZE="@firebase/storage-compat",eT="@firebase/firestore",tT="@firebase/ai",nT="@firebase/firestore-compat",rT="firebase",sT="12.13.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jo="[DEFAULT]",iT={[Zc]:"fire-core",[NE]:"fire-core-compat",[OE]:"fire-analytics",[VE]:"fire-analytics-compat",[LE]:"fire-app-check",[xE]:"fire-app-check-compat",[ME]:"fire-auth",[FE]:"fire-auth-compat",[UE]:"fire-rtdb",[BE]:"fire-data-connect",[qE]:"fire-rtdb-compat",[zE]:"fire-fn",[jE]:"fire-fn-compat",[$E]:"fire-iid",[GE]:"fire-iid-compat",[HE]:"fire-fcm",[KE]:"fire-fcm-compat",[WE]:"fire-perf",[QE]:"fire-perf-compat",[JE]:"fire-rc",[YE]:"fire-rc-compat",[XE]:"fire-gcs",[ZE]:"fire-gcs-compat",[eT]:"fire-fst",[nT]:"fire-fst-compat",[tT]:"fire-vertex","fire-js":"fire-js",[rT]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ai=new Map,oT=new Map,eu=new Map;function Rd(n,e){try{n.container.addComponent(e)}catch(t){qt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function ar(n){const e=n.name;if(eu.has(e))return qt.debug(`There were multiple attempts to register component ${e}.`),!1;eu.set(e,n);for(const t of Ai.values())Rd(t,n);for(const t of oT.values())Rd(t,n);return!0}function ps(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function aT(n,e,t=Jo){ps(n,e).clearInstance(t)}function ge(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cT={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},_n=new zi("app","Firebase",cT);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uT{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new wn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw _n.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gr=sT;function lT(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Jo,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw _n.create("bad-app-name",{appName:String(s)});if(t||(t=Vp()),!t)throw _n.create("no-options");const i=Ai.get(s);if(i){if(pt(t,i.options)&&pt(r,i.config))return i;throw _n.create("duplicate-app",{appName:s})}const o=new pE(s);for(const u of eu.values())o.addComponent(u);const c=new uT(t,r,o);return Ai.set(s,c),c}function Fu(n=Jo){const e=Ai.get(n);if(!e&&n===Jo&&Vp())return lT();if(!e)throw _n.create("no-app",{appName:n});return e}function yD(){return Array.from(Ai.values())}function At(n,e,t){let r=iT[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),qt.warn(o.join(" "));return}ar(new wn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hT="firebase-heartbeat-database",dT=1,Ri="firebase-heartbeat-store";let Dc=null;function zp(){return Dc||(Dc=SE(hT,dT,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ri)}catch(t){console.warn(t)}}}}).catch(n=>{throw _n.create("idb-open",{originalErrorMessage:n.message})})),Dc}async function fT(n){try{const t=(await zp()).transaction(Ri),r=await t.objectStore(Ri).get(jp(n));return await t.done,r}catch(e){if(e instanceof kt)qt.warn(e.message);else{const t=_n.create("idb-get",{originalErrorMessage:e?.message});qt.warn(t.message)}}}async function bd(n,e){try{const r=(await zp()).transaction(Ri,"readwrite");await r.objectStore(Ri).put(e,jp(n)),await r.done}catch(t){if(t instanceof kt)qt.warn(t.message);else{const r=_n.create("idb-set",{originalErrorMessage:t?.message});qt.warn(r.message)}}}function jp(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pT=1024,mT=30;class gT{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new yT(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Sd();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>mT){const s=IT(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){qt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Sd(),{heartbeatsToSend:t,unsentEntries:r}=_T(this._heartbeatsCache.heartbeats),s=Qo(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return qt.warn(e),""}}}function Sd(){return new Date().toISOString().substring(0,10)}function _T(n,e=pT){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Pd(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Pd(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class yT{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Up()?rE().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await fT(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return bd(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return bd(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Pd(n){return Qo(JSON.stringify({version:2,heartbeats:n})).length}function IT(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ET(n){ar(new wn("platform-logger",e=>new kE(e),"PRIVATE")),ar(new wn("heartbeat",e=>new gT(e),"PRIVATE")),At(Zc,Ad,n),At(Zc,Ad,"esm2020"),At("fire-js","")}ET("");/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TT={PHONE:"phone",TOTP:"totp"},wT={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",PHONE:"phone",TWITTER:"twitter.com"},vT={EMAIL_LINK:"emailLink",EMAIL_PASSWORD:"password",FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PHONE:"phone",TWITTER:"twitter.com"},AT={LINK:"link",REAUTHENTICATE:"reauthenticate",SIGN_IN:"signIn"},RT={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bT(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registered for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is incorrect, malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend.","unsupported-password-policy-schema-version":"The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.","password-does-not-meet-requirements":"The password does not meet the requirements.","invalid-hosting-link-domain":"The provided Hosting link domain is not configured in Firebase Hosting or is not owned by the current project. This cannot be a default Hosting domain (`web.app` or `firebaseapp.com`)."}}function $p(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const ST=bT,Gp=$p,Hp=new zi("auth","Firebase",$p()),PT={ADMIN_ONLY_OPERATION:"auth/admin-restricted-operation",ARGUMENT_ERROR:"auth/argument-error",APP_NOT_AUTHORIZED:"auth/app-not-authorized",APP_NOT_INSTALLED:"auth/app-not-installed",CAPTCHA_CHECK_FAILED:"auth/captcha-check-failed",CODE_EXPIRED:"auth/code-expired",CORDOVA_NOT_READY:"auth/cordova-not-ready",CORS_UNSUPPORTED:"auth/cors-unsupported",CREDENTIAL_ALREADY_IN_USE:"auth/credential-already-in-use",CREDENTIAL_MISMATCH:"auth/custom-token-mismatch",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"auth/requires-recent-login",DEPENDENT_SDK_INIT_BEFORE_AUTH:"auth/dependent-sdk-initialized-before-auth",DYNAMIC_LINK_NOT_ACTIVATED:"auth/dynamic-link-not-activated",EMAIL_CHANGE_NEEDS_VERIFICATION:"auth/email-change-needs-verification",EMAIL_EXISTS:"auth/email-already-in-use",EMULATOR_CONFIG_FAILED:"auth/emulator-config-failed",EXPIRED_OOB_CODE:"auth/expired-action-code",EXPIRED_POPUP_REQUEST:"auth/cancelled-popup-request",INTERNAL_ERROR:"auth/internal-error",INVALID_API_KEY:"auth/invalid-api-key",INVALID_APP_CREDENTIAL:"auth/invalid-app-credential",INVALID_APP_ID:"auth/invalid-app-id",INVALID_AUTH:"auth/invalid-user-token",INVALID_AUTH_EVENT:"auth/invalid-auth-event",INVALID_CERT_HASH:"auth/invalid-cert-hash",INVALID_CODE:"auth/invalid-verification-code",INVALID_CONTINUE_URI:"auth/invalid-continue-uri",INVALID_CORDOVA_CONFIGURATION:"auth/invalid-cordova-configuration",INVALID_CUSTOM_TOKEN:"auth/invalid-custom-token",INVALID_DYNAMIC_LINK_DOMAIN:"auth/invalid-dynamic-link-domain",INVALID_EMAIL:"auth/invalid-email",INVALID_EMULATOR_SCHEME:"auth/invalid-emulator-scheme",INVALID_IDP_RESPONSE:"auth/invalid-credential",INVALID_LOGIN_CREDENTIALS:"auth/invalid-credential",INVALID_MESSAGE_PAYLOAD:"auth/invalid-message-payload",INVALID_MFA_SESSION:"auth/invalid-multi-factor-session",INVALID_OAUTH_CLIENT_ID:"auth/invalid-oauth-client-id",INVALID_OAUTH_PROVIDER:"auth/invalid-oauth-provider",INVALID_OOB_CODE:"auth/invalid-action-code",INVALID_ORIGIN:"auth/unauthorized-domain",INVALID_PASSWORD:"auth/wrong-password",INVALID_PERSISTENCE:"auth/invalid-persistence-type",INVALID_PHONE_NUMBER:"auth/invalid-phone-number",INVALID_PROVIDER_ID:"auth/invalid-provider-id",INVALID_RECIPIENT_EMAIL:"auth/invalid-recipient-email",INVALID_SENDER:"auth/invalid-sender",INVALID_SESSION_INFO:"auth/invalid-verification-id",INVALID_TENANT_ID:"auth/invalid-tenant-id",MFA_INFO_NOT_FOUND:"auth/multi-factor-info-not-found",MFA_REQUIRED:"auth/multi-factor-auth-required",MISSING_ANDROID_PACKAGE_NAME:"auth/missing-android-pkg-name",MISSING_APP_CREDENTIAL:"auth/missing-app-credential",MISSING_AUTH_DOMAIN:"auth/auth-domain-config-required",MISSING_CODE:"auth/missing-verification-code",MISSING_CONTINUE_URI:"auth/missing-continue-uri",MISSING_IFRAME_START:"auth/missing-iframe-start",MISSING_IOS_BUNDLE_ID:"auth/missing-ios-bundle-id",MISSING_OR_INVALID_NONCE:"auth/missing-or-invalid-nonce",MISSING_MFA_INFO:"auth/missing-multi-factor-info",MISSING_MFA_SESSION:"auth/missing-multi-factor-session",MISSING_PHONE_NUMBER:"auth/missing-phone-number",MISSING_PASSWORD:"auth/missing-password",MISSING_SESSION_INFO:"auth/missing-verification-id",MODULE_DESTROYED:"auth/app-deleted",NEED_CONFIRMATION:"auth/account-exists-with-different-credential",NETWORK_REQUEST_FAILED:"auth/network-request-failed",NULL_USER:"auth/null-user",NO_AUTH_EVENT:"auth/no-auth-event",NO_SUCH_PROVIDER:"auth/no-such-provider",OPERATION_NOT_ALLOWED:"auth/operation-not-allowed",OPERATION_NOT_SUPPORTED:"auth/operation-not-supported-in-this-environment",POPUP_BLOCKED:"auth/popup-blocked",POPUP_CLOSED_BY_USER:"auth/popup-closed-by-user",PROVIDER_ALREADY_LINKED:"auth/provider-already-linked",QUOTA_EXCEEDED:"auth/quota-exceeded",REDIRECT_CANCELLED_BY_USER:"auth/redirect-cancelled-by-user",REDIRECT_OPERATION_PENDING:"auth/redirect-operation-pending",REJECTED_CREDENTIAL:"auth/rejected-credential",SECOND_FACTOR_ALREADY_ENROLLED:"auth/second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"auth/maximum-second-factor-count-exceeded",TENANT_ID_MISMATCH:"auth/tenant-id-mismatch",TIMEOUT:"auth/timeout",TOKEN_EXPIRED:"auth/user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"auth/too-many-requests",UNAUTHORIZED_DOMAIN:"auth/unauthorized-continue-uri",UNSUPPORTED_FIRST_FACTOR:"auth/unsupported-first-factor",UNSUPPORTED_PERSISTENCE:"auth/unsupported-persistence-type",UNSUPPORTED_TENANT_OPERATION:"auth/unsupported-tenant-operation",UNVERIFIED_EMAIL:"auth/unverified-email",USER_CANCELLED:"auth/user-cancelled",USER_DELETED:"auth/user-not-found",USER_DISABLED:"auth/user-disabled",USER_MISMATCH:"auth/user-mismatch",USER_SIGNED_OUT:"auth/user-signed-out",WEAK_PASSWORD:"auth/weak-password",WEB_STORAGE_UNSUPPORTED:"auth/web-storage-unsupported",ALREADY_INITIALIZED:"auth/already-initialized",RECAPTCHA_NOT_ENABLED:"auth/recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"auth/missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"auth/invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"auth/invalid-recaptcha-action",MISSING_CLIENT_TYPE:"auth/missing-client-type",MISSING_RECAPTCHA_VERSION:"auth/missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"auth/invalid-recaptcha-version",INVALID_REQ_TYPE:"auth/invalid-req-type",INVALID_HOSTING_LINK_DOMAIN:"auth/invalid-hosting-link-domain"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yo=new Lu("@firebase/auth");function CT(n,...e){Yo.logLevel<=X.WARN&&Yo.warn(`Auth (${gr}): ${n}`,...e)}function xo(n,...e){Yo.logLevel<=X.ERROR&&Yo.error(`Auth (${gr}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(n,...e){throw Bu(n,...e)}function Ke(n,...e){return Bu(n,...e)}function Uu(n,e,t){const r={...Gp(),[e]:t};return new zi("auth","Firebase",r).create(e,{appName:n.name})}function Le(n){return Uu(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ms(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&nt(n,"argument-error"),Uu(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Bu(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Hp.create(n,...e)}function O(n,e,...t){if(!n)throw Bu(e,...t)}function It(n){const e="INTERNAL ASSERTION FAILED: "+n;throw xo(e),new Error(e)}function zt(n,e){n||It(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bi(){return typeof self<"u"&&self.location?.href||""}function qu(){return Cd()==="http:"||Cd()==="https:"}function Cd(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kT(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(qu()||eE()||"connection"in navigator)?navigator.onLine:!0}function DT(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{constructor(e,t){this.shortDelay=e,this.longDelay=t,zt(t>e,"Short delay should be less than long delay!"),this.isMobile=XI()||tE()}get(){return kT()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zu(n,e){zt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kp{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;It("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;It("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;It("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NT={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VT=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],OT=new ji(3e4,6e4);function fe(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function pe(n,e,t,r,s={}){return Wp(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=fs({key:n.config.apiKey,...o}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const l={method:e,headers:u,...i};return ZI()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&Dn(n.emulatorConfig.host)&&(l.credentials="include"),Kp.fetch()(await Qp(n,n.config.apiHost,t,c),l)})}async function Wp(n,e,t){n._canInitEmulator=!1;const r={...NT,...e};try{const s=new LT(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw ii(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,l]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ii(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw ii(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw ii(n,"user-disabled",o);const d=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Uu(n,d,l);nt(n,d)}}catch(s){if(s instanceof kt)throw s;nt(n,"network-request-failed",{message:String(s)})}}async function Wt(n,e,t,r,s={}){const i=await pe(n,e,t,r,s);return"mfaPendingCredential"in i&&nt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Qp(n,e,t,r){const s=`${e}${t}?${r}`,i=n,o=i.config.emulator?zu(n.config,s):`${n.config.apiScheme}://${s}`;return VT.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function xT(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class LT{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ke(this.auth,"network-request-failed")),OT.get())})}}function ii(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Ke(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kd(n){return n!==void 0&&n.getResponse!==void 0}function Dd(n){return n!==void 0&&n.enterprise!==void 0}class Jp{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return xT(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function MT(n){return(await pe(n,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function Yp(n,e){return pe(n,"GET","/v2/recaptchaConfig",fe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FT(n,e){return pe(n,"POST","/v1/accounts:delete",e)}async function UT(n,e){return pe(n,"POST","/v1/accounts:update",e)}async function Xo(n,e){return pe(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function li(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BT(n,e=!1){return q(n).getIdToken(e)}async function Xp(n,e=!1){const t=q(n),r=await t.getIdToken(e),s=Ta(r);O(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:li(Nc(s.auth_time)),issuedAtTime:li(Nc(s.iat)),expirationTime:li(Nc(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Nc(n){return Number(n)*1e3}function Ta(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return xo("JWT malformed, contained fewer than 3 sections"),null;try{const s=Cp(t);return s?JSON.parse(s):(xo("Failed to decode base64 JWT payload"),null)}catch(s){return xo("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Nd(n){const e=Ta(n);return O(e,"internal-error"),O(typeof e.exp<"u","internal-error"),O(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jt(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof kt&&qT(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function qT({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zT{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=li(this.lastLoginAt),this.creationTime=li(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Si(n){const e=n.auth,t=await n.getIdToken(),r=await jt(n,Xo(e,{idToken:t}));O(r?.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=s.providerUserInfo?.length?em(s.providerUserInfo):[],o=jT(n.providerData,i),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!o?.length,l=c?u:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new tu(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,d)}async function Zp(n){const e=q(n);await Si(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function jT(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function em(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $T(n,e){const t=await Wp(n,{},async()=>{const r=fs({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await Qp(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&Dn(n.emulatorConfig.host)&&(u.credentials="include"),Kp.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function GT(n,e){return pe(n,"POST","/v2/accounts:revokeToken",fe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){O(e.idToken,"internal-error"),O(typeof e.idToken<"u","internal-error"),O(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Nd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){O(e.length!==0,"internal-error");const t=Nd(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(O(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await $T(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new Ur;return r&&(O(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(O(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(O(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ur,this.toJSON())}_performRefresh(){return It("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function an(n,e){O(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ht{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new zT(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new tu(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await jt(this,this.stsTokenManager.getToken(this.auth,e));return O(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Xp(this,e)}reload(){return Zp(this)}_assign(e){this!==e&&(O(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ht({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){O(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Si(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ge(this.auth.app))return Promise.reject(Le(this.auth));const e=await this.getIdToken();return await jt(this,FT(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,l=t.createdAt??void 0,d=t.lastLoginAt??void 0,{uid:p,emailVerified:g,isAnonymous:w,providerData:C,stsTokenManager:k}=t;O(p&&k,e,"internal-error");const D=Ur.fromJSON(this.name,k);O(typeof p=="string",e,"internal-error"),an(r,e.name),an(s,e.name),O(typeof g=="boolean",e,"internal-error"),O(typeof w=="boolean",e,"internal-error"),an(i,e.name),an(o,e.name),an(c,e.name),an(u,e.name),an(l,e.name),an(d,e.name);const F=new ht({uid:p,auth:e,email:s,emailVerified:g,displayName:r,isAnonymous:w,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:D,createdAt:l,lastLoginAt:d});return C&&Array.isArray(C)&&(F.providerData=C.map(j=>({...j}))),u&&(F._redirectEventId=u),F}static async _fromIdTokenResponse(e,t,r=!1){const s=new Ur;s.updateFromServerResponse(t);const i=new ht({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Si(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];O(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?em(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,c=new Ur;c.updateFromIdToken(r);const u=new ht({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new tu(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(u,l),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vd=new Map;function Lt(n){zt(n instanceof Function,"Expected a class definition");let e=Vd.get(n);return e?(zt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Vd.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tm{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}tm.type="NONE";const nu=tm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lo(n,e,t){return`firebase:${n}:${e}:${t}`}class Br{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Lo(this.userKey,s.apiKey,i),this.fullPersistenceKey=Lo("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Xo(this.auth,{idToken:e}).catch(()=>{});return t?ht._fromGetAccountInfoResponse(this.auth,t,e):null}return ht._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Br(Lt(nu),e,r);const s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=s[0]||Lt(nu);const o=Lo(r,e.config.apiKey,e.name);let c=null;for(const l of t)try{const d=await l._get(o);if(d){let p;if(typeof d=="string"){const g=await Xo(e,{idToken:d}).catch(()=>{});if(!g)break;p=await ht._fromGetAccountInfoResponse(e,g,d)}else p=ht._fromJSON(e,d);l!==i&&(c=p),i=l;break}}catch{}const u=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Br(i,e,r):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new Br(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Od(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(im(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(nm(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(am(e))return"Blackberry";if(cm(e))return"Webos";if(rm(e))return"Safari";if((e.includes("chrome/")||sm(e))&&!e.includes("edge/"))return"Chrome";if(om(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function nm(n=Ce()){return/firefox\//i.test(n)}function rm(n=Ce()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function sm(n=Ce()){return/crios\//i.test(n)}function im(n=Ce()){return/iemobile/i.test(n)}function om(n=Ce()){return/android/i.test(n)}function am(n=Ce()){return/blackberry/i.test(n)}function cm(n=Ce()){return/webos/i.test(n)}function ju(n=Ce()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function HT(n=Ce()){return ju(n)&&!!window.navigator?.standalone}function KT(){return nE()&&document.documentMode===10}function um(n=Ce()){return ju(n)||om(n)||cm(n)||am(n)||/windows phone/i.test(n)||im(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lm(n,e=[]){let t;switch(n){case"Browser":t=Od(Ce());break;case"Worker":t=`${Od(Ce())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${gr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WT{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function QT(n,e={}){return pe(n,"GET","/v2/passwordPolicy",fe(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JT=6;class YT{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??JT,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XT{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new xd(this),this.idTokenSubscription=new xd(this),this.beforeStateQueue=new WT(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Hp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Lt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Br.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Xo(this,{idToken:e}),r=await ht._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(ge(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=r?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===o)&&c?.user&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return O(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Si(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=DT()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ge(this.app))return Promise.reject(Le(this));const t=e?q(e):null;return t&&O(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&O(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ge(this.app)?Promise.reject(Le(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ge(this.app)?Promise.reject(Le(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Lt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await QT(this),t=new YT(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new zi("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await GT(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Lt(e)||this._popupRedirectResolver;O(t,this,"argument-error"),this.redirectPersistenceManager=await Br.create(this,[Lt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(O(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return O(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=lm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(ge(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&CT(`Error while retrieving App Check token: ${e.error}`),e?.token}}function we(n){return q(n)}class xd{constructor(e){this.auth=e,this.observer=null,this.addObserver=cE(t=>this.observer=t)}get next(){return O(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $i={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ZT(n){$i=n}function $u(n){return $i.loadJS(n)}function ew(){return $i.recaptchaV2Script}function tw(){return $i.recaptchaEnterpriseScript}function nw(){return $i.gapiScript}function hm(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rw=500,sw=6e4,vo=1e12;class iw{constructor(e){this.auth=e,this.counter=vo,this._widgets=new Map}render(e,t){const r=this.counter;return this._widgets.set(r,new cw(e,this.auth.name,t||{})),this.counter++,r}reset(e){const t=e||vo;this._widgets.get(t)?.delete(),this._widgets.delete(t)}getResponse(e){const t=e||vo;return this._widgets.get(t)?.getResponse()||""}async execute(e){const t=e||vo;return this._widgets.get(t)?.execute(),""}}class ow{constructor(){this.enterprise=new aw}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class aw{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class cw{constructor(e,t,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const s=typeof e=="string"?document.getElementById(e):e;O(s,"argument-error",{appName:t}),this.container=s,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=uw(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},sw)},rw))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function uw(n){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<n;r++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}const lw="recaptcha-enterprise",hi="NO_RECAPTCHA";class dm{constructor(e){this.type=lw,this.auth=we(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{Yp(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const l=new Jp(u);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(u=>{c(u)})})}function s(i,o,c){const u=window.grecaptcha;Dd(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(l=>{o(l)}).catch(()=>{o(hi)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new ow().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(c=>{if(!t&&Dd(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=tw();u.length!==0&&(u+=c),$u(u).then(()=>{s(c,i,o)}).catch(l=>{o(l)})}}).catch(c=>{o(c)})})}}async function Qs(n,e,t,r=!1,s=!1){const i=new dm(n);let o;if(s)o=hi;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,l=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function yn(n,e,t,r,s){if(s==="EMAIL_PASSWORD_PROVIDER")if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Qs(n,e,t,t==="getOobCode");return r(n,i)}else return r(n,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Qs(n,e,t,t==="getOobCode");return r(n,o)}else return Promise.reject(i)});else if(s==="PHONE_PROVIDER")if(n._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){const i=await Qs(n,e,t);return r(n,i).catch(async o=>{if(n._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")==="AUDIT"&&(o.code==="auth/missing-recaptcha-token"||o.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);const c=await Qs(n,e,t,!1,!0);return r(n,c)}return Promise.reject(o)})}else{const i=await Qs(n,e,t,!1,!0);return r(n,i)}else return Promise.reject(s+" provider is not supported.")}async function fm(n){const e=we(n),t=await Yp(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new Jp(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new dm(e).verify()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pm(n,e){const t=ps(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(pt(i,e??{}))return s;nt(s,"already-initialized")}return t.initialize({options:e})}function hw(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(Lt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function mm(n,e,t){const r=we(n);O(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!!t?.disableWarnings,i=gm(e),{host:o,port:c}=dw(e),u=c===null?"":`:${c}`,l={url:`${i}//${o}${u}/`},d=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){O(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),O(pt(l,r.config.emulator)&&pt(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,Dn(o)?Ea(`${i}//${o}${u}`):s||fw()}function gm(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function dw(n){const e=gm(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Ld(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Ld(o)}}}function Ld(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function fw(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gs{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return It("not implemented")}_getIdTokenResponse(e){return It("not implemented")}_linkToIdToken(e,t){return It("not implemented")}_getReauthenticationResolver(e){return It("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _m(n,e){return pe(n,"POST","/v1/accounts:resetPassword",fe(n,e))}async function pw(n,e){return pe(n,"POST","/v1/accounts:update",e)}async function mw(n,e){return pe(n,"POST","/v1/accounts:signUp",e)}async function gw(n,e){return pe(n,"POST","/v1/accounts:update",fe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _w(n,e){return Wt(n,"POST","/v1/accounts:signInWithPassword",fe(n,e))}async function wa(n,e){return pe(n,"POST","/v1/accounts:sendOobCode",fe(n,e))}async function yw(n,e){return wa(n,e)}async function Iw(n,e){return wa(n,e)}async function Ew(n,e){return wa(n,e)}async function Tw(n,e){return wa(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ww(n,e){return Wt(n,"POST","/v1/accounts:signInWithEmailLink",fe(n,e))}async function vw(n,e){return Wt(n,"POST","/v1/accounts:signInWithEmailLink",fe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gr extends gs{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Gr(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Gr(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return yn(e,t,"signInWithPassword",_w,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return ww(e,{email:this._email,oobCode:this._password});default:nt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return yn(e,r,"signUpPassword",mw,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return vw(e,{idToken:t,email:this._email,oobCode:this._password});default:nt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ut(n,e){return Wt(n,"POST","/v1/accounts:signInWithIdp",fe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Aw="http://localhost";class St extends gs{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new St(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):nt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const o=new St(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Ut(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Ut(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Ut(e,t)}buildRequest(){const e={requestUri:Aw,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=fs(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Md(n,e){return pe(n,"POST","/v1/accounts:sendVerificationCode",fe(n,e))}async function Rw(n,e){return Wt(n,"POST","/v1/accounts:signInWithPhoneNumber",fe(n,e))}async function bw(n,e){const t=await Wt(n,"POST","/v1/accounts:signInWithPhoneNumber",fe(n,e));if(t.temporaryProof)throw ii(n,"account-exists-with-different-credential",t);return t}const Sw={USER_NOT_FOUND:"user-not-found"};async function Pw(n,e){const t={...e,operation:"REAUTH"};return Wt(n,"POST","/v1/accounts:signInWithPhoneNumber",fe(n,t),Sw)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In extends gs{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new In({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new In({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return Rw(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return bw(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return Pw(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:s}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:s}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:i}=e;return!r&&!t&&!s&&!i?null:new In({verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:i})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cw(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function kw(n){const e=ri(si(n)).link,t=e?ri(si(e)).deep_link_id:null,r=ri(si(n)).deep_link_id;return(r?ri(si(r)).link:null)||r||t||e||n}class _s{constructor(e){const t=ri(si(e)),r=t.apiKey??null,s=t.oobCode??null,i=Cw(t.mode??null);O(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=kw(e);try{return new _s(t)}catch{return null}}}function Dw(n){return _s.parseLink(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(){this.providerId=Nn.PROVIDER_ID}static credential(e,t){return Gr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=_s.parseLink(t);return O(r,"argument-error"),Gr._fromEmailAndCode(e,r.code,r.tenantId)}}Nn.PROVIDER_ID="password";Nn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Nn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys extends Qt{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class di extends ys{static credentialFromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;return O("providerId"in t&&"signInMethod"in t,"argument-error"),St._fromParams(t)}credential(e){return this._credential({...e,nonce:e.rawNonce})}_credential(e){return O(e.idToken||e.accessToken,"argument-error"),St._fromParams({...e,providerId:this.providerId,signInMethod:this.providerId})}static credentialFromResult(e){return di.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return di.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r,oauthTokenSecret:s,pendingToken:i,nonce:o,providerId:c}=e;if(!r&&!s&&!t&&!i||!c)return null;try{return new di(c)._credential({idToken:t,accessToken:r,nonce:o,pendingToken:i})}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt extends ys{constructor(){super("facebook.com")}static credential(e){return St._fromParams({providerId:Dt.PROVIDER_ID,signInMethod:Dt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Dt.credentialFromTaggedObject(e)}static credentialFromError(e){return Dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Dt.credential(e.oauthAccessToken)}catch{return null}}}Dt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Dt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt extends ys{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return St._fromParams({providerId:Nt.PROVIDER_ID,signInMethod:Nt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Nt.credentialFromTaggedObject(e)}static credentialFromError(e){return Nt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Nt.credential(t,r)}catch{return null}}}Nt.GOOGLE_SIGN_IN_METHOD="google.com";Nt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt extends ys{constructor(){super("github.com")}static credential(e){return St._fromParams({providerId:Vt.PROVIDER_ID,signInMethod:Vt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Vt.credentialFromTaggedObject(e)}static credentialFromError(e){return Vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Vt.credential(e.oauthAccessToken)}catch{return null}}}Vt.GITHUB_SIGN_IN_METHOD="github.com";Vt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nw="http://localhost";class Pi extends gs{constructor(e,t){super(e,e),this.pendingToken=t}_getIdTokenResponse(e){const t=this.buildRequest();return Ut(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Ut(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Ut(e,t)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,pendingToken:i}=t;return!r||!s||!i||r!==s?null:new Pi(r,i)}static _create(e,t){return new Pi(e,t)}buildRequest(){return{requestUri:Nw,returnSecureToken:!0,pendingToken:this.pendingToken}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vw="saml.";class Zo extends Qt{constructor(e){O(e.startsWith(Vw),"argument-error"),super(e)}static credentialFromResult(e){return Zo.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return Zo.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const t=Pi.fromJSON(e);return O(t,"argument-error"),t}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:t,providerId:r}=e;if(!t||!r)return null;try{return Pi._create(r,t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot extends ys{constructor(){super("twitter.com")}static credential(e,t){return St._fromParams({providerId:Ot.PROVIDER_ID,signInMethod:Ot.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ot.credentialFromTaggedObject(e)}static credentialFromError(e){return Ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Ot.credential(t,r)}catch{return null}}}Ot.TWITTER_SIGN_IN_METHOD="twitter.com";Ot.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ym(n,e){return Wt(n,"POST","/v1/accounts:signUp",fe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await ht._fromIdTokenResponse(e,r,s),o=Fd(r);return new ut({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Fd(r);return new ut({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Fd(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ow(n){if(ge(n.app))return Promise.reject(Le(n));const e=we(n);if(await e._initializationPromise,e.currentUser?.isAnonymous)return new ut({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await ym(e,{returnSecureToken:!0}),r=await ut._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(r.user),r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ea extends kt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,ea.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new ea(e,t,r,s)}}function Im(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ea._fromErrorAndOperation(n,i,e,r):i})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Em(n){return new Set(n.map(({providerId:e})=>e).filter(e=>!!e))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xw(n,e){const t=q(n);await va(!0,t,e);const{providerUserInfo:r}=await UT(t.auth,{idToken:await t.getIdToken(),deleteProvider:[e]}),s=Em(r||[]);return t.providerData=t.providerData.filter(i=>s.has(i.providerId)),s.has("phone")||(t.phoneNumber=null),await t.auth._persistUserIfCurrent(t),t}async function Gu(n,e,t=!1){const r=await jt(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return ut._forOperation(n,"link",r)}async function va(n,e,t){await Si(e);const r=Em(e.providerData),s=n===!1?"provider-already-linked":"no-such-provider";O(r.has(t)===n,e.auth,s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tm(n,e,t=!1){const{auth:r}=n;if(ge(r.app))return Promise.reject(Le(r));const s="reauthenticate";try{const i=await jt(n,Im(r,s,e,n),t);O(i.idToken,r,"internal-error");const o=Ta(i.idToken);O(o,r,"internal-error");const{sub:c}=o;return O(n.uid===c,r,"user-mismatch"),ut._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&nt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wm(n,e,t=!1){if(ge(n.app))return Promise.reject(Le(n));const r="signIn",s=await Im(n,r,e),i=await ut._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function Aa(n,e){return wm(we(n),e)}async function vm(n,e){const t=q(n);return await va(!1,t,e.providerId),Gu(t,e)}async function Am(n,e){return Tm(q(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lw(n,e){return Wt(n,"POST","/v1/accounts:signInWithCustomToken",fe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mw(n,e){if(ge(n.app))return Promise.reject(Le(n));const t=we(n),r=await Lw(t,{token:e,returnSecureToken:!0}),s=await ut._fromIdTokenResponse(t,"signIn",r);return await t._updateCurrentUser(s.user),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(e,t){this.factorId=e,this.uid=t.mfaEnrollmentId,this.enrollmentTime=new Date(t.enrolledAt).toUTCString(),this.displayName=t.displayName}static _fromServerResponse(e,t){return"phoneInfo"in t?Hu._fromServerResponse(e,t):"totpInfo"in t?Ku._fromServerResponse(e,t):nt(e,"internal-error")}}class Hu extends Gi{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,t){return new Hu(t)}}class Ku extends Gi{constructor(e){super("totp",e)}static _fromServerResponse(e,t){return new Ku(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ra(n,e,t){O(t.url?.length>0,n,"invalid-continue-uri"),O(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),O(typeof t.linkDomain>"u"||t.linkDomain.length>0,n,"invalid-hosting-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.linkDomain=t.linkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(O(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(O(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wu(n){const e=we(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Fw(n,e,t){const r=we(n),s={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&Ra(r,s,t),await yn(r,s,"getOobCode",Iw,"EMAIL_PASSWORD_PROVIDER")}async function Uw(n,e,t){await _m(q(n),{oobCode:e,newPassword:t}).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Wu(n),r})}async function Bw(n,e){await gw(q(n),{oobCode:e})}async function Rm(n,e){const t=q(n),r=await _m(t,{oobCode:e}),s=r.requestType;switch(O(s,t,"internal-error"),s){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":O(r.newEmail,t,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":O(r.mfaInfo,t,"internal-error");default:O(r.email,t,"internal-error")}let i=null;return r.mfaInfo&&(i=Gi._fromServerResponse(we(t),r.mfaInfo)),{data:{email:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.newEmail:r.email)||null,previousEmail:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.email:r.newEmail)||null,multiFactorInfo:i},operation:s}}async function qw(n,e){const{data:t}=await Rm(q(n),e);return t.email}async function zw(n,e,t){if(ge(n.app))return Promise.reject(Le(n));const r=we(n),o=await yn(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",ym,"EMAIL_PASSWORD_PROVIDER").catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&Wu(n),u}),c=await ut._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(c.user),c}function jw(n,e,t){return ge(n.app)?Promise.reject(Le(n)):Aa(q(n),Nn.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Wu(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $w(n,e,t){const r=we(n),s={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function i(o,c){O(c.handleCodeInApp,r,"argument-error"),c&&Ra(r,o,c)}i(s,t),await yn(r,s,"getOobCode",Ew,"EMAIL_PASSWORD_PROVIDER")}function Gw(n,e){return _s.parseLink(e)?.operation==="EMAIL_SIGNIN"}async function Hw(n,e,t){if(ge(n.app))return Promise.reject(Le(n));const r=q(n),s=Nn.credentialWithLink(e,t||bi());return O(s._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),Aa(r,s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kw(n,e){return pe(n,"POST","/v1/accounts:createAuthUri",fe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ww(n,e){const t=qu()?bi():"http://localhost",r={identifier:e,continueUri:t},{signinMethods:s}=await Kw(q(n),r);return s||[]}async function Qw(n,e){const t=q(n),s={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()};e&&Ra(t.auth,s,e);const{email:i}=await yw(t.auth,s);i!==n.email&&await n.reload()}async function Jw(n,e,t){const r=q(n),i={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await n.getIdToken(),newEmail:e};t&&Ra(r.auth,i,t);const{email:o}=await Tw(r.auth,i);o!==n.email&&await n.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yw(n,e){return pe(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xw(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=q(n),i={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await jt(r,Yw(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const c=r.providerData.find(({providerId:u})=>u==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function Zw(n,e){const t=q(n);return ge(t.auth.app)?Promise.reject(Le(t.auth)):bm(t,e,null)}function ev(n,e){return bm(q(n),null,e)}async function bm(n,e,t){const{auth:r}=n,i={idToken:await n.getIdToken(),returnSecureToken:!0};e&&(i.email=e),t&&(i.password=t);const o=await jt(n,pw(r,i));await n._updateTokensIfNecessary(o,!0)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tv(n){if(!n)return null;const{providerId:e}=n,t=n.rawUserInfo?JSON.parse(n.rawUserInfo):{},r=n.isNewUser||n.kind==="identitytoolkit#SignupNewUserResponse";if(!e&&n?.idToken){const s=Ta(n.idToken)?.firebase?.sign_in_provider;if(s){const i=s!=="anonymous"&&s!=="custom"?s:null;return new qr(r,i)}}if(!e)return null;switch(e){case"facebook.com":return new nv(r,t);case"github.com":return new rv(r,t);case"google.com":return new sv(r,t);case"twitter.com":return new iv(r,t,n.screenName||null);case"custom":case"anonymous":return new qr(r,null);default:return new qr(r,e,t)}}class qr{constructor(e,t,r={}){this.isNewUser=e,this.providerId=t,this.profile=r}}class Sm extends qr{constructor(e,t,r,s){super(e,t,r),this.username=s}}class nv extends qr{constructor(e,t){super(e,"facebook.com",t)}}class rv extends Sm{constructor(e,t){super(e,"github.com",t,typeof t?.login=="string"?t?.login:null)}}class sv extends qr{constructor(e,t){super(e,"google.com",t)}}class iv extends Sm{constructor(e,t,r){super(e,"twitter.com",t,r)}}function ov(n){const{user:e,_tokenResponse:t}=n;return e.isAnonymous&&!t?{providerId:null,isNewUser:!1,profile:null}:tv(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function av(n,e){return q(n).setPersistence(e)}function cv(n){return fm(n)}async function uv(n,e){return we(n).validatePassword(e)}function Pm(n,e,t,r){return q(n).onIdTokenChanged(e,t,r)}function Cm(n,e,t){return q(n).beforeAuthStateChanged(e,t)}function lv(n,e,t,r){return q(n).onAuthStateChanged(e,t,r)}function hv(n){q(n).useDeviceLanguage()}function dv(n,e){return q(n).updateCurrentUser(e)}function fv(n){return q(n).signOut()}function pv(n,e){return we(n).revokeAccessToken(e)}async function mv(n){return q(n).delete()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er{constructor(e,t,r){this.type=e,this.credential=t,this.user=r}static _fromIdtoken(e,t){return new er("enroll",e,t)}static _fromMfaPendingCredential(e){return new er("signin",e)}toJSON(){return{multiFactorSession:{[this.type==="enroll"?"idToken":"pendingCredential"]:this.credential}}}static fromJSON(e){if(e?.multiFactorSession){if(e.multiFactorSession?.pendingCredential)return er._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(e.multiFactorSession?.idToken)return er._fromIdtoken(e.multiFactorSession.idToken)}return null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{constructor(e,t,r){this.session=e,this.hints=t,this.signInResolver=r}static _fromError(e,t){const r=we(e),s=t.customData._serverResponse,i=(s.mfaInfo||[]).map(c=>Gi._fromServerResponse(r,c));O(s.mfaPendingCredential,r,"internal-error");const o=er._fromMfaPendingCredential(s.mfaPendingCredential);return new Qu(o,i,async c=>{const u=await c._process(r,o);delete s.mfaInfo,delete s.mfaPendingCredential;const l={...s,idToken:u.idToken,refreshToken:u.refreshToken};switch(t.operationType){case"signIn":const d=await ut._fromIdTokenResponse(r,t.operationType,l);return await r._updateCurrentUser(d.user),d;case"reauthenticate":return O(t.user,r,"internal-error"),ut._forOperation(t.user,t.operationType,l);default:nt(r,"internal-error")}})}async resolveSignIn(e){const t=e;return this.signInResolver(t)}}function gv(n,e){const t=q(n),r=e;return O(e.customData.operationType,t,"argument-error"),O(r.customData._serverResponse?.mfaPendingCredential,t,"argument-error"),Qu._fromError(t,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ud(n,e){return pe(n,"POST","/v2/accounts/mfaEnrollment:start",fe(n,e))}function _v(n,e){return pe(n,"POST","/v2/accounts/mfaEnrollment:finalize",fe(n,e))}function yv(n,e){return pe(n,"POST","/v2/accounts/mfaEnrollment:start",fe(n,e))}function Iv(n,e){return pe(n,"POST","/v2/accounts/mfaEnrollment:finalize",fe(n,e))}function Ev(n,e){return pe(n,"POST","/v2/accounts/mfaEnrollment:withdraw",fe(n,e))}class Ju{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(t=>{t.mfaInfo&&(this.enrolledFactors=t.mfaInfo.map(r=>Gi._fromServerResponse(e.auth,r)))})}static _fromUser(e){return new Ju(e)}async getSession(){return er._fromIdtoken(await this.user.getIdToken(),this.user)}async enroll(e,t){const r=e,s=await this.getSession(),i=await jt(this.user,r._process(this.user.auth,s,t));return await this.user._updateTokensIfNecessary(i),this.user.reload()}async unenroll(e){const t=typeof e=="string"?e:e.uid,r=await this.user.getIdToken();try{const s=await jt(this.user,Ev(this.user.auth,{idToken:r,mfaEnrollmentId:t}));this.enrolledFactors=this.enrolledFactors.filter(({uid:i})=>i!==t),await this.user._updateTokensIfNecessary(s),await this.user.reload()}catch(s){throw s}}}const Vc=new WeakMap;function Tv(n){const e=q(n);return Vc.has(e)||Vc.set(e,Ju._fromUser(e)),Vc.get(e)}const ta="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class km{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ta,"1"),this.storage.removeItem(ta),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wv=1e3,vv=10;class Dm extends km{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=um(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);KT()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,vv):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},wv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Dm.type="LOCAL";const Nm=Dm;/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Av=1e3;function Oc(n){const e=n.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),t=RegExp(`${e}=([^;]+)`);return document.cookie.match(t)?.[1]??null}function xc(n){return`${window.location.protocol==="http:"?"__dev_":"__HOST-"}FIREBASE_${n.split(":")[3]}`}class Vm{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(typeof window===void 0)return e;const t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return typeof isSecureContext=="boolean"&&!isSecureContext||typeof navigator>"u"||typeof document>"u"?!1:navigator.cookieEnabled??!0}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;const t=xc(e);return window.cookieStore?(await window.cookieStore.get(t))?.value:Oc(t)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;const r=xc(e);document.cookie=`${r}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;const r=xc(e);if(window.cookieStore){const c=(l=>{const d=l.changed.find(g=>g.name===r);d&&t(d.value),l.deleted.find(g=>g.name===r)&&t(null)}),u=()=>window.cookieStore.removeEventListener("change",c);return this.listenerUnsubscribes.set(t,u),window.cookieStore.addEventListener("change",c)}let s=Oc(r);const i=setInterval(()=>{const c=Oc(r);c!==s&&(t(c),s=c)},Av),o=()=>clearInterval(i);this.listenerUnsubscribes.set(t,o)}_removeListener(e,t){const r=this.listenerUnsubscribes.get(t);r&&(r(),this.listenerUnsubscribes.delete(t))}}Vm.type="COOKIE";const Rv=Vm;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Om extends km{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Om.type="SESSION";const Yu=Om;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bv(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new ba(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async l=>l(t.origin,i)),u=await bv(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ba.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sa(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const l=Sa("",20);s.port1.start();const d=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const g=p;if(g.data.eventId===l)switch(g.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(d),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function be(){return window}function Pv(n){be().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xu(){return typeof be().WorkerGlobalScope<"u"&&typeof be().importScripts=="function"}async function Cv(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function kv(){return navigator?.serviceWorker?.controller||null}function Dv(){return Xu()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xm="firebaseLocalStorageDb",Nv=1,na="firebaseLocalStorage",Lm="fbase_key";class Hi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Pa(n,e){return n.transaction([na],e?"readwrite":"readonly").objectStore(na)}function Vv(){const n=indexedDB.deleteDatabase(xm);return new Hi(n).toPromise()}function ru(){const n=indexedDB.open(xm,Nv);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(na,{keyPath:Lm})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(na)?e(r):(r.close(),await Vv(),e(await ru()))})})}async function Bd(n,e,t){const r=Pa(n,!0).put({[Lm]:e,value:t});return new Hi(r).toPromise()}async function Ov(n,e){const t=Pa(n,!1).get(e),r=await new Hi(t).toPromise();return r===void 0?null:r.value}function qd(n,e){const t=Pa(n,!0).delete(e);return new Hi(t).toPromise()}const xv=800,Lv=3;class Mm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ru(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Lv)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Xu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ba._getInstance(Dv()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Cv(),!this.activeServiceWorker)return;this.sender=new Sv(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||kv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ru();return await Bd(e,ta,"1"),await qd(e,ta),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Bd(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Ov(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>qd(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Pa(s,!1).getAll();return new Hi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),xv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Mm.type="LOCAL";const Fm=Mm;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zd(n,e){return pe(n,"POST","/v2/accounts/mfaSignIn:start",fe(n,e))}function Mv(n,e){return pe(n,"POST","/v2/accounts/mfaSignIn:finalize",fe(n,e))}function Fv(n,e){return pe(n,"POST","/v2/accounts/mfaSignIn:finalize",fe(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lc=hm("rcb"),Uv=new ji(3e4,6e4);class Bv{constructor(){this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!be().grecaptcha?.render}load(e,t=""){return O(qv(t),e,"argument-error"),this.shouldResolveImmediately(t)&&kd(be().grecaptcha)?Promise.resolve(be().grecaptcha):new Promise((r,s)=>{const i=be().setTimeout(()=>{s(Ke(e,"network-request-failed"))},Uv.get());be()[Lc]=()=>{be().clearTimeout(i),delete be()[Lc];const c=be().grecaptcha;if(!c||!kd(c)){s(Ke(e,"internal-error"));return}const u=c.render;c.render=(l,d)=>{const p=u(l,d);return this.counter++,p},this.hostLanguage=t,r(c)};const o=`${ew()}?${fs({onload:Lc,render:"explicit",hl:t})}`;$u(o).catch(()=>{clearTimeout(i),s(Ke(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){return!!be().grecaptcha?.render&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function qv(n){return n.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(n)}class zv{async load(e){return new iw(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fi="recaptcha",jv={theme:"light",type:"image"};class $v{constructor(e,t,r={...jv}){this.parameters=r,this.type=fi,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=we(e),this.isInvisible=this.parameters.size==="invisible",O(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const s=typeof t=="string"?document.getElementById(t):t;O(s,this.auth,"argument-error"),this.container=s,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new zv:new Bv,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),r=t.getResponse(e);return r||new Promise(s=>{const i=o=>{o&&(this.tokenChangeListeners.delete(i),s(o))};this.tokenChangeListeners.add(i),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){O(!this.parameters.sitekey,this.auth,"argument-error"),O(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),O(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(r=>r(t)),typeof e=="function")e(t);else if(typeof e=="string"){const r=be()[e];typeof r=="function"&&r(t)}}}assertNotDestroyed(){O(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){O(qu()&&!Xu(),this.auth,"internal-error"),await Gv(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await MT(this.auth);O(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return O(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function Gv(){let n=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}n=()=>e(),window.addEventListener("load",n)}).catch(e=>{throw n&&window.removeEventListener("load",n),e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zu{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=In._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function Hv(n,e,t){if(ge(n.app))return Promise.reject(Le(n));const r=we(n),s=await Ca(r,e,q(t));return new Zu(s,i=>Aa(r,i))}async function Kv(n,e,t){const r=q(n);await va(!1,r,"phone");const s=await Ca(r.auth,e,q(t));return new Zu(s,i=>vm(r,i))}async function Wv(n,e,t){const r=q(n);if(ge(r.auth.app))return Promise.reject(Le(r.auth));const s=await Ca(r.auth,e,q(t));return new Zu(s,i=>Am(r,i))}async function Ca(n,e,t){if(!n._getRecaptchaConfig())try{await fm(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let r;if(typeof e=="string"?r={phoneNumber:e}:r=e,"session"in r){const s=r.session;if("phoneNumber"in r){O(s.type==="enroll",n,"internal-error");const i={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await yn(n,i,"mfaSmsEnrollment",async(l,d)=>{if(d.phoneEnrollmentInfo.captchaResponse===hi){O(t?.type===fi,l,"argument-error");const p=await Mc(l,d,t);return Ud(l,p)}return Ud(l,d)},"PHONE_PROVIDER").catch(l=>Promise.reject(l))).phoneSessionInfo.sessionInfo}else{O(s.type==="signin",n,"internal-error");const i=r.multiFactorHint?.uid||r.multiFactorUid;O(i,n,"missing-multi-factor-info");const o={mfaPendingCredential:s.credential,mfaEnrollmentId:i,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await yn(n,o,"mfaSmsSignIn",async(d,p)=>{if(p.phoneSignInInfo.captchaResponse===hi){O(t?.type===fi,d,"argument-error");const g=await Mc(d,p,t);return zd(d,g)}return zd(d,p)},"PHONE_PROVIDER").catch(d=>Promise.reject(d))).phoneResponseInfo.sessionInfo}}else{const s={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await yn(n,s,"sendVerificationCode",async(u,l)=>{if(l.captchaResponse===hi){O(t?.type===fi,u,"argument-error");const d=await Mc(u,l,t);return Md(u,d)}return Md(u,l)},"PHONE_PROVIDER").catch(u=>Promise.reject(u))).sessionInfo}}finally{t?._reset()}}async function Qv(n,e){const t=q(n);if(ge(t.auth.app))return Promise.reject(Le(t.auth));await Gu(t,e)}async function Mc(n,e,t){O(t.type===fi,n,"argument-error");const r=await t.verify();O(typeof r=="string",n,"argument-error");const s={...e};if("phoneEnrollmentInfo"in s){const i=s.phoneEnrollmentInfo.phoneNumber,o=s.phoneEnrollmentInfo.captchaResponse,c=s.phoneEnrollmentInfo.clientType,u=s.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(s,{phoneEnrollmentInfo:{phoneNumber:i,recaptchaToken:r,captchaResponse:o,clientType:c,recaptchaVersion:u}}),s}else if("phoneSignInInfo"in s){const i=s.phoneSignInInfo.captchaResponse,o=s.phoneSignInInfo.clientType,c=s.phoneSignInInfo.recaptchaVersion;return Object.assign(s,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:i,clientType:o,recaptchaVersion:c}}),s}else return Object.assign(s,{recaptchaToken:r}),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(e){this.providerId=nr.PROVIDER_ID,this.auth=we(e)}verifyPhoneNumber(e,t){return Ca(this.auth,e,q(t))}static credential(e,t){return In._fromVerification(e,t)}static credentialFromResult(e){const t=e;return nr.credentialFromTaggedObject(t)}static credentialFromError(e){return nr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:r}=e;return t&&r?In._fromTokenResponse(t,r):null}}nr.PROVIDER_ID="phone";nr.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _r(n,e){return e?Lt(e):(O(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class el extends gs{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ut(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Ut(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Ut(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Jv(n){return wm(n.auth,new el(n),n.bypassAuthState)}function Yv(n){const{auth:e,user:t}=n;return O(t,e,"internal-error"),Tm(t,new el(n),n.bypassAuthState)}async function Xv(n){const{auth:e,user:t}=n;return O(t,e,"internal-error"),Gu(t,new el(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Um{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Jv;case"linkViaPopup":case"linkViaRedirect":return Xv;case"reauthViaPopup":case"reauthViaRedirect":return Yv;default:nt(this.auth,"internal-error")}}resolve(e){zt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){zt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zv=new ji(2e3,1e4);async function eA(n,e,t){if(ge(n.app))return Promise.reject(Ke(n,"operation-not-supported-in-this-environment"));const r=we(n);ms(n,e,Qt);const s=_r(r,t);return new Mt(r,"signInViaPopup",e,s).executeNotNull()}async function tA(n,e,t){const r=q(n);if(ge(r.auth.app))return Promise.reject(Ke(r.auth,"operation-not-supported-in-this-environment"));ms(r.auth,e,Qt);const s=_r(r.auth,t);return new Mt(r.auth,"reauthViaPopup",e,s,r).executeNotNull()}async function nA(n,e,t){const r=q(n);ms(r.auth,e,Qt);const s=_r(r.auth,t);return new Mt(r.auth,"linkViaPopup",e,s,r).executeNotNull()}class Mt extends Um{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Mt.currentPopupAction&&Mt.currentPopupAction.cancel(),Mt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return O(e,this.auth,"internal-error"),e}async onExecution(){zt(this.filter.length===1,"Popup operations only handle one event");const e=Sa();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ke(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Ke(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Mt.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ke(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Zv.get())};e()}}Mt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rA="pendingRedirect",Mo=new Map;class sA extends Um{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Mo.get(this.auth._key());if(!e){try{const r=await iA(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Mo.set(this.auth._key(),e)}return this.bypassAuthState||Mo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function iA(n,e){const t=qm(e),r=Bm(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}async function tl(n,e){return Bm(n)._set(qm(e),"true")}function oA(n,e){Mo.set(n._key(),e)}function Bm(n){return Lt(n._redirectPersistence)}function qm(n){return Lo(rA,n.config.apiKey,n.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aA(n,e,t){return cA(n,e,t)}async function cA(n,e,t){if(ge(n.app))return Promise.reject(Le(n));const r=we(n);ms(n,e,Qt),await r._initializationPromise;const s=_r(r,t);return await tl(s,r),s._openRedirect(r,e,"signInViaRedirect")}function uA(n,e,t){return lA(n,e,t)}async function lA(n,e,t){const r=q(n);if(ms(r.auth,e,Qt),ge(r.auth.app))return Promise.reject(Le(r.auth));await r.auth._initializationPromise;const s=_r(r.auth,t);await tl(s,r.auth);const i=await jm(r);return s._openRedirect(r.auth,e,"reauthViaRedirect",i)}function hA(n,e,t){return dA(n,e,t)}async function dA(n,e,t){const r=q(n);ms(r.auth,e,Qt),await r.auth._initializationPromise;const s=_r(r.auth,t);await va(!1,r,e.providerId),await tl(s,r.auth);const i=await jm(r);return s._openRedirect(r.auth,e,"linkViaRedirect",i)}async function fA(n,e){return await we(n)._initializationPromise,zm(n,e,!1)}async function zm(n,e,t=!1){if(ge(n.app))return Promise.reject(Le(n));const r=we(n),s=_r(r,e),o=await new sA(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}async function jm(n){const e=Sa(`${n.uid}:::`);return n._redirectEventId=e,await n.auth._setRedirectUser(n),await n.auth._persistUserIfCurrent(n),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pA=600*1e3;class mA{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!gA(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!$m(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(Ke(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=pA&&this.cachedEventUids.clear(),this.cachedEventUids.has(jd(e))}saveEventToCache(e){this.cachedEventUids.add(jd(e)),this.lastProcessedEventTime=Date.now()}}function jd(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function $m({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function gA(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return $m(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _A(n,e={}){return pe(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yA=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,IA=/^https?/;async function EA(n){if(n.config.emulator)return;const{authorizedDomains:e}=await _A(n);for(const t of e)try{if(TA(t))return}catch{}nt(n,"unauthorized-domain")}function TA(n){const e=bi(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!IA.test(t))return!1;if(yA.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wA=new ji(3e4,6e4);function $d(){const n=be().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function vA(n){return new Promise((e,t)=>{function r(){$d(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{$d(),t(Ke(n,"network-request-failed"))},timeout:wA.get()})}if(be().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(be().gapi?.load)r();else{const s=hm("iframefcb");return be()[s]=()=>{gapi.load?r():t(Ke(n,"network-request-failed"))},$u(`${nw()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw Fo=null,e})}let Fo=null;function AA(n){return Fo=Fo||vA(n),Fo}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RA=new ji(5e3,15e3),bA="__/auth/iframe",SA="emulator/auth/iframe",PA={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},CA=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function kA(n){const e=n.config;O(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?zu(e,SA):`https://${n.config.authDomain}/${bA}`,r={apiKey:e.apiKey,appName:n.name,v:gr},s=CA.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${fs(r).slice(1)}`}async function DA(n){const e=await AA(n),t=be().gapi;return O(t,n,"internal-error"),e.open({where:document.body,url:kA(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:PA,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Ke(n,"network-request-failed"),c=be().setTimeout(()=>{i(o)},RA.get());function u(){be().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NA={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},VA=500,OA=600,xA="_blank",LA="http://localhost";class Gd{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function MA(n,e,t,r=VA,s=OA){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...NA,width:r.toString(),height:s.toString(),top:i,left:o},l=Ce().toLowerCase();t&&(c=sm(l)?xA:t),nm(l)&&(e=e||LA,u.scrollbars="yes");const d=Object.entries(u).reduce((g,[w,C])=>`${g}${w}=${C},`,"");if(HT(l)&&c!=="_self")return FA(e||"",c),new Gd(null);const p=window.open(e||"",c,d);O(p,n,"popup-blocked");try{p.focus()}catch{}return new Gd(p)}function FA(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UA="__/auth/handler",BA="emulator/auth/handler",qA=encodeURIComponent("fac");async function Hd(n,e,t,r,s,i){O(n.config.authDomain,n,"auth-domain-config-required"),O(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:gr,eventId:s};if(e instanceof Qt){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",aE(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries({}))o[d]=p}if(e instanceof ys){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(o.scopes=d.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const d of Object.keys(c))c[d]===void 0&&delete c[d];const u=await n._getAppCheckToken(),l=u?`#${qA}=${encodeURIComponent(u)}`:"";return`${zA(n)}?${fs(c).slice(1)}${l}`}function zA({config:n}){return n.emulator?zu(n,BA):`https://${n.authDomain}/${UA}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fc="webStorageSupport";class jA{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Yu,this._completeRedirectFn=zm,this._overrideRedirectResult=oA}async _openPopup(e,t,r,s){zt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await Hd(e,t,r,bi(),s);return MA(e,i,Sa())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Hd(e,t,r,bi(),s);return Pv(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(zt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await DA(e),r=new mA(e);return t.register("authEvent",s=>(O(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Fc,{type:Fc},s=>{const i=s?.[0]?.[Fc];i!==void 0&&t(!!i),nt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=EA(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return um()||rm()||ju()}}const Gm=jA;class Hm{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return It("unexpected MultiFactorSessionType")}}}class nl extends Hm{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new nl(e)}_finalizeEnroll(e,t,r){return _v(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Mv(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class Km{constructor(){}static assertion(e){return nl._fromCredential(e)}}Km.FACTOR_ID="phone";class Wm{static assertionForEnrollment(e,t){return Ci._fromSecret(e,t)}static assertionForSignIn(e,t){return Ci._fromEnrollmentId(e,t)}static async generateSecret(e){const t=e;O(typeof t.user?.auth<"u","internal-error");const r=await yv(t.user.auth,{idToken:t.credential,totpEnrollmentInfo:{}});return ka._fromStartTotpMfaEnrollmentResponse(r,t.user.auth)}}Wm.FACTOR_ID="totp";class Ci extends Hm{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new Ci(t,void 0,e)}static _fromEnrollmentId(e,t){return new Ci(t,e)}async _finalizeEnroll(e,t,r){return O(typeof this.secret<"u",e,"argument-error"),Iv(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){O(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");const r={verificationCode:this.otp};return Fv(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}}class ka{constructor(e,t,r,s,i,o,c){this.sessionInfo=o,this.auth=c,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=s,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new ka(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){let r=!1;return(Ao(e)||Ao(t))&&(r=!0),r&&(Ao(e)&&(e=this.auth.currentUser?.email||"unknownuser"),Ao(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function Ao(n){return typeof n>"u"||n?.length===0}var Kd="@firebase/auth",Wd="1.13.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $A{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){O(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GA(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function HA(n){ar(new wn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;O(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:lm(n)},l=new XT(r,s,i,u);return hw(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),ar(new wn("auth-internal",e=>{const t=we(e.getProvider("auth").getImmediate());return(r=>new $A(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),At(Kd,Wd,GA(n)),At(Kd,Wd,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KA=300,WA=Op("authIdTokenMaxAge")||KA;let Qd=null;const QA=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>WA)return;const s=t?.token;Qd!==s&&(Qd=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function JA(n=Fu()){const e=ps(n,"auth");if(e.isInitialized())return e.getImmediate();const t=pm(n,{popupRedirectResolver:Gm,persistence:[Fm,Nm,Yu]}),r=Op("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=QA(i.toString());Cm(t,o,()=>o(t.currentUser)),Pm(t,c=>o(c))}}const s=Dp("auth");return s&&mm(t,`http://${s}`),t}function YA(){return document.getElementsByTagName("head")?.[0]??document}ZT({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Ke("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",YA().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});HA("Browser");const ID=Object.freeze(Object.defineProperty({__proto__:null,ActionCodeOperation:RT,ActionCodeURL:_s,AuthCredential:gs,AuthErrorCodes:PT,EmailAuthCredential:Gr,EmailAuthProvider:Nn,FacebookAuthProvider:Dt,FactorId:TT,GithubAuthProvider:Vt,GoogleAuthProvider:Nt,OAuthCredential:St,OAuthProvider:di,OperationType:AT,PhoneAuthCredential:In,PhoneAuthProvider:nr,PhoneMultiFactorGenerator:Km,ProviderId:wT,RecaptchaVerifier:$v,SAMLAuthProvider:Zo,SignInMethod:vT,TotpMultiFactorGenerator:Wm,TotpSecret:ka,TwitterAuthProvider:Ot,applyActionCode:Bw,beforeAuthStateChanged:Cm,browserCookiePersistence:Rv,browserLocalPersistence:Nm,browserPopupRedirectResolver:Gm,browserSessionPersistence:Yu,checkActionCode:Rm,confirmPasswordReset:Uw,connectAuthEmulator:mm,createUserWithEmailAndPassword:zw,debugErrorMap:ST,deleteUser:mv,fetchSignInMethodsForEmail:Ww,getAdditionalUserInfo:ov,getAuth:JA,getIdToken:BT,getIdTokenResult:Xp,getMultiFactorResolver:gv,getRedirectResult:fA,inMemoryPersistence:nu,indexedDBLocalPersistence:Fm,initializeAuth:pm,initializeRecaptchaConfig:cv,isSignInWithEmailLink:Gw,linkWithCredential:vm,linkWithPhoneNumber:Kv,linkWithPopup:nA,linkWithRedirect:hA,multiFactor:Tv,onAuthStateChanged:lv,onIdTokenChanged:Pm,parseActionCodeURL:Dw,prodErrorMap:Gp,reauthenticateWithCredential:Am,reauthenticateWithPhoneNumber:Wv,reauthenticateWithPopup:tA,reauthenticateWithRedirect:uA,reload:Zp,revokeAccessToken:pv,sendEmailVerification:Qw,sendPasswordResetEmail:Fw,sendSignInLinkToEmail:$w,setPersistence:av,signInAnonymously:Ow,signInWithCredential:Aa,signInWithCustomToken:Mw,signInWithEmailAndPassword:jw,signInWithEmailLink:Hw,signInWithPhoneNumber:Hv,signInWithPopup:eA,signInWithRedirect:aA,signOut:fv,unlink:xw,updateCurrentUser:dv,updateEmail:Zw,updatePassword:ev,updatePhoneNumber:Qv,updateProfile:Xw,useDeviceLanguage:hv,validatePassword:uv,verifyBeforeUpdateEmail:Jw,verifyPasswordResetCode:qw},Symbol.toStringTag,{value:"Module"}));var Jd=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var En,Qm;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,_){function I(){}I.prototype=_.prototype,E.F=_.prototype,E.prototype=new I,E.prototype.constructor=E,E.D=function(v,T,S){for(var y=Array(arguments.length-2),We=2;We<arguments.length;We++)y[We-2]=arguments[We];return _.prototype[T].apply(v,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,_,I){I||(I=0);const v=Array(16);if(typeof _=="string")for(var T=0;T<16;++T)v[T]=_.charCodeAt(I++)|_.charCodeAt(I++)<<8|_.charCodeAt(I++)<<16|_.charCodeAt(I++)<<24;else for(T=0;T<16;++T)v[T]=_[I++]|_[I++]<<8|_[I++]<<16|_[I++]<<24;_=E.g[0],I=E.g[1],T=E.g[2];let S=E.g[3],y;y=_+(S^I&(T^S))+v[0]+3614090360&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(T^_&(I^T))+v[1]+3905402710&4294967295,S=_+(y<<12&4294967295|y>>>20),y=T+(I^S&(_^I))+v[2]+606105819&4294967295,T=S+(y<<17&4294967295|y>>>15),y=I+(_^T&(S^_))+v[3]+3250441966&4294967295,I=T+(y<<22&4294967295|y>>>10),y=_+(S^I&(T^S))+v[4]+4118548399&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(T^_&(I^T))+v[5]+1200080426&4294967295,S=_+(y<<12&4294967295|y>>>20),y=T+(I^S&(_^I))+v[6]+2821735955&4294967295,T=S+(y<<17&4294967295|y>>>15),y=I+(_^T&(S^_))+v[7]+4249261313&4294967295,I=T+(y<<22&4294967295|y>>>10),y=_+(S^I&(T^S))+v[8]+1770035416&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(T^_&(I^T))+v[9]+2336552879&4294967295,S=_+(y<<12&4294967295|y>>>20),y=T+(I^S&(_^I))+v[10]+4294925233&4294967295,T=S+(y<<17&4294967295|y>>>15),y=I+(_^T&(S^_))+v[11]+2304563134&4294967295,I=T+(y<<22&4294967295|y>>>10),y=_+(S^I&(T^S))+v[12]+1804603682&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(T^_&(I^T))+v[13]+4254626195&4294967295,S=_+(y<<12&4294967295|y>>>20),y=T+(I^S&(_^I))+v[14]+2792965006&4294967295,T=S+(y<<17&4294967295|y>>>15),y=I+(_^T&(S^_))+v[15]+1236535329&4294967295,I=T+(y<<22&4294967295|y>>>10),y=_+(T^S&(I^T))+v[1]+4129170786&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^T&(_^I))+v[6]+3225465664&4294967295,S=_+(y<<9&4294967295|y>>>23),y=T+(_^I&(S^_))+v[11]+643717713&4294967295,T=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(T^S))+v[0]+3921069994&4294967295,I=T+(y<<20&4294967295|y>>>12),y=_+(T^S&(I^T))+v[5]+3593408605&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^T&(_^I))+v[10]+38016083&4294967295,S=_+(y<<9&4294967295|y>>>23),y=T+(_^I&(S^_))+v[15]+3634488961&4294967295,T=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(T^S))+v[4]+3889429448&4294967295,I=T+(y<<20&4294967295|y>>>12),y=_+(T^S&(I^T))+v[9]+568446438&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^T&(_^I))+v[14]+3275163606&4294967295,S=_+(y<<9&4294967295|y>>>23),y=T+(_^I&(S^_))+v[3]+4107603335&4294967295,T=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(T^S))+v[8]+1163531501&4294967295,I=T+(y<<20&4294967295|y>>>12),y=_+(T^S&(I^T))+v[13]+2850285829&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^T&(_^I))+v[2]+4243563512&4294967295,S=_+(y<<9&4294967295|y>>>23),y=T+(_^I&(S^_))+v[7]+1735328473&4294967295,T=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(T^S))+v[12]+2368359562&4294967295,I=T+(y<<20&4294967295|y>>>12),y=_+(I^T^S)+v[5]+4294588738&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^T)+v[8]+2272392833&4294967295,S=_+(y<<11&4294967295|y>>>21),y=T+(S^_^I)+v[11]+1839030562&4294967295,T=S+(y<<16&4294967295|y>>>16),y=I+(T^S^_)+v[14]+4259657740&4294967295,I=T+(y<<23&4294967295|y>>>9),y=_+(I^T^S)+v[1]+2763975236&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^T)+v[4]+1272893353&4294967295,S=_+(y<<11&4294967295|y>>>21),y=T+(S^_^I)+v[7]+4139469664&4294967295,T=S+(y<<16&4294967295|y>>>16),y=I+(T^S^_)+v[10]+3200236656&4294967295,I=T+(y<<23&4294967295|y>>>9),y=_+(I^T^S)+v[13]+681279174&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^T)+v[0]+3936430074&4294967295,S=_+(y<<11&4294967295|y>>>21),y=T+(S^_^I)+v[3]+3572445317&4294967295,T=S+(y<<16&4294967295|y>>>16),y=I+(T^S^_)+v[6]+76029189&4294967295,I=T+(y<<23&4294967295|y>>>9),y=_+(I^T^S)+v[9]+3654602809&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^T)+v[12]+3873151461&4294967295,S=_+(y<<11&4294967295|y>>>21),y=T+(S^_^I)+v[15]+530742520&4294967295,T=S+(y<<16&4294967295|y>>>16),y=I+(T^S^_)+v[2]+3299628645&4294967295,I=T+(y<<23&4294967295|y>>>9),y=_+(T^(I|~S))+v[0]+4096336452&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~T))+v[7]+1126891415&4294967295,S=_+(y<<10&4294967295|y>>>22),y=T+(_^(S|~I))+v[14]+2878612391&4294967295,T=S+(y<<15&4294967295|y>>>17),y=I+(S^(T|~_))+v[5]+4237533241&4294967295,I=T+(y<<21&4294967295|y>>>11),y=_+(T^(I|~S))+v[12]+1700485571&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~T))+v[3]+2399980690&4294967295,S=_+(y<<10&4294967295|y>>>22),y=T+(_^(S|~I))+v[10]+4293915773&4294967295,T=S+(y<<15&4294967295|y>>>17),y=I+(S^(T|~_))+v[1]+2240044497&4294967295,I=T+(y<<21&4294967295|y>>>11),y=_+(T^(I|~S))+v[8]+1873313359&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~T))+v[15]+4264355552&4294967295,S=_+(y<<10&4294967295|y>>>22),y=T+(_^(S|~I))+v[6]+2734768916&4294967295,T=S+(y<<15&4294967295|y>>>17),y=I+(S^(T|~_))+v[13]+1309151649&4294967295,I=T+(y<<21&4294967295|y>>>11),y=_+(T^(I|~S))+v[4]+4149444226&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~T))+v[11]+3174756917&4294967295,S=_+(y<<10&4294967295|y>>>22),y=T+(_^(S|~I))+v[2]+718787259&4294967295,T=S+(y<<15&4294967295|y>>>17),y=I+(S^(T|~_))+v[9]+3951481745&4294967295,E.g[0]=E.g[0]+_&4294967295,E.g[1]=E.g[1]+(T+(y<<21&4294967295|y>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+S&4294967295}r.prototype.v=function(E,_){_===void 0&&(_=E.length);const I=_-this.blockSize,v=this.C;let T=this.h,S=0;for(;S<_;){if(T==0)for(;S<=I;)s(this,E,S),S+=this.blockSize;if(typeof E=="string"){for(;S<_;)if(v[T++]=E.charCodeAt(S++),T==this.blockSize){s(this,v),T=0;break}}else for(;S<_;)if(v[T++]=E[S++],T==this.blockSize){s(this,v),T=0;break}}this.h=T,this.o+=_},r.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var _=1;_<E.length-8;++_)E[_]=0;_=this.o*8;for(var I=E.length-8;I<E.length;++I)E[I]=_&255,_/=256;for(this.v(E),E=Array(16),_=0,I=0;I<4;++I)for(let v=0;v<32;v+=8)E[_++]=this.g[I]>>>v&255;return E};function i(E,_){var I=c;return Object.prototype.hasOwnProperty.call(I,E)?I[E]:I[E]=_(E)}function o(E,_){this.h=_;const I=[];let v=!0;for(let T=E.length-1;T>=0;T--){const S=E[T]|0;v&&S==_||(I[T]=S,v=!1)}this.g=I}var c={};function u(E){return-128<=E&&E<128?i(E,function(_){return new o([_|0],_<0?-1:0)}):new o([E|0],E<0?-1:0)}function l(E){if(isNaN(E)||!isFinite(E))return p;if(E<0)return D(l(-E));const _=[];let I=1;for(let v=0;E>=I;v++)_[v]=E/I|0,I*=4294967296;return new o(_,0)}function d(E,_){if(E.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(E.charAt(0)=="-")return D(d(E.substring(1),_));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const I=l(Math.pow(_,8));let v=p;for(let S=0;S<E.length;S+=8){var T=Math.min(8,E.length-S);const y=parseInt(E.substring(S,S+T),_);T<8?(T=l(Math.pow(_,T)),v=v.j(T).add(l(y))):(v=v.j(I),v=v.add(l(y)))}return v}var p=u(0),g=u(1),w=u(16777216);n=o.prototype,n.m=function(){if(k(this))return-D(this).m();let E=0,_=1;for(let I=0;I<this.g.length;I++){const v=this.i(I);E+=(v>=0?v:4294967296+v)*_,_*=4294967296}return E},n.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(C(this))return"0";if(k(this))return"-"+D(this).toString(E);const _=l(Math.pow(E,6));var I=this;let v="";for(;;){const T=H(I,_).g;I=F(I,T.j(_));let S=((I.g.length>0?I.g[0]:I.h)>>>0).toString(E);if(I=T,C(I))return S+v;for(;S.length<6;)S="0"+S;v=S+v}},n.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function C(E){if(E.h!=0)return!1;for(let _=0;_<E.g.length;_++)if(E.g[_]!=0)return!1;return!0}function k(E){return E.h==-1}n.l=function(E){return E=F(this,E),k(E)?-1:C(E)?0:1};function D(E){const _=E.g.length,I=[];for(let v=0;v<_;v++)I[v]=~E.g[v];return new o(I,~E.h).add(g)}n.abs=function(){return k(this)?D(this):this},n.add=function(E){const _=Math.max(this.g.length,E.g.length),I=[];let v=0;for(let T=0;T<=_;T++){let S=v+(this.i(T)&65535)+(E.i(T)&65535),y=(S>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);v=y>>>16,S&=65535,y&=65535,I[T]=y<<16|S}return new o(I,I[I.length-1]&-2147483648?-1:0)};function F(E,_){return E.add(D(_))}n.j=function(E){if(C(this)||C(E))return p;if(k(this))return k(E)?D(this).j(D(E)):D(D(this).j(E));if(k(E))return D(this.j(D(E)));if(this.l(w)<0&&E.l(w)<0)return l(this.m()*E.m());const _=this.g.length+E.g.length,I=[];for(var v=0;v<2*_;v++)I[v]=0;for(v=0;v<this.g.length;v++)for(let T=0;T<E.g.length;T++){const S=this.i(v)>>>16,y=this.i(v)&65535,We=E.i(T)>>>16,Bn=E.i(T)&65535;I[2*v+2*T]+=y*Bn,j(I,2*v+2*T),I[2*v+2*T+1]+=S*Bn,j(I,2*v+2*T+1),I[2*v+2*T+1]+=y*We,j(I,2*v+2*T+1),I[2*v+2*T+2]+=S*We,j(I,2*v+2*T+2)}for(E=0;E<_;E++)I[E]=I[2*E+1]<<16|I[2*E];for(E=_;E<2*_;E++)I[E]=0;return new o(I,0)};function j(E,_){for(;(E[_]&65535)!=E[_];)E[_+1]+=E[_]>>>16,E[_]&=65535,_++}function B(E,_){this.g=E,this.h=_}function H(E,_){if(C(_))throw Error("division by zero");if(C(E))return new B(p,p);if(k(E))return _=H(D(E),_),new B(D(_.g),D(_.h));if(k(_))return _=H(E,D(_)),new B(D(_.g),_.h);if(E.g.length>30){if(k(E)||k(_))throw Error("slowDivide_ only works with positive integers.");for(var I=g,v=_;v.l(E)<=0;)I=ee(I),v=ee(v);var T=W(I,1),S=W(v,1);for(v=W(v,2),I=W(I,2);!C(v);){var y=S.add(v);y.l(E)<=0&&(T=T.add(I),S=y),v=W(v,1),I=W(I,1)}return _=F(E,T.j(_)),new B(T,_)}for(T=p;E.l(_)>=0;){for(I=Math.max(1,Math.floor(E.m()/_.m())),v=Math.ceil(Math.log(I)/Math.LN2),v=v<=48?1:Math.pow(2,v-48),S=l(I),y=S.j(_);k(y)||y.l(E)>0;)I-=v,S=l(I),y=S.j(_);C(S)&&(S=g),T=T.add(S),E=F(E,y)}return new B(T,E)}n.B=function(E){return H(this,E).h},n.and=function(E){const _=Math.max(this.g.length,E.g.length),I=[];for(let v=0;v<_;v++)I[v]=this.i(v)&E.i(v);return new o(I,this.h&E.h)},n.or=function(E){const _=Math.max(this.g.length,E.g.length),I=[];for(let v=0;v<_;v++)I[v]=this.i(v)|E.i(v);return new o(I,this.h|E.h)},n.xor=function(E){const _=Math.max(this.g.length,E.g.length),I=[];for(let v=0;v<_;v++)I[v]=this.i(v)^E.i(v);return new o(I,this.h^E.h)};function ee(E){const _=E.g.length+1,I=[];for(let v=0;v<_;v++)I[v]=E.i(v)<<1|E.i(v-1)>>>31;return new o(I,E.h)}function W(E,_){const I=_>>5;_%=32;const v=E.g.length-I,T=[];for(let S=0;S<v;S++)T[S]=_>0?E.i(S+I)>>>_|E.i(S+I+1)<<32-_:E.i(S+I);return new o(T,E.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Qm=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=d,En=o}).apply(typeof Jd<"u"?Jd:typeof self<"u"?self:typeof window<"u"?window:{});var Ro=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Jm,oi,Ym,Uo,su,Xm,Zm,eg;(function(){var n,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ro=="object"&&Ro];for(var h=0;h<a.length;++h){var f=a[h];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=t(this);function s(a,h){if(h)e:{var f=r;a=a.split(".");for(var m=0;m<a.length-1;m++){var R=a[m];if(!(R in f))break e;f=f[R]}a=a[a.length-1],m=f[a],h=h(m),h!=m&&h!=null&&e(f,a,{configurable:!0,writable:!0,value:h})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(h){var f=[],m;for(m in h)Object.prototype.hasOwnProperty.call(h,m)&&f.push([m,h[m]]);return f}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function u(a,h,f){return a.call.apply(a.bind,arguments)}function l(a,h,f){return l=u,l.apply(null,arguments)}function d(a,h){var f=Array.prototype.slice.call(arguments,1);return function(){var m=f.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function p(a,h){function f(){}f.prototype=h.prototype,a.Z=h.prototype,a.prototype=new f,a.prototype.constructor=a,a.Ob=function(m,R,P){for(var M=Array(arguments.length-2),Q=2;Q<arguments.length;Q++)M[Q-2]=arguments[Q];return h.prototype[R].apply(m,M)}}var g=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function w(a){const h=a.length;if(h>0){const f=Array(h);for(let m=0;m<h;m++)f[m]=a[m];return f}return[]}function C(a,h){for(let m=1;m<arguments.length;m++){const R=arguments[m];var f=typeof R;if(f=f!="object"?f:R?Array.isArray(R)?"array":f:"null",f=="array"||f=="object"&&typeof R.length=="number"){f=a.length||0;const P=R.length||0;a.length=f+P;for(let M=0;M<P;M++)a[f+M]=R[M]}else a.push(R)}}class k{constructor(h,f){this.i=h,this.j=f,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function D(a){o.setTimeout(()=>{throw a},0)}function F(){var a=E;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class j{constructor(){this.h=this.g=null}add(h,f){const m=B.get();m.set(h,f),this.h?this.h.next=m:this.g=m,this.h=m}}var B=new k(()=>new H,a=>a.reset());class H{constructor(){this.next=this.g=this.h=null}set(h,f){this.h=h,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let ee,W=!1,E=new j,_=()=>{const a=Promise.resolve(void 0);ee=()=>{a.then(I)}};function I(){for(var a;a=F();){try{a.h.call(a.g)}catch(f){D(f)}var h=B;h.j(a),h.h<100&&(h.h++,a.next=h.g,h.g=a)}W=!1}function v(){this.u=this.u,this.C=this.C}v.prototype.u=!1,v.prototype.dispose=function(){this.u||(this.u=!0,this.N())},v.prototype[Symbol.dispose]=function(){this.dispose()},v.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var S=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};o.addEventListener("test",f,h),o.removeEventListener("test",f,h)}catch{}return a})();function y(a){return/^[\s\xa0]*$/.test(a)}function We(a,h){T.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,h)}p(We,T),We.prototype.init=function(a,h){const f=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget,h||(f=="mouseover"?h=a.fromElement:f=="mouseout"&&(h=a.toElement)),this.relatedTarget=h,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&We.Z.h.call(this)},We.prototype.h=function(){We.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Bn="closure_listenable_"+(Math.random()*1e6|0),dI=0;function fI(a,h,f,m,R){this.listener=a,this.proxy=null,this.src=h,this.type=f,this.capture=!!m,this.ha=R,this.key=++dI,this.da=this.fa=!1}function ao(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function co(a,h,f){for(const m in a)h.call(f,a[m],m,a)}function pI(a,h){for(const f in a)h.call(void 0,a[f],f,a)}function yh(a){const h={};for(const f in a)h[f]=a[f];return h}const Ih="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Eh(a,h){let f,m;for(let R=1;R<arguments.length;R++){m=arguments[R];for(f in m)a[f]=m[f];for(let P=0;P<Ih.length;P++)f=Ih[P],Object.prototype.hasOwnProperty.call(m,f)&&(a[f]=m[f])}}function uo(a){this.src=a,this.g={},this.h=0}uo.prototype.add=function(a,h,f,m,R){const P=a.toString();a=this.g[P],a||(a=this.g[P]=[],this.h++);const M=sc(a,h,m,R);return M>-1?(h=a[M],f||(h.fa=!1)):(h=new fI(h,this.src,P,!!m,R),h.fa=f,a.push(h)),h};function rc(a,h){const f=h.type;if(f in a.g){var m=a.g[f],R=Array.prototype.indexOf.call(m,h,void 0),P;(P=R>=0)&&Array.prototype.splice.call(m,R,1),P&&(ao(h),a.g[f].length==0&&(delete a.g[f],a.h--))}}function sc(a,h,f,m){for(let R=0;R<a.length;++R){const P=a[R];if(!P.da&&P.listener==h&&P.capture==!!f&&P.ha==m)return R}return-1}var ic="closure_lm_"+(Math.random()*1e6|0),oc={};function Th(a,h,f,m,R){if(Array.isArray(h)){for(let P=0;P<h.length;P++)Th(a,h[P],f,m,R);return null}return f=Ah(f),a&&a[Bn]?a.J(h,f,c(m)?!!m.capture:!1,R):mI(a,h,f,!1,m,R)}function mI(a,h,f,m,R,P){if(!h)throw Error("Invalid event type");const M=c(R)?!!R.capture:!!R;let Q=cc(a);if(Q||(a[ic]=Q=new uo(a)),f=Q.add(h,f,m,M,P),f.proxy)return f;if(m=gI(),f.proxy=m,m.src=a,m.listener=f,a.addEventListener)S||(R=M),R===void 0&&(R=!1),a.addEventListener(h.toString(),m,R);else if(a.attachEvent)a.attachEvent(vh(h.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return f}function gI(){function a(f){return h.call(a.src,a.listener,f)}const h=_I;return a}function wh(a,h,f,m,R){if(Array.isArray(h))for(var P=0;P<h.length;P++)wh(a,h[P],f,m,R);else m=c(m)?!!m.capture:!!m,f=Ah(f),a&&a[Bn]?(a=a.i,P=String(h).toString(),P in a.g&&(h=a.g[P],f=sc(h,f,m,R),f>-1&&(ao(h[f]),Array.prototype.splice.call(h,f,1),h.length==0&&(delete a.g[P],a.h--)))):a&&(a=cc(a))&&(h=a.g[h.toString()],a=-1,h&&(a=sc(h,f,m,R)),(f=a>-1?h[a]:null)&&ac(f))}function ac(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[Bn])rc(h.i,a);else{var f=a.type,m=a.proxy;h.removeEventListener?h.removeEventListener(f,m,a.capture):h.detachEvent?h.detachEvent(vh(f),m):h.addListener&&h.removeListener&&h.removeListener(m),(f=cc(h))?(rc(f,a),f.h==0&&(f.src=null,h[ic]=null)):ao(a)}}}function vh(a){return a in oc?oc[a]:oc[a]="on"+a}function _I(a,h){if(a.da)a=!0;else{h=new We(h,this);const f=a.listener,m=a.ha||a.src;a.fa&&ac(a),a=f.call(m,h)}return a}function cc(a){return a=a[ic],a instanceof uo?a:null}var uc="__closure_events_fn_"+(Math.random()*1e9>>>0);function Ah(a){return typeof a=="function"?a:(a[uc]||(a[uc]=function(h){return a.handleEvent(h)}),a[uc])}function Ue(){v.call(this),this.i=new uo(this),this.M=this,this.G=null}p(Ue,v),Ue.prototype[Bn]=!0,Ue.prototype.removeEventListener=function(a,h,f,m){wh(this,a,h,f,m)};function $e(a,h){var f,m=a.G;if(m)for(f=[];m;m=m.G)f.push(m);if(a=a.M,m=h.type||h,typeof h=="string")h=new T(h,a);else if(h instanceof T)h.target=h.target||a;else{var R=h;h=new T(m,a),Eh(h,R)}R=!0;let P,M;if(f)for(M=f.length-1;M>=0;M--)P=h.g=f[M],R=lo(P,m,!0,h)&&R;if(P=h.g=a,R=lo(P,m,!0,h)&&R,R=lo(P,m,!1,h)&&R,f)for(M=0;M<f.length;M++)P=h.g=f[M],R=lo(P,m,!1,h)&&R}Ue.prototype.N=function(){if(Ue.Z.N.call(this),this.i){var a=this.i;for(const h in a.g){const f=a.g[h];for(let m=0;m<f.length;m++)ao(f[m]);delete a.g[h],a.h--}}this.G=null},Ue.prototype.J=function(a,h,f,m){return this.i.add(String(a),h,!1,f,m)},Ue.prototype.K=function(a,h,f,m){return this.i.add(String(a),h,!0,f,m)};function lo(a,h,f,m){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();let R=!0;for(let P=0;P<h.length;++P){const M=h[P];if(M&&!M.da&&M.capture==f){const Q=M.listener,Pe=M.ha||M.src;M.fa&&rc(a.i,M),R=Q.call(Pe,m)!==!1&&R}}return R&&!m.defaultPrevented}function yI(a,h){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=l(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:o.setTimeout(a,h||0)}function Rh(a){a.g=yI(()=>{a.g=null,a.i&&(a.i=!1,Rh(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class II extends v{constructor(h,f){super(),this.m=h,this.l=f,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:Rh(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Vs(a){v.call(this),this.h=a,this.g={}}p(Vs,v);var bh=[];function Sh(a){co(a.g,function(h,f){this.g.hasOwnProperty(f)&&ac(h)},a),a.g={}}Vs.prototype.N=function(){Vs.Z.N.call(this),Sh(this)},Vs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var lc=o.JSON.stringify,EI=o.JSON.parse,TI=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Ph(){}function Ch(){}var Os={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function hc(){T.call(this,"d")}p(hc,T);function dc(){T.call(this,"c")}p(dc,T);var qn={},kh=null;function ho(){return kh=kh||new Ue}qn.Ia="serverreachability";function Dh(a){T.call(this,qn.Ia,a)}p(Dh,T);function xs(a){const h=ho();$e(h,new Dh(h))}qn.STAT_EVENT="statevent";function Nh(a,h){T.call(this,qn.STAT_EVENT,a),this.stat=h}p(Nh,T);function Ge(a){const h=ho();$e(h,new Nh(h,a))}qn.Ja="timingevent";function Vh(a,h){T.call(this,qn.Ja,a),this.size=h}p(Vh,T);function Ls(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},h)}function Ms(){this.g=!0}Ms.prototype.ua=function(){this.g=!1};function wI(a,h,f,m,R,P){a.info(function(){if(a.g)if(P){var M="",Q=P.split("&");for(let ae=0;ae<Q.length;ae++){var Pe=Q[ae].split("=");if(Pe.length>1){const Ne=Pe[0];Pe=Pe[1];const gt=Ne.split("_");M=gt.length>=2&&gt[1]=="type"?M+(Ne+"="+Pe+"&"):M+(Ne+"=redacted&")}}}else M=null;else M=P;return"XMLHTTP REQ ("+m+") [attempt "+R+"]: "+h+`
`+f+`
`+M})}function vI(a,h,f,m,R,P,M){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+R+"]: "+h+`
`+f+`
`+P+" "+M})}function Rr(a,h,f,m){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+RI(a,f)+(m?" "+m:"")})}function AI(a,h){a.info(function(){return"TIMEOUT: "+h})}Ms.prototype.info=function(){};function RI(a,h){if(!a.g)return h;if(!h)return null;try{const P=JSON.parse(h);if(P){for(a=0;a<P.length;a++)if(Array.isArray(P[a])){var f=P[a];if(!(f.length<2)){var m=f[1];if(Array.isArray(m)&&!(m.length<1)){var R=m[0];if(R!="noop"&&R!="stop"&&R!="close")for(let M=1;M<m.length;M++)m[M]=""}}}}return lc(P)}catch{return h}}var fo={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Oh={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},xh;function fc(){}p(fc,Ph),fc.prototype.g=function(){return new XMLHttpRequest},xh=new fc;function Fs(a){return encodeURIComponent(String(a))}function bI(a){var h=1;a=a.split(":");const f=[];for(;h>0&&a.length;)f.push(a.shift()),h--;return a.length&&f.push(a.join(":")),f}function en(a,h,f,m){this.j=a,this.i=h,this.l=f,this.S=m||1,this.V=new Vs(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Lh}function Lh(){this.i=null,this.g="",this.h=!1}var Mh={},pc={};function mc(a,h,f){a.M=1,a.A=mo(mt(h)),a.u=f,a.R=!0,Fh(a,null)}function Fh(a,h){a.F=Date.now(),po(a),a.B=mt(a.A);var f=a.B,m=a.S;Array.isArray(m)||(m=[String(m)]),Yh(f.i,"t",m),a.C=0,f=a.j.L,a.h=new Lh,a.g=md(a.j,f?h:null,!a.u),a.P>0&&(a.O=new II(l(a.Y,a,a.g),a.P)),h=a.V,f=a.g,m=a.ba;var R="readystatechange";Array.isArray(R)||(R&&(bh[0]=R.toString()),R=bh);for(let P=0;P<R.length;P++){const M=Th(f,R[P],m||h.handleEvent,!1,h.h||h);if(!M)break;h.g[M.key]=M}h=a.J?yh(a.J):{},a.u?(a.v||(a.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,h)):(a.v="GET",a.g.ea(a.B,a.v,null,h)),xs(),wI(a.i,a.v,a.B,a.l,a.S,a.u)}en.prototype.ba=function(a){a=a.target;const h=this.O;h&&rn(a)==3?h.j():this.Y(a)},en.prototype.Y=function(a){try{if(a==this.g)e:{const Q=rn(this.g),Pe=this.g.ya(),ae=this.g.ca();if(!(Q<3)&&(Q!=3||this.g&&(this.h.h||this.g.la()||sd(this.g)))){this.K||Q!=4||Pe==7||(Pe==8||ae<=0?xs(3):xs(2)),gc(this);var h=this.g.ca();this.X=h;var f=SI(this);if(this.o=h==200,vI(this.i,this.v,this.B,this.l,this.S,Q,h),this.o){if(this.U&&!this.L){t:{if(this.g){var m,R=this.g;if((m=R.g?R.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(m)){var P=m;break t}}P=null}if(a=P)Rr(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,_c(this,a);else{this.o=!1,this.m=3,Ge(12),zn(this),Us(this);break e}}if(this.R){a=!0;let Ne;for(;!this.K&&this.C<f.length;)if(Ne=PI(this,f),Ne==pc){Q==4&&(this.m=4,Ge(14),a=!1),Rr(this.i,this.l,null,"[Incomplete Response]");break}else if(Ne==Mh){this.m=4,Ge(15),Rr(this.i,this.l,f,"[Invalid Chunk]"),a=!1;break}else Rr(this.i,this.l,Ne,null),_c(this,Ne);if(Uh(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Q!=4||f.length!=0||this.h.h||(this.m=1,Ge(16),a=!1),this.o=this.o&&a,!a)Rr(this.i,this.l,f,"[Invalid Chunked Response]"),zn(this),Us(this);else if(f.length>0&&!this.W){this.W=!0;var M=this.j;M.g==this&&M.aa&&!M.P&&(M.j.info("Great, no buffering proxy detected. Bytes received: "+f.length),Rc(M),M.P=!0,Ge(11))}}else Rr(this.i,this.l,f,null),_c(this,f);Q==4&&zn(this),this.o&&!this.K&&(Q==4?hd(this.j,this):(this.o=!1,po(this)))}else zI(this.g),h==400&&f.indexOf("Unknown SID")>0?(this.m=3,Ge(12)):(this.m=0,Ge(13)),zn(this),Us(this)}}}catch{}finally{}};function SI(a){if(!Uh(a))return a.g.la();const h=sd(a.g);if(h==="")return"";let f="";const m=h.length,R=rn(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return zn(a),Us(a),"";a.h.i=new o.TextDecoder}for(let P=0;P<m;P++)a.h.h=!0,f+=a.h.i.decode(h[P],{stream:!(R&&P==m-1)});return h.length=0,a.h.g+=f,a.C=0,a.h.g}function Uh(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function PI(a,h){var f=a.C,m=h.indexOf(`
`,f);return m==-1?pc:(f=Number(h.substring(f,m)),isNaN(f)?Mh:(m+=1,m+f>h.length?pc:(h=h.slice(m,m+f),a.C=m+f,h)))}en.prototype.cancel=function(){this.K=!0,zn(this)};function po(a){a.T=Date.now()+a.H,Bh(a,a.H)}function Bh(a,h){if(a.D!=null)throw Error("WatchDog timer not null");a.D=Ls(l(a.aa,a),h)}function gc(a){a.D&&(o.clearTimeout(a.D),a.D=null)}en.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(AI(this.i,this.B),this.M!=2&&(xs(),Ge(17)),zn(this),this.m=2,Us(this)):Bh(this,this.T-a)};function Us(a){a.j.I==0||a.K||hd(a.j,a)}function zn(a){gc(a);var h=a.O;h&&typeof h.dispose=="function"&&h.dispose(),a.O=null,Sh(a.V),a.g&&(h=a.g,a.g=null,h.abort(),h.dispose())}function _c(a,h){try{var f=a.j;if(f.I!=0&&(f.g==a||yc(f.h,a))){if(!a.L&&yc(f.h,a)&&f.I==3){try{var m=f.Ba.g.parse(h)}catch{m=null}if(Array.isArray(m)&&m.length==3){var R=m;if(R[0]==0){e:if(!f.v){if(f.g)if(f.g.F+3e3<a.F)Eo(f),yo(f);else break e;Ac(f),Ge(18)}}else f.xa=R[1],0<f.xa-f.K&&R[2]<37500&&f.F&&f.A==0&&!f.C&&(f.C=Ls(l(f.Va,f),6e3));jh(f.h)<=1&&f.ta&&(f.ta=void 0)}else $n(f,11)}else if((a.L||f.g==a)&&Eo(f),!y(h))for(R=f.Ba.g.parse(h),h=0;h<R.length;h++){let ae=R[h];const Ne=ae[0];if(!(Ne<=f.K))if(f.K=Ne,ae=ae[1],f.I==2)if(ae[0]=="c"){f.M=ae[1],f.ba=ae[2];const gt=ae[3];gt!=null&&(f.ka=gt,f.j.info("VER="+f.ka));const Gn=ae[4];Gn!=null&&(f.za=Gn,f.j.info("SVER="+f.za));const sn=ae[5];sn!=null&&typeof sn=="number"&&sn>0&&(m=1.5*sn,f.O=m,f.j.info("backChannelRequestTimeoutMs_="+m)),m=f;const on=a.g;if(on){const wo=on.g?on.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(wo){var P=m.h;P.g||wo.indexOf("spdy")==-1&&wo.indexOf("quic")==-1&&wo.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(Ic(P,P.h),P.h=null))}if(m.G){const bc=on.g?on.g.getResponseHeader("X-HTTP-Session-Id"):null;bc&&(m.wa=bc,ue(m.J,m.G,bc))}}f.I=3,f.l&&f.l.ra(),f.aa&&(f.T=Date.now()-a.F,f.j.info("Handshake RTT: "+f.T+"ms")),m=f;var M=a;if(m.na=pd(m,m.L?m.ba:null,m.W),M.L){$h(m.h,M);var Q=M,Pe=m.O;Pe&&(Q.H=Pe),Q.D&&(gc(Q),po(Q)),m.g=M}else ud(m);f.i.length>0&&Io(f)}else ae[0]!="stop"&&ae[0]!="close"||$n(f,7);else f.I==3&&(ae[0]=="stop"||ae[0]=="close"?ae[0]=="stop"?$n(f,7):vc(f):ae[0]!="noop"&&f.l&&f.l.qa(ae),f.A=0)}}xs(4)}catch{}}var CI=class{constructor(a,h){this.g=a,this.map=h}};function qh(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function zh(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function jh(a){return a.h?1:a.g?a.g.size:0}function yc(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function Ic(a,h){a.g?a.g.add(h):a.h=h}function $h(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}qh.prototype.cancel=function(){if(this.i=Gh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Gh(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const f of a.g.values())h=h.concat(f.G);return h}return w(a.i)}var Hh=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function kI(a,h){if(a){a=a.split("&");for(let f=0;f<a.length;f++){const m=a[f].indexOf("=");let R,P=null;m>=0?(R=a[f].substring(0,m),P=a[f].substring(m+1)):R=a[f],h(R,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function tn(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;a instanceof tn?(this.l=a.l,Bs(this,a.j),this.o=a.o,this.g=a.g,qs(this,a.u),this.h=a.h,Ec(this,Xh(a.i)),this.m=a.m):a&&(h=String(a).match(Hh))?(this.l=!1,Bs(this,h[1]||"",!0),this.o=zs(h[2]||""),this.g=zs(h[3]||"",!0),qs(this,h[4]),this.h=zs(h[5]||"",!0),Ec(this,h[6]||"",!0),this.m=zs(h[7]||"")):(this.l=!1,this.i=new $s(null,this.l))}tn.prototype.toString=function(){const a=[];var h=this.j;h&&a.push(js(h,Kh,!0),":");var f=this.g;return(f||h=="file")&&(a.push("//"),(h=this.o)&&a.push(js(h,Kh,!0),"@"),a.push(Fs(f).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.u,f!=null&&a.push(":",String(f))),(f=this.h)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(js(f,f.charAt(0)=="/"?VI:NI,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",js(f,xI)),a.join("")},tn.prototype.resolve=function(a){const h=mt(this);let f=!!a.j;f?Bs(h,a.j):f=!!a.o,f?h.o=a.o:f=!!a.g,f?h.g=a.g:f=a.u!=null;var m=a.h;if(f)qs(h,a.u);else if(f=!!a.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var R=h.h.lastIndexOf("/");R!=-1&&(m=h.h.slice(0,R+1)+m)}if(R=m,R==".."||R==".")m="";else if(R.indexOf("./")!=-1||R.indexOf("/.")!=-1){m=R.lastIndexOf("/",0)==0,R=R.split("/");const P=[];for(let M=0;M<R.length;){const Q=R[M++];Q=="."?m&&M==R.length&&P.push(""):Q==".."?((P.length>1||P.length==1&&P[0]!="")&&P.pop(),m&&M==R.length&&P.push("")):(P.push(Q),m=!0)}m=P.join("/")}else m=R}return f?h.h=m:f=a.i.toString()!=="",f?Ec(h,Xh(a.i)):f=!!a.m,f&&(h.m=a.m),h};function mt(a){return new tn(a)}function Bs(a,h,f){a.j=f?zs(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function qs(a,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);a.u=h}else a.u=null}function Ec(a,h,f){h instanceof $s?(a.i=h,LI(a.i,a.l)):(f||(h=js(h,OI)),a.i=new $s(h,a.l))}function ue(a,h,f){a.i.set(h,f)}function mo(a){return ue(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function zs(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function js(a,h,f){return typeof a=="string"?(a=encodeURI(a).replace(h,DI),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function DI(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Kh=/[#\/\?@]/g,NI=/[#\?:]/g,VI=/[#\?]/g,OI=/[#\?@]/g,xI=/#/g;function $s(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function jn(a){a.g||(a.g=new Map,a.h=0,a.i&&kI(a.i,function(h,f){a.add(decodeURIComponent(h.replace(/\+/g," ")),f)}))}n=$s.prototype,n.add=function(a,h){jn(this),this.i=null,a=br(this,a);let f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(h),this.h+=1,this};function Wh(a,h){jn(a),h=br(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function Qh(a,h){return jn(a),h=br(a,h),a.g.has(h)}n.forEach=function(a,h){jn(this),this.g.forEach(function(f,m){f.forEach(function(R){a.call(h,R,m,this)},this)},this)};function Jh(a,h){jn(a);let f=[];if(typeof h=="string")Qh(a,h)&&(f=f.concat(a.g.get(br(a,h))));else for(a=Array.from(a.g.values()),h=0;h<a.length;h++)f=f.concat(a[h]);return f}n.set=function(a,h){return jn(this),this.i=null,a=br(this,a),Qh(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=Jh(this,a),a.length>0?String(a[0]):h):h};function Yh(a,h,f){Wh(a,h),f.length>0&&(a.i=null,a.g.set(br(a,h),w(f)),a.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(let m=0;m<h.length;m++){var f=h[m];const R=Fs(f);f=Jh(this,f);for(let P=0;P<f.length;P++){let M=R;f[P]!==""&&(M+="="+Fs(f[P])),a.push(M)}}return this.i=a.join("&")};function Xh(a){const h=new $s;return h.i=a.i,a.g&&(h.g=new Map(a.g),h.h=a.h),h}function br(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function LI(a,h){h&&!a.j&&(jn(a),a.i=null,a.g.forEach(function(f,m){const R=m.toLowerCase();m!=R&&(Wh(this,m),Yh(this,R,f))},a)),a.j=h}function MI(a,h){const f=new Ms;if(o.Image){const m=new Image;m.onload=d(nn,f,"TestLoadImage: loaded",!0,h,m),m.onerror=d(nn,f,"TestLoadImage: error",!1,h,m),m.onabort=d(nn,f,"TestLoadImage: abort",!1,h,m),m.ontimeout=d(nn,f,"TestLoadImage: timeout",!1,h,m),o.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else h(!1)}function FI(a,h){const f=new Ms,m=new AbortController,R=setTimeout(()=>{m.abort(),nn(f,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:m.signal}).then(P=>{clearTimeout(R),P.ok?nn(f,"TestPingServer: ok",!0,h):nn(f,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(R),nn(f,"TestPingServer: error",!1,h)})}function nn(a,h,f,m,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),m(f)}catch{}}function UI(){this.g=new TI}function Tc(a){this.i=a.Sb||null,this.h=a.ab||!1}p(Tc,Ph),Tc.prototype.g=function(){return new go(this.i,this.h)};function go(a,h){Ue.call(this),this.H=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(go,Ue),n=go.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=h,this.readyState=1,Hs(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(h.body=a),(this.H||o).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Gs(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Hs(this)),this.g&&(this.readyState=3,Hs(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Zh(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function Zh(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Gs(this):Hs(this),this.readyState==3&&Zh(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,Gs(this))},n.Na=function(a){this.g&&(this.response=a,Gs(this))},n.ga=function(){this.g&&Gs(this)};function Gs(a){a.readyState=4,a.l=null,a.j=null,a.B=null,Hs(a)}n.setRequestHeader=function(a,h){this.A.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var f=h.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=h.next();return a.join(`\r
`)};function Hs(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(go.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function ed(a){let h="";return co(a,function(f,m){h+=m,h+=":",h+=f,h+=`\r
`}),h}function wc(a,h,f){e:{for(m in f){var m=!1;break e}m=!0}m||(f=ed(f),typeof a=="string"?f!=null&&Fs(f):ue(a,h,f))}function Te(a){Ue.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(Te,Ue);var BI=/^https?$/i,qI=["POST","PUT"];n=Te.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,h,f,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():xh.g(),this.g.onreadystatechange=g(l(this.Ca,this));try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(P){td(this,P);return}if(a=f||"",f=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var R in m)f.set(R,m[R]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const P of m.keys())f.set(P,m.get(P));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(f.keys()).find(P=>P.toLowerCase()=="content-type"),R=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(qI,h,void 0)>=0)||m||R||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,M]of f)this.g.setRequestHeader(P,M);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(P){td(this,P)}};function td(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.o=5,nd(a),_o(a)}function nd(a){a.A||(a.A=!0,$e(a,"complete"),$e(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,$e(this,"complete"),$e(this,"abort"),_o(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),_o(this,!0)),Te.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?rd(this):this.Xa())},n.Xa=function(){rd(this)};function rd(a){if(a.h&&typeof i<"u"){if(a.v&&rn(a)==4)setTimeout(a.Ca.bind(a),0);else if($e(a,"readystatechange"),rn(a)==4){a.h=!1;try{const P=a.ca();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var f;if(!(f=h)){var m;if(m=P===0){let M=String(a.D).match(Hh)[1]||null;!M&&o.self&&o.self.location&&(M=o.self.location.protocol.slice(0,-1)),m=!BI.test(M?M.toLowerCase():"")}f=m}if(f)$e(a,"complete"),$e(a,"success");else{a.o=6;try{var R=rn(a)>2?a.g.statusText:""}catch{R=""}a.l=R+" ["+a.ca()+"]",nd(a)}}finally{_o(a)}}}}function _o(a,h){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const f=a.g;a.g=null,h||$e(a,"ready");try{f.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function rn(a){return a.g?a.g.readyState:0}n.ca=function(){try{return rn(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),EI(h)}};function sd(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function zI(a){const h={};a=(a.g&&rn(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(y(a[m]))continue;var f=bI(a[m]);const R=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const P=h[R]||[];h[R]=P,P.push(f)}pI(h,function(m){return m.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ks(a,h,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||h}function id(a){this.za=0,this.i=[],this.j=new Ms,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Ks("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Ks("baseRetryDelayMs",5e3,a),this.Za=Ks("retryDelaySeedMs",1e4,a),this.Ta=Ks("forwardChannelMaxRetries",2,a),this.va=Ks("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new qh(a&&a.concurrentRequestLimit),this.Ba=new UI,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=id.prototype,n.ka=8,n.I=1,n.connect=function(a,h,f,m){Ge(0),this.W=a,this.H=h||{},f&&m!==void 0&&(this.H.OSID=f,this.H.OAID=m),this.F=this.X,this.J=pd(this,null,this.W),Io(this)};function vc(a){if(od(a),a.I==3){var h=a.V++,f=mt(a.J);if(ue(f,"SID",a.M),ue(f,"RID",h),ue(f,"TYPE","terminate"),Ws(a,f),h=new en(a,a.j,h),h.M=2,h.A=mo(mt(f)),f=!1,o.navigator&&o.navigator.sendBeacon)try{f=o.navigator.sendBeacon(h.A.toString(),"")}catch{}!f&&o.Image&&(new Image().src=h.A,f=!0),f||(h.g=md(h.j,null),h.g.ea(h.A)),h.F=Date.now(),po(h)}fd(a)}function yo(a){a.g&&(Rc(a),a.g.cancel(),a.g=null)}function od(a){yo(a),a.v&&(o.clearTimeout(a.v),a.v=null),Eo(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Io(a){if(!zh(a.h)&&!a.m){a.m=!0;var h=a.Ea;ee||_(),W||(ee(),W=!0),E.add(h,a),a.D=0}}function jI(a,h){return jh(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=h.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=Ls(l(a.Ea,a,h),dd(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const R=new en(this,this.j,a);let P=this.o;if(this.U&&(P?(P=yh(P),Eh(P,this.U)):P=this.U),this.u!==null||this.R||(R.J=P,P=null),this.S)e:{for(var h=0,f=0;f<this.i.length;f++){t:{var m=this.i[f];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(h+=m,h>4096){h=f;break e}if(h===4096||f===this.i.length-1){h=f+1;break e}}h=1e3}else h=1e3;h=cd(this,R,h),f=mt(this.J),ue(f,"RID",a),ue(f,"CVER",22),this.G&&ue(f,"X-HTTP-Session-Id",this.G),Ws(this,f),P&&(this.R?h="headers="+Fs(ed(P))+"&"+h:this.u&&wc(f,this.u,P)),Ic(this.h,R),this.Ra&&ue(f,"TYPE","init"),this.S?(ue(f,"$req",h),ue(f,"SID","null"),R.U=!0,mc(R,f,null)):mc(R,f,h),this.I=2}}else this.I==3&&(a?ad(this,a):this.i.length==0||zh(this.h)||ad(this))};function ad(a,h){var f;h?f=h.l:f=a.V++;const m=mt(a.J);ue(m,"SID",a.M),ue(m,"RID",f),ue(m,"AID",a.K),Ws(a,m),a.u&&a.o&&wc(m,a.u,a.o),f=new en(a,a.j,f,a.D+1),a.u===null&&(f.J=a.o),h&&(a.i=h.G.concat(a.i)),h=cd(a,f,1e3),f.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Ic(a.h,f),mc(f,m,h)}function Ws(a,h){a.H&&co(a.H,function(f,m){ue(h,m,f)}),a.l&&co({},function(f,m){ue(h,m,f)})}function cd(a,h,f){f=Math.min(a.i.length,f);const m=a.l?l(a.l.Ka,a.l,a):null;e:{var R=a.i;let Q=-1;for(;;){const Pe=["count="+f];Q==-1?f>0?(Q=R[0].g,Pe.push("ofs="+Q)):Q=0:Pe.push("ofs="+Q);let ae=!0;for(let Ne=0;Ne<f;Ne++){var P=R[Ne].g;const gt=R[Ne].map;if(P-=Q,P<0)Q=Math.max(0,R[Ne].g-100),ae=!1;else try{P="req"+P+"_"||"";try{var M=gt instanceof Map?gt:Object.entries(gt);for(const[Gn,sn]of M){let on=sn;c(sn)&&(on=lc(sn)),Pe.push(P+Gn+"="+encodeURIComponent(on))}}catch(Gn){throw Pe.push(P+"type="+encodeURIComponent("_badmap")),Gn}}catch{m&&m(gt)}}if(ae){M=Pe.join("&");break e}}M=void 0}return a=a.i.splice(0,f),h.G=a,M}function ud(a){if(!a.g&&!a.v){a.Y=1;var h=a.Da;ee||_(),W||(ee(),W=!0),E.add(h,a),a.A=0}}function Ac(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=Ls(l(a.Da,a),dd(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,ld(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=Ls(l(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ge(10),yo(this),ld(this))};function Rc(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function ld(a){a.g=new en(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var h=mt(a.na);ue(h,"RID","rpc"),ue(h,"SID",a.M),ue(h,"AID",a.K),ue(h,"CI",a.F?"0":"1"),!a.F&&a.ia&&ue(h,"TO",a.ia),ue(h,"TYPE","xmlhttp"),Ws(a,h),a.u&&a.o&&wc(h,a.u,a.o),a.O&&(a.g.H=a.O);var f=a.g;a=a.ba,f.M=1,f.A=mo(mt(h)),f.u=null,f.R=!0,Fh(f,a)}n.Va=function(){this.C!=null&&(this.C=null,yo(this),Ac(this),Ge(19))};function Eo(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function hd(a,h){var f=null;if(a.g==h){Eo(a),Rc(a),a.g=null;var m=2}else if(yc(a.h,h))f=h.G,$h(a.h,h),m=1;else return;if(a.I!=0){if(h.o)if(m==1){f=h.u?h.u.length:0,h=Date.now()-h.F;var R=a.D;m=ho(),$e(m,new Vh(m,f)),Io(a)}else ud(a);else if(R=h.m,R==3||R==0&&h.X>0||!(m==1&&jI(a,h)||m==2&&Ac(a)))switch(f&&f.length>0&&(h=a.h,h.i=h.i.concat(f)),R){case 1:$n(a,5);break;case 4:$n(a,10);break;case 3:$n(a,6);break;default:$n(a,2)}}}function dd(a,h){let f=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(f*=2),f*h}function $n(a,h){if(a.j.info("Error code "+h),h==2){var f=l(a.bb,a),m=a.Ua;const R=!m;m=new tn(m||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Bs(m,"https"),mo(m),R?MI(m.toString(),f):FI(m.toString(),f)}else Ge(2);a.I=0,a.l&&a.l.pa(h),fd(a),od(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Ge(2)):(this.j.info("Failed to ping google.com"),Ge(1))};function fd(a){if(a.I=0,a.ja=[],a.l){const h=Gh(a.h);(h.length!=0||a.i.length!=0)&&(C(a.ja,h),C(a.ja,a.i),a.h.i.length=0,w(a.i),a.i.length=0),a.l.oa()}}function pd(a,h,f){var m=f instanceof tn?mt(f):new tn(f);if(m.g!="")h&&(m.g=h+"."+m.g),qs(m,m.u);else{var R=o.location;m=R.protocol,h=h?h+"."+R.hostname:R.hostname,R=+R.port;const P=new tn(null);m&&Bs(P,m),h&&(P.g=h),R&&qs(P,R),f&&(P.h=f),m=P}return f=a.G,h=a.wa,f&&h&&ue(m,f,h),ue(m,"VER",a.ka),Ws(a,m),m}function md(a,h,f){if(h&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Aa&&!a.ma?new Te(new Tc({ab:f})):new Te(a.ma),h.Fa(a.L),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function gd(){}n=gd.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function To(){}To.prototype.g=function(a,h){return new st(a,h)};function st(a,h){Ue.call(this),this.g=new id(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(a?a["X-WebChannel-Client-Profile"]=h.sa:a={"X-WebChannel-Client-Profile":h.sa}),this.g.U=a,(a=h&&h.Qb)&&!y(a)&&(this.g.u=a),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!y(h)&&(this.g.G=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new Sr(this)}p(st,Ue),st.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},st.prototype.close=function(){vc(this.g)},st.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.v&&(f={},f.__data__=lc(a),a=f);h.i.push(new CI(h.Ya++,a)),h.I==3&&Io(h)},st.prototype.N=function(){this.g.l=null,delete this.j,vc(this.g),delete this.g,st.Z.N.call(this)};function _d(a){hc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const f in h){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}p(_d,hc);function yd(){dc.call(this),this.status=1}p(yd,dc);function Sr(a){this.g=a}p(Sr,gd),Sr.prototype.ra=function(){$e(this.g,"a")},Sr.prototype.qa=function(a){$e(this.g,new _d(a))},Sr.prototype.pa=function(a){$e(this.g,new yd)},Sr.prototype.oa=function(){$e(this.g,"b")},To.prototype.createWebChannel=To.prototype.g,st.prototype.send=st.prototype.o,st.prototype.open=st.prototype.m,st.prototype.close=st.prototype.close,eg=function(){return new To},Zm=function(){return ho()},Xm=qn,su={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},fo.NO_ERROR=0,fo.TIMEOUT=8,fo.HTTP_ERROR=6,Uo=fo,Oh.COMPLETE="complete",Ym=Oh,Ch.EventType=Os,Os.OPEN="a",Os.CLOSE="b",Os.ERROR="c",Os.MESSAGE="d",Ue.prototype.listen=Ue.prototype.J,oi=Ch,Te.prototype.listenOnce=Te.prototype.K,Te.prototype.getLastError=Te.prototype.Ha,Te.prototype.getLastErrorCode=Te.prototype.ya,Te.prototype.getStatus=Te.prototype.ca,Te.prototype.getResponseJson=Te.prototype.La,Te.prototype.getResponseText=Te.prototype.la,Te.prototype.send=Te.prototype.ea,Te.prototype.setWithCredentials=Te.prototype.Fa,Jm=Te}).apply(typeof Ro<"u"?Ro:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Oe.UNAUTHENTICATED=new Oe(null),Oe.GOOGLE_CREDENTIALS=new Oe("google-credentials-uid"),Oe.FIRST_PARTY=new Oe("first-party-uid"),Oe.MOCK_USER=new Oe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Is="12.13.0";function XA(n){Is=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vn=new Lu("@firebase/firestore");function xr(){return vn.logLevel}function ZA(n){vn.setLogLevel(n)}function V(n,...e){if(vn.logLevel<=X.DEBUG){const t=e.map(rl);vn.debug(`Firestore (${Is}): ${n}`,...t)}}function ve(n,...e){if(vn.logLevel<=X.ERROR){const t=e.map(rl);vn.error(`Firestore (${Is}): ${n}`,...t)}}function rt(n,...e){if(vn.logLevel<=X.WARN){const t=e.map(rl);vn.warn(`Firestore (${Is}): ${n}`,...t)}}function rl(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,tg(n,r,t)}function tg(n,e,t){let r=`FIRESTORE (${Is}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw ve(r),new Error(r)}function z(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||tg(e,s,r)}function eR(n,e){n||U(57014,e)}function L(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends kt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class rg{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Oe.UNAUTHENTICATED)))}shutdown(){}}class tR{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class nR{constructor(e){this.t=e,this.currentUser=Oe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){z(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new Me;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Me,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Me)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(z(typeof r.accessToken=="string",31837,{l:r}),new ng(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return z(e===null||typeof e=="string",2055,{h:e}),new Oe(e)}}class rR{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Oe.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class sR{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new rR(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(Oe.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class iu{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class iR{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ge(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){z(this.o===void 0,3512);const r=i=>{i.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,V("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new iu(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(z(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new iu(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class oR{getToken(){return Promise.resolve(new iu(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aR(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=aR(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function G(n,e){return n<e?-1:n>e?1:0}function ou(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Uc(s)===Uc(i)?G(s,i):Uc(s)?1:-1}return G(n.length,e.length)}const cR=55296,uR=57343;function Uc(n){const e=n.charCodeAt(0);return e>=cR&&e<=uR}function Hr(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}function sg(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const au="__name__";class _t{constructor(e,t,r){t===void 0?t=0:t>e.length&&U(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&U(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return _t.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof _t?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=_t.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return G(e.length,t.length)}static compareSegments(e,t){const r=_t.isNumericId(e),s=_t.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?_t.extractNumericId(e).compare(_t.extractNumericId(t)):ou(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return En.fromString(e.substring(4,e.length-2))}}class J extends _t{construct(e,t,r){return new J(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new N(b.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new J(t)}static emptyPath(){return new J([])}}const lR=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class he extends _t{construct(e,t,r){return new he(e,t,r)}static isValidIdentifier(e){return lR.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),he.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===au}static keyField(){return new he([au])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new N(b.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new N(b.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new N(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new N(b.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new he(t)}static emptyPath(){return new he([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(e){this.path=e}static fromPath(e){return new x(J.fromString(e))}static fromName(e){return new x(J.fromString(e).popFirst(5))}static empty(){return new x(J.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&J.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return J.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new x(new J(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sl(n,e,t){if(!t)throw new N(b.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function ig(n,e,t,r){if(e===!0&&r===!0)throw new N(b.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Yd(n){if(!x.isDocumentKey(n))throw new N(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Xd(n){if(x.isDocumentKey(n))throw new N(b.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function og(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Na(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":U(12329,{type:typeof n})}function Y(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new N(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Na(n);throw new N(b.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function ag(n,e){if(e<=0)throw new N(b.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Se(n,e){const t={typeString:n};return e&&(t.value=e),t}function yr(n,e){if(!og(n))throw new N(b.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const o=n[r];if(s&&typeof o!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new N(b.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zd=-62135596800,ef=1e6;class ne{static now(){return ne.fromMillis(Date.now())}static fromDate(e){return ne.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*ef);return new ne(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new N(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new N(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Zd)throw new N(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new N(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/ef}_compareTo(e){return this.seconds===e.seconds?G(this.nanoseconds,e.nanoseconds):G(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ne._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(yr(e,ne._jsonSchema))return new ne(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Zd;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ne._jsonSchemaVersion="firestore/timestamp/1.0",ne._jsonSchema={type:Se("string",ne._jsonSchemaVersion),seconds:Se("number"),nanoseconds:Se("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${static fromTimestamp(e){return new $(e)}static min(){return new $(new ne(0,0))}static max(){return new $(new ne(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kr=-1;class Wr{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}}function cu(n){return n.fields.find((e=>e.kind===2))}function Wn(n){return n.fields.filter((e=>e.kind!==2))}function hR(n,e){let t=G(n.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let r=0;r<Math.min(n.fields.length,e.fields.length);++r)if(t=dR(n.fields[r],e.fields[r]),t!==0)return t;return G(n.fields.length,e.fields.length)}Wr.UNKNOWN_ID=-1;class rr{constructor(e,t){this.fieldPath=e,this.kind=t}}function dR(n,e){const t=he.comparator(n.fieldPath,e.fieldPath);return t!==0?t:G(n.kind,e.kind)}class Qr{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Qr(0,ct.min())}}function cg(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=$.fromTimestamp(r===1e9?new ne(t+1,0):new ne(t,r));return new ct(s,x.empty(),e)}function ug(n){return new ct(n.readTime,n.key,Kr)}class ct{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new ct($.min(),x.empty(),Kr)}static max(){return new ct($.max(),x.empty(),Kr)}}function il(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=x.comparator(n.documentKey,e.documentKey),t!==0?t:G(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lg="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class hg{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vn(n){if(n.code!==b.FAILED_PRECONDITION||n.message!==lg)throw n;V("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&U(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new A(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof A?t:A.resolve(t)}catch(t){return A.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):A.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):A.reject(t)}static resolve(e){return new A(((t,r)=>{t(e)}))}static reject(e){return new A(((t,r)=>{r(e)}))}static waitFor(e){return new A(((t,r)=>{let s=0,i=0,o=!1;e.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&t()}),(u=>r(u)))})),o=!0,i===s&&t()}))}static or(e){let t=A.resolve(!1);for(const r of e)t=t.next((s=>s?A.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new A(((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const l=u;t(e[l]).next((d=>{o[l]=d,++c,c===i&&r(o)}),(d=>s(d)))}}))}static doWhile(e,t){return new A(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const it="SimpleDb";class Va{static open(e,t,r,s){try{return new Va(t,e.transaction(s,r))}catch(i){throw new pi(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new Me,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new pi(e,t.error)):this.S.resolve()},this.transaction.onerror=r=>{const s=ol(r.target.error);this.S.reject(new pi(e,s))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(V(it,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new pR(t)}}class Rt{static delete(e){return V(it,"Removing database:",e),Jn(kp().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!Up())return!1;if(Rt.F())return!0;const e=Ce(),t=Rt.M(e),r=0<t&&t<10,s=dg(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||i)}static F(){return typeof process<"u"&&process.__PRIVATE_env?.__PRIVATE_USE_MOCK_PERSISTENCE==="YES"}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.N=r,this.B=null,Rt.M(Ce())===12.2&&ve("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(V(it,"Opening database:",this.name),this.db=await new Promise(((t,r)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{r(new pi(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?r(new N(b.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new N(b.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new pi(e,o))},s.onupgradeneeded=i=>{V(it,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.N.k(o,s.transaction,i.oldVersion,this.version).next((()=>{V(it,"Database upgrade to version "+this.version+" complete")}))}}))),this.K&&(this.db.onversionchange=t=>this.K(t)),this.db}q(e){this.K=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.L(e);const c=Va.open(this.db,e,i?"readonly":"readwrite",r),u=s(c).next((l=>(c.C(),l))).catch((l=>(c.abort(l),A.reject(l)))).toPromise();return u.catch((()=>{})),await c.D,u}catch(c){const u=c,l=u.name!=="FirebaseError"&&o<3;if(V(it,"Transaction failed with error:",u.message,"Retrying:",l),this.close(),!l)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function dg(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class fR{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return Jn(this.U.delete())}}class pi extends N{constructor(e,t){super(b.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function On(n){return n.name==="IndexedDbTransactionError"}class pR{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(V(it,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(V(it,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),Jn(r)}add(e){return V(it,"ADD",this.store.name,e,e),Jn(this.store.add(e))}get(e){return Jn(this.store.get(e)).next((t=>(t===void 0&&(t=null),V(it,"GET",this.store.name,e,t),t)))}delete(e){return V(it,"DELETE",this.store.name,e),Jn(this.store.delete(e))}count(){return V(it,"COUNT",this.store.name),Jn(this.store.count())}J(e,t){const r=this.options(e,t),s=r.index?this.store.index(r.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(r.range);return new A(((o,c)=>{i.onerror=u=>{c(u.target.error)},i.onsuccess=u=>{o(u.target.result)}}))}{const i=this.cursor(r),o=[];return this.H(i,((c,u)=>{o.push(u)})).next((()=>o))}}Z(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new A(((s,i)=>{r.onerror=o=>{i(o.target.error)},r.onsuccess=o=>{s(o.target.result)}}))}X(e,t){V(it,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const s=this.cursor(r);return this.H(s,((i,o,c)=>c.delete()))}ee(e,t){let r;t?r=e:(r={},t=e);const s=this.cursor(r);return this.H(s,t)}te(e){const t=this.cursor({});return new A(((r,s)=>{t.onerror=i=>{const o=ol(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next((c=>{c?o.continue():r()})):r()}}))}H(e,t){const r=[];return new A(((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const u=new fR(c),l=t(c.primaryKey,c.value,u);if(l instanceof A){const d=l.catch((p=>(u.done(),A.reject(p))));r.push(d)}u.isDone?s():u.G===null?c.continue():c.continue(u.G)}})).next((()=>A.waitFor(r)))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Jn(n){return new A(((e,t)=>{n.onsuccess=r=>{const s=r.target.result;e(s)},n.onerror=r=>{const s=ol(r.target.error);t(s)}}))}let tf=!1;function ol(n){const e=Rt.M(Ce());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new N("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return tf||(tf=!0,setTimeout((()=>{throw r}),0)),r}}return n}const mi="IndexBackfiller";class mR{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){V(mi,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{const t=await this.ne.ie();V(mi,`Documents written: ${t}`)}catch(t){On(t)?V(mi,"Ignoring IndexedDB error during index backfill: ",t):await Vn(t)}await this.re(6e4)}))}}class gR{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.se(t,e)))}se(e,t){const r=new Set;let s=t,i=!0;return A.doWhile((()=>i===!0&&s>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((o=>{if(o!==null&&!r.has(o))return V(mi,`Processing collection: ${o}`),this.oe(e,o,s).next((c=>{s-=c,r.add(o)}));i=!1})))).next((()=>t-s))}oe(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((s=>this.localStore.localDocuments.getNextDocuments(e,t,s,r).next((i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next((()=>this._e(s,i))).next((c=>(V(mi,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c)))).next((()=>o.size))}))))}_e(e,t){let r=e;return t.changes.forEach(((s,i)=>{const o=ug(i);il(o,r)>0&&(r=o)})),new ct(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Ye.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tn=-1;function Ki(n){return n==null}function ki(n){return n===0&&1/n==-1/0}function fg(n){return typeof n=="number"&&Number.isInteger(n)&&!ki(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ra="";function ze(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=nf(e)),e=_R(n.get(t),e);return nf(e)}function _R(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case ra:t+="";break;default:t+=i}}return t}function nf(n){return n+ra+""}function Et(n){const e=n.length;if(z(e>=2,64408,{path:n}),e===2)return z(n.charAt(0)===ra&&n.charAt(1)==="",56145,{path:n}),J.emptyPath();const t=e-2,r=[];let s="";for(let i=0;i<e;){const o=n.indexOf(ra,i);switch((o<0||o>t)&&U(50515,{path:n}),n.charAt(o+1)){case"":const c=n.substring(i,o);let u;s.length===0?u=c:(s+=c,u=s,s=""),r.push(u);break;case"":s+=n.substring(i,o),s+="\0";break;case"":s+=n.substring(i,o+1);break;default:U(61167,{path:n})}i=o+2}return new J(r)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qn="remoteDocuments",Wi="owner",Pr="owner",Di="mutationQueues",yR="userId",lt="mutations",rf="batchId",tr="userMutationsIndex",sf=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bo(n,e){return[n,ze(e)]}function pg(n,e,t){return[n,ze(e),t]}const IR={},Jr="documentMutations",sa="remoteDocumentsV14",ER=["prefixPath","collectionGroup","readTime","documentId"],qo="documentKeyIndex",TR=["prefixPath","collectionGroup","documentId"],mg="collectionGroupIndex",wR=["collectionGroup","readTime","prefixPath","documentId"],Ni="remoteDocumentGlobal",uu="remoteDocumentGlobalKey",Yr="targets",gg="queryTargetsIndex",vR=["canonicalId","targetId"],Xr="targetDocuments",AR=["targetId","path"],al="documentTargetsIndex",RR=["path","targetId"],ia="targetGlobalKey",sr="targetGlobal",Vi="collectionParents",bR=["collectionId","parent"],Zr="clientMetadata",SR="clientId",Oa="bundles",PR="bundleId",xa="namedQueries",CR="name",cl="indexConfiguration",kR="indexId",lu="collectionGroupIndex",DR="collectionGroup",gi="indexState",NR=["indexId","uid"],_g="sequenceNumberIndex",VR=["uid","sequenceNumber"],_i="indexEntries",OR=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],yg="documentKeyIndex",xR=["indexId","uid","orderedDocumentKey"],La="documentOverlays",LR=["userId","collectionPath","documentId"],hu="collectionPathOverlayIndex",MR=["userId","collectionPath","largestBatchId"],Ig="collectionGroupOverlayIndex",FR=["userId","collectionGroup","largestBatchId"],ul="globals",UR="name",Eg=[Di,lt,Jr,Qn,Yr,Wi,sr,Xr,Zr,Ni,Vi,Oa,xa],BR=[...Eg,La],Tg=[Di,lt,Jr,sa,Yr,Wi,sr,Xr,Zr,Ni,Vi,Oa,xa,La],wg=Tg,ll=[...wg,cl,gi,_i],qR=ll,vg=[...ll,ul],zR=vg;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class du extends hg{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function De(n,e){const t=L(n);return Rt.O(t.le,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function of(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function xn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Ag(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function Rg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e,t){this.comparator=e,this.root=t||Fe.EMPTY}insert(e,t){return new ce(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Fe.BLACK,null,null))}remove(e){return new ce(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Fe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new bo(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new bo(this.root,e,this.comparator,!1)}getReverseIterator(){return new bo(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new bo(this.root,e,this.comparator,!0)}}class bo{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Fe{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Fe.RED,this.left=s??Fe.EMPTY,this.right=i??Fe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Fe(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Fe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Fe.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Fe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Fe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw U(43730,{key:this.key,value:this.value});if(this.right.isRed())throw U(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw U(27949);return e+(this.isRed()?0:1)}}Fe.EMPTY=null,Fe.RED=!0,Fe.BLACK=!1;Fe.EMPTY=new class{constructor(){this.size=0}get key(){throw U(57766)}get value(){throw U(16141)}get color(){throw U(16727)}get left(){throw U(29726)}get right(){throw U(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new Fe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(e){this.comparator=e,this.data=new ce(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new af(this.data.getIterator())}getIteratorFrom(e){return new af(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof ie)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new ie(this.comparator);return t.data=e,t}}class af{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Cr(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e){this.fields=e,e.sort(he.comparator)}static empty(){return new Xe([])}unionWith(e){let t=new ie(he.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Xe(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Hr(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bg extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jR(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new bg("Invalid base64 string: "+i):i}})(e);return new Ie(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new Ie(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return G(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ie.EMPTY_BYTE_STRING=new Ie("");const $R=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function $t(n){if(z(!!n,39018),typeof n=="string"){let e=0;const t=$R.exec(n);if(z(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:me(n.seconds),nanos:me(n.nanos)}}function me(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Gt(n){return typeof n=="string"?Ie.fromBase64String(n):Ie.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sg="server_timestamp",Pg="__type__",Cg="__previous_value__",kg="__local_write_time__";function Ma(n){return(n?.mapValue?.fields||{})[Pg]?.stringValue===Sg}function Fa(n){const e=n.mapValue.fields[Cg];return Ma(e)?Fa(e):e}function Oi(n){const e=$t(n.mapValue.fields[kg].timestampValue);return new ne(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GR{constructor(e,t,r,s,i,o,c,u,l,d,p){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=l,this.isUsingEmulator=d,this.apiKey=p}}const xi="(default)";class An{constructor(e,t){this.projectId=e,this.database=t||xi}static empty(){return new An("","")}get isDefaultDatabase(){return this.database===xi}isEqual(e){return e instanceof An&&e.projectId===this.projectId&&e.database===this.database}}function HR(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new N(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new An(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hl="__type__",Dg="__max__",pn={mapValue:{fields:{__type__:{stringValue:Dg}}}},dl="__vector__",es="value",zo={nullValue:"NULL_VALUE"};function Rn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ma(n)?4:Ng(n)?9007199254740991:Ua(n)?10:11:U(28295,{value:n})}function Pt(n,e){if(n===e)return!0;const t=Rn(n);if(t!==Rn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Oi(n).isEqual(Oi(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=$t(s.timestampValue),c=$t(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,i){return Gt(s.bytesValue).isEqual(Gt(i.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,i){return me(s.geoPointValue.latitude)===me(i.geoPointValue.latitude)&&me(s.geoPointValue.longitude)===me(i.geoPointValue.longitude)})(n,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return me(s.integerValue)===me(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=me(s.doubleValue),c=me(i.doubleValue);return o===c?ki(o)===ki(c):isNaN(o)&&isNaN(c)}return!1})(n,e);case 9:return Hr(n.arrayValue.values||[],e.arrayValue.values||[],Pt);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(of(o)!==of(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!Pt(o[u],c[u])))return!1;return!0})(n,e);default:return U(52216,{left:n})}}function Li(n,e){return(n.values||[]).find((t=>Pt(t,e)))!==void 0}function bn(n,e){if(n===e)return 0;const t=Rn(n),r=Rn(e);if(t!==r)return G(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return G(n.booleanValue,e.booleanValue);case 2:return(function(i,o){const c=me(i.integerValue||i.doubleValue),u=me(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(n,e);case 3:return cf(n.timestampValue,e.timestampValue);case 4:return cf(Oi(n),Oi(e));case 5:return ou(n.stringValue,e.stringValue);case 6:return(function(i,o){const c=Gt(i),u=Gt(o);return c.compareTo(u)})(n.bytesValue,e.bytesValue);case 7:return(function(i,o){const c=i.split("/"),u=o.split("/");for(let l=0;l<c.length&&l<u.length;l++){const d=G(c[l],u[l]);if(d!==0)return d}return G(c.length,u.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,o){const c=G(me(i.latitude),me(o.latitude));return c!==0?c:G(me(i.longitude),me(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return uf(n.arrayValue,e.arrayValue);case 10:return(function(i,o){const c=i.fields||{},u=o.fields||{},l=c[es]?.arrayValue,d=u[es]?.arrayValue,p=G(l?.values?.length||0,d?.values?.length||0);return p!==0?p:uf(l,d)})(n.mapValue,e.mapValue);case 11:return(function(i,o){if(i===pn.mapValue&&o===pn.mapValue)return 0;if(i===pn.mapValue)return 1;if(o===pn.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),l=o.fields||{},d=Object.keys(l);u.sort(),d.sort();for(let p=0;p<u.length&&p<d.length;++p){const g=ou(u[p],d[p]);if(g!==0)return g;const w=bn(c[u[p]],l[d[p]]);if(w!==0)return w}return G(u.length,d.length)})(n.mapValue,e.mapValue);default:throw U(23264,{he:t})}}function cf(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return G(n,e);const t=$t(n),r=$t(e),s=G(t.seconds,r.seconds);return s!==0?s:G(t.nanos,r.nanos)}function uf(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=bn(t[s],r[s]);if(i)return i}return G(t.length,r.length)}function ts(n){return fu(n)}function fu(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=$t(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Gt(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return x.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=fu(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${fu(t.fields[o])}`;return s+"}"})(n.mapValue):U(61005,{value:n})}function jo(n){switch(Rn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Fa(n);return e?16+jo(e):16;case 5:return 2*n.stringValue.length;case 6:return Gt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+jo(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return xn(r.fields,((i,o)=>{s+=i.length+jo(o)})),s})(n.mapValue);default:throw U(13486,{value:n})}}function cr(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function pu(n){return!!n&&"integerValue"in n}function Mi(n){return!!n&&"arrayValue"in n}function lf(n){return!!n&&"nullValue"in n}function hf(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function $o(n){return!!n&&"mapValue"in n}function Ua(n){return(n?.mapValue?.fields||{})[hl]?.stringValue===dl}function yi(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return xn(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=yi(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=yi(n.arrayValue.values[t]);return e}return{...n}}function Ng(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Dg}const Vg={mapValue:{fields:{[hl]:{stringValue:dl},[es]:{arrayValue:{}}}}};function KR(n){return"nullValue"in n?zo:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?cr(An.empty(),x.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?Ua(n)?Vg:{mapValue:{}}:U(35942,{value:n})}function WR(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?cr(An.empty(),x.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?Vg:"mapValue"in n?Ua(n)?{mapValue:{}}:pn:U(61959,{value:n})}function df(n,e){const t=bn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function ff(n,e){const t=bn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this.value=e}static empty(){return new xe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!$o(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=yi(t)}setAll(e){let t=he.emptyPath(),r={},s=[];e.forEach(((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=yi(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());$o(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Pt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];$o(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){xn(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new xe(yi(this.value))}}function Og(n){const e=[];return xn(n.fields,((t,r)=>{const s=new he([t]);if($o(r)){const i=Og(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new Xe(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e,t,r,s,i,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new le(e,0,$.min(),$.min(),$.min(),xe.empty(),0)}static newFoundDocument(e,t,r,s){return new le(e,1,t,$.min(),r,s,0)}static newNoDocument(e,t){return new le(e,2,t,$.min(),$.min(),xe.empty(),0)}static newUnknownDocument(e,t){return new le(e,3,t,$.min(),$.min(),xe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual($.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=xe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=xe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=$.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof le&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new le(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e,t){this.position=e,this.inclusive=t}}function pf(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=x.comparator(x.fromName(o.referenceValue),t.key):r=bn(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function mf(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Pt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fi{constructor(e,t="asc"){this.field=e,this.dir=t}}function QR(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xg{}class Z extends xg{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new JR(e,t,r):t==="array-contains"?new ZR(e,r):t==="in"?new qg(e,r):t==="not-in"?new eb(e,r):t==="array-contains-any"?new tb(e,r):new Z(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new YR(e,r):new XR(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(bn(t,this.value)):t!==null&&Rn(this.value)===Rn(t)&&this.matchesComparison(bn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return U(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class re extends xg{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new re(e,t)}matches(e){return ns(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function ns(n){return n.op==="and"}function mu(n){return n.op==="or"}function fl(n){return Lg(n)&&ns(n)}function Lg(n){for(const e of n.filters)if(e instanceof re)return!1;return!0}function gu(n){if(n instanceof Z)return n.field.canonicalString()+n.op.toString()+ts(n.value);if(fl(n))return n.filters.map((e=>gu(e))).join(",");{const e=n.filters.map((t=>gu(t))).join(",");return`${n.op}(${e})`}}function Mg(n,e){return n instanceof Z?(function(r,s){return s instanceof Z&&r.op===s.op&&r.field.isEqual(s.field)&&Pt(r.value,s.value)})(n,e):n instanceof re?(function(r,s){return s instanceof re&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,c)=>i&&Mg(o,s.filters[c])),!0):!1})(n,e):void U(19439)}function Fg(n,e){const t=n.filters.concat(e);return re.create(t,n.op)}function Ug(n){return n instanceof Z?(function(t){return`${t.field.canonicalString()} ${t.op} ${ts(t.value)}`})(n):n instanceof re?(function(t){return t.op.toString()+" {"+t.getFilters().map(Ug).join(" ,")+"}"})(n):"Filter"}class JR extends Z{constructor(e,t,r){super(e,t,r),this.key=x.fromName(r.referenceValue)}matches(e){const t=x.comparator(e.key,this.key);return this.matchesComparison(t)}}class YR extends Z{constructor(e,t){super(e,"in",t),this.keys=Bg("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class XR extends Z{constructor(e,t){super(e,"not-in",t),this.keys=Bg("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Bg(n,e){return(e.arrayValue?.values||[]).map((t=>x.fromName(t.referenceValue)))}class ZR extends Z{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Mi(t)&&Li(t.arrayValue,this.value)}}class qg extends Z{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Li(this.value.arrayValue,t)}}class eb extends Z{constructor(e,t){super(e,"not-in",t)}matches(e){if(Li(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Li(this.value.arrayValue,t)}}class tb extends Z{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Mi(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>Li(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nb{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function _u(n,e=null,t=[],r=[],s=null,i=null,o=null){return new nb(n,e,t,r,s,i,o)}function ur(n){const e=L(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>gu(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),Ki(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>ts(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>ts(r))).join(",")),e.Te=t}return e.Te}function Qi(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!QR(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Mg(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!mf(n.startAt,e.startAt)&&mf(n.endAt,e.endAt)}function oa(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function aa(n,e){return n.filters.filter((t=>t instanceof Z&&t.field.isEqual(e)))}function gf(n,e,t){let r=zo,s=!0;for(const i of aa(n,e)){let o=zo,c=!0;switch(i.op){case"<":case"<=":o=KR(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=zo}df({value:r,inclusive:s},{value:o,inclusive:c})<0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];df({value:r,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}function _f(n,e,t){let r=pn,s=!0;for(const i of aa(n,e)){let o=pn,c=!0;switch(i.op){case">=":case">":o=WR(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=pn}ff({value:r,inclusive:s},{value:o,inclusive:c})>0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];ff({value:r,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function zg(n,e,t,r,s,i,o,c){return new Jt(n,e,t,r,s,i,o,c)}function Es(n){return new Jt(n)}function yf(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function rb(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function pl(n){return n.collectionGroup!==null}function zr(n){const e=L(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new ie(he.comparator);return o.filters.forEach((u=>{u.getFlattenedFilters().forEach((l=>{l.isInequality()&&(c=c.add(l.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new Fi(i,r))})),t.has(he.keyField().canonicalString())||e.Ie.push(new Fi(he.keyField(),r))}return e.Ie}function je(n){const e=L(n);return e.Ee||(e.Ee=$g(e,zr(n))),e.Ee}function jg(n){const e=L(n);return e.Re||(e.Re=$g(e,n.explicitOrderBy)),e.Re}function $g(n,e){if(n.limitType==="F")return _u(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Fi(s.field,i)}));const t=n.endAt?new Sn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Sn(n.startAt.position,n.startAt.inclusive):null;return _u(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function yu(n,e){const t=n.filters.concat([e]);return new Jt(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function sb(n,e){const t=n.explicitOrderBy.concat([e]);return new Jt(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function ca(n,e,t){return new Jt(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function ib(n,e){return new Jt(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),n.limit,n.limitType,e,n.endAt)}function ob(n,e){return new Jt(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),n.limit,n.limitType,n.startAt,e)}function Ji(n,e){return Qi(je(n),je(e))&&n.limitType===e.limitType}function Gg(n){return`${ur(je(n))}|lt:${n.limitType}`}function Lr(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>Ug(s))).join(", ")}]`),Ki(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>ts(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>ts(s))).join(",")),`Target(${r})`})(je(n))}; limitType=${n.limitType})`}function Yi(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):x.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of zr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(o,c,u){const l=pf(o,c,u);return o.inclusive?l<=0:l<0})(r.startAt,zr(r),s)||r.endAt&&!(function(o,c,u){const l=pf(o,c,u);return o.inclusive?l>=0:l>0})(r.endAt,zr(r),s))})(n,e)}function Hg(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Kg(n){return(e,t)=>{let r=!1;for(const s of zr(n)){const i=ab(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function ab(n,e,t){const r=n.field.isKeyField()?x.comparator(e.key,t.key):(function(i,o,c){const u=o.data.field(i),l=c.data.field(i);return u!==null&&l!==null?bn(u,l):U(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return U(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){xn(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return Rg(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cb=new ce(x.comparator);function Ze(){return cb}const Wg=new ce(x.comparator);function ai(...n){let e=Wg;for(const t of n)e=e.insert(t.key,t);return e}function Qg(n){let e=Wg;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function Tt(){return Ii()}function Jg(){return Ii()}function Ii(){return new Yt((n=>n.toString()),((n,e)=>n.isEqual(e)))}const ub=new ce(x.comparator),lb=new ie(x.comparator);function K(...n){let e=lb;for(const t of n)e=e.add(t);return e}const hb=new ie(G);function ml(){return hb}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gl(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ki(e)?"-0":e}}function Yg(n){return{integerValue:""+n}}function Xg(n,e){return fg(e)?Yg(e):gl(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ba{constructor(){this._=void 0}}function db(n,e,t){return n instanceof rs?(function(s,i){const o={fields:{[Pg]:{stringValue:Sg},[kg]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ma(i)&&(i=Fa(i)),i&&(o.fields[Cg]=i),{mapValue:o}})(t,e):n instanceof lr?e_(n,e):n instanceof hr?t_(n,e):(function(s,i){const o=Zg(s,i),c=If(o)+If(s.Ae);return pu(o)&&pu(s.Ae)?Yg(c):gl(s.serializer,c)})(n,e)}function fb(n,e,t){return n instanceof lr?e_(n,e):n instanceof hr?t_(n,e):t}function Zg(n,e){return n instanceof ss?(function(r){return pu(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(e)?e:{integerValue:0}:null}class rs extends Ba{}class lr extends Ba{constructor(e){super(),this.elements=e}}function e_(n,e){const t=n_(e);for(const r of n.elements)t.some((s=>Pt(s,r)))||t.push(r);return{arrayValue:{values:t}}}class hr extends Ba{constructor(e){super(),this.elements=e}}function t_(n,e){let t=n_(e);for(const r of n.elements)t=t.filter((s=>!Pt(s,r)));return{arrayValue:{values:t}}}class ss extends Ba{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function If(n){return me(n.integerValue||n.doubleValue)}function n_(n){return Mi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{constructor(e,t){this.field=e,this.transform=t}}function pb(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof lr&&s instanceof lr||r instanceof hr&&s instanceof hr?Hr(r.elements,s.elements,Pt):r instanceof ss&&s instanceof ss?Pt(r.Ae,s.Ae):r instanceof rs&&s instanceof rs})(n.transform,e.transform)}class mb{constructor(e,t){this.version=e,this.transformResults=t}}class _e{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new _e}static exists(e){return new _e(void 0,e)}static updateTime(e){return new _e(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Go(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class qa{}function r_(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new ws(n.key,_e.none()):new Ts(n.key,n.data,_e.none());{const t=n.data,r=xe.empty();let s=new ie(he.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Xt(n.key,r,new Xe(s.toArray()),_e.none())}}function gb(n,e,t){n instanceof Ts?(function(s,i,o){const c=s.value.clone(),u=Tf(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,e,t):n instanceof Xt?(function(s,i,o){if(!Go(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=Tf(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(s_(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(n,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function Ei(n,e,t,r){return n instanceof Ts?(function(i,o,c,u){if(!Go(i.precondition,o))return c;const l=i.value.clone(),d=wf(i.fieldTransforms,u,o);return l.setAll(d),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null})(n,e,t,r):n instanceof Xt?(function(i,o,c,u){if(!Go(i.precondition,o))return c;const l=wf(i.fieldTransforms,u,o),d=o.data;return d.setAll(s_(i)),d.setAll(l),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(n,e,t,r):(function(i,o,c){return Go(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(n,e,t)}function _b(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Zg(r.transform,s||null);i!=null&&(t===null&&(t=xe.empty()),t.set(r.field,i))}return t||null}function Ef(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Hr(r,s,((i,o)=>pb(i,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Ts extends qa{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Xt extends qa{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function s_(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function Tf(n,e,t){const r=new Map;z(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,fb(o,c,t[s]))}return r}function wf(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,db(i,o,e))}return r}class ws extends qa{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class _l extends qa{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&gb(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Ei(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Ei(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Jg();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const u=r_(o,c);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument($.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),K())}isEqual(e){return this.batchId===e.batchId&&Hr(this.mutations,e.mutations,((t,r)=>Ef(t,r)))&&Hr(this.baseMutations,e.baseMutations,((t,r)=>Ef(t,r)))}}class Il{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){z(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=(function(){return ub})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Il(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class El{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i_{constructor(e,t,r){this.alias=e,this.aggregateType=t,this.fieldPath=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yb{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Re,te;function o_(n){switch(n){case b.OK:return U(64938);case b.CANCELLED:case b.UNKNOWN:case b.DEADLINE_EXCEEDED:case b.RESOURCE_EXHAUSTED:case b.INTERNAL:case b.UNAVAILABLE:case b.UNAUTHENTICATED:return!1;case b.INVALID_ARGUMENT:case b.NOT_FOUND:case b.ALREADY_EXISTS:case b.PERMISSION_DENIED:case b.FAILED_PRECONDITION:case b.ABORTED:case b.OUT_OF_RANGE:case b.UNIMPLEMENTED:case b.DATA_LOSS:return!0;default:return U(15467,{code:n})}}function a_(n){if(n===void 0)return ve("GRPC error has no .code"),b.UNKNOWN;switch(n){case Re.OK:return b.OK;case Re.CANCELLED:return b.CANCELLED;case Re.UNKNOWN:return b.UNKNOWN;case Re.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case Re.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case Re.INTERNAL:return b.INTERNAL;case Re.UNAVAILABLE:return b.UNAVAILABLE;case Re.UNAUTHENTICATED:return b.UNAUTHENTICATED;case Re.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case Re.NOT_FOUND:return b.NOT_FOUND;case Re.ALREADY_EXISTS:return b.ALREADY_EXISTS;case Re.PERMISSION_DENIED:return b.PERMISSION_DENIED;case Re.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case Re.ABORTED:return b.ABORTED;case Re.OUT_OF_RANGE:return b.OUT_OF_RANGE;case Re.UNIMPLEMENTED:return b.UNIMPLEMENTED;case Re.DATA_LOSS:return b.DATA_LOSS;default:return U(39323,{code:n})}}(te=Re||(Re={}))[te.OK=0]="OK",te[te.CANCELLED=1]="CANCELLED",te[te.UNKNOWN=2]="UNKNOWN",te[te.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",te[te.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",te[te.NOT_FOUND=5]="NOT_FOUND",te[te.ALREADY_EXISTS=6]="ALREADY_EXISTS",te[te.PERMISSION_DENIED=7]="PERMISSION_DENIED",te[te.UNAUTHENTICATED=16]="UNAUTHENTICATED",te[te.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",te[te.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",te[te.ABORTED=10]="ABORTED",te[te.OUT_OF_RANGE=11]="OUT_OF_RANGE",te[te.UNIMPLEMENTED=12]="UNIMPLEMENTED",te[te.INTERNAL=13]="INTERNAL",te[te.UNAVAILABLE=14]="UNAVAILABLE",te[te.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Iu=null;function Ib(n){if(Iu)throw new Error("a TestingHooksSpi instance is already set");Iu=n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function c_(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eb=new En([4294967295,4294967295],0);function vf(n){const e=c_().encode(n),t=new Qm;return t.update(e),new Uint8Array(t.digest())}function Af(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new En([t,r],0),new En([s,i],0)]}class Tl{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ci(`Invalid padding: ${t}`);if(r<0)throw new ci(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ci(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new ci(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=En.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(En.fromNumber(r)));return s.compare(Eb)===1&&(s=new En([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=vf(e),[r,s]=Af(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);if(!this.we(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Tl(i,s,t);return r.forEach((c=>o.insert(c))),o}insert(e){if(this.ge===0)return;const t=vf(e),[r,s]=Af(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);this.Se(o)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class ci extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Zi.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new vs($.min(),s,new ce(G),Ze(),K())}}class Zi{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Zi(r,t,K(),K(),K())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class u_{constructor(e,t){this.targetId=e,this.Ce=t}}class l_{constructor(e,t,r=Ie.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Rf{constructor(){this.ve=0,this.Fe=bf(),this.Me=Ie.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=K(),t=K(),r=K();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:U(38017,{changeType:i})}})),new Zi(this.Me,this.xe,e,t,r)}Ke(){this.Oe=!1,this.Fe=bf()}qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,z(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class Tb{constructor(e){this.Ge=e,this.ze=new Map,this.je=Ze(),this.Je=So(),this.He=So(),this.Ze=new ce(G)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.Ke(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:U(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,s)=>{this.rt(s)&&t(s)}))}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(oa(i))if(r===0){const o=new x(i.path);this.et(t,o,le.newNoDocument(o,$.min()))}else z(r===1,20013,{expectedCount:r});else{const o=this._t(t);if(o!==r){const c=this.ut(e),u=c?this.ct(c,e,o):1;if(u!==0){this.it(t);const l=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,l)}Iu?.o((function(d,p,g,w,C){const k={localCacheCount:d,existenceFilterCount:p.count,databaseId:g.database,projectId:g.projectId},D=p.unchangedNames;return D&&(k.bloomFilter={applied:C===0,hashCount:D?.hashCount??0,bitmapLength:D?.bits?.bitmap?.length??0,padding:D?.bits?.padding??0,mightContain:F=>w?.mightContain(F)??!1}),k})(o,e.Ce,this.Ge.ht(),c,u))}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=Gt(r).toUint8Array()}catch(u){if(u instanceof bg)return rt("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Tl(o,s,i)}catch(u){return rt(u instanceof ci?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)})),s}Tt(e){const t=new Map;this.ze.forEach(((i,o)=>{const c=this.ot(o);if(c){if(i.current&&oa(c.target)){const u=new x(c.target.path);this.It(u).has(o)||this.Et(o,u)||this.et(o,u,le.newNoDocument(u,e))}i.Be&&(t.set(o,i.ke()),i.Ke())}}));let r=K();this.He.forEach(((i,o)=>{let c=!0;o.forEachWhile((u=>{const l=this.ot(u);return!l||l.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(e)));const s=new vs(e,t,this.Ze,this.je,r);return this.je=Ze(),this.Je=So(),this.He=So(),this.Ze=new ce(G),s}Ye(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).qe(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.qe(t,1):s.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new Rf,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new ie(G),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new ie(G),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||V("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Rf),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function So(){return new ce(x.comparator)}function bf(){return new ce(x.comparator)}const wb={asc:"ASCENDING",desc:"DESCENDING"},vb={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Ab={and:"AND",or:"OR"};class Rb{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Eu(n,e){return n.useProto3Json||Ki(e)?e:{value:e}}function is(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function h_(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function bb(n,e){return is(n,e.toTimestamp())}function Ae(n){return z(!!n,49232),$.fromTimestamp((function(t){const r=$t(t);return new ne(r.seconds,r.nanos)})(n))}function wl(n,e){return Tu(n,e).canonicalString()}function Tu(n,e){const t=(function(s){return new J(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function d_(n){const e=J.fromString(n);return z(T_(e),10190,{key:e.toString()}),e}function Ui(n,e){return wl(n.databaseId,e.path)}function bt(n,e){const t=d_(e);if(t.get(1)!==n.databaseId.projectId)throw new N(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new N(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new x(m_(t))}function f_(n,e){return wl(n.databaseId,e)}function p_(n){const e=d_(n);return e.length===4?J.emptyPath():m_(e)}function wu(n){return new J(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function m_(n){return z(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Sf(n,e,t){return{name:Ui(n,e),fields:t.value.mapValue.fields}}function za(n,e,t){const r=bt(n,e.name),s=Ae(e.updateTime),i=e.createTime?Ae(e.createTime):$.min(),o=new xe({mapValue:{fields:e.fields}}),c=le.newFoundDocument(r,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function Sb(n,e){return"found"in e?(function(r,s){z(!!s.found,43571),s.found.name,s.found.updateTime;const i=bt(r,s.found.name),o=Ae(s.found.updateTime),c=s.found.createTime?Ae(s.found.createTime):$.min(),u=new xe({mapValue:{fields:s.found.fields}});return le.newFoundDocument(i,o,c,u)})(n,e):"missing"in e?(function(r,s){z(!!s.missing,3894),z(!!s.readTime,22933);const i=bt(r,s.missing),o=Ae(s.readTime);return le.newNoDocument(i,o)})(n,e):U(7234,{result:e})}function Pb(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:U(39313,{state:l})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(l,d){return l.useProto3Json?(z(d===void 0||typeof d=="string",58123),Ie.fromBase64String(d||"")):(z(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),Ie.fromUint8Array(d||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&(function(l){const d=l.code===void 0?b.UNKNOWN:a_(l.code);return new N(d,l.message||"")})(o);t=new l_(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=bt(n,r.document.name),i=Ae(r.document.updateTime),o=r.document.createTime?Ae(r.document.createTime):$.min(),c=new xe({mapValue:{fields:r.document.fields}}),u=le.newFoundDocument(s,i,o,c),l=r.targetIds||[],d=r.removedTargetIds||[];t=new Ho(l,d,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=bt(n,r.document),i=r.readTime?Ae(r.readTime):$.min(),o=le.newNoDocument(s,i),c=r.removedTargetIds||[];t=new Ho([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=bt(n,r.document),i=r.removedTargetIds||[];t=new Ho([],i,s,null)}else{if(!("filter"in e))return U(11601,{Vt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new yb(s,i),c=r.targetId;t=new u_(c,o)}}return t}function Bi(n,e){let t;if(e instanceof Ts)t={update:Sf(n,e.key,e.value)};else if(e instanceof ws)t={delete:Ui(n,e.key)};else if(e instanceof Xt)t={update:Sf(n,e.key,e.data),updateMask:Ob(e.fieldMask)};else{if(!(e instanceof _l))return U(16599,{dt:e.type});t={verify:Ui(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,o){const c=o.transform;if(c instanceof rs)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof lr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof hr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof ss)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw U(20930,{transform:o.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:bb(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:U(27497)})(n,e.precondition)),t}function vu(n,e){const t=e.currentDocument?(function(i){return i.updateTime!==void 0?_e.updateTime(Ae(i.updateTime)):i.exists!==void 0?_e.exists(i.exists):_e.none()})(e.currentDocument):_e.none(),r=e.updateTransforms?e.updateTransforms.map((s=>(function(o,c){let u=null;if("setToServerValue"in c)z(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),u=new rs;else if("appendMissingElements"in c){const d=c.appendMissingElements.values||[];u=new lr(d)}else if("removeAllFromArray"in c){const d=c.removeAllFromArray.values||[];u=new hr(d)}else"increment"in c?u=new ss(o,c.increment):U(16584,{proto:c});const l=he.fromServerFormat(c.fieldPath);return new Xi(l,u)})(n,s))):[];if(e.update){e.update.name;const s=bt(n,e.update.name),i=new xe({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=(function(u){const l=u.fieldPaths||[];return new Xe(l.map((d=>he.fromServerFormat(d))))})(e.updateMask);return new Xt(s,i,o,t,r)}return new Ts(s,i,t,r)}if(e.delete){const s=bt(n,e.delete);return new ws(s,t)}if(e.verify){const s=bt(n,e.verify);return new _l(s,t)}return U(1463,{proto:e})}function Cb(n,e){return n&&n.length>0?(z(e!==void 0,14353),n.map((t=>(function(s,i){let o=s.updateTime?Ae(s.updateTime):Ae(i);return o.isEqual($.min())&&(o=Ae(i)),new mb(o,s.transformResults||[])})(t,e)))):[]}function g_(n,e){return{documents:[f_(n,e.path)]}}function ja(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=f_(n,s);const i=(function(l){if(l.length!==0)return E_(re.create(l,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(l){if(l.length!==0)return l.map((d=>(function(g){return{field:hn(g.field),direction:Db(g.dir)}})(d)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=Eu(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(l){return{before:l.inclusive,values:l.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(l){return{before:!l.inclusive,values:l.position}})(e.endAt)),{ft:t,parent:s}}function __(n,e,t,r){const{ft:s,parent:i}=ja(n,e),o={},c=[];let u=0;return t.forEach((l=>{const d=r?l.alias:"aggregate_"+u++;o[d]=l.alias,l.aggregateType==="count"?c.push({alias:d,count:{}}):l.aggregateType==="avg"?c.push({alias:d,avg:{field:hn(l.fieldPath)}}):l.aggregateType==="sum"&&c.push({alias:d,sum:{field:hn(l.fieldPath)}})})),{request:{structuredAggregationQuery:{aggregations:c,structuredQuery:s.structuredQuery},parent:s.parent},gt:o,parent:i}}function y_(n){let e=p_(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){z(r===1,65062);const d=t.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];t.where&&(i=(function(p){const g=I_(p);return g instanceof re&&fl(g)?g.getFilters():[g]})(t.where));let o=[];t.orderBy&&(o=(function(p){return p.map((g=>(function(C){return new Fi(Mr(C.field),(function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(C.direction))})(g)))})(t.orderBy));let c=null;t.limit&&(c=(function(p){let g;return g=typeof p=="object"?p.value:p,Ki(g)?null:g})(t.limit));let u=null;t.startAt&&(u=(function(p){const g=!!p.before,w=p.values||[];return new Sn(w,g)})(t.startAt));let l=null;return t.endAt&&(l=(function(p){const g=!p.before,w=p.values||[];return new Sn(w,g)})(t.endAt)),zg(e,s,o,i,c,"F",u,l)}function kb(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return U(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function I_(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Mr(t.unaryFilter.field);return Z.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Mr(t.unaryFilter.field);return Z.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Mr(t.unaryFilter.field);return Z.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Mr(t.unaryFilter.field);return Z.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return U(61313);default:return U(60726)}})(n):n.fieldFilter!==void 0?(function(t){return Z.create(Mr(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return U(58110);default:return U(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return re.create(t.compositeFilter.filters.map((r=>I_(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return U(1026)}})(t.compositeFilter.op))})(n):U(30097,{filter:n})}function Db(n){return wb[n]}function Nb(n){return vb[n]}function Vb(n){return Ab[n]}function hn(n){return{fieldPath:n.canonicalString()}}function Mr(n){return he.fromServerFormat(n.fieldPath)}function E_(n){return n instanceof Z?(function(t){if(t.op==="=="){if(hf(t.value))return{unaryFilter:{field:hn(t.field),op:"IS_NAN"}};if(lf(t.value))return{unaryFilter:{field:hn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(hf(t.value))return{unaryFilter:{field:hn(t.field),op:"IS_NOT_NAN"}};if(lf(t.value))return{unaryFilter:{field:hn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:hn(t.field),op:Nb(t.op),value:t.value}}})(n):n instanceof re?(function(t){const r=t.getFilters().map((s=>E_(s)));return r.length===1?r[0]:{compositeFilter:{op:Vb(t.op),filters:r}}})(n):U(54877,{filter:n})}function Ob(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function T_(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function w_(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e,t,r,s,i=$.min(),o=$.min(),c=Ie.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new wt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new wt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new wt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new wt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v_{constructor(e){this.yt=e}}function xb(n,e){let t;if(e.document)t=za(n.yt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=x.fromSegments(e.noDocument.path),s=fr(e.noDocument.readTime);t=le.newNoDocument(r,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return U(56709);{const r=x.fromSegments(e.unknownDocument.path),s=fr(e.unknownDocument.version);t=le.newUnknownDocument(r,s)}}return e.readTime&&t.setReadTime((function(s){const i=new ne(s[0],s[1]);return $.fromTimestamp(i)})(e.readTime)),t}function Pf(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:ua(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=(function(i,o){return{name:Ui(i,o.key),fields:o.data.value.mapValue.fields,updateTime:is(i,o.version.toTimestamp()),createTime:is(i,o.createTime.toTimestamp())}})(n.yt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:dr(e.version)};else{if(!e.isUnknownDocument())return U(57904,{document:e});r.unknownDocument={path:t.path.toArray(),version:dr(e.version)}}return r}function ua(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function dr(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function fr(n){const e=new ne(n.seconds,n.nanoseconds);return $.fromTimestamp(e)}function Yn(n,e){const t=(e.baseMutations||[]).map((i=>vu(n.yt,i)));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const r=e.mutations.map((i=>vu(n.yt,i))),s=ne.fromMillis(e.localWriteTimeMs);return new yl(e.batchId,s,t,r)}function ui(n){const e=fr(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?fr(n.lastLimboFreeSnapshotVersion):$.min();let r;return r=(function(i){return i.documents!==void 0})(n.query)?(function(i){const o=i.documents.length;return z(o===1,1966,{count:o}),je(Es(p_(i.documents[0])))})(n.query):(function(i){return je(y_(i))})(n.query),new wt(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,Ie.fromBase64String(n.resumeToken))}function A_(n,e){const t=dr(e.snapshotVersion),r=dr(e.lastLimboFreeSnapshotVersion);let s;s=oa(e.target)?g_(n.yt,e.target):ja(n.yt,e.target).ft;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:ur(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function $a(n){const e=y_({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ca(e,e.limit,"L"):e}function Bc(n,e){return new El(e.largestBatchId,vu(n.yt,e.overlayMutation))}function Cf(n,e){const t=e.path.lastSegment();return[n,ze(e.path.popLast()),t]}function kf(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:dr(r.readTime),documentKey:ze(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lb{getBundleMetadata(e,t){return Df(e).get(t).next((r=>{if(r)return(function(i){return{id:i.bundleId,createTime:fr(i.createTime),version:i.version}})(r)}))}saveBundleMetadata(e,t){return Df(e).put((function(s){return{bundleId:s.id,createTime:dr(Ae(s.createTime)),version:s.version}})(t))}getNamedQuery(e,t){return Nf(e).get(t).next((r=>{if(r)return(function(i){return{name:i.name,query:$a(i.bundledQuery),readTime:fr(i.readTime)}})(r)}))}saveNamedQuery(e,t){return Nf(e).put((function(s){return{name:s.name,readTime:dr(Ae(s.readTime)),bundledQuery:s.bundledQuery}})(t))}}function Df(n){return De(n,Oa)}function Nf(n){return De(n,xa)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const r=t.uid||"";return new Ga(e,r)}getOverlay(e,t){return Js(e).get(Cf(this.userId,t)).next((r=>r?Bc(this.serializer,r):null))}getOverlays(e,t){const r=Tt();return A.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){const s=[];return r.forEach(((i,o)=>{const c=new El(t,o);s.push(this.St(e,c))})),A.waitFor(s)}removeOverlaysForBatchId(e,t,r){const s=new Set;t.forEach((o=>s.add(ze(o.getCollectionPath()))));const i=[];return s.forEach((o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);i.push(Js(e).X(hu,c))})),A.waitFor(i)}getOverlaysForCollection(e,t,r){const s=Tt(),i=ze(t),o=IDBKeyRange.bound([this.userId,i,r],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Js(e).J(hu,o).next((c=>{for(const u of c){const l=Bc(this.serializer,u);s.set(l.getKey(),l)}return s}))}getOverlaysForCollectionGroup(e,t,r,s){const i=Tt();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Js(e).ee({index:Ig,range:c},((u,l,d)=>{const p=Bc(this.serializer,l);i.size()<s||p.largestBatchId===o?(i.set(p.getKey(),p),o=p.largestBatchId):d.done()})).next((()=>i))}St(e,t){return Js(e).put((function(s,i,o){const[c,u,l]=Cf(i,o.mutation.key);return{userId:i,collectionPath:u,documentId:l,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Bi(s.yt,o.mutation)}})(this.serializer,this.userId,t))}}function Js(n){return De(n,La)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mb{bt(e){return De(e,ul)}getSessionToken(e){return this.bt(e).get("sessionToken").next((t=>{const r=t?.value;return r?Ie.fromUint8Array(r):Ie.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(me(e.integerValue));else if("doubleValue"in e){const r=me(e.doubleValue);isNaN(r)?this.Ft(t,13):(this.Ft(t,15),ki(r)?t.Mt(0):t.Mt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Ft(t,20),typeof r=="string"&&(r=$t(r)),t.xt(`${r.seconds||""}`),t.Mt(r.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(Gt(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.Ft(t,45),t.Mt(r.latitude||0),t.Mt(r.longitude||0)}else"mapValue"in e?Ng(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):Ua(e)?this.kt(e.mapValue,t):(this.Kt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.qt(e.arrayValue,t),this.Nt(t)):U(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}Kt(e,t){const r=e.fields||{};this.Ft(t,55);for(const s of Object.keys(r))this.Ot(s,t),this.Ct(r[s],t)}kt(e,t){const r=e.fields||{};this.Ft(t,53);const s=es,i=r[s].arrayValue?.values?.length||0;this.Ft(t,15),t.Mt(me(i)),this.Ot(s,t),this.Ct(r[s],t)}qt(e,t){const r=e.values||[];this.Ft(t,50);for(const s of r)this.Ct(s,t)}Lt(e,t){this.Ft(t,37),x.fromName(e).path.forEach((r=>{this.Ft(t,60),this.$t(r,t)}))}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}Xn.Wt=new Xn;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kr=255;function Fb(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function Vf(n){const e=64-(function(r){let s=0;for(let i=0;i<8;++i){const o=Fb(255&r[i]);if(s+=o,o!==8)break}return s})(n);return Math.ceil(e/8)}class Ub{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Gt(r.value),r=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Jt(r.value),r=t.next();this.Ht()}Zt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Gt(r);else if(r<2048)this.Gt(960|r>>>6),this.Gt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Gt(480|r>>>12),this.Gt(128|63&r>>>6),this.Gt(128|63&r);else{const s=t.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Xt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Jt(r);else if(r<2048)this.Jt(960|r>>>6),this.Jt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Jt(480|r>>>12),this.Jt(128|63&r>>>6),this.Jt(128|63&r);else{const s=t.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Ht()}Yt(e){const t=this.en(e),r=Vf(t);this.tn(1+r),this.buffer[this.position++]=255&r;for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=255&t[s]}nn(e){const t=this.en(e),r=Vf(t);this.tn(1+r),this.buffer[this.position++]=~(255&r);for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}rn(){this.sn(kr),this.sn(255)}_n(){this.an(kr),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=(function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)})(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let s=1;s<t.length;++s)t[s]^=r?255:0;return t}Gt(e){const t=255&e;t===0?(this.sn(0),this.sn(255)):t===kr?(this.sn(kr),this.sn(0)):this.sn(t)}Jt(e){const t=255&e;t===0?(this.an(0),this.an(255)):t===kr?(this.an(kr),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const s=new Uint8Array(r);s.set(this.buffer),this.buffer=s}}class Bb{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class qb{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class Ys{constructor(){this.cn=new Ub,this.ascending=new Bb(this.cn),this.descending=new qb(this.cn)}seed(e){this.cn.seed(e)}ln(e){return e===0?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(e,t,r,s){this.hn=e,this.Pn=t,this.Tn=r,this.In=s}En(){const e=this.In.length,t=e===0||this.In[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.In,0),t!==e?r.set([0],this.In.length):++r[r.length-1],new Zn(this.hn,this.Pn,this.Tn,r)}Rn(e,t,r){return{indexId:this.hn,uid:e,arrayValue:Ko(this.Tn),directionalValue:Ko(this.In),orderedDocumentKey:Ko(t),documentKey:r.path.toArray()}}An(e,t,r){const s=this.Rn(e,t,r);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function cn(n,e){let t=n.hn-e.hn;return t!==0?t:(t=Of(n.Tn,e.Tn),t!==0?t:(t=Of(n.In,e.In),t!==0?t:x.comparator(n.Pn,e.Pn)))}function Of(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}function Ko(n){return Fp()?(function(t){let r="";for(let s=0;s<t.length;s++)r+=String.fromCharCode(t[s]);return r})(n):n}function xf(n){return typeof n!="string"?n:(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(n)}class Lf{constructor(e){this.Vn=new ie(((t,r)=>he.comparator(t.field,r.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[];for(const t of e.filters){const r=t;r.isInequality()?this.Vn=this.Vn.add(r):this.mn.push(r)}}get fn(){return this.Vn.size>1}gn(e){if(z(e.collectionGroup===this.collectionId,49279),this.fn)return!1;const t=cu(e);if(t!==void 0&&!this.pn(t))return!1;const r=Wn(e);let s=new Set,i=0,o=0;for(;i<r.length&&this.pn(r[i]);++i)s=s.add(r[i].fieldPath.canonicalString());if(i===r.length)return!0;if(this.Vn.size>0){const c=this.Vn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const u=r[i];if(!this.yn(c,u)||!this.wn(this.dn[o++],u))return!1}++i}for(;i<r.length;++i){const c=r[i];if(o>=this.dn.length||!this.wn(this.dn[o++],c))return!1}return!0}Sn(){if(this.fn)return null;let e=new ie(he.comparator);const t=[];for(const r of this.mn)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new rr(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new rr(r.field,0))}for(const r of this.dn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new rr(r.field,r.dir==="asc"?0:1)));return new Wr(Wr.UNKNOWN_ID,this.collectionId,t,Qr.empty())}pn(e){for(const t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R_(n){if(z(n instanceof Z||n instanceof re,20012),n instanceof Z){if(n instanceof qg){const t=n.value.arrayValue?.values?.map((r=>Z.create(n.field,"==",r)))||[];return re.create(t,"or")}return n}const e=n.filters.map((t=>R_(t)));return re.create(e,n.op)}function zb(n){if(n.getFilters().length===0)return[];const e=bu(R_(n));return z(b_(e),7391),Au(e)||Ru(e)?[e]:e.getFilters()}function Au(n){return n instanceof Z}function Ru(n){return n instanceof re&&fl(n)}function b_(n){return Au(n)||Ru(n)||(function(t){if(t instanceof re&&mu(t)){for(const r of t.getFilters())if(!Au(r)&&!Ru(r))return!1;return!0}return!1})(n)}function bu(n){if(z(n instanceof Z||n instanceof re,34018),n instanceof Z)return n;if(n.filters.length===1)return bu(n.filters[0]);const e=n.filters.map((r=>bu(r)));let t=re.create(e,n.op);return t=la(t),b_(t)?t:(z(t instanceof re,64498),z(ns(t),40251),z(t.filters.length>1,57927),t.filters.reduce(((r,s)=>vl(r,s))))}function vl(n,e){let t;return z(n instanceof Z||n instanceof re,38388),z(e instanceof Z||e instanceof re,25473),t=n instanceof Z?e instanceof Z?(function(s,i){return re.create([s,i],"and")})(n,e):Mf(n,e):e instanceof Z?Mf(e,n):(function(s,i){if(z(s.filters.length>0&&i.filters.length>0,48005),ns(s)&&ns(i))return Fg(s,i.getFilters());const o=mu(s)?s:i,c=mu(s)?i:s,u=o.filters.map((l=>vl(l,c)));return re.create(u,"or")})(n,e),la(t)}function Mf(n,e){if(ns(e))return Fg(e,n.getFilters());{const t=e.filters.map((r=>vl(n,r)));return re.create(t,"or")}}function la(n){if(z(n instanceof Z||n instanceof re,11850),n instanceof Z)return n;const e=n.getFilters();if(e.length===1)return la(e[0]);if(Lg(n))return n;const t=e.map((s=>la(s))),r=[];return t.forEach((s=>{s instanceof Z?r.push(s):s instanceof re&&(s.op===n.op?r.push(...s.filters):r.push(s))})),r.length===1?r[0]:re.create(r,n.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jb{constructor(){this.bn=new Al}addToCollectionParentIndex(e,t){return this.bn.add(t),A.resolve()}getCollectionParents(e,t){return A.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return A.resolve()}deleteFieldIndex(e,t){return A.resolve()}deleteAllFieldIndexes(e){return A.resolve()}createTargetIndexes(e,t){return A.resolve()}getDocumentsMatchingTarget(e,t){return A.resolve(null)}getIndexType(e,t){return A.resolve(0)}getFieldIndexes(e,t){return A.resolve([])}getNextCollectionGroupToUpdate(e){return A.resolve(null)}getMinOffset(e,t){return A.resolve(ct.min())}getMinOffsetFromCollectionGroup(e,t){return A.resolve(ct.min())}updateCollectionGroup(e,t,r){return A.resolve()}updateIndexEntries(e,t){return A.resolve()}}class Al{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ie(J.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ie(J.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ff="IndexedDbIndexManager",Po=new Uint8Array(0);class $b{constructor(e,t){this.databaseId=t,this.Dn=new Al,this.Cn=new Yt((r=>ur(r)),((r,s)=>Qi(r,s))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){const r=t.lastSegment(),s=t.popLast();e.addOnCommittedListener((()=>{this.Dn.add(t)}));const i={collectionId:r,parent:ze(s)};return Uf(e).put(i)}return A.resolve()}getCollectionParents(e,t){const r=[],s=IDBKeyRange.bound([t,""],[sg(t),""],!1,!0);return Uf(e).J(s).next((i=>{for(const o of i){if(o.collectionId!==t)break;r.push(Et(o.parent))}return r}))}addFieldIndex(e,t){const r=Xs(e),s=(function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map((u=>[u.fieldPath.canonicalString(),u.kind]))}})(t);delete s.indexId;const i=r.add(s);if(t.indexState){const o=Nr(e);return i.next((c=>{o.put(kf(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return i.next()}deleteFieldIndex(e,t){const r=Xs(e),s=Nr(e),i=Dr(e);return r.delete(t.indexId).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=Xs(e),r=Dr(e),s=Nr(e);return t.X().next((()=>r.X())).next((()=>s.X()))}createTargetIndexes(e,t){return A.forEach(this.vn(t),(r=>this.getIndexType(e,r).next((s=>{if(s===0||s===1){const i=new Lf(r).Sn();if(i!=null)return this.addFieldIndex(e,i)}}))))}getDocumentsMatchingTarget(e,t){const r=Dr(e);let s=!0;const i=new Map;return A.forEach(this.vn(t),(o=>this.Fn(e,o).next((c=>{s&&(s=!!c),i.set(o,c)})))).next((()=>{if(s){let o=K();const c=[];return A.forEach(i,((u,l)=>{V(Ff,`Using index ${(function(B){return`id=${B.indexId}|cg=${B.collectionGroup}|f=${B.fields.map((H=>`${H.fieldPath}:${H.kind}`)).join(",")}`})(u)} to execute ${ur(t)}`);const d=(function(B,H){const ee=cu(H);if(ee===void 0)return null;for(const W of aa(B,ee.fieldPath))switch(W.op){case"array-contains-any":return W.value.arrayValue.values||[];case"array-contains":return[W.value]}return null})(l,u),p=(function(B,H){const ee=new Map;for(const W of Wn(H))for(const E of aa(B,W.fieldPath))switch(E.op){case"==":case"in":ee.set(W.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return ee.set(W.fieldPath.canonicalString(),E.value),Array.from(ee.values())}return null})(l,u),g=(function(B,H){const ee=[];let W=!0;for(const E of Wn(H)){const _=E.kind===0?gf(B,E.fieldPath,B.startAt):_f(B,E.fieldPath,B.startAt);ee.push(_.value),W&&(W=_.inclusive)}return new Sn(ee,W)})(l,u),w=(function(B,H){const ee=[];let W=!0;for(const E of Wn(H)){const _=E.kind===0?_f(B,E.fieldPath,B.endAt):gf(B,E.fieldPath,B.endAt);ee.push(_.value),W&&(W=_.inclusive)}return new Sn(ee,W)})(l,u),C=this.Mn(u,l,g),k=this.Mn(u,l,w),D=this.xn(u,l,p),F=this.On(u.indexId,d,C,g.inclusive,k,w.inclusive,D);return A.forEach(F,(j=>r.Z(j,t.limit).next((B=>{B.forEach((H=>{const ee=x.fromSegments(H.documentKey);o.has(ee)||(o=o.add(ee),c.push(ee))}))}))))})).next((()=>c))}return A.resolve(null)}))}vn(e){let t=this.Cn.get(e);return t||(e.filters.length===0?t=[e]:t=zb(re.create(e.filters,"and")).map((r=>_u(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt))),this.Cn.set(e,t),t)}On(e,t,r,s,i,o,c){const u=(t!=null?t.length:1)*Math.max(r.length,i.length),l=u/(t!=null?t.length:1),d=[];for(let p=0;p<u;++p){const g=t?this.Nn(t[p/l]):Po,w=this.Bn(e,g,r[p%l],s),C=this.Ln(e,g,i[p%l],o),k=c.map((D=>this.Bn(e,g,D,!0)));d.push(...this.createRange(w,C,k))}return d}Bn(e,t,r,s){const i=new Zn(e,x.empty(),t,r);return s?i:i.En()}Ln(e,t,r,s){const i=new Zn(e,x.empty(),t,r);return s?i.En():i}Fn(e,t){const r=new Lf(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next((i=>{let o=null;for(const c of i)r.gn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o}))}getIndexType(e,t){let r=2;const s=this.vn(t);return A.forEach(s,(i=>this.Fn(e,i).next((o=>{o?r!==0&&o.fields.length<(function(u){let l=new ie(he.comparator),d=!1;for(const p of u.filters)for(const g of p.getFlattenedFilters())g.field.isKeyField()||(g.op==="array-contains"||g.op==="array-contains-any"?d=!0:l=l.add(g.field));for(const p of u.orderBy)p.field.isKeyField()||(l=l.add(p.field));return l.size+(d?1:0)})(i)&&(r=1):r=0})))).next((()=>(function(o){return o.limit!==null})(t)&&s.length>1&&r===2?1:r))}kn(e,t){const r=new Ys;for(const s of Wn(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=r.ln(s.kind);Xn.Wt.Dt(i,o)}return r.un()}Nn(e){const t=new Ys;return Xn.Wt.Dt(e,t.ln(0)),t.un()}Kn(e,t){const r=new Ys;return Xn.Wt.Dt(cr(this.databaseId,t),r.ln((function(i){const o=Wn(i);return o.length===0?0:o[o.length-1].kind})(e))),r.un()}xn(e,t,r){if(r===null)return[];let s=[];s.push(new Ys);let i=0;for(const o of Wn(e)){const c=r[i++];for(const u of s)if(this.qn(t,o.fieldPath)&&Mi(c))s=this.Un(s,o,c);else{const l=u.ln(o.kind);Xn.Wt.Dt(c,l)}}return this.$n(s)}Mn(e,t,r){return this.xn(e,t,r.position)}$n(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].un();return t}Un(e,t,r){const s=[...e],i=[];for(const o of r.arrayValue.values||[])for(const c of s){const u=new Ys;u.seed(c.un()),Xn.Wt.Dt(o,u.ln(t.kind)),i.push(u)}return i}qn(e,t){return!!e.filters.find((r=>r instanceof Z&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in")))}getFieldIndexes(e,t){const r=Xs(e),s=Nr(e);return(t?r.J(lu,IDBKeyRange.bound(t,t)):r.J()).next((i=>{const o=[];return A.forEach(i,(c=>s.get([c.indexId,this.uid]).next((u=>{o.push((function(d,p){const g=p?new Qr(p.sequenceNumber,new ct(fr(p.readTime),new x(Et(p.documentKey)),p.largestBatchId)):Qr.empty(),w=d.fields.map((([C,k])=>new rr(he.fromServerFormat(C),k)));return new Wr(d.indexId,d.collectionGroup,w,g)})(c,u))})))).next((()=>o))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((r,s)=>{const i=r.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:G(r.collectionGroup,s.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,r){const s=Xs(e),i=Nr(e);return this.Wn(e).next((o=>s.J(lu,IDBKeyRange.bound(t,t)).next((c=>A.forEach(c,(u=>i.put(kf(u.indexId,this.uid,o,r))))))))}updateIndexEntries(e,t){const r=new Map;return A.forEach(t,((s,i)=>{const o=r.get(s.collectionGroup);return(o?A.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next((c=>(r.set(s.collectionGroup,c),A.forEach(c,(u=>this.Qn(e,s,u).next((l=>{const d=this.Gn(i,u);return l.isEqual(d)?A.resolve():this.zn(e,i,u,l,d)})))))))}))}jn(e,t,r,s){return Dr(e).put(s.Rn(this.uid,this.Kn(r,t.key),t.key))}Jn(e,t,r,s){return Dr(e).delete(s.An(this.uid,this.Kn(r,t.key),t.key))}Qn(e,t,r){const s=Dr(e);let i=new ie(cn);return s.ee({index:yg,range:IDBKeyRange.only([r.indexId,this.uid,Ko(this.Kn(r,t))])},((o,c)=>{i=i.add(new Zn(r.indexId,t,xf(c.arrayValue),xf(c.directionalValue)))})).next((()=>i))}Gn(e,t){let r=new ie(cn);const s=this.kn(t,e);if(s==null)return r;const i=cu(t);if(i!=null){const o=e.data.field(i.fieldPath);if(Mi(o))for(const c of o.arrayValue.values||[])r=r.add(new Zn(t.indexId,e.key,this.Nn(c),s))}else r=r.add(new Zn(t.indexId,e.key,Po,s));return r}zn(e,t,r,s,i){V(Ff,"Updating index entries for document '%s'",t.key);const o=[];return(function(u,l,d,p,g){const w=u.getIterator(),C=l.getIterator();let k=Cr(w),D=Cr(C);for(;k||D;){let F=!1,j=!1;if(k&&D){const B=d(k,D);B<0?j=!0:B>0&&(F=!0)}else k!=null?j=!0:F=!0;F?(p(D),D=Cr(C)):j?(g(k),k=Cr(w)):(k=Cr(w),D=Cr(C))}})(s,i,cn,(c=>{o.push(this.jn(e,t,r,c))}),(c=>{o.push(this.Jn(e,t,r,c))})),A.waitFor(o)}Wn(e){let t=1;return Nr(e).ee({index:_g,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((r,s,i)=>{i.done(),t=s.sequenceNumber+1})).next((()=>t))}createRange(e,t,r){r=r.sort(((o,c)=>cn(o,c))).filter(((o,c,u)=>!c||cn(o,u[c-1])!==0));const s=[];s.push(e);for(const o of r){const c=cn(o,e),u=cn(o,t);if(c===0)s[0]=e.En();else if(c>0&&u<0)s.push(o),s.push(o.En());else if(u>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Hn(s[o],s[o+1]))return[];const c=s[o].An(this.uid,Po,x.empty()),u=s[o+1].An(this.uid,Po,x.empty());i.push(IDBKeyRange.bound(c,u))}return i}Hn(e,t){return cn(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Bf)}getMinOffset(e,t){return A.mapArray(this.vn(t),(r=>this.Fn(e,r).next((s=>s||U(44426))))).next(Bf)}}function Uf(n){return De(n,Vi)}function Dr(n){return De(n,_i)}function Xs(n){return De(n,cl)}function Nr(n){return De(n,gi)}function Bf(n){z(n.length!==0,28825);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const s=n[r].indexState.offset;il(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new ct(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},S_=41943040;class qe{static withCacheSize(e){return new qe(e,qe.DEFAULT_COLLECTION_PERCENTILE,qe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P_(n,e,t){const r=n.store(lt),s=n.store(Jr),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const u=r.ee({range:o},((d,p,g)=>(c++,g.delete())));i.push(u.next((()=>{z(c===1,47070,{batchId:t.batchId})})));const l=[];for(const d of t.mutations){const p=pg(e,d.key.path,t.batchId);i.push(s.delete(p)),l.push(d.key)}return A.waitFor(i).next((()=>l))}function ha(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw U(14731);e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */qe.DEFAULT_COLLECTION_PERCENTILE=10,qe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,qe.DEFAULT=new qe(S_,qe.DEFAULT_COLLECTION_PERCENTILE,qe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),qe.DISABLED=new qe(-1,0,0);class Ha{constructor(e,t,r,s){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=s,this.Zn={}}static wt(e,t,r,s){z(e.uid!=="",64387);const i=e.isAuthenticated()?e.uid:"";return new Ha(i,t,r,s)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return un(e).ee({index:tr,range:r},((s,i,o)=>{t=!1,o.done()})).next((()=>t))}addMutationBatch(e,t,r,s){const i=Fr(e),o=un(e);return o.add({}).next((c=>{z(typeof c=="number",49019);const u=new yl(c,t,r,s),l=(function(w,C,k){const D=k.baseMutations.map((j=>Bi(w.yt,j))),F=k.mutations.map((j=>Bi(w.yt,j)));return{userId:C,batchId:k.batchId,localWriteTimeMs:k.localWriteTime.toMillis(),baseMutations:D,mutations:F}})(this.serializer,this.userId,u),d=[];let p=new ie(((g,w)=>G(g.canonicalString(),w.canonicalString())));for(const g of s){const w=pg(this.userId,g.key.path,c);p=p.add(g.key.path.popLast()),d.push(o.put(l)),d.push(i.put(w,IR))}return p.forEach((g=>{d.push(this.indexManager.addToCollectionParentIndex(e,g))})),e.addOnCommittedListener((()=>{this.Zn[c]=u.keys()})),A.waitFor(d).next((()=>u))}))}lookupMutationBatch(e,t){return un(e).get(t).next((r=>r?(z(r.userId===this.userId,48,"Unexpected user for mutation batch",{userId:r.userId,batchId:t}),Yn(this.serializer,r)):null))}Xn(e,t){return this.Zn[t]?A.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next((r=>{if(r){const s=r.keys();return this.Zn[t]=s,s}return null}))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=IDBKeyRange.lowerBound([this.userId,r]);let i=null;return un(e).ee({index:tr,range:s},((o,c,u)=>{c.userId===this.userId&&(z(c.batchId>=r,47524,{Yn:r}),i=Yn(this.serializer,c)),u.done()})).next((()=>i))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=Tn;return un(e).ee({index:tr,range:t,reverse:!0},((s,i,o)=>{r=i.batchId,o.done()})).next((()=>r))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,Tn],[this.userId,Number.POSITIVE_INFINITY]);return un(e).J(tr,t).next((r=>r.map((s=>Yn(this.serializer,s)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=Bo(this.userId,t.path),s=IDBKeyRange.lowerBound(r),i=[];return Fr(e).ee({range:s},((o,c,u)=>{const[l,d,p]=o,g=Et(d);if(l===this.userId&&t.path.isEqual(g))return un(e).get(p).next((w=>{if(!w)throw U(61480,{er:o,batchId:p});z(w.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:w.userId,batchId:p}),i.push(Yn(this.serializer,w))}));u.done()})).next((()=>i))}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ie(G);const s=[];return t.forEach((i=>{const o=Bo(this.userId,i.path),c=IDBKeyRange.lowerBound(o),u=Fr(e).ee({range:c},((l,d,p)=>{const[g,w,C]=l,k=Et(w);g===this.userId&&i.path.isEqual(k)?r=r.add(C):p.done()}));s.push(u)})),A.waitFor(s).next((()=>this.tr(e,r)))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1,i=Bo(this.userId,r),o=IDBKeyRange.lowerBound(i);let c=new ie(G);return Fr(e).ee({range:o},((u,l,d)=>{const[p,g,w]=u,C=Et(g);p===this.userId&&r.isPrefixOf(C)?C.length===s&&(c=c.add(w)):d.done()})).next((()=>this.tr(e,c)))}tr(e,t){const r=[],s=[];return t.forEach((i=>{s.push(un(e).get(i).next((o=>{if(o===null)throw U(35274,{batchId:i});z(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:i}),r.push(Yn(this.serializer,o))})))})),A.waitFor(s).next((()=>r))}removeMutationBatch(e,t){return P_(e.le,this.userId,t).next((r=>(e.addOnCommittedListener((()=>{this.nr(t.batchId)})),A.forEach(r,(s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return A.resolve();const r=IDBKeyRange.lowerBound((function(o){return[o]})(this.userId)),s=[];return Fr(e).ee({range:r},((i,o,c)=>{if(i[0]===this.userId){const u=Et(i[1]);s.push(u)}else c.done()})).next((()=>{z(s.length===0,56720,{rr:s.map((i=>i.canonicalString()))})}))}))}containsKey(e,t){return C_(e,this.userId,t)}ir(e){return k_(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:Tn,lastStreamToken:""}))}}function C_(n,e,t){const r=Bo(e,t.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return Fr(n).ee({range:i,Y:!0},((c,u,l)=>{const[d,p,g]=c;d===e&&p===s&&(o=!0),l.done()})).next((()=>o))}function un(n){return De(n,lt)}function Fr(n){return De(n,Jr)}function k_(n){return De(n,Di)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Ht(0)}static ar(){return new Ht(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gb{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next((t=>{const r=new Ht(t.highestTargetId);return t.highestTargetId=r.next(),this.cr(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.ur(e).next((t=>$.fromTimestamp(new ne(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.ur(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,r){return this.ur(e).next((s=>(s.highestListenSequenceNumber=t,r&&(s.lastRemoteSnapshotVersion=r.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.cr(e,s))))}addTargetData(e,t){return this.lr(e,t).next((()=>this.ur(e).next((r=>(r.targetCount+=1,this.hr(t,r),this.cr(e,r))))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>Vr(e).delete(t.targetId))).next((()=>this.ur(e))).next((r=>(z(r.targetCount>0,8065),r.targetCount-=1,this.cr(e,r))))}removeTargets(e,t,r){let s=0;const i=[];return Vr(e).ee(((o,c)=>{const u=ui(c);u.sequenceNumber<=t&&r.get(u.targetId)===null&&(s++,i.push(this.removeTargetData(e,u)))})).next((()=>A.waitFor(i))).next((()=>s))}forEachTarget(e,t){return Vr(e).ee(((r,s)=>{const i=ui(s);t(i)}))}ur(e){return zf(e).get(ia).next((t=>(z(t!==null,2888),t)))}cr(e,t){return zf(e).put(ia,t)}lr(e,t){return Vr(e).put(A_(this.serializer,t))}hr(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.ur(e).next((t=>t.targetCount))}getTargetData(e,t){const r=ur(t),s=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let i=null;return Vr(e).ee({range:s,index:gg},((o,c,u)=>{const l=ui(c);Qi(t,l.target)&&(i=l,u.done())})).next((()=>i))}addMatchingKeys(e,t,r){const s=[],i=dn(e);return t.forEach((o=>{const c=ze(o.path);s.push(i.put({targetId:r,path:c})),s.push(this.referenceDelegate.addReference(e,r,o))})),A.waitFor(s)}removeMatchingKeys(e,t,r){const s=dn(e);return A.forEach(t,(i=>{const o=ze(i.path);return A.waitFor([s.delete([r,o]),this.referenceDelegate.removeReference(e,r,i)])}))}removeMatchingKeysForTargetId(e,t){const r=dn(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(s)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),s=dn(e);let i=K();return s.ee({range:r,Y:!0},((o,c,u)=>{const l=Et(o[1]),d=new x(l);i=i.add(d)})).next((()=>i))}containsKey(e,t){const r=ze(t.path),s=IDBKeyRange.bound([r],[sg(r)],!1,!0);let i=0;return dn(e).ee({index:al,Y:!0,range:s},(([o,c],u,l)=>{o!==0&&(i++,l.done())})).next((()=>i>0))}At(e,t){return Vr(e).get(t).next((r=>r?ui(r):null))}}function Vr(n){return De(n,Yr)}function zf(n){return De(n,sr)}function dn(n){return De(n,Xr)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jf="LruGarbageCollector",D_=1048576;function $f([n,e],[t,r]){const s=G(n,t);return s===0?G(e,r):s}class Hb{constructor(e){this.Pr=e,this.buffer=new ie($f),this.Tr=0}Ir(){return++this.Tr}Er(e){const t=[e,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();$f(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class N_{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){V(jf,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){On(t)?V(jf,"Ignoring IndexedDB error during garbage collection: ",t):await Vn(t)}await this.Ar(3e5)}))}}class Kb{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return A.resolve(Ye.ce);const r=new Hb(t);return this.Vr.forEachTarget(e,(s=>r.Er(s.sequenceNumber))).next((()=>this.Vr.mr(e,(s=>r.Er(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(V("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(qf)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(V("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),qf):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let r,s,i,o,c,u,l;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(V("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s)))).next((p=>(r=p,c=Date.now(),this.removeTargets(e,r,t)))).next((p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,r)))).next((p=>(l=Date.now(),xr()<=X.DEBUG&&V("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(l-u)+`ms
Total Duration: ${l-d}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function V_(n,e){return new Kb(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wb{constructor(e,t){this.db=e,this.garbageCollector=V_(this,t)}dr(e){const t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}pr(e){let t=0;return this.mr(e,(r=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,((r,s)=>t(s)))}addReference(e,t,r){return Co(e,r)}removeReference(e,t,r){return Co(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return Co(e,t)}wr(e,t){return(function(s,i){let o=!1;return k_(s).te((c=>C_(s,c,i).next((u=>(u&&(o=!0),A.resolve(!u)))))).next((()=>o))})(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.yr(e,((o,c)=>{if(c<=t){const u=this.wr(e,o).next((l=>{if(!l)return i++,r.getEntry(e,o).next((()=>(r.removeEntry(o,$.min()),dn(e).delete((function(p){return[0,ze(p.path)]})(o)))))}));s.push(u)}})).next((()=>A.waitFor(s))).next((()=>r.apply(e))).next((()=>i))}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return Co(e,t)}yr(e,t){const r=dn(e);let s,i=Ye.ce;return r.ee({index:al},(([o,c],{path:u,sequenceNumber:l})=>{o===0?(i!==Ye.ce&&t(new x(Et(s)),i),i=l,s=u):i=Ye.ce})).next((()=>{i!==Ye.ce&&t(new x(Et(s)),i)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Co(n,e){return dn(n).put((function(r,s){return{targetId:0,path:ze(r.path),sequenceNumber:s}})(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O_{constructor(){this.changes=new Yt((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,le.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?A.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qb{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Hn(e).put(r)}removeEntry(e,t,r){return Hn(e).delete((function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],ua(o),c[c.length-1]]})(t,r))}updateMetadata(e,t){return this.getMetadata(e).next((r=>(r.byteSize+=t,this.Sr(e,r))))}getEntry(e,t){let r=le.newInvalidDocument(t);return Hn(e).ee({index:qo,range:IDBKeyRange.only(Zs(t))},((s,i)=>{r=this.br(t,i)})).next((()=>r))}Dr(e,t){let r={size:0,document:le.newInvalidDocument(t)};return Hn(e).ee({index:qo,range:IDBKeyRange.only(Zs(t))},((s,i)=>{r={document:this.br(t,i),size:ha(i)}})).next((()=>r))}getEntries(e,t){let r=Ze();return this.Cr(e,t,((s,i)=>{const o=this.br(s,i);r=r.insert(s,o)})).next((()=>r))}vr(e,t){let r=Ze(),s=new ce(x.comparator);return this.Cr(e,t,((i,o)=>{const c=this.br(i,o);r=r.insert(i,c),s=s.insert(i,ha(o))})).next((()=>({documents:r,Fr:s})))}Cr(e,t,r){if(t.isEmpty())return A.resolve();let s=new ie(Kf);t.forEach((u=>s=s.add(u)));const i=IDBKeyRange.bound(Zs(s.first()),Zs(s.last())),o=s.getIterator();let c=o.getNext();return Hn(e).ee({index:qo,range:i},((u,l,d)=>{const p=x.fromSegments([...l.prefixPath,l.collectionGroup,l.documentId]);for(;c&&Kf(c,p)<0;)r(c,null),c=o.getNext();c&&c.isEqual(p)&&(r(c,l),c=o.hasNext()?o.getNext():null),c?d.j(Zs(c)):d.done()})).next((()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null}))}getDocumentsMatchingQuery(e,t,r,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),ua(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Hn(e).J(IDBKeyRange.bound(c,u,!0)).next((l=>{i?.incrementDocumentReadCount(l.length);let d=Ze();for(const p of l){const g=this.br(x.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);g.isFoundDocument()&&(Yi(t,g)||s.has(g.key))&&(d=d.insert(g.key,g))}return d}))}getAllFromCollectionGroup(e,t,r,s){let i=Ze();const o=Hf(t,r),c=Hf(t,ct.max());return Hn(e).ee({index:mg,range:IDBKeyRange.bound(o,c,!0)},((u,l,d)=>{const p=this.br(x.fromSegments(l.prefixPath.concat(l.collectionGroup,l.documentId)),l);i=i.insert(p.key,p),i.size===s&&d.done()})).next((()=>i))}newChangeBuffer(e){return new Jb(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return Gf(e).get(uu).next((t=>(z(!!t,20021),t)))}Sr(e,t){return Gf(e).put(uu,t)}br(e,t){if(t){const r=xb(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual($.min())))return r}return le.newInvalidDocument(e)}}function x_(n){return new Qb(n)}class Jb extends O_{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new Yt((r=>r.toString()),((r,s)=>r.isEqual(s)))}applyChanges(e){const t=[];let r=0,s=new ie(((i,o)=>G(i.canonicalString(),o.canonicalString())));return this.changes.forEach(((i,o)=>{const c=this.Or.get(i);if(t.push(this.Mr.removeEntry(e,i,c.readTime)),o.isValidDocument()){const u=Pf(this.Mr.serializer,o);s=s.add(i.path.popLast());const l=ha(u);r+=l-c.size,t.push(this.Mr.addEntry(e,i,u))}else if(r-=c.size,this.trackRemovals){const u=Pf(this.Mr.serializer,o.convertToNoDocument($.min()));t.push(this.Mr.addEntry(e,i,u))}})),s.forEach((i=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,i))})),t.push(this.Mr.updateMetadata(e,r)),A.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next((r=>(this.Or.set(t,{size:r.size,readTime:r.document.readTime}),r.document)))}getAllFromCache(e,t){return this.Mr.vr(e,t).next((({documents:r,Fr:s})=>(s.forEach(((i,o)=>{this.Or.set(i,{size:o,readTime:r.get(i).readTime})})),r)))}}function Gf(n){return De(n,Ni)}function Hn(n){return De(n,sa)}function Zs(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function Hf(n,e){const t=e.documentKey.path.toArray();return[n,ua(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function Kf(n,e){const t=n.path.toArray(),r=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<r.length-2;++i)if(s=G(t[i],r[i]),s)return s;return s=G(t.length,r.length),s||(s=G(t[t.length-2],r[r.length-2]),s||G(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yb{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L_{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&Ei(r.mutation,s,Xe.empty(),ne.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,K()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=K()){const s=Tt();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let o=ai();return i.forEach(((c,u)=>{o=o.insert(c,u.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const r=Tt();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,K())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,c)=>{t.set(o,c)}))}))}computeViews(e,t,r,s){let i=Ze();const o=Ii(),c=(function(){return Ii()})();return t.forEach(((u,l)=>{const d=r.get(l.key);s.has(l.key)&&(d===void 0||d.mutation instanceof Xt)?i=i.insert(l.key,l):d!==void 0?(o.set(l.key,d.mutation.getFieldMask()),Ei(d.mutation,l,d.mutation.getFieldMask(),ne.now())):o.set(l.key,Xe.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((l,d)=>o.set(l,d))),t.forEach(((l,d)=>c.set(l,new Yb(d,o.get(l)??null)))),c)))}recalculateAndSaveOverlays(e,t){const r=Ii();let s=new ce(((o,c)=>o-c)),i=K();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const c of o)c.keys().forEach((u=>{const l=t.get(u);if(l===null)return;let d=r.get(u)||Xe.empty();d=c.applyToLocalView(l,d),r.set(u,d);const p=(s.get(c.batchId)||K()).add(u);s=s.insert(c.batchId,p)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),l=u.key,d=u.value,p=Jg();d.forEach((g=>{if(!i.has(g)){const w=r_(t.get(g),r.get(g));w!==null&&p.set(g,w),i=i.add(g)}})),o.push(this.documentOverlayCache.saveOverlays(e,l,p))}return A.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return rb(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):pl(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):A.resolve(Tt());let c=Kr,u=i;return o.next((l=>A.forEach(l,((d,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(d)?A.resolve():this.remoteDocumentCache.getEntry(e,d).next((g=>{u=u.insert(d,g)}))))).next((()=>this.populateOverlays(e,l,i))).next((()=>this.computeViews(e,u,l,K()))).next((d=>({batchId:c,changes:Qg(d)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new x(t)).next((r=>{let s=ai();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=ai();return this.indexManager.getCollectionParents(e,i).next((c=>A.forEach(c,(u=>{const l=(function(p,g){return new Jt(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,l,r,s).next((d=>{d.forEach(((p,g)=>{o=o.insert(p,g)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((o=>{i.forEach(((u,l)=>{const d=l.getKey();o.get(d)===null&&(o=o.insert(d,le.newInvalidDocument(d)))}));let c=ai();return o.forEach(((u,l)=>{const d=i.get(u);d!==void 0&&Ei(d.mutation,l,Xe.empty(),ne.now()),Yi(t,l)&&(c=c.insert(u,l))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xb{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return A.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Ae(s.createTime)}})(t)),A.resolve()}getNamedQuery(e,t){return A.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(s){return{name:s.name,query:$a(s.bundledQuery),readTime:Ae(s.readTime)}})(t)),A.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zb{constructor(){this.overlays=new ce(x.comparator),this.Lr=new Map}getOverlay(e,t){return A.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Tt();return A.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.St(e,t,i)})),A.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Lr.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Lr.delete(r)),A.resolve()}getOverlaysForCollection(e,t,r){const s=Tt(),i=t.length+1,o=new x(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,l=u.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return A.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new ce(((l,d)=>l-d));const o=this.overlays.getIterator();for(;o.hasNext();){const l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let d=i.get(l.largestBatchId);d===null&&(d=Tt(),i=i.insert(l.largestBatchId,d)),d.set(l.getKey(),l)}}const c=Tt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((l,d)=>c.set(l,d))),!(c.size()>=s)););return A.resolve(c)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Lr.get(s.largestBatchId).delete(r.key);this.Lr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new El(t,r));let i=this.Lr.get(t);i===void 0&&(i=K(),this.Lr.set(t,i)),this.Lr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eS{constructor(){this.sessionToken=Ie.EMPTY_BYTE_STRING}getSessionToken(e){return A.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,A.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl{constructor(){this.kr=new ie(Ve.Kr),this.qr=new ie(Ve.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const r=new Ve(e,t);this.kr=this.kr.add(r),this.qr=this.qr.add(r)}$r(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Wr(new Ve(e,t))}Qr(e,t){e.forEach((r=>this.removeReference(r,t)))}Gr(e){const t=new x(new J([])),r=new Ve(t,e),s=new Ve(t,e+1),i=[];return this.qr.forEachInRange([r,s],(o=>{this.Wr(o),i.push(o.key)})),i}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.qr=this.qr.delete(e)}jr(e){const t=new x(new J([])),r=new Ve(t,e),s=new Ve(t,e+1);let i=K();return this.qr.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new Ve(e,0),r=this.kr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Ve{constructor(e,t){this.key=e,this.Jr=t}static Kr(e,t){return x.comparator(e.key,t.key)||G(e.Jr,t.Jr)}static Ur(e,t){return G(e.Jr,t.Jr)||x.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tS{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new ie(Ve.Kr)}checkEmpty(e){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new yl(i,t,r,s);this.mutationQueue.push(o);for(const c of s)this.Hr=this.Hr.add(new Ve(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return A.resolve(o)}lookupMutationBatch(e,t){return A.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Xr(r),i=s<0?0:s;return A.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?Tn:this.Yn-1)}getAllMutationBatches(e){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Ve(t,0),s=new Ve(t,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([r,s],(o=>{const c=this.Zr(o.Jr);i.push(c)})),A.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ie(G);return t.forEach((s=>{const i=new Ve(s,0),o=new Ve(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,o],(c=>{r=r.add(c.Jr)}))})),A.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;x.isDocumentKey(i)||(i=i.child(""));const o=new Ve(new x(i),0);let c=new ie(G);return this.Hr.forEachWhile((u=>{const l=u.key.path;return!!r.isPrefixOf(l)&&(l.length===s&&(c=c.add(u.Jr)),!0)}),o),A.resolve(this.Yr(c))}Yr(e){const t=[];return e.forEach((r=>{const s=this.Zr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){z(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Hr;return A.forEach(t.mutations,(s=>{const i=new Ve(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Hr=r}))}nr(e){}containsKey(e,t){const r=new Ve(t,0),s=this.Hr.firstAfterOrEqual(r);return A.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,A.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nS{constructor(e){this.ti=e,this.docs=(function(){return new ce(x.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.ti(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return A.resolve(r?r.document.mutableCopy():le.newInvalidDocument(t))}getEntries(e,t){let r=Ze();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():le.newInvalidDocument(s))})),A.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=Ze();const o=t.path,c=new x(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:l,value:{document:d}}=u.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||il(ug(d),r)<=0||(s.has(d.key)||Yi(t,d))&&(i=i.insert(d.key,d.mutableCopy()))}return A.resolve(i)}getAllFromCollectionGroup(e,t,r,s){U(9500)}ni(e,t){return A.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new rS(this)}getSize(e){return A.resolve(this.size)}}class rS extends O_{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.Mr.addEntry(e,s)):this.Mr.removeEntry(r)})),A.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sS{constructor(e){this.persistence=e,this.ri=new Yt((t=>ur(t)),Qi),this.lastRemoteSnapshotVersion=$.min(),this.highestTargetId=0,this.ii=0,this.si=new Rl,this.targetCount=0,this.oi=Ht._r()}forEachTarget(e,t){return this.ri.forEach(((r,s)=>t(s))),A.resolve()}getLastRemoteSnapshotVersion(e){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return A.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ii&&(this.ii=t),A.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Ht(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,A.resolve()}updateTargetData(e,t){return this.lr(t),A.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,A.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ri.forEach(((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ri.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),A.waitFor(i).next((()=>s))}getTargetCount(e){return A.resolve(this.targetCount)}getTargetData(e,t){const r=this.ri.get(t)||null;return A.resolve(r)}addMatchingKeys(e,t,r){return this.si.$r(t,r),A.resolve()}removeMatchingKeys(e,t,r){this.si.Qr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),A.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),A.resolve()}getMatchingKeysForTargetId(e,t){const r=this.si.jr(t);return A.resolve(r)}containsKey(e,t){return A.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bl{constructor(e,t){this._i={},this.overlays={},this.ai=new Ye(0),this.ui=!1,this.ui=!0,this.ci=new eS,this.referenceDelegate=e(this),this.li=new sS(this),this.indexManager=new jb,this.remoteDocumentCache=(function(s){return new nS(s)})((r=>this.referenceDelegate.hi(r))),this.serializer=new v_(t),this.Pi=new Xb(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Zb,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this._i[e.toKey()];return r||(r=new tS(t,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,r){V("MemoryPersistence","Starting transaction:",e);const s=new iS(this.ai.next());return this.referenceDelegate.Ti(),r(s).next((i=>this.referenceDelegate.Ii(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ei(e,t){return A.or(Object.values(this._i).map((r=>()=>r.containsKey(e,t))))}}class iS extends hg{constructor(e){super(),this.currentSequenceNumber=e}}class Ka{constructor(e){this.persistence=e,this.Ri=new Rl,this.Ai=null}static Vi(e){return new Ka(e)}get di(){if(this.Ai)return this.Ai;throw U(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.di.delete(r.toString()),A.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.di.add(r.toString()),A.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),A.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((s=>this.di.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.di.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ii(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.di,(r=>{const s=x.fromPath(r);return this.mi(e,s).next((i=>{i||t.removeEntry(s,$.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((r=>{r?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return A.or([()=>A.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class da{constructor(e,t){this.persistence=e,this.fi=new Yt((r=>ze(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=V_(this,t)}static Vi(e,t){return new da(e,t)}Ti(){}Ii(e){return A.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}pr(e){let t=0;return this.mr(e,(r=>{t++})).next((()=>t))}mr(e,t){return A.forEach(this.fi,((r,s)=>this.wr(e,r,s).next((i=>i?A.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ni(e,(o=>this.wr(e,o,t).next((c=>{c||(r++,i.removeEntry(o,$.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),A.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),A.resolve()}removeReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),A.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),A.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=jo(e.data.value)),t}wr(e,t,r){return A.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.fi.get(t);return A.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oS{constructor(e){this.serializer=e}k(e,t,r,s){const i=new Va("createOrUpgrade",t);r<1&&s>=1&&((function(u){u.createObjectStore(Wi)})(e),(function(u){u.createObjectStore(Di,{keyPath:yR}),u.createObjectStore(lt,{keyPath:rf,autoIncrement:!0}).createIndex(tr,sf,{unique:!0}),u.createObjectStore(Jr)})(e),Wf(e),(function(u){u.createObjectStore(Qn)})(e));let o=A.resolve();return r<3&&s>=3&&(r!==0&&((function(u){u.deleteObjectStore(Xr),u.deleteObjectStore(Yr),u.deleteObjectStore(sr)})(e),Wf(e)),o=o.next((()=>(function(u){const l=u.store(sr),d={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:$.min().toTimestamp(),targetCount:0};return l.put(ia,d)})(i)))),r<4&&s>=4&&(r!==0&&(o=o.next((()=>(function(u,l){return l.store(lt).J().next((p=>{u.deleteObjectStore(lt),u.createObjectStore(lt,{keyPath:rf,autoIncrement:!0}).createIndex(tr,sf,{unique:!0});const g=l.store(lt),w=p.map((C=>g.put(C)));return A.waitFor(w)}))})(e,i)))),o=o.next((()=>{(function(u){u.createObjectStore(Zr,{keyPath:SR})})(e)}))),r<5&&s>=5&&(o=o.next((()=>this.gi(i)))),r<6&&s>=6&&(o=o.next((()=>((function(u){u.createObjectStore(Ni)})(e),this.pi(i))))),r<7&&s>=7&&(o=o.next((()=>this.yi(i)))),r<8&&s>=8&&(o=o.next((()=>this.wi(e,i)))),r<9&&s>=9&&(o=o.next((()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)}))),r<10&&s>=10&&(o=o.next((()=>this.Si(i)))),r<11&&s>=11&&(o=o.next((()=>{(function(u){u.createObjectStore(Oa,{keyPath:PR})})(e),(function(u){u.createObjectStore(xa,{keyPath:CR})})(e)}))),r<12&&s>=12&&(o=o.next((()=>{(function(u){const l=u.createObjectStore(La,{keyPath:LR});l.createIndex(hu,MR,{unique:!1}),l.createIndex(Ig,FR,{unique:!1})})(e)}))),r<13&&s>=13&&(o=o.next((()=>(function(u){const l=u.createObjectStore(sa,{keyPath:ER});l.createIndex(qo,TR),l.createIndex(mg,wR)})(e))).next((()=>this.bi(e,i))).next((()=>e.deleteObjectStore(Qn)))),r<14&&s>=14&&(o=o.next((()=>this.Di(e,i)))),r<15&&s>=15&&(o=o.next((()=>(function(u){u.createObjectStore(cl,{keyPath:kR,autoIncrement:!0}).createIndex(lu,DR,{unique:!1}),u.createObjectStore(gi,{keyPath:NR}).createIndex(_g,VR,{unique:!1}),u.createObjectStore(_i,{keyPath:OR}).createIndex(yg,xR,{unique:!1})})(e)))),r<16&&s>=16&&(o=o.next((()=>{t.objectStore(gi).clear()})).next((()=>{t.objectStore(_i).clear()}))),r<17&&s>=17&&(o=o.next((()=>{(function(u){u.createObjectStore(ul,{keyPath:UR})})(e)}))),r<18&&s>=18&&Fp()&&(o=o.next((()=>{t.objectStore(gi).clear()})).next((()=>{t.objectStore(_i).clear()}))),o}pi(e){let t=0;return e.store(Qn).ee(((r,s)=>{t+=ha(s)})).next((()=>{const r={byteSize:t};return e.store(Ni).put(uu,r)}))}gi(e){const t=e.store(Di),r=e.store(lt);return t.J().next((s=>A.forEach(s,(i=>{const o=IDBKeyRange.bound([i.userId,Tn],[i.userId,i.lastAcknowledgedBatchId]);return r.J(tr,o).next((c=>A.forEach(c,(u=>{z(u.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const l=Yn(this.serializer,u);return P_(e,i.userId,l).next((()=>{}))}))))}))))}yi(e){const t=e.store(Xr),r=e.store(Qn);return e.store(sr).get(ia).next((s=>{const i=[];return r.ee(((o,c)=>{const u=new J(o),l=(function(p){return[0,ze(p)]})(u);i.push(t.get(l).next((d=>d?A.resolve():(p=>t.put({targetId:0,path:ze(p),sequenceNumber:s.highestListenSequenceNumber}))(u))))})).next((()=>A.waitFor(i)))}))}wi(e,t){e.createObjectStore(Vi,{keyPath:bR});const r=t.store(Vi),s=new Al,i=o=>{if(s.add(o)){const c=o.lastSegment(),u=o.popLast();return r.put({collectionId:c,parent:ze(u)})}};return t.store(Qn).ee({Y:!0},((o,c)=>{const u=new J(o);return i(u.popLast())})).next((()=>t.store(Jr).ee({Y:!0},(([o,c,u],l)=>{const d=Et(c);return i(d.popLast())}))))}Si(e){const t=e.store(Yr);return t.ee(((r,s)=>{const i=ui(s),o=A_(this.serializer,i);return t.put(o)}))}bi(e,t){const r=t.store(Qn),s=[];return r.ee(((i,o)=>{const c=t.store(sa),u=(function(p){return p.document?new x(J.fromString(p.document.name).popFirst(5)):p.noDocument?x.fromSegments(p.noDocument.path):p.unknownDocument?x.fromSegments(p.unknownDocument.path):U(36783)})(o).path.toArray(),l={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(l))})).next((()=>A.waitFor(s)))}Di(e,t){const r=t.store(lt),s=x_(this.serializer),i=new bl(Ka.Vi,this.serializer.yt);return r.J().next((o=>{const c=new Map;return o.forEach((u=>{let l=c.get(u.userId)??K();Yn(this.serializer,u).keys().forEach((d=>l=l.add(d))),c.set(u.userId,l)})),A.forEach(c,((u,l)=>{const d=new Oe(l),p=Ga.wt(this.serializer,d),g=i.getIndexManager(d),w=Ha.wt(d,this.serializer,g,i.referenceDelegate);return new L_(s,w,p,g).recalculateAndSaveOverlaysForDocumentKeys(new du(t,Ye.ce),u).next()}))}))}}function Wf(n){n.createObjectStore(Xr,{keyPath:AR}).createIndex(al,RR,{unique:!0}),n.createObjectStore(Yr,{keyPath:"targetId"}).createIndex(gg,vR,{unique:!0}),n.createObjectStore(sr)}const ln="IndexedDbPersistence",qc=18e5,zc=5e3,jc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",M_="main";class Sl{constructor(e,t,r,s,i,o,c,u,l,d,p=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ci=i,this.window=o,this.document=c,this.Fi=l,this.Mi=d,this.xi=p,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=g=>Promise.resolve(),!Sl.v())throw new N(b.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Wb(this,s),this.Ki=t+M_,this.serializer=new v_(u),this.qi=new Rt(this.Ki,this.xi,new oS(this.serializer)),this.ci=new Mb,this.li=new Gb(this.referenceDelegate,this.serializer),this.remoteDocumentCache=x_(this.serializer),this.Pi=new Lb,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,d===!1&&ve(ln,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new N(b.FAILED_PRECONDITION,jc);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.li.getHighestSequenceNumber(e)))})).then((e=>{this.ai=new Ye(e,this.Fi)})).then((()=>{this.ui=!0})).catch((e=>(this.qi&&this.qi.close(),Promise.reject(e))))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.qi.q((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget((async()=>{this.started&&await this.$i()})))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>ko(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.ji(e).next((t=>{t||(this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))))}))})).next((()=>this.Ji(e))).next((t=>this.isPrimary&&!t?this.Hi(e).next((()=>!1)):!!t&&this.Zi(e).next((()=>!0)))))).catch((e=>{if(On(e))return V(ln,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return V(ln,"Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable((()=>this.ki(e))),this.isPrimary=e}))}ji(e){return ei(e).get(Pr).next((t=>A.resolve(this.Xi(t))))}Yi(e){return ko(e).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,qc)){this.Li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const r=De(t,Zr);return r.J().next((s=>{const i=this.ns(s,qc),o=s.filter((c=>i.indexOf(c)===-1));return A.forEach(o,(c=>r.delete(c.clientId))).next((()=>o))}))})).catch((()=>[]));if(this.Ui)for(const t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.$i().then((()=>this.es())).then((()=>this.Gi()))))}Xi(e){return!!e&&e.ownerId===this.clientId}Ji(e){return this.Mi?A.resolve(!0):ei(e).get(Pr).next((t=>{if(t!==null&&this.ts(t.leaseTimestampMs,zc)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new N(b.FAILED_PRECONDITION,jc);return!1}}return!(!this.networkEnabled||!this.inForeground)||ko(e).J().next((r=>this.ns(r,zc).find((s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&V(ln,`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.qi.runTransaction("shutdown","readwrite",[Wi,Zr],(e=>{const t=new du(e,Ye.ce);return this.Hi(t).next((()=>this.Yi(t)))})),this.qi.close(),this.ls()}ns(e,t){return e.filter((r=>this.ts(r.updateTimeMs,t)&&!this.ss(r.clientId)))}hs(){return this.runTransaction("getActiveClients","readonly",(e=>ko(e).J().next((t=>this.ns(t,qc).map((r=>r.clientId))))))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return Ha.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new $b(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return Ga.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,r){V(ln,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=(function(u){return u===18?zR:u===17?vg:u===16?qR:u===15?ll:u===14?wg:u===13?Tg:u===12?BR:u===11?Eg:void U(60245)})(this.xi);let o;return this.qi.runTransaction(e,s,i,(c=>(o=new du(c,this.ai?this.ai.next():Ye.ce),t==="readwrite-primary"?this.ji(o).next((u=>!!u||this.Ji(o))).next((u=>{if(!u)throw ve(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))),new N(b.FAILED_PRECONDITION,lg);return r(o)})).next((u=>this.Zi(o).next((()=>u)))):this.Ps(o).next((()=>r(o)))))).then((c=>(o.raiseOnCommittedEvent(),c)))}Ps(e){return ei(e).get(Pr).next((t=>{if(t!==null&&this.ts(t.leaseTimestampMs,zc)&&!this.ss(t.ownerId)&&!this.Xi(t)&&!(this.Mi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new N(b.FAILED_PRECONDITION,jc)}))}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return ei(e).put(Pr,t)}static v(){return Rt.v()}Hi(e){const t=ei(e);return t.get(Pr).next((r=>this.Xi(r)?(V(ln,"Releasing primary lease."),t.delete(Pr)):A.resolve()))}ts(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(ve(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ni=()=>{this.Ci.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.$i())))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground=this.document.visibilityState==="visible")}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){typeof this.window?.addEventListener=="function"&&(this.Oi=()=>{this._s();const e=/(?:Version|Mobile)\/1[456]/;Mp()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){try{const t=this.Ui?.getItem(this.rs(e))!==null;return V(ln,`Client '${e}' ${t?"is":"is not"} zombied in LocalStorage`),t}catch(t){return ve(ln,"Failed to get zombied client id.",t),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){ve("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch{}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function ei(n){return De(n,Wi)}function ko(n){return De(n,Zr)}function Pl(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cl{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Ts=r,this.Is=s}static Es(e,t){let r=K(),s=K();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Cl(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aS{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return Mp()?8:dg(Ce())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.gs(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ps(e,t,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new aS;return this.ys(e,t,o).next((c=>{if(i.result=c,this.As)return this.ws(e,t,o,c.size)}))})).next((()=>i.result))}ws(e,t,r,s){return r.documentReadCount<this.Vs?(xr()<=X.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",Lr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),A.resolve()):(xr()<=X.DEBUG&&V("QueryEngine","Query:",Lr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ds*s?(xr()<=X.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",Lr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,je(t))):A.resolve())}gs(e,t){if(yf(t))return A.resolve(null);let r=je(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=ca(t,null,"F"),r=je(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const o=K(...i);return this.fs.getDocuments(e,o).next((c=>this.indexManager.getMinOffset(e,r).next((u=>{const l=this.Ss(t,c);return this.bs(t,l,o,u.readTime)?this.gs(e,ca(t,null,"F")):this.Ds(e,l,t,u)}))))})))))}ps(e,t,r,s){return yf(t)||s.isEqual($.min())?A.resolve(null):this.fs.getDocuments(e,r).next((i=>{const o=this.Ss(t,i);return this.bs(t,o,r,s)?A.resolve(null):(xr()<=X.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Lr(t)),this.Ds(e,o,t,cg(s,Kr)).next((c=>c)))}))}Ss(e,t){let r=new ie(Kg(e));return t.forEach(((s,i)=>{Yi(e,i)&&(r=r.add(i))})),r}bs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ys(e,t,r){return xr()<=X.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",Lr(t)),this.fs.getDocumentsMatchingQuery(e,t,ct.min(),r)}Ds(e,t,r,s){return this.fs.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kl="LocalStore",cS=3e8;class uS{constructor(e,t,r,s){this.persistence=e,this.Cs=t,this.serializer=s,this.vs=new ce(G),this.Fs=new Yt((i=>ur(i)),Qi),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new L_(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function U_(n,e,t,r){return new uS(n,e,t,r)}async function B_(n,e){const t=L(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.Os(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],c=[];let u=K();for(const l of s){o.push(l.batchId);for(const d of l.mutations)u=u.add(d.key)}for(const l of i){c.push(l.batchId);for(const d of l.mutations)u=u.add(d.key)}return t.localDocuments.getDocuments(r,u).next((l=>({Ns:l,removedBatchIds:o,addedBatchIds:c})))}))}))}function lS(n,e){const t=L(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=t.xs.newChangeBuffer({trackRemovals:!0});return(function(c,u,l,d){const p=l.batch,g=p.keys();let w=A.resolve();return g.forEach((C=>{w=w.next((()=>d.getEntry(u,C))).next((k=>{const D=l.docVersions.get(C);z(D!==null,48541),k.version.compareTo(D)<0&&(p.applyToRemoteDocument(k,l),k.isValidDocument()&&(k.setReadTime(l.commitVersion),d.addEntry(k)))}))})),w.next((()=>c.mutationQueue.removeMutationBatch(u,p)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let u=K();for(let l=0;l<c.mutationResults.length;++l)c.mutationResults[l].transformResults.length>0&&(u=u.add(c.batch.mutations[l].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function q_(n){const e=L(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function hS(n,e){const t=L(n),r=e.snapshotVersion;let s=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});s=t.vs;const c=[];e.targetChanges.forEach(((d,p)=>{const g=s.get(p);if(!g)return;c.push(t.li.removeMatchingKeys(i,d.removedDocuments,p).next((()=>t.li.addMatchingKeys(i,d.addedDocuments,p))));let w=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?w=w.withResumeToken(Ie.EMPTY_BYTE_STRING,$.min()).withLastLimboFreeSnapshotVersion($.min()):d.resumeToken.approximateByteSize()>0&&(w=w.withResumeToken(d.resumeToken,r)),s=s.insert(p,w),(function(k,D,F){return k.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=cS?!0:F.addedDocuments.size+F.modifiedDocuments.size+F.removedDocuments.size>0})(g,w,d)&&c.push(t.li.updateTargetData(i,w))}));let u=Ze(),l=K();if(e.documentUpdates.forEach((d=>{e.resolvedLimboDocuments.has(d)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,d))})),c.push(z_(i,o,e.documentUpdates).next((d=>{u=d.Bs,l=d.Ls}))),!r.isEqual($.min())){const d=t.li.getLastRemoteSnapshotVersion(i).next((p=>t.li.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(d)}return A.waitFor(c).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,l))).next((()=>u))})).then((i=>(t.vs=s,i)))}function z_(n,e,t){let r=K(),s=K();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let o=Ze();return t.forEach(((c,u)=>{const l=i.get(c);u.isFoundDocument()!==l.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual($.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!l.isValidDocument()||u.version.compareTo(l.version)>0||u.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):V(kl,"Ignoring outdated watch update for ",c,". Current version:",l.version," Watch version:",u.version)})),{Bs:o,Ls:s}}))}function dS(n,e){const t=L(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=Tn),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function os(n,e){const t=L(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.li.getTargetData(r,e).next((i=>i?(s=i,A.resolve(s)):t.li.allocateTargetId(r).next((o=>(s=new wt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.li.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.vs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.vs=t.vs.insert(r.targetId,r),t.Fs.set(e,r.targetId)),r}))}async function as(n,e,t){const r=L(n),s=r.vs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!On(o))throw o;V(kl,`Failed to update sequence numbers for target ${e}: ${o}`)}r.vs=r.vs.remove(e),r.Fs.delete(s.target)}function fa(n,e,t){const r=L(n);let s=$.min(),i=K();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(u,l,d){const p=L(u),g=p.Fs.get(d);return g!==void 0?A.resolve(p.vs.get(g)):p.li.getTargetData(l,d)})(r,o,je(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(o,c.targetId).next((u=>{i=u}))})).next((()=>r.Cs.getDocumentsMatchingQuery(o,e,t?s:$.min(),t?i:K()))).next((c=>(G_(r,Hg(e),c),{documents:c,ks:i})))))}function j_(n,e){const t=L(n),r=L(t.li),s=t.vs.get(e);return s?Promise.resolve(s.target):t.persistence.runTransaction("Get target data","readonly",(i=>r.At(i,e).next((o=>o?o.target:null))))}function $_(n,e){const t=L(n),r=t.Ms.get(e)||$.min();return t.persistence.runTransaction("Get new document changes","readonly",(s=>t.xs.getAllFromCollectionGroup(s,e,cg(r,Kr),Number.MAX_SAFE_INTEGER))).then((s=>(G_(t,e,s),s)))}function G_(n,e,t){let r=n.Ms.get(e)||$.min();t.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Ms.set(e,r)}async function fS(n,e,t,r){const s=L(n);let i=K(),o=Ze();for(const l of t){const d=e.Ks(l.metadata.name);l.document&&(i=i.add(d));const p=e.qs(l);p.setReadTime(e.Us(l.metadata.readTime)),o=o.insert(d,p)}const c=s.xs.newChangeBuffer({trackRemovals:!0}),u=await os(s,(function(d){return je(Es(J.fromString(`__bundle__/docs/${d}`)))})(r));return s.persistence.runTransaction("Apply bundle documents","readwrite",(l=>z_(l,c,o).next((d=>(c.apply(l),d))).next((d=>s.li.removeMatchingKeysForTargetId(l,u.targetId).next((()=>s.li.addMatchingKeys(l,i,u.targetId))).next((()=>s.localDocuments.getLocalViewOfDocuments(l,d.Bs,d.Ls))).next((()=>d.Bs))))))}async function pS(n,e,t=K()){const r=await os(n,je($a(e.bundledQuery))),s=L(n);return s.persistence.runTransaction("Save named query","readwrite",(i=>{const o=Ae(e.readTime);if(r.snapshotVersion.compareTo(o)>=0)return s.Pi.saveNamedQuery(i,e);const c=r.withResumeToken(Ie.EMPTY_BYTE_STRING,o);return s.vs=s.vs.insert(c.targetId,c),s.li.updateTargetData(i,c).next((()=>s.li.removeMatchingKeysForTargetId(i,r.targetId))).next((()=>s.li.addMatchingKeys(i,t,r.targetId))).next((()=>s.Pi.saveNamedQuery(i,e)))}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H_="firestore_clients";function Qf(n,e){return`${H_}_${n}_${e}`}const K_="firestore_mutations";function Jf(n,e,t){let r=`${K_}_${n}_${t}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}const W_="firestore_targets";function $c(n,e){return`${W_}_${n}_${e}`}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt="SharedClientState";class pa{constructor(e,t,r,s){this.user=e,this.batchId=t,this.state=r,this.error=s}static $s(e,t,r){const s=JSON.parse(r);let i,o=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return o&&s.error&&(o=typeof s.error.message=="string"&&typeof s.error.code=="string",o&&(i=new N(s.error.code,s.error.message))),o?new pa(e,t,s.state,i):(ve(yt,`Failed to parse mutation state for ID '${t}': ${r}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Ti{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static $s(e,t){const r=JSON.parse(t);let s,i=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return i&&r.error&&(i=typeof r.error.message=="string"&&typeof r.error.code=="string",i&&(s=new N(r.error.code,r.error.message))),i?new Ti(e,r.state,s):(ve(yt,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class ma{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static $s(e,t){const r=JSON.parse(t);let s=typeof r=="object"&&r.activeTargetIds instanceof Array,i=ml();for(let o=0;s&&o<r.activeTargetIds.length;++o)s=fg(r.activeTargetIds[o]),i=i.add(r.activeTargetIds[o]);return s?new ma(e,i):(ve(yt,`Failed to parse client data for instance '${e}': ${t}`),null)}}class Dl{constructor(e,t){this.clientId=e,this.onlineState=t}static $s(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new Dl(t.clientId,t.onlineState):(ve(yt,`Failed to parse online state: ${e}`),null)}}class Su{constructor(){this.activeTargetIds=ml()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Gc{constructor(e,t,r,s,i){this.window=e,this.Ci=t,this.persistenceKey=r,this.zs=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.js=this.Js.bind(this),this.Hs=new ce(G),this.started=!1,this.Zs=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Xs=Qf(this.persistenceKey,this.zs),this.Ys=(function(u){return`firestore_sequence_number_${u}`})(this.persistenceKey),this.Hs=this.Hs.insert(this.zs,new Su),this.eo=new RegExp(`^${H_}_${o}_([^_]*)$`),this.no=new RegExp(`^${K_}_${o}_(\\d+)(?:_(.*))?$`),this.ro=new RegExp(`^${W_}_${o}_(\\d+)$`),this.io=(function(u){return`firestore_online_state_${u}`})(this.persistenceKey),this.so=(function(u){return`firestore_bundle_loaded_v2_${u}`})(this.persistenceKey),this.window.addEventListener("storage",this.js)}static v(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.hs();for(const r of e){if(r===this.zs)continue;const s=this.getItem(Qf(this.persistenceKey,r));if(s){const i=ma.$s(r,s);i&&(this.Hs=this.Hs.insert(i.clientId,i))}}this.oo();const t=this.storage.getItem(this.io);if(t){const r=this._o(t);r&&this.ao(r)}for(const r of this.Zs)this.Js(r);this.Zs=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ys,JSON.stringify(e))}getAllActiveQueryTargets(){return this.uo(this.Hs)}isActiveQueryTarget(e){let t=!1;return this.Hs.forEach(((r,s)=>{s.activeTargetIds.has(e)&&(t=!0)})),t}addPendingMutation(e){this.co(e,"pending")}updateMutationState(e,t,r){this.co(e,t,r),this.lo(e)}addLocalQueryTarget(e,t=!0){let r="not-current";if(this.isActiveQueryTarget(e)){const s=this.storage.getItem($c(this.persistenceKey,e));if(s){const i=Ti.$s(e,s);i&&(r=i.state)}}return t&&this.ho.Qs(e),this.oo(),r}removeLocalQueryTarget(e){this.ho.Gs(e),this.oo()}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){this.removeItem($c(this.persistenceKey,e))}updateQueryState(e,t,r){this.Po(e,t,r)}handleUserChange(e,t,r){t.forEach((s=>{this.lo(s)})),this.currentUser=e,r.forEach((s=>{this.addPendingMutation(s)}))}setOnlineState(e){this.To(e)}notifyBundleLoaded(e){this.Io(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.js),this.removeItem(this.Xs),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return V(yt,"READ",e,t),t}setItem(e,t){V(yt,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){V(yt,"REMOVE",e),this.storage.removeItem(e)}Js(e){const t=e;if(t.storageArea===this.storage){if(V(yt,"EVENT",t.key,t.newValue),t.key===this.Xs)return void ve("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Ci.enqueueRetryable((async()=>{if(this.started){if(t.key!==null){if(this.eo.test(t.key)){if(t.newValue==null){const r=this.Eo(t.key);return this.Ro(r,null)}{const r=this.Ao(t.key,t.newValue);if(r)return this.Ro(r.clientId,r)}}else if(this.no.test(t.key)){if(t.newValue!==null){const r=this.Vo(t.key,t.newValue);if(r)return this.mo(r)}}else if(this.ro.test(t.key)){if(t.newValue!==null){const r=this.fo(t.key,t.newValue);if(r)return this.po(r)}}else if(t.key===this.io){if(t.newValue!==null){const r=this._o(t.newValue);if(r)return this.ao(r)}}else if(t.key===this.Ys){const r=(function(i){let o=Ye.ce;if(i!=null)try{const c=JSON.parse(i);z(typeof c=="number",30636,{yo:i}),o=c}catch(c){ve(yt,"Failed to read sequence number from WebStorage",c)}return o})(t.newValue);r!==Ye.ce&&this.sequenceNumberHandler(r)}else if(t.key===this.so){const r=this.wo(t.newValue);await Promise.all(r.map((s=>this.syncEngine.So(s))))}}}else this.Zs.push(t)}))}}get ho(){return this.Hs.get(this.zs)}oo(){this.setItem(this.Xs,this.ho.Ws())}co(e,t,r){const s=new pa(this.currentUser,e,t,r),i=Jf(this.persistenceKey,this.currentUser,e);this.setItem(i,s.Ws())}lo(e){const t=Jf(this.persistenceKey,this.currentUser,e);this.removeItem(t)}To(e){const t={clientId:this.zs,onlineState:e};this.storage.setItem(this.io,JSON.stringify(t))}Po(e,t,r){const s=$c(this.persistenceKey,e),i=new Ti(e,t,r);this.setItem(s,i.Ws())}Io(e){const t=JSON.stringify(Array.from(e));this.setItem(this.so,t)}Eo(e){const t=this.eo.exec(e);return t?t[1]:null}Ao(e,t){const r=this.Eo(e);return ma.$s(r,t)}Vo(e,t){const r=this.no.exec(e),s=Number(r[1]),i=r[2]!==void 0?r[2]:null;return pa.$s(new Oe(i),s,t)}fo(e,t){const r=this.ro.exec(e),s=Number(r[1]);return Ti.$s(s,t)}_o(e){return Dl.$s(e)}wo(e){return JSON.parse(e)}async mo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.bo(e.batchId,e.state,e.error);V(yt,`Ignoring mutation for non-active user ${e.user.uid}`)}po(e){return this.syncEngine.Do(e.targetId,e.state,e.error)}Ro(e,t){const r=t?this.Hs.insert(e,t):this.Hs.remove(e),s=this.uo(this.Hs),i=this.uo(r),o=[],c=[];return i.forEach((u=>{s.has(u)||o.push(u)})),s.forEach((u=>{i.has(u)||c.push(u)})),this.syncEngine.Co(o,c).then((()=>{this.Hs=r}))}ao(e){this.Hs.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}uo(e){let t=ml();return e.forEach(((r,s)=>{t=t.unionWith(s.activeTargetIds)})),t}}class Q_{constructor(){this.vo=new Su,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,r){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new Su,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mS{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yf="ConnectivityMonitor";class Xf{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){V(Yf,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){V(Yf,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Do=null;function Pu(){return Do===null?Do=(function(){return 268435456+Math.round(2147483648*Math.random())})():Do++,"0x"+Do.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hc="RestConnection",gS={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class _S{get Ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Uo=`projects/${r}/databases/${s}`,this.$o=this.databaseId.database===xi?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(e,t,r,s,i){const o=Pu(),c=this.Qo(e,t.toUriEncodedString());V(Hc,`Sending RPC '${e}' ${o}:`,c,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,s,i);const{host:l}=new URL(c),d=Dn(l);return this.zo(e,c,u,r,d).then((p=>(V(Hc,`Received RPC '${e}' ${o}: `,p),p)),(p=>{throw rt(Hc,`RPC '${e}' ${o} failed with error: `,p,"url: ",c,"request:",r),p}))}jo(e,t,r,s,i,o){return this.Wo(e,t,r,s,i)}Go(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Is})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}Qo(e,t){const r=gS[e];let s=`${this.qo}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yS{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Be="WebChannelConnection",ti=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class jr extends _S{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!jr.c_){const e=Zm();ti(e,Xm.STAT_EVENT,(t=>{t.stat===su.PROXY?V(Be,"STAT_EVENT: detected buffering proxy"):t.stat===su.NOPROXY&&V(Be,"STAT_EVENT: detected no buffering proxy")})),jr.c_=!0}}zo(e,t,r,s,i){const o=Pu();return new Promise(((c,u)=>{const l=new Jm;l.setWithCredentials(!0),l.listenOnce(Ym.COMPLETE,(()=>{try{switch(l.getLastErrorCode()){case Uo.NO_ERROR:const p=l.getResponseJson();V(Be,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),c(p);break;case Uo.TIMEOUT:V(Be,`RPC '${e}' ${o} timed out`),u(new N(b.DEADLINE_EXCEEDED,"Request time out"));break;case Uo.HTTP_ERROR:const g=l.getStatus();if(V(Be,`RPC '${e}' ${o} failed with status:`,g,"response text:",l.getResponseText()),g>0){let w=l.getResponseJson();Array.isArray(w)&&(w=w[0]);const C=w?.error;if(C&&C.status&&C.message){const k=(function(F){const j=F.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf(j)>=0?j:b.UNKNOWN})(C.status);u(new N(k,C.message))}else u(new N(b.UNKNOWN,"Server responded with status "+l.getStatus()))}else u(new N(b.UNAVAILABLE,"Connection failed."));break;default:U(9055,{l_:e,streamId:o,h_:l.getLastErrorCode(),P_:l.getLastError()})}}finally{V(Be,`RPC '${e}' ${o} completed.`)}}));const d=JSON.stringify(s);V(Be,`RPC '${e}' ${o} sending request:`,s),l.send(t,"POST",d,r,15)}))}T_(e,t,r){const s=Pu(),i=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const l=i.join("");V(Be,`Creating RPC '${e}' stream ${s}: ${l}`,c);const d=o.createWebChannel(l,c);this.I_(d);let p=!1,g=!1;const w=new yS({Jo:C=>{g?V(Be,`Not sending because RPC '${e}' stream ${s} is closed:`,C):(p||(V(Be,`Opening RPC '${e}' stream ${s} transport.`),d.open(),p=!0),V(Be,`RPC '${e}' stream ${s} sending:`,C),d.send(C))},Ho:()=>d.close()});return ti(d,oi.EventType.OPEN,(()=>{g||(V(Be,`RPC '${e}' stream ${s} transport opened.`),w.i_())})),ti(d,oi.EventType.CLOSE,(()=>{g||(g=!0,V(Be,`RPC '${e}' stream ${s} transport closed`),w.o_(),this.E_(d))})),ti(d,oi.EventType.ERROR,(C=>{g||(g=!0,rt(Be,`RPC '${e}' stream ${s} transport errored. Name:`,C.name,"Message:",C.message),w.o_(new N(b.UNAVAILABLE,"The operation could not be completed")))})),ti(d,oi.EventType.MESSAGE,(C=>{if(!g){const k=C.data[0];z(!!k,16349);const D=k,F=D?.error||D[0]?.error;if(F){V(Be,`RPC '${e}' stream ${s} received error:`,F);const j=F.status;let B=(function(W){const E=Re[W];if(E!==void 0)return a_(E)})(j),H=F.message;j==="NOT_FOUND"&&H.includes("database")&&H.includes("does not exist")&&H.includes(this.databaseId.database)&&rt(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),B===void 0&&(B=b.INTERNAL,H="Unknown error status: "+j+" with message "+F.message),g=!0,w.o_(new N(B,H)),d.close()}else V(Be,`RPC '${e}' stream ${s} received:`,k),w.__(k)}})),jr.u_(),setTimeout((()=>{w.s_()}),0),w}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}I_(e){this.a_.push(e)}E_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,r){super.Go(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return eg()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IS(n){return new jr(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J_(){return typeof window<"u"?window:null}function Wo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ir(n){return new Rb(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */jr.c_=!1;class Nl{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=r,this.A_=s,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&V("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zf="PersistentStream";class Y_{constructor(e,t,r,s,i,o,c,u){this.Ci=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Nl(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}K_(e){this.q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===b.RESOURCE_EXHAUSTED?(ve(t.toString()),ve("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===t&&this.G_(r,s)}),(r=>{e((()=>{const s=new N(b.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(e,t){const r=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{r((()=>this.listener.Zo()))})),this.stream.Yo((()=>{r((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return V(Zf,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(V(Zf,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class ES extends Y_{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=Pb(this.serializer,e),r=(function(i){if(!("targetChange"in i))return $.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?$.min():o.readTime?Ae(o.readTime):$.min()})(e);return this.listener.H_(t,r)}Z_(e){const t={};t.database=wu(this.serializer),t.addTarget=(function(i,o){let c;const u=o.target;if(c=oa(u)?{documents:g_(i,u)}:{query:ja(i,u).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=h_(i,o.resumeToken);const l=Eu(i,o.expectedCount);l!==null&&(c.expectedCount=l)}else if(o.snapshotVersion.compareTo($.min())>0){c.readTime=is(i,o.snapshotVersion.toTimestamp());const l=Eu(i,o.expectedCount);l!==null&&(c.expectedCount=l)}return c})(this.serializer,e);const r=kb(this.serializer,e);r&&(t.labels=r),this.K_(t)}X_(e){const t={};t.database=wu(this.serializer),t.removeTarget=e,this.K_(t)}}class TS extends Y_{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return z(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,z(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){z(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=Cb(e.writeResults,e.commitTime),r=Ae(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=wu(this.serializer),this.K_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>Bi(this.serializer,r)))};this.K_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wS{}class vS extends wS{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new N(b.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Wo(e,Tu(t,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new N(b.UNKNOWN,i.toString())}))}jo(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.jo(e,Tu(t,r),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new N(b.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function AS(n,e,t,r){return new vS(n,e,t,r)}class RS{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(ve(t),this.aa=!1):V("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ct="RemoteStore";class bS{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Map,this.Ra=new Map,this.Aa=new Ht(1e3),this.Va=new Ht(1001),this.da=new Set,this.ma=[],this.fa=i,this.fa.Mo((o=>{r.enqueueAndForget((async()=>{Ln(this)&&(V(Ct,"Restarting streams for network reachability change."),await(async function(u){const l=L(u);l.da.add(4),await As(l),l.ga.set("Unknown"),l.da.delete(4),await eo(l)})(this))}))})),this.ga=new RS(r,s)}}async function eo(n){if(Ln(n))for(const e of n.ma)await e(!0)}async function As(n){for(const e of n.ma)await e(!1)}function Cu(n,e){return n.Ea.get(e)||void 0}function Wa(n,e){const t=L(n),r=Cu(t,e.targetId);if(r!==void 0&&t.Ia.has(r))return;const s=(function(c,u){const l=Cu(c,u);l!==void 0&&c.Ra.delete(l);const d=(function(g,w){return w%2!=0?g.Va.next():g.Aa.next()})(c,u);return c.Ea.set(u,d),c.Ra.set(d,u),d})(t,e.targetId);V(Ct,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new wt(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.Ia.set(s,i),xl(t)?Ol(t):bs(t).O_()&&Vl(t,i)}function cs(n,e){const t=L(n),r=bs(t),s=Cu(t,e);V(Ct,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.Ia.delete(s),t.Ea.delete(e),t.Ra.delete(s),r.O_()&&X_(t,s),t.Ia.size===0&&(r.O_()?r.L_():Ln(t)&&t.ga.set("Unknown"))}function Vl(n,e){if(n.pa.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo($.min())>0){const t=n.Ra.get(e.targetId);if(t===void 0)return void V(Ct,"SDK target ID not found for remote ID: "+e.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(r)}bs(n).Z_(e)}function X_(n,e){n.pa.$e(e),bs(n).X_(e)}function Ol(n){n.pa=new Tb({getRemoteKeysForTarget:e=>{const t=n.Ra.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):K()},At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),bs(n).start(),n.ga.ua()}function xl(n){return Ln(n)&&!bs(n).x_()&&n.Ia.size>0}function Ln(n){return L(n).da.size===0}function Z_(n){n.pa=void 0}async function SS(n){n.ga.set("Online")}async function PS(n){n.Ia.forEach(((e,t)=>{Vl(n,e)}))}async function CS(n,e){Z_(n),xl(n)?(n.ga.ha(e),Ol(n)):n.ga.set("Unknown")}async function kS(n,e,t){if(n.ga.set("Online"),e instanceof l_&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds){if(s.Ia.has(c)){const u=s.Ra.get(c);u!==void 0&&(await s.remoteSyncer.rejectListen(u,o),s.Ea.delete(u),s.Ra.delete(c)),s.Ia.delete(c)}s.pa.removeTarget(c)}})(n,e)}catch(r){V(Ct,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await ga(n,r)}else if(e instanceof Ho?n.pa.Xe(e):e instanceof u_?n.pa.st(e):n.pa.tt(e),!t.isEqual($.min()))try{const r=await q_(n.localStore);t.compareTo(r)>=0&&await(function(i,o){const c=i.pa.Tt(o);c.targetChanges.forEach(((l,d)=>{if(l.resumeToken.approximateByteSize()>0){const p=i.Ia.get(d);p&&i.Ia.set(d,p.withResumeToken(l.resumeToken,o))}})),c.targetMismatches.forEach(((l,d)=>{const p=i.Ia.get(l);if(!p)return;i.Ia.set(l,p.withResumeToken(Ie.EMPTY_BYTE_STRING,p.snapshotVersion)),X_(i,l);const g=new wt(p.target,l,d,p.sequenceNumber);Vl(i,g)}));const u=(function(d,p){const g=new Map;p.targetChanges.forEach(((C,k)=>{const D=d.Ra.get(k);D!==void 0&&g.set(D,C)}));let w=new ce(G);return p.targetMismatches.forEach(((C,k)=>{const D=d.Ra.get(C);D!==void 0&&(w=w.insert(D,k))})),new vs(p.snapshotVersion,g,w,p.documentUpdates,p.resolvedLimboDocuments)})(i,c);return i.remoteSyncer.applyRemoteEvent(u)})(n,t)}catch(r){V(Ct,"Failed to raise snapshot:",r),await ga(n,r)}}async function ga(n,e,t){if(!On(e))throw e;n.da.add(1),await As(n),n.ga.set("Offline"),t||(t=()=>q_(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{V(Ct,"Retrying IndexedDB access"),await t(),n.da.delete(1),await eo(n)}))}function ey(n,e){return e().catch((t=>ga(n,t,e)))}async function Rs(n){const e=L(n),t=Pn(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Tn;for(;DS(e);)try{const s=await dS(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,NS(e,s)}catch(s){await ga(e,s)}ty(e)&&ny(e)}function DS(n){return Ln(n)&&n.Ta.length<10}function NS(n,e){n.Ta.push(e);const t=Pn(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function ty(n){return Ln(n)&&!Pn(n).x_()&&n.Ta.length>0}function ny(n){Pn(n).start()}async function VS(n){Pn(n).ra()}async function OS(n){const e=Pn(n);for(const t of n.Ta)e.ea(t.mutations)}async function xS(n,e,t){const r=n.Ta.shift(),s=Il.from(r,e,t);await ey(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await Rs(n)}async function LS(n,e){e&&Pn(n).Y_&&await(async function(r,s){if((function(o){return o_(o)&&o!==b.ABORTED})(s.code)){const i=r.Ta.shift();Pn(r).B_(),await ey(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Rs(r)}})(n,e),ty(n)&&ny(n)}async function ep(n,e){const t=L(n);t.asyncQueue.verifyOperationInProgress(),V(Ct,"RemoteStore received new credentials");const r=Ln(t);t.da.add(3),await As(t),r&&t.ga.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.da.delete(3),await eo(t)}async function ku(n,e){const t=L(n);e?(t.da.delete(2),await eo(t)):e||(t.da.add(2),await As(t),t.ga.set("Unknown"))}function bs(n){return n.ya||(n.ya=(function(t,r,s){const i=L(t);return i.sa(),new ES(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Zo:SS.bind(null,n),Yo:PS.bind(null,n),t_:CS.bind(null,n),H_:kS.bind(null,n)}),n.ma.push((async e=>{e?(n.ya.B_(),xl(n)?Ol(n):n.ga.set("Unknown")):(await n.ya.stop(),Z_(n))}))),n.ya}function Pn(n){return n.wa||(n.wa=(function(t,r,s){const i=L(t);return i.sa(),new TS(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:VS.bind(null,n),t_:LS.bind(null,n),ta:OS.bind(null,n),na:xS.bind(null,n)}),n.ma.push((async e=>{e?(n.wa.B_(),await Rs(n)):(await n.wa.stop(),n.Ta.length>0&&(V(Ct,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.wa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ll{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Me,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,c=new Ll(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(b.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ss(n,e){if(ve("AsyncQueue",`${e}: ${n}`),On(n))return new N(b.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{static emptySet(e){return new ir(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||x.comparator(t.key,r.key):(t,r)=>x.comparator(t.key,r.key),this.keyedMap=ai(),this.sortedSet=new ce(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof ir)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new ir;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tp{constructor(){this.Sa=new ce(x.comparator)}track(e){const t=e.doc.key,r=this.Sa.get(t);r?e.type!==0&&r.type===3?this.Sa=this.Sa.insert(t,e):e.type===3&&r.type!==1?this.Sa=this.Sa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Sa=this.Sa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Sa=this.Sa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Sa=this.Sa.remove(t):e.type===1&&r.type===2?this.Sa=this.Sa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Sa=this.Sa.insert(t,{type:2,doc:e.doc}):U(63341,{Vt:e,ba:r}):this.Sa=this.Sa.insert(t,e)}Da(){const e=[];return this.Sa.inorderTraversal(((t,r)=>{e.push(r)})),e}}class pr{constructor(e,t,r,s,i,o,c,u,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach((c=>{o.push({type:0,doc:c})})),new pr(e,t,ir.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ji(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MS{constructor(){this.Ca=void 0,this.va=[]}Fa(){return this.va.some((e=>e.Ma()))}}class FS{constructor(){this.queries=np(),this.onlineState="Unknown",this.xa=new Set}terminate(){(function(t,r){const s=L(t),i=s.queries;s.queries=np(),i.forEach(((o,c)=>{for(const u of c.va)u.onError(r)}))})(this,new N(b.ABORTED,"Firestore shutting down"))}}function np(){return new Yt((n=>Gg(n)),Ji)}async function Ml(n,e){const t=L(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.Fa()&&e.Ma()&&(r=2):(i=new MS,r=e.Ma()?0:1);try{switch(r){case 0:i.Ca=await t.onListen(s,!0);break;case 1:i.Ca=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=Ss(o,`Initialization of query '${Lr(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.va.push(e),e.Oa(t.onlineState),i.Ca&&e.Na(i.Ca)&&Ul(t)}async function Fl(n,e){const t=L(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.va.indexOf(e);o>=0&&(i.va.splice(o,1),i.va.length===0?s=e.Ma()?0:1:!i.Fa()&&e.Ma()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function US(n,e){const t=L(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.va)c.Na(s)&&(r=!0);o.Ca=s}}r&&Ul(t)}function BS(n,e,t){const r=L(n),s=r.queries.get(e);if(s)for(const i of s.va)i.onError(t);r.queries.delete(e)}function Ul(n){n.xa.forEach((e=>{e.next()}))}var Du,rp;(rp=Du||(Du={})).Ba="default",rp.Cache="cache";class Bl{constructor(e,t,r){this.query=e,this.La=t,this.ka=!1,this.Ka=null,this.onlineState="Unknown",this.options=r||{}}Na(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new pr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ka?this.qa(e)&&(this.La.next(e),t=!0):this.Ua(e,this.onlineState)&&(this.$a(e),t=!0),this.Ka=e,t}onError(e){this.La.error(e)}Oa(e){this.onlineState=e;let t=!1;return this.Ka&&!this.ka&&this.Ua(this.Ka,e)&&(this.$a(this.Ka),t=!0),t}Ua(e,t){if(!e.fromCache||!this.Ma())return!0;const r=t!=="Offline";return(!this.options.Wa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}qa(e){if(e.docChanges.length>0)return!0;const t=this.Ka&&this.Ka.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}$a(e){e=pr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ka=!0,this.La.next(e)}Ma(){return this.options.source!==Du.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ry{constructor(e,t){this.Qa=e,this.byteLength=t}Ga(){return"metadata"in this.Qa}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{constructor(e){this.serializer=e}Ks(e){return bt(this.serializer,e)}qs(e){return e.metadata.exists?za(this.serializer,e.document,!1):le.newNoDocument(this.Ks(e.metadata.name),this.Us(e.metadata.readTime))}Us(e){return Ae(e)}}class ql{constructor(e,t){this.za=e,this.serializer=t,this.ja=[],this.Ja=[],this.collectionGroups=new Set,this.progress=sy(e)}get queries(){return this.ja}get documents(){return this.Ja}Ha(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.Qa.namedQuery)this.ja.push(e.Qa.namedQuery);else if(e.Qa.documentMetadata){this.Ja.push({metadata:e.Qa.documentMetadata}),e.Qa.documentMetadata.exists||++t;const r=J.fromString(e.Qa.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.Qa.document&&(this.Ja[this.Ja.length-1].document=e.Qa.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}Za(e){const t=new Map,r=new sp(this.serializer);for(const s of e)if(s.metadata.queries){const i=r.Ks(s.metadata.name);for(const o of s.metadata.queries){const c=(t.get(o)||K()).add(i);t.set(o,c)}}return t}async Xa(e){const t=await fS(e,new sp(this.serializer),this.Ja,this.za.id),r=this.Za(this.documents);for(const s of this.ja)await pS(e,s,r.get(s.name));return this.progress.taskState="Success",{progress:this.progress,Ya:this.collectionGroups,eu:t}}}function sy(n){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:n.totalDocuments,totalBytes:n.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iy{constructor(e){this.key=e}}class oy{constructor(e){this.key=e}}class ay{constructor(e,t){this.query=e,this.tu=t,this.nu=null,this.hasCachedResults=!1,this.current=!1,this.ru=K(),this.mutatedKeys=K(),this.iu=Kg(e),this.su=new ir(this.iu)}get ou(){return this.tu}_u(e,t){const r=t?t.au:new tp,s=t?t.su:this.su;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,l=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((d,p)=>{const g=s.get(d),w=Yi(this.query,p)?p:null,C=!!g&&this.mutatedKeys.has(g.key),k=!!w&&(w.hasLocalMutations||this.mutatedKeys.has(w.key)&&w.hasCommittedMutations);let D=!1;g&&w?g.data.isEqual(w.data)?C!==k&&(r.track({type:3,doc:w}),D=!0):this.uu(g,w)||(r.track({type:2,doc:w}),D=!0,(u&&this.iu(w,u)>0||l&&this.iu(w,l)<0)&&(c=!0)):!g&&w?(r.track({type:0,doc:w}),D=!0):g&&!w&&(r.track({type:1,doc:g}),D=!0,(u||l)&&(c=!0)),D&&(w?(o=o.add(w),i=k?i.add(d):i.delete(d)):(o=o.delete(d),i=i.delete(d)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{su:o,au:r,bs:c,mutatedKeys:i}}uu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.su;this.su=e.su,this.mutatedKeys=e.mutatedKeys;const o=e.au.Da();o.sort(((d,p)=>(function(w,C){const k=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return U(20277,{Vt:D})}};return k(w)-k(C)})(d.type,p.type)||this.iu(d.doc,p.doc))),this.cu(r),s=s??!1;const c=t&&!s?this.lu():[],u=this.ru.size===0&&this.current&&!s?1:0,l=u!==this.nu;return this.nu=u,o.length!==0||l?{snapshot:new pr(this.query,e.su,i,o,e.mutatedKeys,u===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),hu:c}:{hu:c}}Oa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({su:this.su,au:new tp,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{hu:[]}}Pu(e){return!this.tu.has(e)&&!!this.su.has(e)&&!this.su.get(e).hasLocalMutations}cu(e){e&&(e.addedDocuments.forEach((t=>this.tu=this.tu.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.tu=this.tu.delete(t))),this.current=e.current)}lu(){if(!this.current)return[];const e=this.ru;this.ru=K(),this.su.forEach((r=>{this.Pu(r.key)&&(this.ru=this.ru.add(r.key))}));const t=[];return e.forEach((r=>{this.ru.has(r)||t.push(new oy(r))})),this.ru.forEach((r=>{e.has(r)||t.push(new iy(r))})),t}Tu(e){this.tu=e.ks,this.ru=K();const t=this._u(e.documents);return this.applyChanges(t,!0)}Iu(){return pr.fromInitialDocuments(this.query,this.su,this.mutatedKeys,this.nu===0,this.hasCachedResults)}}const Mn="SyncEngine";class qS{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class zS{constructor(e){this.key=e,this.Eu=!1}}class jS{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Ru={},this.Au=new Yt((c=>Gg(c)),Ji),this.Vu=new Map,this.du=new Set,this.mu=new ce(x.comparator),this.fu=new Map,this.gu=new Rl,this.pu={},this.yu=new Map,this.wu=Ht.ar(),this.onlineState="Unknown",this.Su=void 0}get isPrimaryClient(){return this.Su===!0}}async function $S(n,e,t=!0){const r=Qa(n);let s;const i=r.Au.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Iu()):s=await cy(r,e,t,!0),s}async function GS(n,e){const t=Qa(n);await cy(t,e,!0,!1)}async function cy(n,e,t,r){const s=await os(n.localStore,je(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await zl(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&Wa(n.remoteStore,s),c}async function zl(n,e,t,r,s){n.bu=(p,g,w)=>(async function(k,D,F,j){let B=D.view._u(F);B.bs&&(B=await fa(k.localStore,D.query,!1).then((({documents:E})=>D.view._u(E,B))));const H=j&&j.targetChanges.get(D.targetId),ee=j&&j.targetMismatches.get(D.targetId)!=null,W=D.view.applyChanges(B,k.isPrimaryClient,H,ee);return Nu(k,D.targetId,W.hu),W.snapshot})(n,p,g,w);const i=await fa(n.localStore,e,!0),o=new ay(e,i.ks),c=o._u(i.documents),u=Zi.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),l=o.applyChanges(c,n.isPrimaryClient,u);Nu(n,t,l.hu);const d=new qS(e,t,o);return n.Au.set(e,d),n.Vu.has(t)?n.Vu.get(t).push(e):n.Vu.set(t,[e]),l.snapshot}async function HS(n,e,t){const r=L(n),s=r.Au.get(e),i=r.Vu.get(s.targetId);if(i.length>1)return r.Vu.set(s.targetId,i.filter((o=>!Ji(o,e)))),void r.Au.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await as(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&cs(r.remoteStore,s.targetId),us(r,s.targetId)})).catch(Vn)):(us(r,s.targetId),await as(r.localStore,s.targetId,!0))}async function KS(n,e){const t=L(n),r=t.Au.get(e),s=t.Vu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),cs(t.remoteStore,r.targetId))}async function WS(n,e,t){const r=Hl(n);try{const s=await(function(o,c){const u=L(o),l=ne.now(),d=c.reduce(((w,C)=>w.add(C.key)),K());let p,g;return u.persistence.runTransaction("Locally write mutations","readwrite",(w=>{let C=Ze(),k=K();return u.xs.getEntries(w,d).next((D=>{C=D,C.forEach(((F,j)=>{j.isValidDocument()||(k=k.add(F))}))})).next((()=>u.localDocuments.getOverlayedDocuments(w,C))).next((D=>{p=D;const F=[];for(const j of c){const B=_b(j,p.get(j.key).overlayedDocument);B!=null&&F.push(new Xt(j.key,B,Og(B.value.mapValue),_e.exists(!0)))}return u.mutationQueue.addMutationBatch(w,l,F,c)})).next((D=>{g=D;const F=D.applyToLocalDocumentSet(p,k);return u.documentOverlayCache.saveOverlays(w,D.batchId,F)}))})).then((()=>({batchId:g.batchId,changes:Qg(p)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(o,c,u){let l=o.pu[o.currentUser.toKey()];l||(l=new ce(G)),l=l.insert(c,u),o.pu[o.currentUser.toKey()]=l})(r,s.batchId,t),await Zt(r,s.changes),await Rs(r.remoteStore)}catch(s){const i=Ss(s,"Failed to persist write");t.reject(i)}}async function uy(n,e){const t=L(n);try{const r=await hS(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.fu.get(i);o&&(z(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.Eu=!0:s.modifiedDocuments.size>0?z(o.Eu,14607):s.removedDocuments.size>0&&(z(o.Eu,42227),o.Eu=!1))})),await Zt(t,r,e)}catch(r){await Vn(r)}}function ip(n,e,t){const r=L(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Au.forEach(((i,o)=>{const c=o.view.Oa(e);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const u=L(o);u.onlineState=c;let l=!1;u.queries.forEach(((d,p)=>{for(const g of p.va)g.Oa(c)&&(l=!0)})),l&&Ul(u)})(r.eventManager,e),s.length&&r.Ru.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function QS(n,e,t){const r=L(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.fu.get(e),i=s&&s.key;if(i){let o=new ce(x.comparator);o=o.insert(i,le.newNoDocument(i,$.min()));const c=K().add(i),u=new vs($.min(),new Map,new ce(G),o,c);await uy(r,u),r.mu=r.mu.remove(i),r.fu.delete(e),Gl(r)}else await as(r.localStore,e,!1).then((()=>us(r,e,t))).catch(Vn)}async function JS(n,e){const t=L(n),r=e.batch.batchId;try{const s=await lS(t.localStore,e);$l(t,r,null),jl(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Zt(t,s)}catch(s){await Vn(s)}}async function YS(n,e,t){const r=L(n);try{const s=await(function(o,c){const u=L(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",(l=>{let d;return u.mutationQueue.lookupMutationBatch(l,c).next((p=>(z(p!==null,37113),d=p.keys(),u.mutationQueue.removeMutationBatch(l,p)))).next((()=>u.mutationQueue.performConsistencyCheck(l))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(l,d,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,d))).next((()=>u.localDocuments.getDocuments(l,d)))}))})(r.localStore,e);$l(r,e,t),jl(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Zt(r,s)}catch(s){await Vn(s)}}async function XS(n,e){const t=L(n);Ln(t.remoteStore)||V(Mn,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const r=await(function(o){const c=L(o);return c.persistence.runTransaction("Get highest unacknowledged batch id","readonly",(u=>c.mutationQueue.getHighestUnacknowledgedBatchId(u)))})(t.localStore);if(r===Tn)return void e.resolve();const s=t.yu.get(r)||[];s.push(e),t.yu.set(r,s)}catch(r){const s=Ss(r,"Initialization of waitForPendingWrites() operation failed");e.reject(s)}}function jl(n,e){(n.yu.get(e)||[]).forEach((t=>{t.resolve()})),n.yu.delete(e)}function $l(n,e,t){const r=L(n);let s=r.pu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.pu[r.currentUser.toKey()]=s}}function us(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Vu.get(e))n.Au.delete(r),t&&n.Ru.Du(r,t);n.Vu.delete(e),n.isPrimaryClient&&n.gu.Gr(e).forEach((r=>{n.gu.containsKey(r)||ly(n,r)}))}function ly(n,e){n.du.delete(e.path.canonicalString());const t=n.mu.get(e);t!==null&&(cs(n.remoteStore,t),n.mu=n.mu.remove(e),n.fu.delete(t),Gl(n))}function Nu(n,e,t){for(const r of t)r instanceof iy?(n.gu.addReference(r.key,e),ZS(n,r)):r instanceof oy?(V(Mn,"Document no longer in limbo: "+r.key),n.gu.removeReference(r.key,e),n.gu.containsKey(r.key)||ly(n,r.key)):U(19791,{Cu:r})}function ZS(n,e){const t=e.key,r=t.path.canonicalString();n.mu.get(t)||n.du.has(r)||(V(Mn,"New document in limbo: "+t),n.du.add(r),Gl(n))}function Gl(n){for(;n.du.size>0&&n.mu.size<n.maxConcurrentLimboResolutions;){const e=n.du.values().next().value;n.du.delete(e);const t=new x(J.fromString(e)),r=n.wu.next();n.fu.set(r,new zS(t)),n.mu=n.mu.insert(t,r),Wa(n.remoteStore,new wt(je(Es(t.path)),r,"TargetPurposeLimboResolution",Ye.ce))}}async function Zt(n,e,t){const r=L(n),s=[],i=[],o=[];r.Au.isEmpty()||(r.Au.forEach(((c,u)=>{o.push(r.bu(u,e,t).then((l=>{if((l||t)&&r.isPrimaryClient){const d=l?!l.fromCache:t?.targetChanges.get(u.targetId)?.current;r.sharedClientState.updateQueryState(u.targetId,d?"current":"not-current")}if(l){s.push(l);const d=Cl.Es(u.targetId,l);i.push(d)}})))})),await Promise.all(o),r.Ru.H_(s),await(async function(u,l){const d=L(u);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>A.forEach(l,(g=>A.forEach(g.Ts,(w=>d.persistence.referenceDelegate.addReference(p,g.targetId,w))).next((()=>A.forEach(g.Is,(w=>d.persistence.referenceDelegate.removeReference(p,g.targetId,w)))))))))}catch(p){if(!On(p))throw p;V(kl,"Failed to update sequence numbers: "+p)}for(const p of l){const g=p.targetId;if(!p.fromCache){const w=d.vs.get(g),C=w.snapshotVersion,k=w.withLastLimboFreeSnapshotVersion(C);d.vs=d.vs.insert(g,k)}}})(r.localStore,i))}async function eP(n,e){const t=L(n);if(!t.currentUser.isEqual(e)){V(Mn,"User change. New user:",e.toKey());const r=await B_(t.localStore,e);t.currentUser=e,(function(i,o){i.yu.forEach((c=>{c.forEach((u=>{u.reject(new N(b.CANCELLED,o))}))})),i.yu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Zt(t,r.Ns)}}function tP(n,e){const t=L(n),r=t.fu.get(e);if(r&&r.Eu)return K().add(r.key);{let s=K();const i=t.Vu.get(e);if(!i)return s;for(const o of i){const c=t.Au.get(o);s=s.unionWith(c.view.ou)}return s}}async function nP(n,e){const t=L(n),r=await fa(t.localStore,e.query,!0),s=e.view.Tu(r);return t.isPrimaryClient&&Nu(t,e.targetId,s.hu),s}async function rP(n,e){const t=L(n);return $_(t.localStore,e).then((r=>Zt(t,r)))}async function sP(n,e,t,r){const s=L(n),i=await(function(c,u){const l=L(c),d=L(l.mutationQueue);return l.persistence.runTransaction("Lookup mutation documents","readonly",(p=>d.Xn(p,u).next((g=>g?l.localDocuments.getDocuments(p,g):A.resolve(null)))))})(s.localStore,e);i!==null?(t==="pending"?await Rs(s.remoteStore):t==="acknowledged"||t==="rejected"?($l(s,e,r||null),jl(s,e),(function(c,u){L(L(c).mutationQueue).nr(u)})(s.localStore,e)):U(6720,"Unknown batchState",{vu:t}),await Zt(s,i)):V(Mn,"Cannot apply mutation batch with id: "+e)}async function iP(n,e){const t=L(n);if(Qa(t),Hl(t),e===!0&&t.Su!==!0){const r=t.sharedClientState.getAllActiveQueryTargets(),s=await op(t,r.toArray());t.Su=!0,await ku(t.remoteStore,!0);for(const i of s)Wa(t.remoteStore,i)}else if(e===!1&&t.Su!==!1){const r=[];let s=Promise.resolve();t.Vu.forEach(((i,o)=>{t.sharedClientState.isLocalQueryTarget(o)?r.push(o):s=s.then((()=>(us(t,o),as(t.localStore,o,!0)))),cs(t.remoteStore,o)})),await s,await op(t,r),(function(o){const c=L(o);c.fu.forEach(((u,l)=>{cs(c.remoteStore,l)})),c.gu.zr(),c.fu=new Map,c.mu=new ce(x.comparator)})(t),t.Su=!1,await ku(t.remoteStore,!1)}}async function op(n,e,t){const r=L(n),s=[],i=[];for(const o of e){let c;const u=r.Vu.get(o);if(u&&u.length!==0){c=await os(r.localStore,je(u[0]));for(const l of u){const d=r.Au.get(l),p=await nP(r,d);p.snapshot&&i.push(p.snapshot)}}else{const l=await j_(r.localStore,o);c=await os(r.localStore,l),await zl(r,hy(l),o,!1,c.resumeToken)}s.push(c)}return r.Ru.H_(i),s}function hy(n){return zg(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function oP(n){return(function(t){return L(L(t).persistence).hs()})(L(n).localStore)}async function aP(n,e,t,r){const s=L(n);if(s.Su)return void V(Mn,"Ignoring unexpected query state notification.");const i=s.Vu.get(e);if(i&&i.length>0)switch(t){case"current":case"not-current":{const o=await $_(s.localStore,Hg(i[0])),c=vs.createSynthesizedRemoteEventForCurrentChange(e,t==="current",Ie.EMPTY_BYTE_STRING);await Zt(s,o,c);break}case"rejected":await as(s.localStore,e,!0),us(s,e,r);break;default:U(64155,t)}}async function cP(n,e,t){const r=Qa(n);if(r.Su){for(const s of e){if(r.Vu.has(s)&&r.sharedClientState.isActiveQueryTarget(s)){V(Mn,"Adding an already active target "+s);continue}const i=await j_(r.localStore,s),o=await os(r.localStore,i);await zl(r,hy(i),o.targetId,!1,o.resumeToken),Wa(r.remoteStore,o)}for(const s of t)r.Vu.has(s)&&await as(r.localStore,s,!1).then((()=>{cs(r.remoteStore,s),us(r,s)})).catch(Vn)}}function Qa(n){const e=L(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=uy.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=tP.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=QS.bind(null,e),e.Ru.H_=US.bind(null,e.eventManager),e.Ru.Du=BS.bind(null,e.eventManager),e}function Hl(n){const e=L(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=JS.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=YS.bind(null,e),e}function uP(n,e,t){const r=L(n);(async function(i,o,c){try{const u=await o.getMetadata();if(await(function(w,C){const k=L(w),D=Ae(C.createTime);return k.persistence.runTransaction("hasNewerBundle","readonly",(F=>k.Pi.getBundleMetadata(F,C.id))).then((F=>!!F&&F.createTime.compareTo(D)>=0))})(i.localStore,u))return await o.close(),c._completeWith((function(w){return{taskState:"Success",documentsLoaded:w.totalDocuments,bytesLoaded:w.totalBytes,totalDocuments:w.totalDocuments,totalBytes:w.totalBytes}})(u)),Promise.resolve(new Set);c._updateProgress(sy(u));const l=new ql(u,o.serializer);let d=await o.Fu();for(;d;){const g=await l.Ha(d);g&&c._updateProgress(g),d=await o.Fu()}const p=await l.Xa(i.localStore);return await Zt(i,p.eu,void 0),await(function(w,C){const k=L(w);return k.persistence.runTransaction("Save bundle","readwrite",(D=>k.Pi.saveBundleMetadata(D,C)))})(i.localStore,u),c._completeWith(p.progress),Promise.resolve(p.Ya)}catch(u){return rt(Mn,`Loading bundle failed with ${u}`),c._failWith(u),Promise.resolve(new Set)}})(r,e,t).then((s=>{r.sharedClientState.notifyBundleLoaded(s)}))}class ls{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ir(e.databaseInfo.databaseId),this.sharedClientState=this.Mu(e),this.persistence=this.xu(e),await this.persistence.start(),this.localStore=this.Ou(e),this.gcScheduler=this.Nu(e,this.localStore),this.indexBackfillerScheduler=this.Bu(e,this.localStore)}Nu(e,t){return null}Bu(e,t){return null}Ou(e){return U_(this.persistence,new F_,e.initialUser,this.serializer)}xu(e){return new bl(Ka.Vi,this.serializer)}Mu(e){return new Q_}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ls.provider={build:()=>new ls};class Kl extends ls{constructor(e){super(),this.cacheSizeBytes=e}Nu(e,t){z(this.persistence.referenceDelegate instanceof da,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new N_(r,e.asyncQueue,t)}xu(e){const t=this.cacheSizeBytes!==void 0?qe.withCacheSize(this.cacheSizeBytes):qe.DEFAULT;return new bl((r=>da.Vi(r,t)),this.serializer)}}class Wl extends ls{constructor(e,t,r){super(),this.Lu=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Lu.initialize(this,e),await Hl(this.Lu.syncEngine),await Rs(this.Lu.remoteStore),await this.persistence.zi((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}Ou(e){return U_(this.persistence,new F_,e.initialUser,this.serializer)}Nu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new N_(r,e.asyncQueue,t)}Bu(e,t){const r=new gR(t,this.persistence);return new mR(e.asyncQueue,r)}xu(e){const t=Pl(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?qe.withCacheSize(this.cacheSizeBytes):qe.DEFAULT;return new Sl(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,J_(),Wo(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Mu(e){return new Q_}}class dy extends Wl{constructor(e,t){super(e,t,!1),this.Lu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Lu.syncEngine;this.sharedClientState instanceof Gc&&(this.sharedClientState.syncEngine={bo:sP.bind(null,t),Do:aP.bind(null,t),Co:cP.bind(null,t),hs:oP.bind(null,t),So:rP.bind(null,t)},await this.sharedClientState.start()),await this.persistence.zi((async r=>{await iP(this.Lu.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())}))}Mu(e){const t=J_();if(!Gc.v(t))throw new N(b.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=Pl(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Gc(t,e.asyncQueue,r,e.clientId,e.initialUser)}}class Cn{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>ip(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=eP.bind(null,this.syncEngine),await ku(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new FS})()}createDatastore(e){const t=Ir(e.databaseInfo.databaseId),r=IS(e.databaseInfo);return AS(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,o,c){return new bS(r,s,i,o,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>ip(this.syncEngine,t,0)),(function(){return Xf.v()?new Xf:new mS})())}createSyncEngine(e,t){return(function(s,i,o,c,u,l,d){const p=new jS(s,i,o,c,u,l);return d&&(p.Su=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const r=L(t);V(Ct,"RemoteStore shutting down."),r.da.add(5),await As(r),r.fa.shutdown(),r.ga.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Cn.provider={build:()=>new Cn};function ap(n,e=10240){let t=0;return{async read(){if(t<n.byteLength){const r={value:n.slice(t,t+e),done:!1};return t+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.ku(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.ku(this.observer.error,e):ve("Uncaught Error in snapshot listener:",e.toString()))}Ku(){this.muted=!0}ku(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lP{constructor(e,t){this.qu=e,this.serializer=t,this.metadata=new Me,this.buffer=new Uint8Array,this.Uu=(function(){return new TextDecoder("utf-8")})(),this.$u().then((r=>{r&&r.Ga()?this.metadata.resolve(r.Qa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(r?.Qa)}`))}),(r=>this.metadata.reject(r)))}close(){return this.qu.cancel()}async getMetadata(){return this.metadata.promise}async Fu(){return await this.getMetadata(),this.$u()}async $u(){const e=await this.Wu();if(e===null)return null;const t=this.Uu.decode(e),r=Number(t);isNaN(r)&&this.Qu(`length string (${t}) is not valid number`);const s=await this.Gu(r);return new ry(JSON.parse(s),e.length+r)}zu(){return this.buffer.findIndex((e=>e===123))}async Wu(){for(;this.zu()<0&&!await this.ju(););if(this.buffer.length===0)return null;const e=this.zu();e<0&&this.Qu("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Gu(e){for(;this.buffer.length<e;)await this.ju()&&this.Qu("Reached the end of bundle when more is expected.");const t=this.Uu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}Qu(e){throw this.qu.cancel(),new Error(`Invalid bundle format: ${e}`)}async ju(){const e=await this.qu.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hP{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let r=this.Fu();if(!r||!r.Ga())throw new Error(`The first element of the bundle is not a metadata object, it is
         ${JSON.stringify(r?.Qa)}`);this.metadata=r;do r=this.Fu(),r!==null&&this.elements.push(r);while(r!==null)}getMetadata(){return this.metadata}Ju(){return this.elements}Fu(){if(this.cursor===this.bundleData.length)return null;const e=this.Wu(),t=this.Gu(e);return new ry(JSON.parse(t),e)}Gu(e){if(this.cursor+e>this.bundleData.length)throw new N(b.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}Wu(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if(this.bundleData[t]==="{"){if(t===e)throw new Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw new Error("Reached the end of bundle when more is expected.")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let dP=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new N(b.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await(async function(s,i){const o=L(s),c={documents:i.map((p=>Ui(o.serializer,p)))},u=await o.jo("BatchGetDocuments",o.serializer.databaseId,J.emptyPath(),c,i.length),l=new Map;u.forEach((p=>{const g=Sb(o.serializer,p);l.set(g.key.toString(),g)}));const d=[];return i.forEach((p=>{const g=l.get(p.toString());z(!!g,55234,{key:p}),d.push(g)})),d})(this.datastore,e);return t.forEach((r=>this.recordVersion(r))),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new ws(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach((t=>{e.delete(t.key.toString())})),e.forEach(((t,r)=>{const s=x.fromPath(r);this.mutations.push(new _l(s,this.precondition(s)))})),await(async function(r,s){const i=L(r),o={writes:s.map((c=>Bi(i.serializer,c)))};await i.Wo("Commit",i.serializer.databaseId,J.emptyPath(),o)})(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw U(50498,{Hu:e.constructor.name});t=$.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new N(b.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual($.min())?_e.exists(!1):_e.updateTime(t):_e.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual($.min()))throw new N(b.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return _e.updateTime(t)}return _e.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fP{constructor(e,t,r,s,i){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=s,this.deferred=i,this.Zu=r.maxAttempts,this.M_=new Nl(this.asyncQueue,"transaction_retry")}Xu(){this.Zu-=1,this.Yu()}Yu(){this.M_.p_((async()=>{const e=new dP(this.datastore),t=this.ec(e);t&&t.then((r=>{this.asyncQueue.enqueueAndForget((()=>e.commit().then((()=>{this.deferred.resolve(r)})).catch((s=>{this.tc(s)}))))})).catch((r=>{this.tc(r)}))}))}ec(e){try{const t=this.updateFunction(e);return!Ki(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}tc(e){this.Zu>0&&this.nc(e)?(this.Zu-=1,this.asyncQueue.enqueueAndForget((()=>(this.Yu(),Promise.resolve())))):this.deferred.reject(e)}nc(e){if(e?.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!o_(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kn="FirestoreClient";class pP{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Oe.UNAUTHENTICATED,this.clientId=Da.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{V(kn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(V(kn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Me;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Ss(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function Kc(n,e){n.asyncQueue.verifyOperationInProgress(),V(kn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await B_(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function cp(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Ql(n);V(kn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>ep(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>ep(e.remoteStore,s))),n._onlineComponents=e}async function Ql(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){V(kn,"Using user provided OfflineComponentProvider");try{await Kc(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===b.FAILED_PRECONDITION||s.code===b.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;rt("Error using user provided cache. Falling back to memory cache: "+t),await Kc(n,new ls)}}else V(kn,"Using default OfflineComponentProvider"),await Kc(n,new Kl(void 0));return n._offlineComponents}async function Ya(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(V(kn,"Using user provided OnlineComponentProvider"),await cp(n,n._uninitializedComponentsProvider._online)):(V(kn,"Using default OnlineComponentProvider"),await cp(n,new Cn))),n._onlineComponents}function fy(n){return Ql(n).then((e=>e.persistence))}function Ps(n){return Ql(n).then((e=>e.localStore))}function py(n){return Ya(n).then((e=>e.remoteStore))}function Jl(n){return Ya(n).then((e=>e.syncEngine))}function my(n){return Ya(n).then((e=>e.datastore))}async function hs(n){const e=await Ya(n),t=e.eventManager;return t.onListen=$S.bind(null,e.syncEngine),t.onUnlisten=HS.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=GS.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=KS.bind(null,e.syncEngine),t}function mP(n){return n.asyncQueue.enqueue((async()=>{const e=await fy(n),t=await py(n);return e.setNetworkEnabled(!0),(function(s){const i=L(s);return i.da.delete(0),eo(i)})(t)}))}function gP(n){return n.asyncQueue.enqueue((async()=>{const e=await fy(n),t=await py(n);return e.setNetworkEnabled(!1),(async function(s){const i=L(s);i.da.add(0),await As(i),i.ga.set("Offline")})(t)}))}function _P(n,e,t,r){const s=new Ja(r),i=new Bl(e,s,t);return n.asyncQueue.enqueueAndForget((async()=>Ml(await hs(n),i))),()=>{s.Ku(),n.asyncQueue.enqueueAndForget((async()=>Fl(await hs(n),i)))}}function yP(n,e){const t=new Me;return n.asyncQueue.enqueueAndForget((async()=>(async function(s,i,o){try{const c=await(function(l,d){const p=L(l);return p.persistence.runTransaction("read document","readonly",(g=>p.localDocuments.getDocument(g,d)))})(s,i);c.isFoundDocument()?o.resolve(c):c.isNoDocument()?o.resolve(null):o.reject(new N(b.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(c){const u=Ss(c,`Failed to get document '${i} from cache`);o.reject(u)}})(await Ps(n),e,t))),t.promise}function gy(n,e,t={}){const r=new Me;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,l){const d=new Ja({next:g=>{d.Ku(),o.enqueueAndForget((()=>Fl(i,p)));const w=g.docs.has(c);!w&&g.fromCache?l.reject(new N(b.UNAVAILABLE,"Failed to get document because the client is offline.")):w&&g.fromCache&&u&&u.source==="server"?l.reject(new N(b.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(g)},error:g=>l.reject(g)}),p=new Bl(Es(c.path),d,{includeMetadataChanges:!0,Wa:!0});return Ml(i,p)})(await hs(n),n.asyncQueue,e,t,r))),r.promise}function IP(n,e){const t=new Me;return n.asyncQueue.enqueueAndForget((async()=>(async function(s,i,o){try{const c=await fa(s,i,!0),u=new ay(i,c.ks),l=u._u(c.documents),d=u.applyChanges(l,!1);o.resolve(d.snapshot)}catch(c){const u=Ss(c,`Failed to execute query '${i} against cache`);o.reject(u)}})(await Ps(n),e,t))),t.promise}function _y(n,e,t={}){const r=new Me;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,l){const d=new Ja({next:g=>{d.Ku(),o.enqueueAndForget((()=>Fl(i,p))),g.fromCache&&u.source==="server"?l.reject(new N(b.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):l.resolve(g)},error:g=>l.reject(g)}),p=new Bl(c,d,{includeMetadataChanges:!0,Wa:!0});return Ml(i,p)})(await hs(n),n.asyncQueue,e,t,r))),r.promise}function EP(n,e,t){const r=new Me;return n.asyncQueue.enqueueAndForget((async()=>{try{const s=await my(n);r.resolve((async function(o,c,u){const l=L(o),{request:d,gt:p,parent:g}=__(l.serializer,jg(c),u);l.connection.Ko||delete d.parent;const w=(await l.jo("RunAggregationQuery",l.serializer.databaseId,g,d,1)).filter((k=>!!k.result));z(w.length===1,64727);const C=w[0].result?.aggregateFields;return Object.keys(C).reduce(((k,D)=>(k[p[D]]=C[D],k)),{})})(s,e,t))}catch(s){r.reject(s)}})),r.promise}function TP(n,e){const t=new Me;return n.asyncQueue.enqueueAndForget((async()=>WS(await Jl(n),e,t))),t.promise}function wP(n,e){const t=new Ja(e);return n.asyncQueue.enqueueAndForget((async()=>(function(s,i){L(s).xa.add(i),i.next()})(await hs(n),t))),()=>{t.Ku(),n.asyncQueue.enqueueAndForget((async()=>(function(s,i){L(s).xa.delete(i)})(await hs(n),t)))}}function vP(n,e,t){const r=new Me;return n.asyncQueue.enqueueAndForget((async()=>{const s=await my(n);new fP(n.asyncQueue,s,t,e,r).Xu()})),r.promise}function AP(n,e,t,r){const s=(function(o,c){let u;return u=typeof o=="string"?c_().encode(o):o,(function(d,p){return new lP(d,p)})((function(d,p){if(d instanceof Uint8Array)return ap(d,p);if(d instanceof ArrayBuffer)return ap(new Uint8Array(d),p);if(d instanceof ReadableStream)return d.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")})(u),c)})(t,Ir(e));n.asyncQueue.enqueueAndForget((async()=>{uP(await Jl(n),s,r)}))}function RP(n,e){return n.asyncQueue.enqueue((async()=>(function(r,s){const i=L(r);return i.persistence.runTransaction("Get named query","readonly",(o=>i.Pi.getNamedQuery(o,s)))})(await Ps(n),e)))}function yy(n,e){return(function(r,s){return new hP(r,s)})(n,e)}function bP(n,e){return n.asyncQueue.enqueue((async()=>(async function(r,s){const i=L(r),o=i.indexManager,c=[];return i.persistence.runTransaction("Configure indexes","readwrite",(u=>o.getFieldIndexes(u).next((l=>(function(p,g,w,C,k){p=[...p],g=[...g],p.sort(w),g.sort(w);const D=p.length,F=g.length;let j=0,B=0;for(;j<F&&B<D;){const H=w(p[B],g[j]);H<0?k(p[B++]):H>0?C(g[j++]):(j++,B++)}for(;j<F;)C(g[j++]);for(;B<D;)k(p[B++])})(l,s,hR,(d=>{c.push(o.addFieldIndex(u,d))}),(d=>{c.push(o.deleteFieldIndex(u,d))})))).next((()=>A.waitFor(c)))))})(await Ps(n),e)))}function SP(n,e){return n.asyncQueue.enqueue((async()=>(function(r,s){L(r).Cs.As=s})(await Ps(n),e)))}function PP(n){return n.asyncQueue.enqueue((async()=>(function(t){const r=L(t),s=r.indexManager;return r.persistence.runTransaction("Delete All Indexes","readwrite",(i=>s.deleteAllFieldIndexes(i)))})(await Ps(n))))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iy(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CP="ComponentProvider",up=new Map;function kP(n,e,t,r,s){return new GR(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Iy(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ey="firestore.googleapis.com",lp=!0;class hp{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new N(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Ey,this.ssl=lp}else this.host=e.host,this.ssl=e.ssl??lp;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=S_;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<D_)throw new N(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}ig("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Iy(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new N(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new N(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new N(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class to{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new hp({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new N(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new hp(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new rg;switch(r.type){case"firstParty":return new sR(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new N(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=up.get(t);r&&(V(CP,"Removing Datastore"),up.delete(t),r.terminate())})(this),Promise.resolve()}}function Ty(n,e,t,r={}){n=Y(n,to);const s=Dn(e),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;s&&Ea(`https://${c}`),i.host!==Ey&&i.host!==c&&rt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:s,emulatorOptions:r};if(!pt(u,o)&&(n._setSettings(u),r.mockUserToken)){let l,d;if(typeof r.mockUserToken=="string")l=r.mockUserToken,d=Oe.MOCK_USER;else{l=xp(r.mockUserToken,n._app?.options.projectId);const p=r.mockUserToken.sub||r.mockUserToken.user_id;if(!p)throw new N(b.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");d=new Oe(p)}n._authCredentials=new tR(new ng(l,d))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ke(this.firestore,e,this._query)}}class se{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new dt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new se(this.firestore,e,this._key)}toJSON(){return{type:se._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(yr(t,se._jsonSchema))return new se(e,r||null,new x(J.fromString(t.referencePath)))}}se._jsonSchemaVersion="firestore/documentReference/1.0",se._jsonSchema={type:Se("string",se._jsonSchemaVersion),referencePath:Se("string")};class dt extends ke{constructor(e,t,r){super(e,t,Es(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new se(this.firestore,null,new x(e))}withConverter(e){return new dt(this.firestore,e,this._path)}}function DP(n,e,...t){if(n=q(n),sl("collection","path",e),n instanceof to){const r=J.fromString(e,...t);return Xd(r),new dt(n,null,r)}{if(!(n instanceof se||n instanceof dt))throw new N(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(J.fromString(e,...t));return Xd(r),new dt(n.firestore,null,r)}}function NP(n,e){if(n=Y(n,to),sl("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new N(b.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new ke(n,null,(function(r){return new Jt(J.emptyPath(),r)})(e))}function wy(n,e,...t){if(n=q(n),arguments.length===1&&(e=Da.newId()),sl("doc","path",e),n instanceof to){const r=J.fromString(e,...t);return Yd(r),new se(n,null,new x(r))}{if(!(n instanceof se||n instanceof dt))throw new N(b.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(J.fromString(e,...t));return Yd(r),new se(n.firestore,n instanceof dt?n.converter:null,new x(r))}}function VP(n,e){return n=q(n),e=q(e),(n instanceof se||n instanceof dt)&&(e instanceof se||e instanceof dt)&&n.firestore===e.firestore&&n.path===e.path&&n.converter===e.converter}function Yl(n,e){return n=q(n),e=q(e),n instanceof ke&&e instanceof ke&&n.firestore===e.firestore&&Ji(n._query,e._query)&&n.converter===e.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dp="AsyncQueue";class fp{constructor(e=Promise.resolve()){this.rc=[],this.sc=!1,this.oc=[],this._c=null,this.ac=!1,this.uc=!1,this.cc=[],this.M_=new Nl(this,"async_queue_retry"),this.lc=()=>{const r=Wo();r&&V(dp,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.hc=e;const t=Wo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.lc)}get isShuttingDown(){return this.sc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Pc(),this.Tc(e)}enterRestrictedMode(e){if(!this.sc){this.sc=!0,this.uc=e||!1;const t=Wo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.lc)}}enqueue(e){if(this.Pc(),this.sc)return new Promise((()=>{}));const t=new Me;return this.Tc((()=>this.sc&&this.uc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.rc.push(e),this.Ic())))}async Ic(){if(this.rc.length!==0){try{await this.rc[0](),this.rc.shift(),this.M_.reset()}catch(e){if(!On(e))throw e;V(dp,"Operation failed with retryable error: "+e)}this.rc.length>0&&this.M_.p_((()=>this.Ic()))}}Tc(e){const t=this.hc.then((()=>(this.ac=!0,e().catch((r=>{throw this._c=r,this.ac=!1,ve("INTERNAL UNHANDLED ERROR: ",pp(r)),r})).then((r=>(this.ac=!1,r))))));return this.hc=t,t}enqueueAfterDelay(e,t,r){this.Pc(),this.cc.indexOf(e)>-1&&(t=0);const s=Ll.createAndSchedule(this,e,t,r,(i=>this.Ec(i)));return this.oc.push(s),s}Pc(){this._c&&U(47125,{Rc:pp(this._c)})}verifyOperationInProgress(){}async Ac(){let e;do e=this.hc,await e;while(e!==this.hc)}Vc(e){for(const t of this.oc)if(t.timerId===e)return!0;return!1}dc(e){return this.Ac().then((()=>{this.oc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.oc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Ac()}))}mc(e){this.cc.push(e)}Ec(e){const t=this.oc.indexOf(e);this.oc.splice(t,1)}}function pp(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vy{constructor(){this._progressObserver={},this._taskCompletionResolver=new Me,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,r){this._progressObserver={next:e,error:t,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OP=-1;class oe extends to{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new fp,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new fp(e),this._firestoreClient=void 0,await e}}}function xP(n,e,t){t||(t=xi);const r=ps(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(pt(i,e))return s;throw new N(b.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new N(b.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<D_)throw new N(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&Dn(e.host)&&Ea(e.host),r.initialize({options:e,instanceIdentifier:t})}function LP(n,e){const t=typeof n=="object"?n:Fu(),r=typeof n=="string"?n:e||xi,s=ps(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Np("firestore");i&&Ty(s,...i)}return s}function ye(n){if(n._terminated)throw new N(b.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Ay(n),n._firestoreClient}function Ay(n){const e=n._freezeSettings(),t=kP(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new pP(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(n._componentsProvider))}function MP(n,e){rt("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=n._freezeSettings();return Ry(n,Cn.provider,{build:r=>new Wl(r,t.cacheSizeBytes,e?.forceOwnership)}),Promise.resolve()}async function FP(n){rt("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=n._freezeSettings();Ry(n,Cn.provider,{build:t=>new dy(t,e.cacheSizeBytes)})}function Ry(n,e,t){if((n=Y(n,oe))._firestoreClient||n._terminated)throw new N(b.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(n._componentsProvider||n._getSettings().localCache)throw new N(b.FAILED_PRECONDITION,"SDK cache is already specified.");n._componentsProvider={_online:e,_offline:t},Ay(n)}function UP(n){if(n._initialized&&!n._terminated)throw new N(b.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new Me;return n._queue.enqueueAndForgetEvenWhileRestricted((async()=>{try{await(async function(r){if(!Rt.v())return Promise.resolve();const s=r+M_;await Rt.delete(s)})(Pl(n._databaseId,n._persistenceKey)),e.resolve()}catch(t){e.reject(t)}})),e.promise}function BP(n){return(function(t){const r=new Me;return t.asyncQueue.enqueueAndForget((async()=>XS(await Jl(t),r))),r.promise})(ye(n=Y(n,oe)))}function qP(n){return mP(ye(n=Y(n,oe)))}function zP(n){return gP(ye(n=Y(n,oe)))}function jP(n){return aT(n.app,"firestore",n._databaseId.database),n._delete()}function Vu(n,e){const t=ye(n=Y(n,oe)),r=new vy;return AP(t,n._databaseId,e,r),r}function by(n,e){return RP(ye(n=Y(n,oe)),e).then((t=>t?new ke(n,null,t.query):null))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Je(Ie.fromBase64String(e))}catch(t){throw new N(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Je(Ie.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Je._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(yr(e,Je._jsonSchema))return Je.fromBase64String(e.bytes)}}Je._jsonSchemaVersion="firestore/bytes/1.0",Je._jsonSchema={type:Se("string",Je._jsonSchemaVersion),bytes:Se("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new N(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new he(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function $P(){return new Er(au)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new N(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new N(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return G(this._lat,e._lat)||G(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ft._jsonSchemaVersion}}static fromJSON(e){if(yr(e,ft._jsonSchema))return new ft(e.latitude,e.longitude)}}ft._jsonSchemaVersion="firestore/geoPoint/1.0",ft._jsonSchema={type:Se("string",ft._jsonSchemaVersion),latitude:Se("number"),longitude:Se("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:at._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(yr(e,at._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new at(e.vectorValues);throw new N(b.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}at._jsonSchemaVersion="firestore/vectorValue/1.0",at._jsonSchema={type:Se("string",at._jsonSchemaVersion),vectorValues:Se("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GP=/^__.*__$/;class HP{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Xt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Ts(e,this.data,t,this.fieldTransforms)}}class Sy{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Xt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Py(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw U(40011,{dataSource:n})}}class Xa{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.fc(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new Xa({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}yc(e){const t=this.path?.child(e),r=this.i({path:t,arrayElement:!1});return r.wc(e),r}Sc(e){const t=this.path?.child(e),r=this.i({path:t,arrayElement:!1});return r.fc(),r}bc(e){return this.i({path:void 0,arrayElement:!0})}Dc(e){return _a(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}fc(){if(this.path)for(let e=0;e<this.path.length;e++)this.wc(this.path.get(e))}wc(e){if(e.length===0)throw this.Dc("Document fields must not be empty");if(Py(this.dataSource)&&GP.test(e))throw this.Dc('Document fields cannot begin and end with "__"')}}class KP{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Ir(e)}V(e,t,r,s=!1){return new Xa({dataSource:e,methodName:t,targetDoc:r,path:he.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Tr(n){const e=n._freezeSettings(),t=Ir(n._databaseId);return new KP(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Za(n,e,t,r,s,i={}){const o=n.V(i.merge||i.mergeFields?2:0,e,t,s);sh("Data must be an object, but it was:",o,r);const c=Dy(r,o);let u,l;if(i.merge)u=new Xe(o.fieldMask),l=o.fieldTransforms;else if(i.mergeFields){const d=[];for(const p of i.mergeFields){const g=Kt(e,p,t);if(!o.contains(g))throw new N(b.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);Vy(d,g)||d.push(g)}u=new Xe(d),l=o.fieldTransforms.filter((p=>u.covers(p.field)))}else u=null,l=o.fieldTransforms;return new HP(new xe(c),u,l)}class no extends Fn{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.Dc(`${this._methodName}() can only appear at the top level of your update data`):e.Dc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof no}}function Cy(n,e,t){return new Xa({dataSource:3,targetDoc:e.settings.targetDoc,methodName:n._methodName,arrayElement:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Xl extends Fn{_toFieldTransform(e){return new Xi(e.path,new rs)}isEqual(e){return e instanceof Xl}}class Zl extends Fn{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=Cy(this,e,!0),r=this.vc.map((i=>wr(i,t))),s=new lr(r);return new Xi(e.path,s)}isEqual(e){return e instanceof Zl&&pt(this.vc,e.vc)}}class eh extends Fn{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=Cy(this,e,!0),r=this.vc.map((i=>wr(i,t))),s=new hr(r);return new Xi(e.path,s)}isEqual(e){return e instanceof eh&&pt(this.vc,e.vc)}}class th extends Fn{constructor(e,t){super(e),this.Fc=t}_toFieldTransform(e){const t=new ss(e.serializer,Xg(e.serializer,this.Fc));return new Xi(e.path,t)}isEqual(e){return e instanceof th&&this.Fc===e.Fc}}function nh(n,e,t,r){const s=n.V(1,e,t);sh("Data must be an object, but it was:",s,r);const i=[],o=xe.empty();xn(r,((u,l)=>{const d=ih(e,u,t);l=q(l);const p=s.Sc(d);if(l instanceof no)i.push(d);else{const g=wr(l,p);g!=null&&(i.push(d),o.set(d,g))}}));const c=new Xe(i);return new Sy(o,c,s.fieldTransforms)}function rh(n,e,t,r,s,i){const o=n.V(1,e,t),c=[Kt(e,r,t)],u=[s];if(i.length%2!=0)throw new N(b.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)c.push(Kt(e,i[g])),u.push(i[g+1]);const l=[],d=xe.empty();for(let g=c.length-1;g>=0;--g)if(!Vy(l,c[g])){const w=c[g];let C=u[g];C=q(C);const k=o.Sc(w);if(C instanceof no)l.push(w);else{const D=wr(C,k);D!=null&&(l.push(w),d.set(w,D))}}const p=new Xe(l);return new Sy(d,p,o.fieldTransforms)}function ky(n,e,t,r=!1){return wr(t,n.V(r?4:3,e))}function wr(n,e){if(Ny(n=q(n)))return sh("Unsupported field value:",e,n),Dy(n,e);if(n instanceof Fn)return(function(r,s){if(!Py(s.dataSource))throw s.Dc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Dc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.Dc("Nested arrays are not supported");return(function(r,s){const i=[];let o=0;for(const c of r){let u=wr(c,s.bc(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}})(n,e)}return(function(r,s){if((r=q(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Xg(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=ne.fromDate(r);return{timestampValue:is(s.serializer,i)}}if(r instanceof ne){const i=new ne(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:is(s.serializer,i)}}if(r instanceof ft)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Je)return{bytesValue:h_(s.serializer,r._byteString)};if(r instanceof se){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Dc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:wl(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof at)return(function(o,c){const u=o instanceof at?o.toArray():o;return{mapValue:{fields:{[hl]:{stringValue:dl},[es]:{arrayValue:{values:u.map((d=>{if(typeof d!="number")throw c.Dc("VectorValues must only contain numeric values.");return gl(c.serializer,d)}))}}}}}})(r,s);if(w_(r))return r._toProto(s.serializer);throw s.Dc(`Unsupported field value: ${Na(r)}`)})(n,e)}function Dy(n,e){const t={};return Rg(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):xn(n,((r,s)=>{const i=wr(s,e.yc(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function Ny(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ne||n instanceof ft||n instanceof Je||n instanceof se||n instanceof Fn||n instanceof at||w_(n))}function sh(n,e,t){if(!Ny(t)||!og(t)){const r=Na(t);throw r==="an object"?e.Dc(n+" a custom object"):e.Dc(n+" "+r)}}function Kt(n,e,t){if((e=q(e))instanceof Er)return e._internalPath;if(typeof e=="string")return ih(n,e);throw _a("Field path arguments must be of type string or ",n,!1,void 0,t)}const WP=new RegExp("[~\\*/\\[\\]]");function ih(n,e,t){if(e.search(WP)>=0)throw _a(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Er(...e.split("."))._internalPath}catch{throw _a(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function _a(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new N(b.INVALID_ARGUMENT,c+n+u)}function Vy(n,e){return n.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{convertValue(e,t="none"){switch(Rn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return me(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Gt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw U(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return xn(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){const t=e.fields?.[es].arrayValue?.values?.map((r=>me(r.doubleValue)));return new at(t)}convertGeoPoint(e){return new ft(me(e.latitude),me(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Fa(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Oi(e));default:return null}}convertTimestamp(e){const t=$t(e);return new ne(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=J.fromString(e);z(T_(r),9688,{name:e});const s=new An(r.get(1),r.get(3)),i=new x(r.popFirst(5));return s.isEqual(t)||ve(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un extends oh{constructor(e){super(),this.firestore=e}convertBytes(e){return new Je(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new se(this.firestore,null,t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QP(){return new no("deleteField")}function JP(){return new Xl("serverTimestamp")}function YP(...n){return new Zl("arrayUnion",n)}function XP(...n){return new eh("arrayRemove",n)}function ZP(n){return new th("increment",n)}function eC(n){return new at(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tC(n){const e=ye(Y(n.firestore,oe)),t=e._onlineComponents?.datastore.serializer;return t===void 0?null:ja(t,je(n._query)).ft}function nC(n,e){const t=Ag(e,((i,o)=>new i_(o,i.aggregateType,i._internalFieldPath))),r=ye(Y(n.firestore,oe)),s=r._onlineComponents?.datastore.serializer;return s===void 0?null:__(s,jg(n._query),t,!0).request}const mp="@firebase/firestore",gp="4.14.1";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $r(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class Oy{constructor(e,t,r){this._userDataWriter=t,this._data=r,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new xe({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new se(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new rC(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(Kt("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class rC extends qi{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xy(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new N(b.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ah{}class Cs extends ah{}function sC(n,e,...t){let r=[];e instanceof ah&&r.push(e),r=r.concat(t),(function(i){const o=i.filter((u=>u instanceof vr)).length,c=i.filter((u=>u instanceof ks)).length;if(o>1||o>0&&c>0)throw new N(b.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class ks extends Cs{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new ks(e,t,r)}_apply(e){const t=this._parse(e);return My(e._query,t),new ke(e.firestore,e.converter,yu(e._query,t))}_parse(e){const t=Tr(e.firestore);return(function(i,o,c,u,l,d,p){let g;if(l.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new N(b.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){yp(p,d);const C=[];for(const k of p)C.push(_p(u,i,k));g={arrayValue:{values:C}}}else g=_p(u,i,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||yp(p,d),g=ky(c,o,p,d==="in"||d==="not-in");return Z.create(l,d,g)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function iC(n,e,t){const r=e,s=Kt("where",n);return ks._create(s,r,t)}class vr extends ah{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new vr(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:re.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)My(o,u),o=yu(o,u)})(e._query,t),new ke(e.firestore,e.converter,yu(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function oC(...n){return n.forEach((e=>Fy("or",e))),vr._create("or",n)}function aC(...n){return n.forEach((e=>Fy("and",e))),vr._create("and",n)}class ec extends Cs{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new ec(e,t)}_apply(e){const t=(function(s,i,o){if(s.startAt!==null)throw new N(b.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new N(b.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Fi(i,o)})(e._query,this._field,this._direction);return new ke(e.firestore,e.converter,sb(e._query,t))}}function cC(n,e="asc"){const t=e,r=Kt("orderBy",n);return ec._create(r,t)}class ro extends Cs{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new ro(e,t,r)}_apply(e){return new ke(e.firestore,e.converter,ca(e._query,this._limit,this._limitType))}}function uC(n){return ag("limit",n),ro._create("limit",n,"F")}function lC(n){return ag("limitToLast",n),ro._create("limitToLast",n,"L")}class so extends Cs{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new so(e,t,r)}_apply(e){const t=Ly(e,this.type,this._docOrFields,this._inclusive);return new ke(e.firestore,e.converter,ib(e._query,t))}}function hC(...n){return so._create("startAt",n,!0)}function dC(...n){return so._create("startAfter",n,!1)}class io extends Cs{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new io(e,t,r)}_apply(e){const t=Ly(e,this.type,this._docOrFields,this._inclusive);return new ke(e.firestore,e.converter,ob(e._query,t))}}function fC(...n){return io._create("endBefore",n,!1)}function pC(...n){return io._create("endAt",n,!0)}function Ly(n,e,t,r){if(t[0]=q(t[0]),t[0]instanceof qi)return(function(i,o,c,u,l){if(!u)throw new N(b.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const d=[];for(const p of zr(i))if(p.field.isKeyField())d.push(cr(o,u.key));else{const g=u.data.field(p.field);if(Ma(g))throw new N(b.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+p.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(g===null){const w=p.field.canonicalString();throw new N(b.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${w}' (used as the orderBy) does not exist.`)}d.push(g)}return new Sn(d,l)})(n._query,n.firestore._databaseId,e,t[0]._document,r);{const s=Tr(n.firestore);return(function(o,c,u,l,d,p){const g=o.explicitOrderBy;if(d.length>g.length)throw new N(b.INVALID_ARGUMENT,`Too many arguments provided to ${l}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const w=[];for(let C=0;C<d.length;C++){const k=d[C];if(g[C].field.isKeyField()){if(typeof k!="string")throw new N(b.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${l}(), but got a ${typeof k}`);if(!pl(o)&&k.indexOf("/")!==-1)throw new N(b.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${l}() must be a plain document ID, but '${k}' contains a slash.`);const D=o.path.child(J.fromString(k));if(!x.isDocumentKey(D))throw new N(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${l}() must result in a valid document path, but '${D}' is not because it contains an odd number of segments.`);const F=new x(D);w.push(cr(c,F))}else{const D=ky(u,l,k);w.push(D)}}return new Sn(w,p)})(n._query,n.firestore._databaseId,s,e,t,r)}}function _p(n,e,t){if(typeof(t=q(t))=="string"){if(t==="")throw new N(b.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!pl(e)&&t.indexOf("/")!==-1)throw new N(b.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(J.fromString(t));if(!x.isDocumentKey(r))throw new N(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return cr(n,new x(r))}if(t instanceof se)return cr(n,t._key);throw new N(b.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Na(t)}.`)}function yp(n,e){if(!Array.isArray(n)||n.length===0)throw new N(b.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function My(n,e){const t=(function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new N(b.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new N(b.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function Fy(n,e){if(!(e instanceof ks||e instanceof vr))throw new N(b.INVALID_ARGUMENT,`Function ${n}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}function tc(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class ch extends oh{constructor(e){super(),this.firestore=e}convertBytes(e){return new Je(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new se(this.firestore,null,t)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mC(n){return new ds("sum",Kt("sum",n))}function gC(n){return new ds("avg",Kt("average",n))}function Uy(){return new ds("count")}function _C(n,e){return n instanceof ds&&e instanceof ds&&n.aggregateType===e.aggregateType&&n._internalFieldPath?.canonicalString()===e._internalFieldPath?.canonicalString()}function yC(n,e){return Yl(n.query,e.query)&&pt(n.data(),e.data())}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IC(n){return By(n,{count:Uy()})}function By(n,e){const t=Y(n.firestore,oe),r=ye(t),s=Ag(e,((i,o)=>new i_(o,i.aggregateType,i._internalFieldPath)));return EP(r,n._query,s).then((i=>(function(c,u,l){const d=new Un(c);return new Oy(u,d,l)})(t,n,i)))}class EC{constructor(e){this.kind="memory",this._onlineComponentProvider=Cn.provider,this._offlineComponentProvider=e?.garbageCollector?e.garbageCollector._offlineComponentProvider:{build:()=>new Kl(void 0)}}toJSON(){return{kind:this.kind}}}class TC{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=qy(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class wC{constructor(){this.kind="memoryEager",this._offlineComponentProvider=ls.provider}toJSON(){return{kind:this.kind}}}class vC{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new Kl(e)}}toJSON(){return{kind:this.kind}}}function AC(){return new wC}function RC(n){return new vC(n?.cacheSizeBytes)}function bC(n){return new EC(n)}function SC(n){return new TC(n)}class PC{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Cn.provider,this._offlineComponentProvider={build:t=>new Wl(t,e?.cacheSizeBytes,this.forceOwnership)}}}class CC{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Cn.provider,this._offlineComponentProvider={build:t=>new dy(t,e?.cacheSizeBytes)}}}function qy(n){return new PC(n?.forceOwnership)}function kC(){return new CC}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zy="NOT SUPPORTED";class Ft{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class et extends qi{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new wi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Kt("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new N(b.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=et._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}function DC(n,e,t){if(yr(e,et._jsonSchema)){if(e.bundle===zy)throw new N(b.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=Ir(n._databaseId),s=yy(e.bundle,r),i=s.Ju(),o=new ql(s.getMetadata(),r);for(const d of i)o.Ha(d);const c=o.documents;if(c.length!==1)throw new N(b.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${c.length} documents.`);const u=za(r,c[0].document),l=new x(J.fromString(e.bundleName));return new et(n,new ch(n),l,u,new Ft(!1,!1),t||null)}}et._jsonSchemaVersion="firestore/documentSnapshot/1.0",et._jsonSchema={type:Se("string",et._jsonSchemaVersion),bundleSource:Se("string","DocumentSnapshot"),bundleName:Se("string"),bundle:Se("string")};class wi extends et{data(e={}){return super.data(e)}}class tt{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Ft(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new wi(this._firestore,this._userDataWriter,r.key,r,new Ft(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new N(b.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{const u=new wi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Ft(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new wi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Ft(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let l=-1,d=-1;return c.type!==0&&(l=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),d=o.indexOf(c.doc.key)),{type:VC(c.type),doc:u,oldIndex:l,newIndex:d}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new N(b.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=tt._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Da.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function NC(n,e,t){if(yr(e,tt._jsonSchema)){if(e.bundle===zy)throw new N(b.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=Ir(n._databaseId),s=yy(e.bundle,r),i=s.Ju(),o=new ql(s.getMetadata(),r);for(const g of i)o.Ha(g);if(o.queries.length!==1)throw new N(b.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${o.queries.length} queries.`);const c=$a(o.queries[0].bundledQuery),u=o.documents;let l=new ir;u.map((g=>{const w=za(r,g.document);l=l.add(w)}));const d=pr.fromInitialDocuments(c,l,K(),!1,!1),p=new ke(n,t||null,c);return new tt(n,new ch(n),p,d)}}function VC(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return U(61501,{type:n})}}function OC(n,e){return n instanceof et&&e instanceof et?n._firestore===e._firestore&&n._key.isEqual(e._key)&&(n._document===null?e._document===null:n._document.isEqual(e._document))&&n._converter===e._converter:n instanceof tt&&e instanceof tt&&n._firestore===e._firestore&&Yl(n.query,e.query)&&n.metadata.isEqual(e.metadata)&&n._snapshot.isEqual(e._snapshot)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */tt._jsonSchemaVersion="firestore/querySnapshot/1.0",tt._jsonSchema={type:Se("string",tt._jsonSchemaVersion),bundleSource:Se("string","QuerySnapshot"),bundleName:Se("string"),bundle:Se("string")};const xC={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jy{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Tr(e)}set(e,t,r){this._verifyNotCommitted();const s=mn(e,this._firestore),i=tc(s.converter,t,r),o=Za(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,r);return this._mutations.push(o.toMutation(s._key,_e.none())),this}update(e,t,r,...s){this._verifyNotCommitted();const i=mn(e,this._firestore);let o;return o=typeof(t=q(t))=="string"||t instanceof Er?rh(this._dataReader,"WriteBatch.update",i._key,t,r,s):nh(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(o.toMutation(i._key,_e.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=mn(e,this._firestore);return this._mutations=this._mutations.concat(new ws(t._key,_e.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new N(b.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function mn(n,e){if((n=q(n)).firestore!==e)throw new N(b.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LC{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=Tr(e)}get(e){const t=mn(e,this._firestore),r=new ch(this._firestore);return this._transaction.lookup([t._key]).then((s=>{if(!s||s.length!==1)return U(24041);const i=s[0];if(i.isFoundDocument())return new qi(this._firestore,r,i.key,i,t.converter);if(i.isNoDocument())return new qi(this._firestore,r,t._key,null,t.converter);throw U(18433,{doc:i})}))}set(e,t,r){const s=mn(e,this._firestore),i=tc(s.converter,t,r),o=Za(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,o),this}update(e,t,r,...s){const i=mn(e,this._firestore);let o;return o=typeof(t=q(t))=="string"||t instanceof Er?rh(this._dataReader,"Transaction.update",i._key,t,r,s):nh(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,o),this}delete(e){const t=mn(e,this._firestore);return this._transaction.delete(t._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $y extends LC{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=mn(e,this._firestore),r=new Un(this._firestore);return super.get(e).then((s=>new et(this._firestore,r,t._key,s._document,new Ft(!1,!1),t.converter)))}}function MC(n,e,t){n=Y(n,oe);const r={...xC,...t};(function(o){if(o.maxAttempts<1)throw new N(b.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r);const s=ye(n);return vP(s,(i=>e(new $y(n,i))),r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FC(n){n=Y(n,se);const e=Y(n.firestore,oe),t=ye(e);return gy(t,n._key).then((r=>uh(e,n,r)))}function UC(n){n=Y(n,se);const e=Y(n.firestore,oe),t=ye(e),r=new Un(e);return yP(t,n._key).then((s=>new et(e,r,n._key,s,new Ft(s!==null&&s.hasLocalMutations,!0),n.converter)))}function BC(n){n=Y(n,se);const e=Y(n.firestore,oe),t=ye(e);return gy(t,n._key,{source:"server"}).then((r=>uh(e,n,r)))}function qC(n){n=Y(n,ke);const e=Y(n.firestore,oe),t=ye(e),r=new Un(e);return xy(n._query),_y(t,n._query).then((s=>new tt(e,r,n,s)))}function zC(n){n=Y(n,ke);const e=Y(n.firestore,oe),t=ye(e),r=new Un(e);return IP(t,n._query).then((s=>new tt(e,r,n,s)))}function jC(n){n=Y(n,ke);const e=Y(n.firestore,oe),t=ye(e),r=new Un(e);return _y(t,n._query,{source:"server"}).then((s=>new tt(e,r,n,s)))}function $C(n,e,t){n=Y(n,se);const r=Y(n.firestore,oe),s=tc(n.converter,e,t),i=Tr(r);return Ds(r,[Za(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,_e.none())])}function GC(n,e,t,...r){n=Y(n,se);const s=Y(n.firestore,oe),i=Tr(s);let o;return o=typeof(e=q(e))=="string"||e instanceof Er?rh(i,"updateDoc",n._key,e,t,r):nh(i,"updateDoc",n._key,e),Ds(s,[o.toMutation(n._key,_e.exists(!0))])}function HC(n){return Ds(Y(n.firestore,oe),[new ws(n._key,_e.none())])}function KC(n,e){const t=Y(n.firestore,oe),r=wy(n),s=tc(n.converter,e),i=Tr(n.firestore);return Ds(t,[Za(i,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,_e.exists(!1))]).then((()=>r))}function Ou(n,...e){n=q(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||$r(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if($r(e[r])){const l=e[r];e[r]=l.next?.bind(l),e[r+1]=l.error?.bind(l),e[r+2]=l.complete?.bind(l)}let i,o,c;if(n instanceof se)o=Y(n.firestore,oe),c=Es(n._key.path),i={next:l=>{e[r]&&e[r](uh(o,n,l))},error:e[r+1],complete:e[r+2]};else{const l=Y(n,ke);o=Y(l.firestore,oe),c=l._query;const d=new Un(o);i={next:p=>{e[r]&&e[r](new tt(o,d,l,p))},error:e[r+1],complete:e[r+2]},xy(n._query)}const u=ye(o);return _P(u,c,s,i)}function WC(n,e,...t){const r=q(n),s=(function(u){const l={bundle:"",bundleName:"",bundleSource:""},d=["bundle","bundleName","bundleSource"];for(const p of d){if(!(p in u)){l.error=`snapshotJson missing required field: ${p}`;break}const g=u[p];if(typeof g!="string"){l.error=`snapshotJson field '${p}' must be a string.`;break}if(g.length===0){l.error=`snapshotJson field '${p}' cannot be an empty string.`;break}p==="bundle"?l.bundle=g:p==="bundleName"?l.bundleName=g:p==="bundleSource"&&(l.bundleSource=g)}return l})(e);if(s.error)throw new N(b.INVALID_ARGUMENT,s.error);let i,o=0;if(typeof t[o]!="object"||$r(t[o])||(i=t[o++]),s.bundleSource==="QuerySnapshot"){let c=null;if(typeof t[o]=="object"&&$r(t[o])){const u=t[o++];c={next:u.next,error:u.error,complete:u.complete}}else c={next:t[o++],error:t[o++],complete:t[o++]};return(function(l,d,p,g,w){let C,k=!1;return Vu(l,d.bundle).then((()=>by(l,d.bundleName))).then((F=>{F&&!k&&(w&&F.withConverter(w),C=Ou(F,p||{},g))})).catch((F=>(g.error&&g.error(F),()=>{}))),()=>{k||(k=!0,C&&C())}})(r,s,i,c,t[o])}if(s.bundleSource==="DocumentSnapshot"){let c=null;if(typeof t[o]=="object"&&$r(t[o])){const u=t[o++];c={next:u.next,error:u.error,complete:u.complete}}else c={next:t[o++],error:t[o++],complete:t[o++]};return(function(l,d,p,g,w){let C,k=!1;return Vu(l,d.bundle).then((()=>{if(!k){const F=new se(l,w||null,x.fromPath(d.bundleName));C=Ou(F,p||{},g)}})).catch((F=>(g.error&&g.error(F),()=>{}))),()=>{k||(k=!0,C&&C())}})(r,s,i,c,t[o])}throw new N(b.INVALID_ARGUMENT,`unsupported bundle source: ${s.bundleSource}`)}function QC(n,e){n=Y(n,oe);const t=ye(n),r=$r(e)?e:{next:e};return wP(t,r)}function Ds(n,e){const t=ye(n);return TP(t,e)}function uh(n,e,t){const r=t.docs.get(e._key),s=new Un(n);return new et(n,s,e._key,r,new Ft(t.hasPendingWrites,t.fromCache),e.converter)}function JC(n){return n=Y(n,oe),ye(n),new jy(n,(e=>Ds(n,e)))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YC(n,e){n=Y(n,oe);const t=ye(n);if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return rt("Cannot enable indexes when persistence is disabled"),Promise.resolve();const r=(function(i){const o=typeof i=="string"?(function(l){try{return JSON.parse(l)}catch(d){throw new N(b.INVALID_ARGUMENT,"Failed to parse JSON: "+d?.message)}})(i):i,c=[];if(Array.isArray(o.indexes))for(const u of o.indexes){const l=Ip(u,"collectionGroup"),d=[];if(Array.isArray(u.fields))for(const p of u.fields){const g=Ip(p,"fieldPath"),w=ih("setIndexConfiguration",g);p.arrayConfig==="CONTAINS"?d.push(new rr(w,2)):p.order==="ASCENDING"?d.push(new rr(w,0)):p.order==="DESCENDING"&&d.push(new rr(w,1))}c.push(new Wr(Wr.UNKNOWN_ID,l,d,Qr.empty()))}return c})(e);return bP(t,r)}function Ip(n,e){if(typeof n[e]!="string")throw new N(b.INVALID_ARGUMENT,"Missing string value for: "+e);return n[e]}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gy{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function XC(n){n=Y(n,oe);const e=Ep.get(n);if(e)return e;if(ye(n)._uninitializedComponentsProvider?._offline.kind!=="persistent")return null;const r=new Gy(n);return Ep.set(n,r),r}function ZC(n){Hy(n,!0)}function ek(n){Hy(n,!1)}function tk(n){const e=ye(n._firestore);PP(e).then((t=>V("deleting all persistent cache indexes succeeded"))).catch((t=>rt("deleting all persistent cache indexes failed",t)))}function Hy(n,e){const t=ye(n._firestore);SP(t,e).then((r=>V(`setting persistent cache index auto creation isEnabled=${e} succeeded`))).catch((r=>rt(`setting persistent cache index auto creation isEnabled=${e} failed`,r)))}const Ep=new WeakMap;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nk{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return lh.instance.onExistenceFilterMismatch(e)}}class lh{constructor(){this.t=new Map}static get instance(){return No||(No=new lh,Ib(No)),No}o(e){this.t.forEach((t=>t(e)))}onExistenceFilterMismatch(e){const t=Symbol(),r=this.t;return r.set(t,e),()=>r.delete(t)}}let No=null;(function(e,t=!0){XA(gr),ar(new wn("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new oe(new nR(r.getProvider("auth-internal")),new iR(o,r.getProvider("app-check-internal")),HR(o,s),o);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),At(mp,gp,e),At(mp,gp,"esm2020")})();const wD=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:oh,AggregateField:ds,AggregateQuerySnapshot:Oy,Bytes:Je,CACHE_SIZE_UNLIMITED:OP,CollectionReference:dt,DocumentReference:se,DocumentSnapshot:et,FieldPath:Er,FieldValue:Fn,Firestore:oe,FirestoreError:N,GeoPoint:ft,LoadBundleTask:vy,PersistentCacheIndexManager:Gy,Query:ke,QueryCompositeFilterConstraint:vr,QueryConstraint:Cs,QueryDocumentSnapshot:wi,QueryEndAtConstraint:io,QueryFieldFilterConstraint:ks,QueryLimitConstraint:ro,QueryOrderByConstraint:ec,QuerySnapshot:tt,QueryStartAtConstraint:so,SnapshotMetadata:Ft,Timestamp:ne,Transaction:$y,VectorValue:at,WriteBatch:jy,_AutoId:Da,_ByteString:Ie,_DatabaseId:An,_DocumentKey:x,_EmptyAppCheckTokenProvider:oR,_EmptyAuthCredentialsProvider:rg,_FieldPath:he,_TestingHooks:nk,_cast:Y,_debugAssert:eR,_internalAggregationQueryToProtoRunAggregationQueryRequest:nC,_internalQueryToProtoQueryTarget:tC,_isBase64Available:jR,_logWarn:rt,_validateIsNotUsedTogether:ig,addDoc:KC,aggregateFieldEqual:_C,aggregateQuerySnapshotEqual:yC,and:aC,arrayRemove:XP,arrayUnion:YP,average:gC,clearIndexedDbPersistence:UP,collection:DP,collectionGroup:NP,connectFirestoreEmulator:Ty,count:Uy,deleteAllPersistentCacheIndexes:tk,deleteDoc:HC,deleteField:QP,disableNetwork:zP,disablePersistentCacheIndexAutoCreation:ek,doc:wy,documentId:$P,documentSnapshotFromJSON:DC,enableIndexedDbPersistence:MP,enableMultiTabIndexedDbPersistence:FP,enableNetwork:qP,enablePersistentCacheIndexAutoCreation:ZC,endAt:pC,endBefore:fC,ensureFirestoreConfigured:ye,executeWrite:Ds,getAggregateFromServer:By,getCountFromServer:IC,getDoc:FC,getDocFromCache:UC,getDocFromServer:BC,getDocs:qC,getDocsFromCache:zC,getDocsFromServer:jC,getFirestore:LP,getPersistentCacheIndexManager:XC,increment:ZP,initializeFirestore:xP,limit:uC,limitToLast:lC,loadBundle:Vu,memoryEagerGarbageCollector:AC,memoryLocalCache:bC,memoryLruGarbageCollector:RC,namedQuery:by,onSnapshot:Ou,onSnapshotResume:WC,onSnapshotsInSync:QC,or:oC,orderBy:cC,persistentLocalCache:SC,persistentMultipleTabManager:kC,persistentSingleTabManager:qy,query:sC,queryEqual:Yl,querySnapshotFromJSON:NC,refEqual:VP,runTransaction:MC,serverTimestamp:JP,setDoc:$C,setIndexConfiguration:YC,setLogLevel:ZA,snapshotEqual:OC,startAfter:dC,startAt:hC,sum:mC,terminate:jP,updateDoc:GC,vector:eC,waitForPendingWrites:BP,where:iC,writeBatch:JC},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ky="firebasestorage.googleapis.com",Wy="storageBucket",rk=120*1e3,sk=600*1e3,ik=1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee extends kt{constructor(e,t,r=0){super(Wc(e),`Firebase Storage: ${t} (${Wc(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Ee.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Wc(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var de;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(de||(de={}));function Wc(n){return"storage/"+n}function hh(){const n="An unknown error occurred, please check the error payload for server response.";return new Ee(de.UNKNOWN,n)}function ok(n){return new Ee(de.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function ak(n){return new Ee(de.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function ck(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Ee(de.UNAUTHENTICATED,n)}function uk(){return new Ee(de.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function lk(n){return new Ee(de.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function Qy(){return new Ee(de.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Jy(){return new Ee(de.CANCELED,"User canceled the upload/download.")}function hk(n){return new Ee(de.INVALID_URL,"Invalid URL '"+n+"'.")}function dk(n){return new Ee(de.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function fk(){return new Ee(de.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Wy+"' property when initializing the app?")}function Yy(){return new Ee(de.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function pk(){return new Ee(de.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function mk(){return new Ee(de.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function gk(n){return new Ee(de.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function xu(n){return new Ee(de.INVALID_ARGUMENT,n)}function Xy(){return new Ee(de.APP_DELETED,"The Firebase app was deleted.")}function _k(n){return new Ee(de.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function vi(n,e){return new Ee(de.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function ni(n){throw new Ee(de.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=ot.makeFromUrl(e,t)}catch{return new ot(e,"")}if(r.path==="")return r;throw dk(e)}static makeFromUrl(e,t){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(H){H.path.charAt(H.path.length-1)==="/"&&(H.path_=H.path_.slice(0,-1))}const o="(/(.*))?$",c=new RegExp("^gs://"+s+o,"i"),u={bucket:1,path:3};function l(H){H.path_=decodeURIComponent(H.path)}const d="v[A-Za-z0-9_]+",p=t.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",w=new RegExp(`^https?://${p}/${d}/b/${s}/o${g}`,"i"),C={bucket:1,path:3},k=t===Ky?"(?:storage.googleapis.com|storage.cloud.google.com)":t,D="([^?#]*)",F=new RegExp(`^https?://${k}/${s}/${D}`,"i"),B=[{regex:c,indices:u,postModify:i},{regex:w,indices:C,postModify:l},{regex:F,indices:{bucket:1,path:2},postModify:l}];for(let H=0;H<B.length;H++){const ee=B[H],W=ee.regex.exec(e);if(W){const E=W[ee.indices.bucket];let _=W[ee.indices.path];_||(_=""),r=new ot(E,_),ee.postModify(r);break}}if(r==null)throw hk(e);return r}}class yk{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ik(n,e,t){let r=1,s=null,i=null,o=!1,c=0;function u(){return c===2}let l=!1;function d(...D){l||(l=!0,e.apply(null,D))}function p(D){s=setTimeout(()=>{s=null,n(w,u())},D)}function g(){i&&clearTimeout(i)}function w(D,...F){if(l){g();return}if(D){g(),d.call(null,D,...F);return}if(u()||o){g(),d.call(null,D,...F);return}r<64&&(r*=2);let B;c===1?(c=2,B=0):B=(r+Math.random())*1e3,p(B)}let C=!1;function k(D){C||(C=!0,g(),!l&&(s!==null?(D||(c=2),clearTimeout(s),p(0)):D||(c=1)))}return p(0),i=setTimeout(()=>{o=!0,k(!0)},t),k}function Ek(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tk(n){return n!==void 0}function wk(n){return typeof n=="function"}function vk(n){return typeof n=="object"&&!Array.isArray(n)}function nc(n){return typeof n=="string"||n instanceof String}function Tp(n){return dh()&&n instanceof Blob}function dh(){return typeof Blob<"u"}function wp(n,e,t,r){if(r<e)throw xu(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw xu(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ns(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function Zy(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const s=e(r)+"="+e(n[r]);t=t+s+"&"}return t=t.slice(0,-1),t}var or;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(or||(or={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eI(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,i=e.indexOf(n)!==-1;return t||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ak{constructor(e,t,r,s,i,o,c,u,l,d,p,g=!0,w=!1){this.url_=e,this.method_=t,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=c,this.errorCallback_=u,this.timeout_=l,this.progressCallback_=d,this.connectionFactory_=p,this.retry=g,this.isUsingEmulator=w,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((C,k)=>{this.resolve_=C,this.reject_=k,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new Vo(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=c=>{const u=c.loaded,l=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,l)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const c=i.getErrorCode()===or.NO_ERROR,u=i.getStatus();if(!c||eI(u,this.additionalRetryCodes_)&&this.retry){const d=i.getErrorCode()===or.ABORT;r(!1,new Vo(!1,null,d));return}const l=this.successCodes_.indexOf(u)!==-1;r(!0,new Vo(l,i))})},t=(r,s)=>{const i=this.resolve_,o=this.reject_,c=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(c,c.getResponse());Tk(u)?i(u):i()}catch(u){o(u)}else if(c!==null){const u=hh();u.serverResponse=c.getErrorText(),this.errorCallback_?o(this.errorCallback_(c,u)):o(u)}else if(s.canceled){const u=this.appDelete_?Xy():Jy();o(u)}else{const u=Qy();o(u)}};this.canceled_?t(!1,new Vo(!1,null,!0)):this.backoffId_=Ik(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&Ek(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Vo{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function Rk(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function bk(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function Sk(n,e){e&&(n["X-Firebase-GMPID"]=e)}function Pk(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function Ck(n,e,t,r,s,i,o=!0,c=!1){const u=Zy(n.urlParams),l=n.url+u,d=Object.assign({},n.headers);return Sk(d,e),Rk(d,t),bk(d,i),Pk(d,r),new Ak(l,n.method,d,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,o,c)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kk(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Dk(...n){const e=kk();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(dh())return new Blob(n);throw new Ee(de.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function Nk(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vk(n){if(typeof atob>"u")throw gk("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Qc{constructor(e,t){this.data=e,this.contentType=t||null}}function Ok(n,e){switch(n){case vt.RAW:return new Qc(tI(e));case vt.BASE64:case vt.BASE64URL:return new Qc(nI(n,e));case vt.DATA_URL:return new Qc(Lk(e),Mk(e))}throw hh()}function tI(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const i=r,o=n.charCodeAt(++t);r=65536|(i&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function xk(n){let e;try{e=decodeURIComponent(n)}catch{throw vi(vt.DATA_URL,"Malformed data URL.")}return tI(e)}function nI(n,e){switch(n){case vt.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw vi(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case vt.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw vi(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=Vk(e)}catch(s){throw s.message.includes("polyfill")?s:vi(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}class rI{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw vi(vt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=Fk(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function Lk(n){const e=new rI(n);return e.base64?nI(vt.BASE64,e.rest):xk(e.rest)}function Mk(n){return new rI(n).contentType}function Fk(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(e,t){let r=0,s="";Tp(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(Tp(this.data_)){const r=this.data_,s=Nk(r,e,t);return s===null?null:new xt(s)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new xt(r,!0)}}static getBlob(...e){if(dh()){const t=e.map(r=>r instanceof xt?r.data_:r);return new xt(Dk.apply(null,t))}else{const t=e.map(o=>nc(o)?Ok(vt.RAW,o).data:o.data_);let r=0;t.forEach(o=>{r+=o.byteLength});const s=new Uint8Array(r);let i=0;return t.forEach(o=>{for(let c=0;c<o.length;c++)s[i++]=o[c]}),new xt(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sI(n){let e;try{e=JSON.parse(n)}catch{return null}return vk(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uk(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function Bk(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function iI(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qk(n,e){return e}class He{constructor(e,t,r,s){this.server=e,this.local=t||e,this.writable=!!r,this.xform=s||qk}}let Oo=null;function zk(n){return!nc(n)||n.length<2?n:iI(n)}function fh(){if(Oo)return Oo;const n=[];n.push(new He("bucket")),n.push(new He("generation")),n.push(new He("metageneration")),n.push(new He("name","fullPath",!0));function e(i,o){return zk(o)}const t=new He("name");t.xform=e,n.push(t);function r(i,o){return o!==void 0?Number(o):o}const s=new He("size");return s.xform=r,n.push(s),n.push(new He("timeCreated")),n.push(new He("updated")),n.push(new He("md5Hash",null,!0)),n.push(new He("cacheControl",null,!0)),n.push(new He("contentDisposition",null,!0)),n.push(new He("contentEncoding",null,!0)),n.push(new He("contentLanguage",null,!0)),n.push(new He("contentType",null,!0)),n.push(new He("metadata","customMetadata",!0)),Oo=n,Oo}function jk(n,e){function t(){const r=n.bucket,s=n.fullPath,i=new ot(r,s);return e._makeStorageReference(i)}Object.defineProperty(n,"ref",{get:t})}function $k(n,e,t){const r={};r.type="file";const s=t.length;for(let i=0;i<s;i++){const o=t[i];r[o.local]=o.xform(r,e[o.server])}return jk(r,n),r}function oI(n,e,t){const r=sI(e);return r===null?null:$k(n,r,t)}function Gk(n,e,t,r){const s=sI(e);if(s===null||!nc(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(l=>{const d=n.bucket,p=n.fullPath,g="/b/"+o(d)+"/o/"+o(p),w=Ns(g,t,r),C=Zy({alt:"media",token:l});return w+C})[0]}function aI(n,e){const t={},r=e.length;for(let s=0;s<r;s++){const i=e[s];i.writable&&(t[i.server]=n[i.local])}return JSON.stringify(t)}class Ar{constructor(e,t,r,s){this.url=e,this.method=t,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bt(n){if(!n)throw hh()}function ph(n,e){function t(r,s){const i=oI(n,s,e);return Bt(i!==null),i}return t}function Hk(n,e){function t(r,s){const i=oI(n,s,e);return Bt(i!==null),Gk(i,s,n.host,n._protocol)}return t}function oo(n){function e(t,r){let s;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?s=uk():s=ck():t.getStatus()===402?s=ak(n.bucket):t.getStatus()===403?s=lk(n.path):s=r,s.status=t.getStatus(),s.serverResponse=r.serverResponse,s}return e}function mh(n){const e=oo(n);function t(r,s){let i=e(r,s);return r.getStatus()===404&&(i=ok(n.path)),i.serverResponse=s.serverResponse,i}return t}function Kk(n,e,t){const r=e.fullServerUrl(),s=Ns(r,n.host,n._protocol),i="GET",o=n.maxOperationRetryTime,c=new Ar(s,i,ph(n,t),o);return c.errorHandler=mh(e),c}function Wk(n,e,t){const r=e.fullServerUrl(),s=Ns(r,n.host,n._protocol),i="GET",o=n.maxOperationRetryTime,c=new Ar(s,i,Hk(n,t),o);return c.errorHandler=mh(e),c}function Qk(n,e){const t=e.fullServerUrl(),r=Ns(t,n.host,n._protocol),s="DELETE",i=n.maxOperationRetryTime;function o(u,l){}const c=new Ar(r,s,o,i);return c.successCodes=[200,204],c.errorHandler=mh(e),c}function Jk(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function cI(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=Jk(null,e)),r}function uI(n,e,t,r,s){const i=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function c(){let B="";for(let H=0;H<2;H++)B=B+Math.random().toString().slice(2);return B}const u=c();o["Content-Type"]="multipart/related; boundary="+u;const l=cI(e,r,s),d=aI(l,t),p="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+d+`\r
--`+u+`\r
Content-Type: `+l.contentType+`\r
\r
`,g=`\r
--`+u+"--",w=xt.getBlob(p,r,g);if(w===null)throw Yy();const C={name:l.fullPath},k=Ns(i,n.host,n._protocol),D="POST",F=n.maxUploadRetryTime,j=new Ar(k,D,ph(n,t),F);return j.urlParams=C,j.headers=o,j.body=w.uploadData(),j.errorHandler=oo(e),j}class ya{constructor(e,t,r,s){this.current=e,this.total=t,this.finalized=!!r,this.metadata=s||null}}function gh(n,e){let t=null;try{t=n.getResponseHeader("X-Goog-Upload-Status")}catch{Bt(!1)}return Bt(!!t&&(e||["active"]).indexOf(t)!==-1),t}function Yk(n,e,t,r,s){const i=e.bucketOnlyServerUrl(),o=cI(e,r,s),c={name:o.fullPath},u=Ns(i,n.host,n._protocol),l="POST",d={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${r.size()}`,"X-Goog-Upload-Header-Content-Type":o.contentType,"Content-Type":"application/json; charset=utf-8"},p=aI(o,t),g=n.maxUploadRetryTime;function w(k){gh(k);let D;try{D=k.getResponseHeader("X-Goog-Upload-URL")}catch{Bt(!1)}return Bt(nc(D)),D}const C=new Ar(u,l,w,g);return C.urlParams=c,C.headers=d,C.body=p,C.errorHandler=oo(e),C}function Xk(n,e,t,r){const s={"X-Goog-Upload-Command":"query"};function i(l){const d=gh(l,["active","final"]);let p=null;try{p=l.getResponseHeader("X-Goog-Upload-Size-Received")}catch{Bt(!1)}p||Bt(!1);const g=Number(p);return Bt(!isNaN(g)),new ya(g,r.size(),d==="final")}const o="POST",c=n.maxUploadRetryTime,u=new Ar(t,o,i,c);return u.headers=s,u.errorHandler=oo(e),u}const vp=256*1024;function Zk(n,e,t,r,s,i,o,c){const u=new ya(0,0);if(o?(u.current=o.current,u.total=o.total):(u.current=0,u.total=r.size()),r.size()!==u.total)throw pk();const l=u.total-u.current;let d=l;s>0&&(d=Math.min(d,s));const p=u.current,g=p+d;let w="";d===0?w="finalize":l===d?w="upload, finalize":w="upload";const C={"X-Goog-Upload-Command":w,"X-Goog-Upload-Offset":`${u.current}`},k=r.slice(p,g);if(k===null)throw Yy();function D(H,ee){const W=gh(H,["active","final"]),E=u.current+d,_=r.size();let I;return W==="final"?I=ph(e,i)(H,ee):I=null,new ya(E,_,W==="final",I)}const F="POST",j=e.maxUploadRetryTime,B=new Ar(t,F,D,j);return B.headers=C,B.body=k.uploadData(),B.progressCallback=c||null,B.errorHandler=oo(n),B}const Qe={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function Jc(n){switch(n){case"running":case"pausing":case"canceling":return Qe.RUNNING;case"paused":return Qe.PAUSED;case"success":return Qe.SUCCESS;case"canceled":return Qe.CANCELED;case"error":return Qe.ERROR;default:return Qe.ERROR}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eD{constructor(e,t,r){if(wk(e)||t!=null||r!=null)this.next=e,this.error=t??void 0,this.complete=r??void 0;else{const i=e;this.next=i.next,this.error=i.error,this.complete=i.complete}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Or(n){return(...e)=>{Promise.resolve().then(()=>n(...e))}}class tD{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=or.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=or.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=or.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,s,i){if(this.sent_)throw ni("cannot .send() more than once");if(Dn(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),i!==void 0)for(const o in i)i.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,i[o].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw ni("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw ni("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw ni("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw ni("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class nD extends tD{initXhr(){this.xhr_.responseType="text"}}function fn(){return new nD}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rD{isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}constructor(e,t,r=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=r,this._mappings=fh(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=s=>{if(this._request=void 0,this._chunkMultiplier=1,s._codeEquals(de.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const i=this.isExponentialBackoffExpired();if(eI(s.status,[]))if(i)s=Qy();else{this.sleepTime=Math.max(this.sleepTime*2,ik),this._needToFetchStatus=!0,this.completeTransitions_();return}this._error=s,this._transition("error")}},this._metadataErrorHandler=s=>{this._request=void 0,s._codeEquals(de.CANCELED)?this.completeTransitions_():(this._error=s,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((s,i)=>{this._resolve=s,this._reject=i,this._start()}),this._promise.then(null,()=>{})}_makeProgressCallback(){const e=this._transferred;return t=>this._updateProgress(e+t)}_shouldDoResumable(e){return e.size()>256*1024}_start(){this._state==="running"&&this._request===void 0&&(this._resumable?this._uploadUrl===void 0?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([t,r])=>{switch(this._state){case"running":e(t,r);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused");break}})}_createResumable(){this._resolveToken((e,t)=>{const r=Yk(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(r,fn,e,t);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._uploadUrl=i,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){const e=this._uploadUrl;this._resolveToken((t,r)=>{const s=Xk(this._ref.storage,this._ref._location,e,this._blob),i=this._ref.storage._makeRequest(s,fn,t,r);this._request=i,i.getPromise().then(o=>{o=o,this._request=void 0,this._updateProgress(o.current),this._needToFetchStatus=!1,o.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){const e=vp*this._chunkMultiplier,t=new ya(this._transferred,this._blob.size()),r=this._uploadUrl;this._resolveToken((s,i)=>{let o;try{o=Zk(this._ref._location,this._ref.storage,r,this._blob,e,this._mappings,t,this._makeProgressCallback())}catch(u){this._error=u,this._transition("error");return}const c=this._ref.storage._makeRequest(o,fn,s,i,!1);this._request=c,c.getPromise().then(u=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(u.current),u.finalized?(this._metadata=u.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){vp*this._chunkMultiplier*2<32*1024*1024&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e,t)=>{const r=Kk(this._ref.storage,this._ref._location,this._mappings),s=this._ref.storage._makeRequest(r,fn,e,t);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._metadata=i,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((e,t)=>{const r=uI(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(r,fn,e,t);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._metadata=i,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(e){const t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,this._request!==void 0?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const t=this._state==="paused";this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":this._state=e,this._notifyObservers();break;case"canceled":this._error=Jy(),this._state=e,this._notifyObservers();break;case"error":this._state=e,this._notifyObservers();break;case"success":this._state=e,this._notifyObservers();break}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}}get snapshot(){const e=Jc(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,t,r,s){const i=new eD(t||void 0,r||void 0,s||void 0);return this._addObserver(i),()=>{this._removeObserver(i)}}then(e,t){return this._promise.then(e,t)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){const t=this._observers.indexOf(e);t!==-1&&this._observers.splice(t,1)}_notifyObservers(){this._finishPromise(),this._observers.slice().forEach(t=>{this._notifyObserver(t)})}_finishPromise(){if(this._resolve!==void 0){let e=!0;switch(Jc(this._state)){case Qe.SUCCESS:Or(this._resolve.bind(null,this.snapshot))();break;case Qe.CANCELED:case Qe.ERROR:const t=this._reject;Or(t.bind(null,this._error))();break;default:e=!1;break}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(Jc(this._state)){case Qe.RUNNING:case Qe.PAUSED:e.next&&Or(e.next.bind(e,this.snapshot))();break;case Qe.SUCCESS:e.complete&&Or(e.complete.bind(e))();break;case Qe.CANCELED:case Qe.ERROR:e.error&&Or(e.error.bind(e,this._error))();break;default:e.error&&Or(e.error.bind(e,this._error))()}}resume(){const e=this._state==="paused"||this._state==="pausing";return e&&this._transition("running"),e}pause(){const e=this._state==="running";return e&&this._transition("pausing"),e}cancel(){const e=this._state==="running"||this._state==="pausing";return e&&this._transition("canceling"),e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr{constructor(e,t){this._service=e,t instanceof ot?this._location=t:this._location=ot.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new mr(e,t)}get root(){const e=new ot(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return iI(this._location.path)}get storage(){return this._service}get parent(){const e=Uk(this._location.path);if(e===null)return null;const t=new ot(this._location.bucket,e);return new mr(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw _k(e)}}function sD(n,e,t){n._throwIfRoot("uploadBytes");const r=uI(n.storage,n._location,fh(),new xt(e,!0),t);return n.storage.makeRequestWithTokens(r,fn).then(s=>({metadata:s,ref:n}))}function iD(n,e,t){return n._throwIfRoot("uploadBytesResumable"),new rD(n,new xt(e),t)}function oD(n){n._throwIfRoot("getDownloadURL");const e=Wk(n.storage,n._location,fh());return n.storage.makeRequestWithTokens(e,fn).then(t=>{if(t===null)throw mk();return t})}function aD(n){n._throwIfRoot("deleteObject");const e=Qk(n.storage,n._location);return n.storage.makeRequestWithTokens(e,fn)}function cD(n,e){const t=Bk(n._location.path,e),r=new ot(n._location.bucket,t);return new mr(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uD(n){return/^[A-Za-z]+:\/\//.test(n)}function lD(n,e){return new mr(n,e)}function lI(n,e){if(n instanceof _h){const t=n;if(t._bucket==null)throw fk();const r=new mr(t,t._bucket);return e!=null?lI(r,e):r}else return e!==void 0?cD(n,e):n}function hD(n,e){if(e&&uD(e)){if(n instanceof _h)return lD(n,e);throw xu("To use ref(service, url), the first argument must be a Storage instance.")}else return lI(n,e)}function Ap(n,e){const t=e?.[Wy];return t==null?null:ot.makeFromBucketSpec(t,n)}function dD(n,e,t,r={}){n.host=`${e}:${t}`;const s=Dn(e);s&&Ea(`https://${n.host}/b`),n._isUsingEmulator=!0,n._protocol=s?"https":"http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:xp(i,n.app.options.projectId))}class _h{constructor(e,t,r,s,i,o=!1){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._isUsingEmulator=o,this._bucket=null,this._host=Ky,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=rk,this._maxUploadRetryTime=sk,this._requests=new Set,s!=null?this._bucket=ot.makeFromBucketSpec(s,this._host):this._bucket=Ap(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=ot.makeFromBucketSpec(this._url,e):this._bucket=Ap(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){wp("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){wp("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(ge(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new mr(this,e)}_makeRequest(e,t,r,s,i=!0){if(this._deleted)return new yk(Xy());{const o=Ck(e,this._appId,r,s,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,s).getPromise()}}const Rp="@firebase/storage",bp="0.14.3";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hI="storage";function vD(n,e,t){return n=q(n),sD(n,e,t)}function AD(n,e,t){return n=q(n),iD(n,e,t)}function RD(n){return n=q(n),oD(n)}function bD(n){return n=q(n),aD(n)}function SD(n,e){return n=q(n),hD(n,e)}function PD(n=Fu(),e){n=q(n);const r=ps(n,hI).getImmediate({identifier:e}),s=Np("storage");return s&&fD(r,...s),r}function fD(n,e,t,r={}){dD(n,e,t,r)}function pD(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new _h(t,r,s,e,gr)}function mD(){ar(new wn(hI,pD,"PUBLIC").setMultipleInstances(!0)),At(Rp,bp,""),At(Rp,bp,"esm2020")}mD();var gD="firebase",_D="12.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */At(gD,_D,"app");export{GC as $,xP as A,uC as B,vm as C,Kv as D,Nn as E,Dt as F,Nt as G,lv as H,Ou as I,cC as J,sC as K,Am as L,tA as M,SD as N,di as O,Qw as P,Fw as Q,$v as R,JP as S,ne as T,$C as U,av as V,Mw as W,jw as X,eA as Y,aA as Z,fv as _,KC as a,Zw as a0,ev as a1,Xw as a2,vD as a3,AD as a4,Jw as a5,iC as a6,JC as a7,XP as b,YP as c,Nm as d,Yu as e,DP as f,Uw as g,zw as h,HC as i,QP as j,bD as k,mv as l,wy as m,Fu as n,yD as o,JA as p,FC as q,qC as r,RD as s,LP as t,fA as u,PD as v,ZP as w,ID as x,wD as y,lT as z};
//# sourceMappingURL=firebase-vendor-heDxAUdH.js.map
