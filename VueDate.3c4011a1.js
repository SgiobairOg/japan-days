import{r as m,c as s,a as b,b as d,t as _,n as i,o as x}from"./chunks/vendor.ac7cab49.js";var f=(n,t)=>{const r=n.__vccOpts||n;for(const[e,u]of t)r[e]=u;return r};const j=n=>t=>String.fromCharCode(t.charCodeAt(0)+n),S={setup(){const n=m(0),t=s(()=>{const o=new Date;return o.setDate(o.getDate()+n.value),o}),r=o=>{o.key==="ArrowLeft"?this.previousSubjectDay():o.key==="ArrowRight"&&this.nextSubjectDay()},e=o=>{o.preventDefault(),n.value>c.min&&n.value--},u=o=>{o.preventDefault(),n.value<c.max&&n.value++},l=s(()=>n.value<c.max?"date-component__button date-component__next":"date-component__button date-component__button--disabled date-component__next"),a=s(()=>n.value>c.min?"date-component__button date-component__prev":"date-component__button date-component__button--disabled date-component__prev"),c={min:-3,max:4,"-3":"\u3055\u304D\u304A\u3068\u3068\u3044","-2":"\u304A\u3068\u3068\u3044","-1":"\u304D\u306E\u3046","0":"\u304D\u3088\u3046","1":"\u3042\u3057\u305F","2":"\u3042\u3055\u3063\u3066","3":"\u3057\u3042\u3055\u3063\u3066","4":"\u3057\u3057\u3042\u3055\u3063\u3066"},v=s(()=>c[n.value]),y=s(()=>["\uFF11\u6708","\uFF12\u6708","\uFF13\u6708","\uFF14\u6708","\uFF15\u6708","\uFF16\u6708","\uFF17\u6708","\uFF18\u6708","\uFF19\u6708","\uFF11\uFF10\u6708","\uFF11\uFF11\u6708","\uFF11\uFF12\u6708"][t.value.getMonth()]),p=s(()=>`${["\u65E5","\u6708","\u706B","\u6C34","\u6728","\u91D1","\u571F"][t.value.getDay()]}\u3088\u3046\u3073`),D=s(()=>`${t.value.getDate()}\u65E5`.replace(/[0-9]{1}/g,j(65248)));return{date:t,Month:y,daysDate:D,Day:p,Subject:v,nextDayClass:l,prevDayClass:a,prevAndNextKeys:r,nextSubjectDay:u,previousSubjectDay:e}}},C={id:"vue",class:"date-component"},g={class:"date-component__header"},h={class:"date-component__question"},A={class:"date-component__date"};function k(n,t,r,e,u,l){return x(),b("section",C,[d("header",g,[d("div",h,_(e.Subject)+"\u306F\u4F55\u6708\u4F55\u65E5\u3067\u3059\u304B\uFF1F ",1),d("h1",A,_(e.Subject)+"\u306F"+_(e.Month)+_(e.daysDate)+_(e.Day)+"\u3067\u3059\u3002",1)]),d("div",{role:"button",class:i(e.prevDayClass),onClick:t[0]||(t[0]=(...a)=>e.previousSubjectDay&&e.previousSubjectDay(...a)),onKeydown:t[1]||(t[1]=(...a)=>e.prevAndNextKeys&&e.prevAndNextKeys(...a))},"Previous Day",34),d("div",{role:"button",class:i(e.nextDayClass),onClick:t[2]||(t[2]=(...a)=>e.nextSubjectDay&&e.nextSubjectDay(...a)),onKeydown:t[3]||(t[3]=(...a)=>e.prevAndNextKeys&&e.prevAndNextKeys(...a))},"Next Day",34)])}var N=f(S,[["render",k],["__scopeId","data-v-5eff6d8a"]]);export{N as default};
