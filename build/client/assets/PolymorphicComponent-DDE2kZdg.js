import{r as f}from"./chunk-LFPYN7LY-B4Ti7GfX.js";if(typeof window<"u"){const r={NEXT_PUBLIC_CREATE_BASE_URL:"https://740a26d7-dafe-4044-8365-b86f37d1247f.created.app",NEXT_PUBLIC_CREATE_HOST:"740a26d7-dafe-4044-8365-b86f37d1247f.created.app",NEXT_PUBLIC_PROJECT_GROUP_ID:"740a26d7-dafe-4044-8365-b86f37d1247f"};globalThis.process??(globalThis.process={});const t=globalThis.process.env??{};globalThis.process.env=new Proxy(Object.assign({},r,t),{get(n,o){return o in n?n[o]:void 0},has(){return!0}})}if(typeof window<"u"){const r={NEXT_PUBLIC_CREATE_BASE_URL:"https://740a26d7-dafe-4044-8365-b86f37d1247f.created.app",NEXT_PUBLIC_CREATE_HOST:"740a26d7-dafe-4044-8365-b86f37d1247f.created.app",NEXT_PUBLIC_PROJECT_GROUP_ID:"740a26d7-dafe-4044-8365-b86f37d1247f"};globalThis.process??(globalThis.process={});const t=globalThis.process.env??{};globalThis.process.env=new Proxy(Object.assign({},r,t),{get(n,o){return o in n?n[o]:void 0},has(){return!0}})}const E="data-render-id";function u(r,t){const n=Math.max(r,t),o=`
    <svg width="${n}" height="${n}" viewBox="0 0 895 895" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="895" height="895" fill="#E9E7E7"/>
<g>
<line x1="447.505" y1="-23" x2="447.505" y2="901" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="447.505" x2="5.66443" y2="447.505" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="278.068" x2="5.66443" y2="278.068" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="57.1505" x2="5.66443" y2="57.1504" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="61.8051" y1="883.671" x2="61.8051" y2="6.10572e-05" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="282.495" y1="907" x2="282.495" y2="-30" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="611.495" y1="907" x2="611.495" y2="-30" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="832.185" y1="883.671" x2="832.185" y2="6.10572e-05" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="827.53" x2="5.66443" y2="827.53" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="606.613" x2="5.66443" y2="606.612" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="4.3568" y1="4.6428" x2="889.357" y2="888.643" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="-0.3568" y1="894.643" x2="894.643" y2="0.642772" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="447.5" cy="441.5" r="163.995" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="447.911" cy="447.911" r="237.407" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="448" cy="442" r="384.495" stroke="#C0C0C0" stroke-width="1.00975"/>
</g>
</svg>
`;return`data:image/svg+xml;utf8,${encodeURIComponent(o)}`}function R(r){const t=f.useRef(null);return r&&"instance"in r?t:r??t}const T=f.forwardRef(function({as:t,children:n,renderId:o,onError:g,...b},w){const x=t==="img"?{...b,onError:e=>{typeof g=="function"&&g(e);const s=e.currentTarget,{width:a,height:d}=s.getBoundingClientRect();s.dataset.hasFallback="1",s.onerror=null,s.src=u(Math.round(a)||128,Math.round(d)||128),s.style.objectFit="cover"}}:b,c=R(w);return f.useEffect(()=>{const e=c&&"current"in c?c.current:null;if(!e)return;if(t!=="img"){const a=()=>{const{width:l,height:i}=e.getBoundingClientRect();return u(Math.round(l)||128,Math.round(i)||128)},d=()=>{e.dataset.hasFallback="1",e.style.backgroundImage=`url("${a()}")`,e.style.backgroundSize="cover"},C=()=>{const l=getComputedStyle(e).backgroundImage,i=/url\(["']?(.+?)["']?\)/.exec(l),h=i==null?void 0:i[1];if(!h)return;const p=new Image;p.onerror=d,p.src=h};C();const y=new ResizeObserver(([l])=>{if(!e.dataset.hasFallback)return;const{width:i,height:h}=l.contentRect;e.style.backgroundImage=`url("${u(Math.round(i)||128,Math.round(h)||128)}")`});y.observe(e);const k=new MutationObserver(C);return k.observe(e,{attributes:!0,attributeFilter:["style","class"]}),()=>{y.disconnect(),k.disconnect()}}if(!e.dataset.hasFallback)return;const s=new ResizeObserver(([a])=>{const{width:d,height:C}=a.contentRect;e.src=u(Math.round(d)||128,Math.round(C)||128)});return s.observe(e),()=>s.disconnect()},[t,c]),f.createElement(t,Object.assign({},x,{ref:c,...o?{[E]:o}:void 0}),n)});export{T as C};
