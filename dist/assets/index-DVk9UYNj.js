(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&c(o)}).observe(document,{childList:!0,subtree:!0});function i(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(t){if(t.ep)return;t.ep=!0;const n=i(t);fetch(t.href,n)}})();document.addEventListener("mouseup",async()=>{var c,t,n;const r=(c=window.getSelection())==null?void 0:c.toString(),e=(t=window.getSelection())==null?void 0:t.anchorNode;if(r&&e&&((n=e.parentElement)!=null&&n.classList.contains("right"))){const o=await s(r);l(a(o))}document.querySelectorAll("a.wiktionary").forEach(o=>{o.addEventListener("click",async u=>{u.preventDefault();const d=await s(f(o.getAttribute("href")));l(a(d))})})});function s(r){return fetch("https://en.wiktionary.org/api/rest_v1/page/definition/"+r).then(e=>e.json()).catch(e=>({error:"Error connecting to Wiktionary"}))}function a(r){let e;return r.error!==void 0?e="Error":e=r.la.map(i=>`<b>${i.partOfSpeech}</b><br>
      ${i.definitions.map(c=>c.definition.replaceAll("<a",'<a class="wiktionary"')).join("<br>")}`).join("<br>"),e}function l(r){let e=document.getElementById("dictionary");if(e==null){const i=document.getElementById("main");e=document.createElement("div"),e.setAttribute("class","column"),e.setAttribute("id","dictionary"),i==null||i.appendChild(e)}e.innerHTML=r}function f(r){const e=r.lastIndexOf("/");return e!==-1?r.substring(e+1):""}
