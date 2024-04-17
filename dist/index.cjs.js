"use strict";(e=>{let L=()=>{var a,u,y,o,p,m;(a=e.querySelector("button#start"))==null||a.addEventListener("click",g),(u=e.querySelector("button#stop"))==null||u.addEventListener("click",H),(y=e.querySelector("button#init"))==null||y.addEventListener("click",A),(o=e.querySelector("button#start"))==null||o.addEventListener("click",()=>{gtag("event","click_start")}),(p=e.querySelector("button#stop"))==null||p.addEventListener("click",()=>{gtag("event","click_stop")}),(m=e.querySelector("button#init"))==null||m.addEventListener("click",()=>{gtag("event","click_init")});let i=e.querySelector("head"),d=e.createElement("link");i==null||i.appendChild(d),d.rel="stylesheet",d.href="https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@500&display=swap"},T=()=>{e.querySelector("aside#mask").dataset.state="visible"},S=()=>{e.querySelector("aside#mask").dataset.state="hidden"},f;(o=>(o[o.SUVIVOR=0]="SUVIVOR",o[o.ALONE=1]="ALONE",o[o.BIRTH=2]="BIRTH",o[o.DEAD=3]="DEAD",o[o.EXTINCT=4]="EXTINCT"))(f||(f={}));let b=(i,d,a)=>{let u,y=e.querySelector("#generation").innerHTML;switch(i){case 0:u=e.createTextNode("\u3010\u6C7A\u7740\u3011"+a+" \u5BB6\u304C\u7B2C "+y+" \u4E16\u4EE3\u3067\u540D\u5B57\u3092\u7D71\u4E00\u3057\u307E\u3057\u305F");break;case 2:u=e.createTextNode("["+y+"] "+a+" \u3055\u3093\u51FA\u7523\u3092\u5831\u544A");break;case 4:u=e.createTextNode("["+y+"] "+a+" \u5BB6\u304C\u65AD\u7D76");break;case 1:case 3:default:return}let o=e.createElement("dd");o.appendChild(u),o.dataset.id=d,o.dataset.mode=i+"",e.querySelector("section#table dl").insertBefore(o,e.querySelector("section#table dl").firstChild)},g=()=>{T(),setTimeout(()=>{var r,h,E,q;if(Array.from(new Map(Array.from(e.querySelectorAll("section#table ol li")).map(t=>[t.dataset.id,0]))).length<2){let t=((r=e.querySelector("section#table ol li"))==null?void 0:r.dataset.id)+"",s=((h=e.querySelector('#table ul li[data-id="'+t+'"] span'))==null?void 0:h.innerHTML)+"";if(b(0,t,s),!e.querySelectorAll('#table dl dd[data-mode="3"]').length)e.querySelectorAll("#table dl dd:not(:nth-of-type(-n+3))").forEach(n=>{n.innerHTML=n.innerHTML.replace(" \u5BB6\u304C\u65AD\u7D76","\u5BB6")});else{let n=0;for(let c=0,M=e.querySelectorAll("#table dl dd"),C=M.length;c<C&&M[c]!==Array.from(e.querySelectorAll('#table dl dd[data-mode="3"]')).pop();c++)n++;e.querySelectorAll("#table dd:nth-of-type(n+"+(n+3)+")").forEach(c=>{c.innerHTML=c.innerHTML.replace(" \u5BB6\u304C\u65AD\u7D76","\u5BB6")})}e.querySelector("main").dataset.state="pause",S();return}else if(e.querySelector("main").dataset.state==="pausing"){e.querySelector("main").dataset.state="pause",S();return}else e.querySelector("main").dataset.state="playing";if(e.querySelectorAll("section#table ol li").length%2===1){let t=((E=e.querySelector("section#table ol li:last-of-type"))==null?void 0:E.dataset.id)+"",s=((q=e.querySelector('#table ul li[data-id="'+t+'"] span'))==null?void 0:q.innerHTML)+"";b(1,t,s);let n=e.querySelector("section#table ol").getElementsByTagName("li").length-1;e.querySelector("section#table ol").removeChild(e.querySelector("section#table ol").getElementsByTagName("li")[n])}let i=[];Array.from(e.querySelectorAll("section#table ol li")).sort(()=>~~(Math.random()*3)-1).forEach(t=>{i.push(t)});let d=[],a=[];for(let t=0,s=i.length;t<s;t+=2){let n="",c="";~~(Math.random()*2)-0?(n=i[t].dataset.id+"",c=i[t].style.backgroundColor):(n=i[t+1].dataset.id+"",c=i[t+1].style.backgroundColor),i[t].dataset.id=n,i[t].style.backgroundColor=c,i[t+1]&&(i[t+1].dataset.id=n,i[t+1].style.backgroundColor=c),Math.random()*100<=.0315&&d.push({id:n,color:c}),Math.random()*100<=.129&&a.push({elm:i[t],id:n}),Math.random()*100<=.129&&a.push({elm:i[t+1],id:n})}d.forEach(t=>{var c;let s=e.createElement("li");s.dataset.id=t.id,s.style.backgroundColor=t.color,i.push(s),e.querySelector("section#table ol").appendChild(s);let n=((c=e.querySelector('#table ul li[data-id="'+t.id+'"] span'))==null?void 0:c.innerHTML)+"";b(2,t.id,n)}),a.forEach(t=>{var n;i.splice(1),e.querySelector("section#table ol").removeChild(t.elm);let s=((n=e.querySelector('#table ul li[data-id="'+t.id+'"] span'))==null?void 0:n.innerHTML)+"";b(3,t.id,s)});let u=Array.from(new Map(Array.from(e.querySelectorAll("section#table ol li")).map(t=>[t.dataset.id,0])).keys()).sort();Array.from(e.querySelectorAll("section#table ul li")).filter(t=>t.querySelector("small").innerHTML!=="0").map(t=>t.dataset.id).sort().filter(t=>!u.includes(t)).forEach(t=>{var n;let s=((n=e.querySelector('#table ul li[data-id="'+t+'"] span'))==null?void 0:n.innerHTML)+"";b(4,t+"",s)});let o=0,p=0;e.querySelectorAll("#table ul li").forEach(t=>{let s=e.querySelectorAll('section#table ol li[data-id="'+t.dataset.id+'"]').length;t.querySelector("small").innerHTML=s+"",t.dataset.tmpcnt=s+"",s>o&&(o=s),p+=s}),e.querySelectorAll("#table ul li").forEach(t=>{let s=~~(parseInt(t.dataset.tmpcnt+"")/o*100);t.querySelector("meter").value=s,t.style.order=o-parseInt(t.dataset.tmpcnt+"")+"",t.removeAttribute("data-tmpcnt")});let m=e.querySelector("section#table ul");e.querySelectorAll("#table ul li").forEach(t=>{t.querySelector("small").innerHTML.toString()==="0"&&(t.removeChild(t.querySelector("data")),t.removeChild(t.querySelector("span")),t.removeChild(t.querySelector("small")),t.removeChild(t.querySelector("meter")),m.removeChild(t))}),m=null,m=e.querySelector("section#table dl");for(let t=e.querySelectorAll('section#table dd[data-mode="3"]').length-20;t>0;t--)m.removeChild(Array.from(m.querySelectorAll('dd[data-mode="3"]')).pop());m=null;let l=parseInt(e.querySelector("#generation").innerHTML);e.querySelector("#generation").innerHTML=(isNaN(l)?0:l)+1+"",e.querySelector("#population").innerHTML=p+"",e.querySelector("main").dataset.state==="playing"&&setTimeout(()=>{g()},150),S()},10)},H=()=>{e.querySelector("main").dataset.state="pausing"},A=()=>{T(),setTimeout(()=>{let i=e.querySelector("section#data textarea").value;if(!i){S(),alert("ERR_100: \u30C7\u30FC\u30BF\u304C\u5B58\u5728\u3057\u307E\u305B\u3093");return}let d=i.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n+/g,`
`).replace(/(^\n|\n$)/,"");if(!d){S(),alert("ERR_101: \u30C7\u30FC\u30BF\u304C\u5B58\u5728\u3057\u307E\u305B\u3093");return}let a=d.split(`
`).map(l=>l.split("	"));for(let l=0,r=a.length;l<r;l++){if(a[l].length!==2){S(),alert("ERR_110: \u30C7\u30FC\u30BF\u306E\u66F8\u5F0F\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093");return}if(a[l][0]===""){S(),alert("ERR_111: \u30C7\u30FC\u30BF\u306E\u540D\u5B57\u304C\u7A7A\u6B04\u3067\u3059");return}if(a[l][1]===""){S(),alert("ERR_112: \u30C7\u30FC\u30BF\u306E\u4EF6\u6570\u304C\u7A7A\u6B04\u3067\u3059");return}if(/[^0-9]/.test(a[l][1]+"")){S(),alert("ERR_113: \u30C7\u30FC\u30BF\u306E\u4EF6\u6570\u306B\u6570\u5B57\u4EE5\u5916\u306E\u6587\u5B57\u304C\u542B\u307E\u308C\u3066\u3044\u307E\u3059");return}a[l][0]=a[l][0]+"",a[l][1]=~~a[l][1],a[l][2]=l}let u=[],y=0;for(let l=0,r=a.length;l<r;l++)y<parseInt(a[l][1]+"")&&(y=parseInt(a[l][1]+"")),u.push({id:parseInt(a[l][2]+""),name:a[l][0]+"",count:parseInt(a[l][1]+""),color:"#"+(~~(Math.random()*255)).toString(16).padStart(4,"0").substring(2,4)+(~~(Math.random()*255)).toString(16).padStart(4,"0").substring(2,4)+(~~(Math.random()*255)).toString(16).padStart(4,"0").substring(2,4)});let o=[];for(let l=0,r=a.length;l<r;l++)for(let h=0,E=parseInt(a[l][1]+"");h<E;h++)o.push({id:a[l][2],name:a[l][0],value:~~(Math.random()*1e9)});o.sort((l,r)=>l.value-r.value),e.querySelectorAll("section#table ol li").length!==0&&e.querySelectorAll("section#table ol li").forEach(l=>{var r;(r=l.parentNode)==null||r.removeChild(l)}),e.querySelectorAll("section#table dl dd").length!==0&&e.querySelectorAll("section#table dl dd").forEach(l=>{var r;(r=l.parentNode)==null||r.removeChild(l)}),e.querySelectorAll("section#table ul li").length!==0&&e.querySelectorAll("section#table ul li").forEach(l=>{var r;(r=l.parentNode)==null||r.removeChild(l)});let p=e.querySelector("section#table ol");o.forEach(l=>{let r=e.createElement("li");p.appendChild(r),r.setAttribute("data-id",l.id+"");let h=u.filter(E=>E.id===l.id);h.length===0?r.style.backgroundColor="#0000":r.style.backgroundColor=h[0].color}),p=null,p=e.querySelector("section#table ul"),u.forEach(l=>{let r=e.createElement("li"),h=e.createElement("data"),E=e.createElement("span"),q=e.createTextNode(l.name),t=e.createElement("small"),s=e.createTextNode(l.count+""),n=e.createElement("meter"),c=~~(l.count/y*100);p.appendChild(r),r.appendChild(h),r.appendChild(E),E.appendChild(q),r.appendChild(t),t.appendChild(s),r.appendChild(n),r.setAttribute("data-id",l.id+""),h.style.backgroundColor=l.color,n.setAttribute("value",c+""),n.setAttribute("min","0"),n.setAttribute("max","100"),n.setAttribute("low","0"),n.setAttribute("high","50"),n.setAttribute("optimum","50")}),p=null,e.querySelector("b#generation").innerHTML="1";let m=0;e.querySelectorAll("#table ul li").forEach(l=>{let r=e.querySelectorAll('section#table ol li[data-id="'+l.dataset.id+'"]').length;m+=r}),e.querySelector("#population").innerHTML=m+"",S()},10)};e.addEventListener("DOMContentLoaded",L)})(document);
//# sourceMappingURL=index.cjs.js.map
