!function(){var t=document.querySelector("body"),e=document.querySelector("button[data-start]"),r=document.querySelector("button[data-stop]"),n=null;r.setAttribute("disabled","");var o=function(){var e="#".concat(Math.floor(16777215*Math.random()).toString(16));t.setAttribute("style","background-color:".concat(e))};e.addEventListener("click",(function(){e.setAttribute("disabled",""),r.removeAttribute("disabled"),n=setInterval((function(){o()}),1e3)})),r.addEventListener("click",(function(){clearInterval(n),e.removeAttribute("disabled"),r.setAttribute("disabled","")}))}();
//# sourceMappingURL=01-color-switcher.97c4c748.js.map