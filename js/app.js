/** gumshoe v1.0.2, by Chris Ferdinandi | http://github.com/cferdinandi/gumshoe | Licensed under MIT: http://gomakethings.com/mit/ */
!function(e,t){"function"==typeof define&&define.amd?define([],t(e)):"object"==typeof exports?module.exports=t(e):e.gumshoe=t(e)}(this,function(e){"use strict";var t,n,a,r,o,c,i={},s=!!document.querySelector&&!!e.addEventListener,l=[],u={offset:0,activeClass:"active",callbackBefore:function(){},callbackAfter:function(){}},f=function(e,t,n){if("[object Object]"===Object.prototype.toString.call(e))for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.call(n,e[a],a,e);else for(var r=0,o=e.length;o>r;r++)t.call(n,e[r],r,e)},d=function(e,t){var n={};return f(e,function(t,a){n[a]=e[a]}),f(t,function(e,a){n[a]=t[a]}),n},v=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},m=function(e){return Math.max(e.scrollHeight,e.offsetHeight,e.clientHeight)},h=function(e){var n=0;if(e.offsetParent)do n+=e.offsetTop,e=e.offsetParent;while(e);return n=n-o-t.offset,n>=0?n:0},g=function(){l.sort(function(e,t){return e.distance>t.distance?-1:e.distance<t.distance?1:0})};i.setDistances=function(){a=v(),o=r?m(r)+h(r):0,f(l,function(e){e.distance=h(e.target)}),g()};var p=function(){var e=document.querySelectorAll("[data-gumshoe] a");f(e,function(e){e.hash&&l.push({nav:e,target:document.querySelector(e.hash),parent:"li"===e.parentNode.tagName.toLowerCase()?e.parentNode:null,distance:0})})},y=function(e){c&&(c.nav.classList.remove(t.activeClass),c.parent&&c.parent.classList.remove(t.activeClass)),t.callbackBefore(e),e.nav.classList.add(t.activeClass),e.parent&&e.parent.classList.add(t.activeClass),t.callbackAfter(e),c={nav:e.nav,parent:e.parent}};i.getCurrentNav=function(){var t=e.pageYOffset;if(e.innerHeight+t>=a)return y(l[0]);for(var n=0,r=l.length;r>n;n++){var o=l[n];if(o.distance<t)return y(o)}};var b=function(){f(l,function(e){e.nav.classList.contains(t.activeClass)&&(c={nav:e.nav,parent:e.parent})})};i.destroy=function(){t&&(e.removeEventListener("resize",C,!1),e.removeEventListener("scroll",C,!1),l=[],t=null,n=null,a=null,r=null,o=null,c=null)};var C=function(e){n||(n=setTimeout(function(){n=null,"scroll"===e.type&&i.getCurrentNav(),"resize"===e.type&&(i.setDistances(),i.getCurrentNav())},66))};return i.init=function(n){s&&(i.destroy(),t=d(u,n||{}),r=document.querySelector("[data-gumshoe-header]"),p(),0!==l.length&&(b(),i.setDistances(),i.getCurrentNav(),e.addEventListener("resize",C,!1),e.addEventListener("scroll",C,!1)))},i});

!function(e){"undefined"!=typeof exports?e(exports):(window.hljs=e({}),"function"==typeof define&&define.amd&&define([],function(){return window.hljs}))}(function(e){function n(e){return e.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function t(e){return e.nodeName.toLowerCase()}function r(e,n){var t=e&&e.exec(n);return t&&0==t.index}function a(e){var n=(e.className+" "+(e.parentNode?e.parentNode.className:"")).split(/\s+/);return n=n.map(function(e){return e.replace(/^lang(uage)?-/,"")}),n.filter(function(e){return N(e)||/no(-?)highlight|plain|text/.test(e)})[0]}function i(e,n){var t,r={};for(t in e)r[t]=e[t];if(n)for(t in n)r[t]=n[t];return r}function o(e){var n=[];return function r(e,a){for(var i=e.firstChild;i;i=i.nextSibling)3==i.nodeType?a+=i.nodeValue.length:1==i.nodeType&&(n.push({event:"start",offset:a,node:i}),a=r(i,a),t(i).match(/br|hr|img|input/)||n.push({event:"stop",offset:a,node:i}));return a}(e,0),n}function u(e,r,a){function i(){return e.length&&r.length?e[0].offset!=r[0].offset?e[0].offset<r[0].offset?e:r:"start"==r[0].event?e:r:e.length?e:r}function o(e){function r(e){return" "+e.nodeName+'="'+n(e.value)+'"'}l+="<"+t(e)+Array.prototype.map.call(e.attributes,r).join("")+">"}function u(e){l+="</"+t(e)+">"}function c(e){("start"==e.event?o:u)(e.node)}for(var s=0,l="",f=[];e.length||r.length;){var g=i();if(l+=n(a.substr(s,g[0].offset-s)),s=g[0].offset,g==e){f.reverse().forEach(u);do c(g.splice(0,1)[0]),g=i();while(g==e&&g.length&&g[0].offset==s);f.reverse().forEach(o)}else"start"==g[0].event?f.push(g[0].node):f.pop(),c(g.splice(0,1)[0])}return l+n(a.substr(s))}function c(e){function n(e){return e&&e.source||e}function t(t,r){return new RegExp(n(t),"m"+(e.cI?"i":"")+(r?"g":""))}function r(a,o){if(!a.compiled){if(a.compiled=!0,a.k=a.k||a.bK,a.k){var u={},c=function(n,t){e.cI&&(t=t.toLowerCase()),t.split(" ").forEach(function(e){var t=e.split("|");u[t[0]]=[n,t[1]?Number(t[1]):1]})};"string"==typeof a.k?c("keyword",a.k):Object.keys(a.k).forEach(function(e){c(e,a.k[e])}),a.k=u}a.lR=t(a.l||/\b\w+\b/,!0),o&&(a.bK&&(a.b="\\b("+a.bK.split(" ").join("|")+")\\b"),a.b||(a.b=/\B|\b/),a.bR=t(a.b),a.e||a.eW||(a.e=/\B|\b/),a.e&&(a.eR=t(a.e)),a.tE=n(a.e)||"",a.eW&&o.tE&&(a.tE+=(a.e?"|":"")+o.tE)),a.i&&(a.iR=t(a.i)),void 0===a.r&&(a.r=1),a.c||(a.c=[]);var s=[];a.c.forEach(function(e){e.v?e.v.forEach(function(n){s.push(i(e,n))}):s.push("self"==e?a:e)}),a.c=s,a.c.forEach(function(e){r(e,a)}),a.starts&&r(a.starts,o);var l=a.c.map(function(e){return e.bK?"\\.?("+e.b+")\\.?":e.b}).concat([a.tE,a.i]).map(n).filter(Boolean);a.t=l.length?t(l.join("|"),!0):{exec:function(){return null}}}}r(e)}function s(e,t,a,i){function o(e,n){for(var t=0;t<n.c.length;t++)if(r(n.c[t].bR,e))return n.c[t]}function u(e,n){if(r(e.eR,n)){for(;e.endsParent&&e.parent;)e=e.parent;return e}return e.eW?u(e.parent,n):void 0}function f(e,n){return!a&&r(n.iR,e)}function g(e,n){var t=E.cI?n[0].toLowerCase():n[0];return e.k.hasOwnProperty(t)&&e.k[t]}function p(e,n,t,r){var a=r?"":x.classPrefix,i='<span class="'+a,o=t?"":"</span>";return i+=e+'">',i+n+o}function d(){if(!L.k)return n(y);var e="",t=0;L.lR.lastIndex=0;for(var r=L.lR.exec(y);r;){e+=n(y.substr(t,r.index-t));var a=g(L,r);a?(B+=a[1],e+=p(a[0],n(r[0]))):e+=n(r[0]),t=L.lR.lastIndex,r=L.lR.exec(y)}return e+n(y.substr(t))}function h(){if(L.sL&&!w[L.sL])return n(y);var e=L.sL?s(L.sL,y,!0,M[L.sL]):l(y);return L.r>0&&(B+=e.r),"continuous"==L.subLanguageMode&&(M[L.sL]=e.top),p(e.language,e.value,!1,!0)}function b(){return void 0!==L.sL?h():d()}function v(e,t){var r=e.cN?p(e.cN,"",!0):"";e.rB?(k+=r,y=""):e.eB?(k+=n(t)+r,y=""):(k+=r,y=t),L=Object.create(e,{parent:{value:L}})}function m(e,t){if(y+=e,void 0===t)return k+=b(),0;var r=o(t,L);if(r)return k+=b(),v(r,t),r.rB?0:t.length;var a=u(L,t);if(a){var i=L;i.rE||i.eE||(y+=t),k+=b();do L.cN&&(k+="</span>"),B+=L.r,L=L.parent;while(L!=a.parent);return i.eE&&(k+=n(t)),y="",a.starts&&v(a.starts,""),i.rE?0:t.length}if(f(t,L))throw new Error('Illegal lexeme "'+t+'" for mode "'+(L.cN||"<unnamed>")+'"');return y+=t,t.length||1}var E=N(e);if(!E)throw new Error('Unknown language: "'+e+'"');c(E);var R,L=i||E,M={},k="";for(R=L;R!=E;R=R.parent)R.cN&&(k=p(R.cN,"",!0)+k);var y="",B=0;try{for(var C,j,I=0;;){if(L.t.lastIndex=I,C=L.t.exec(t),!C)break;j=m(t.substr(I,C.index-I),C[0]),I=C.index+j}for(m(t.substr(I)),R=L;R.parent;R=R.parent)R.cN&&(k+="</span>");return{r:B,value:k,language:e,top:L}}catch(S){if(-1!=S.message.indexOf("Illegal"))return{r:0,value:n(t)};throw S}}function l(e,t){t=t||x.languages||Object.keys(w);var r={r:0,value:n(e)},a=r;return t.forEach(function(n){if(N(n)){var t=s(n,e,!1);t.language=n,t.r>a.r&&(a=t),t.r>r.r&&(a=r,r=t)}}),a.language&&(r.second_best=a),r}function f(e){return x.tabReplace&&(e=e.replace(/^((<[^>]+>|\t)+)/gm,function(e,n){return n.replace(/\t/g,x.tabReplace)})),x.useBR&&(e=e.replace(/\n/g,"<br>")),e}function g(e,n,t){var r=n?E[n]:t,a=[e.trim()];return e.match(/\bhljs\b/)||a.push("hljs"),-1===e.indexOf(r)&&a.push(r),a.join(" ").trim()}function p(e){var n=a(e);if(!/no(-?)highlight|plain|text/.test(n)){var t;x.useBR?(t=document.createElementNS("http://www.w3.org/1999/xhtml","div"),t.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n")):t=e;var r=t.textContent,i=n?s(n,r,!0):l(r),c=o(t);if(c.length){var p=document.createElementNS("http://www.w3.org/1999/xhtml","div");p.innerHTML=i.value,i.value=u(c,o(p),r)}i.value=f(i.value),e.innerHTML=i.value,e.className=g(e.className,n,i.language),e.result={language:i.language,re:i.r},i.second_best&&(e.second_best={language:i.second_best.language,re:i.second_best.r})}}function d(e){x=i(x,e)}function h(){if(!h.called){h.called=!0;var e=document.querySelectorAll("pre code");Array.prototype.forEach.call(e,p)}}function b(){addEventListener("DOMContentLoaded",h,!1),addEventListener("load",h,!1)}function v(n,t){var r=w[n]=t(e);r.aliases&&r.aliases.forEach(function(e){E[e]=n})}function m(){return Object.keys(w)}function N(e){return w[e]||w[E[e]]}var x={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0},w={},E={};return e.highlight=s,e.highlightAuto=l,e.fixMarkup=f,e.highlightBlock=p,e.configure=d,e.initHighlighting=h,e.initHighlightingOnLoad=b,e.registerLanguage=v,e.listLanguages=m,e.getLanguage=N,e.inherit=i,e.IR="[a-zA-Z]\\w*",e.UIR="[a-zA-Z_]\\w*",e.NR="\\b\\d+(\\.\\d+)?",e.CNR="\\b(0[xX][a-fA-F0-9]+|(\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",e.BNR="\\b(0b[01]+)",e.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",e.BE={b:"\\\\[\\s\\S]",r:0},e.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[e.BE]},e.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[e.BE]},e.PWM={b:/\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/},e.C=function(n,t,r){var a=e.inherit({cN:"comment",b:n,e:t,c:[]},r||{});return a.c.push(e.PWM),a},e.CLCM=e.C("//","$"),e.CBCM=e.C("/\\*","\\*/"),e.HCM=e.C("#","$"),e.NM={cN:"number",b:e.NR,r:0},e.CNM={cN:"number",b:e.CNR,r:0},e.BNM={cN:"number",b:e.BNR,r:0},e.CSSNM={cN:"number",b:e.NR+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r:0},e.RM={cN:"regexp",b:/\//,e:/\/[gimuy]*/,i:/\n/,c:[e.BE,{b:/\[/,e:/\]/,r:0,c:[e.BE]}]},e.TM={cN:"title",b:e.IR,r:0},e.UTM={cN:"title",b:e.UIR,r:0},e});hljs.registerLanguage("xml",function(t){var e="[A-Za-z0-9\\._:-]+",s={b:/<\?(php)?(?!\w)/,e:/\?>/,sL:"php",subLanguageMode:"continuous"},c={eW:!0,i:/</,r:0,c:[s,{cN:"attribute",b:e,r:0},{b:"=",r:0,c:[{cN:"value",c:[s],v:[{b:/"/,e:/"/},{b:/'/,e:/'/},{b:/[^\s\/>]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xsl","plist"],cI:!0,c:[{cN:"doctype",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},t.C("<!--","-->",{r:10}),{cN:"cdata",b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{title:"style"},c:[c],starts:{e:"</style>",rE:!0,sL:"css"}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{title:"script"},c:[c],starts:{e:"</script>",rE:!0,sL:""}},s,{cN:"pi",b:/<\?\w+/,e:/\?>/,r:10},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"title",b:/[^ \/><\n\t]+/,r:0},c]}]}});hljs.registerLanguage("coffeescript",function(e){var c={keyword:"in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",literal:"true false null undefined yes no on off",reserved:"case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf",built_in:"npm require console print module global window document"},n="[A-Za-z$_][0-9A-Za-z$_]*",t={cN:"subst",b:/#\{/,e:/}/,k:c},r=[e.BNM,e.inherit(e.CNM,{starts:{e:"(\\s*/)?",r:0}}),{cN:"string",v:[{b:/'''/,e:/'''/,c:[e.BE]},{b:/'/,e:/'/,c:[e.BE]},{b:/"""/,e:/"""/,c:[e.BE,t]},{b:/"/,e:/"/,c:[e.BE,t]}]},{cN:"regexp",v:[{b:"///",e:"///",c:[t,e.HCM]},{b:"//[gim]*",r:0},{b:/\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/}]},{cN:"property",b:"@"+n},{b:"`",e:"`",eB:!0,eE:!0,sL:"javascript"}];t.c=r;var i=e.inherit(e.TM,{b:n}),s="(\\(.*\\))?\\s*\\B[-=]>",o={cN:"params",b:"\\([^\\(]",rB:!0,c:[{b:/\(/,e:/\)/,k:c,c:["self"].concat(r)}]};return{aliases:["coffee","cson","iced"],k:c,i:/\/\*/,c:r.concat([e.C("###","###"),e.HCM,{cN:"function",b:"^\\s*"+n+"\\s*=\\s*"+s,e:"[-=]>",rB:!0,c:[i,o]},{b:/[:\(,=]\s*/,r:0,c:[{cN:"function",b:s,e:"[-=]>",rB:!0,c:[o]}]},{cN:"class",bK:"class",e:"$",i:/[:="\[\]]/,c:[{bK:"extends",eW:!0,i:/[:="\[\]]/,c:[i]},i]},{cN:"attribute",b:n+":",e:":",rB:!0,rE:!0,r:0}])}});hljs.registerLanguage("bash",function(e){var t={cN:"variable",v:[{b:/\$[\w\d#@][\w\d_]*/},{b:/\$\{(.*?)}/}]},s={cN:"string",b:/"/,e:/"/,c:[e.BE,t,{cN:"variable",b:/\$\(/,e:/\)/,c:[e.BE]}]},a={cN:"string",b:/'/,e:/'/};return{aliases:["sh","zsh"],l:/-?[a-z\.]+/,k:{keyword:"if then else elif fi for while in do done case esac function",literal:"true false",built_in:"break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",operator:"-ne -eq -lt -gt -f -d -e -s -l -a"},c:[{cN:"shebang",b:/^#![^\n]+sh\s*$/,r:10},{cN:"function",b:/\w[\w\d_]*\s*\(\s*\)\s*\{/,rB:!0,c:[e.inherit(e.TM,{b:/\w[\w\d_]*/})],r:0},e.HCM,e.NM,s,a,t]}});hljs.registerLanguage("javascript",function(e){return{aliases:["js"],k:{keyword:"in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as await",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"},c:[{cN:"pi",r:10,v:[{b:/^\s*('|")use strict('|")/},{b:/^\s*('|")use asm('|")/}]},e.ASM,e.QSM,{cN:"string",b:"`",e:"`",c:[e.BE,{cN:"subst",b:"\\$\\{",e:"\\}"}]},e.CLCM,e.CBCM,{cN:"number",b:"\\b(0[xXbBoO][a-fA-F0-9]+|(\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",r:0},{b:"("+e.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[e.CLCM,e.CBCM,e.RM,{b:/</,e:/>\s*[);\]]/,r:0,sL:"xml"}],r:0},{cN:"function",bK:"function",e:/\{/,eE:!0,c:[e.inherit(e.TM,{b:/[A-Za-z$_][0-9A-Za-z$_]*/}),{cN:"params",b:/\(/,e:/\)/,c:[e.CLCM,e.CBCM],i:/["'\(]/}],i:/\[|%/},{b:/\$[(.]/},{b:"\\."+e.IR,r:0},{bK:"import",e:"[;$]",k:"import from as",c:[e.ASM,e.QSM]},{cN:"class",bK:"class",e:/[{;=]/,eE:!0,i:/[:"\[\]]/,c:[{bK:"extends"},e.UTM]}]}});hljs.registerLanguage("markdown",function(e){return{aliases:["md","mkdown","mkd"],c:[{cN:"header",v:[{b:"^#{1,6}",e:"$"},{b:"^.+?\\n[=-]{2,}$"}]},{b:"<",e:">",sL:"xml",r:0},{cN:"bullet",b:"^([*+-]|(\\d+\\.))\\s+"},{cN:"strong",b:"[*_]{2}.+?[*_]{2}"},{cN:"emphasis",v:[{b:"\\*.+?\\*"},{b:"_.+?_",r:0}]},{cN:"blockquote",b:"^>\\s+",e:"$"},{cN:"code",v:[{b:"`.+?`"},{b:"^( {4}| )",e:"$",r:0}]},{cN:"horizontal_rule",b:"^[-\\*]{3,}",e:"$"},{b:"\\[.+?\\][\\(\\[].*?[\\)\\]]",rB:!0,c:[{cN:"link_label",b:"\\[",e:"\\]",eB:!0,rE:!0,r:0},{cN:"link_url",b:"\\]\\(",e:"\\)",eB:!0,eE:!0},{cN:"link_reference",b:"\\]\\[",e:"\\]",eB:!0,eE:!0}],r:10},{b:"^\\[.+\\]:",rB:!0,c:[{cN:"link_reference",b:"\\[",e:"\\]:",eB:!0,eE:!0,starts:{cN:"link_url",e:"$"}}]}]}});hljs.registerLanguage("scss",function(e){{var t="[a-zA-Z-][a-zA-Z0-9_-]*",i={cN:"variable",b:"(\\$"+t+")\\b"},r={cN:"function",b:t+"\\(",rB:!0,eE:!0,e:"\\("},o={cN:"hexcolor",b:"#[0-9A-Fa-f]+"};({cN:"attribute",b:"[A-Z\\_\\.\\-]+",e:":",eE:!0,i:"[^\\s]",starts:{cN:"value",eW:!0,eE:!0,c:[r,o,e.CSSNM,e.QSM,e.ASM,e.CBCM,{cN:"important",b:"!important"}]}})}return{cI:!0,i:"[=/|']",c:[e.CLCM,e.CBCM,r,{cN:"id",b:"\\#[A-Za-z0-9_-]+",r:0},{cN:"class",b:"\\.[A-Za-z0-9_-]+",r:0},{cN:"attr_selector",b:"\\[",e:"\\]",i:"$"},{cN:"tag",b:"\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",r:0},{cN:"pseudo",b:":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"},{cN:"pseudo",b:"::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"},i,{cN:"attribute",b:"\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",i:"[^\\s]"},{cN:"value",b:"\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"},{cN:"value",b:":",e:";",c:[r,i,o,e.CSSNM,e.QSM,e.ASM,{cN:"important",b:"!important"}]},{cN:"at_rule",b:"@",e:"[{;]",k:"mixin include extend for if else each while charset import debug media page content font-face namespace warn",c:[r,i,e.QSM,e.ASM,o,e.CSSNM,{cN:"preprocessor",b:"\\s[A-Za-z0-9_.-]+",r:0}]}]}});hljs.registerLanguage("ruby",function(e){var c="[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",r="and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",b={cN:"yardoctag",b:"@[A-Za-z]+"},a={cN:"value",b:"#<",e:">"},n=[e.C("#","$",{c:[b]}),e.C("^\\=begin","^\\=end",{c:[b],r:10}),e.C("^__END__","\\n$")],s={cN:"subst",b:"#\\{",e:"}",k:r},t={cN:"string",c:[e.BE,s],v:[{b:/'/,e:/'/},{b:/"/,e:/"/},{b:/`/,e:/`/},{b:"%[qQwWx]?\\(",e:"\\)"},{b:"%[qQwWx]?\\[",e:"\\]"},{b:"%[qQwWx]?{",e:"}"},{b:"%[qQwWx]?<",e:">"},{b:"%[qQwWx]?/",e:"/"},{b:"%[qQwWx]?%",e:"%"},{b:"%[qQwWx]?-",e:"-"},{b:"%[qQwWx]?\\|",e:"\\|"},{b:/\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/}]},i={cN:"params",b:"\\(",e:"\\)",k:r},d=[t,a,{cN:"class",bK:"class module",e:"$|;",i:/=/,c:[e.inherit(e.TM,{b:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"}),{cN:"inheritance",b:"<\\s*",c:[{cN:"parent",b:"("+e.IR+"::)?"+e.IR}]}].concat(n)},{cN:"function",bK:"def",e:" |$|;",r:0,c:[e.inherit(e.TM,{b:c}),i].concat(n)},{cN:"constant",b:"(::)?(\\b[A-Z]\\w*(::)?)+",r:0},{cN:"symbol",b:e.UIR+"(\\!|\\?)?:",r:0},{cN:"symbol",b:":",c:[t,{b:c}],r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{cN:"variable",b:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},{b:"("+e.RSR+")\\s*",c:[a,{cN:"regexp",c:[e.BE,s],i:/\n/,v:[{b:"/",e:"/[a-z]*"},{b:"%r{",e:"}[a-z]*"},{b:"%r\\(",e:"\\)[a-z]*"},{b:"%r!",e:"![a-z]*"},{b:"%r\\[",e:"\\][a-z]*"}]}].concat(n),r:0}].concat(n);s.c=d,i.c=d;var o="[>?]>",l="[\\w#]+\\(\\w+\\):\\d+:\\d+>",u="(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",N=[{b:/^\s*=>/,cN:"status",starts:{e:"$",c:d}},{cN:"prompt",b:"^("+o+"|"+l+"|"+u+")",starts:{e:"$",c:d}}];return{aliases:["rb","gemspec","podspec","thor","irb"],k:r,c:n.concat(N).concat(d)}});hljs.registerLanguage("css",function(e){var c="[a-zA-Z-][a-zA-Z0-9_-]*",a={cN:"function",b:c+"\\(",rB:!0,eE:!0,e:"\\("},r={cN:"rule",b:/[A-Z\_\.\-]+\s*:/,rB:!0,e:";",eW:!0,c:[{cN:"attribute",b:/\S/,e:":",eE:!0,starts:{cN:"value",eW:!0,eE:!0,c:[a,e.CSSNM,e.QSM,e.ASM,e.CBCM,{cN:"hexcolor",b:"#[0-9A-Fa-f]+"},{cN:"important",b:"!important"}]}}]};return{cI:!0,i:/[=\/|']/,c:[e.CBCM,r,{cN:"id",b:/\#[A-Za-z0-9_-]+/},{cN:"class",b:/\.[A-Za-z0-9_-]+/,r:0},{cN:"attr_selector",b:/\[/,e:/\]/,i:"$"},{cN:"pseudo",b:/:(:)?[a-zA-Z0-9\_\-\+\(\)"']+/},{cN:"at_rule",b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{cN:"at_rule",b:"@",e:"[{;]",c:[{cN:"keyword",b:/\S+/},{b:/\s/,eW:!0,eE:!0,r:0,c:[a,e.ASM,e.QSM,e.CSSNM]}]},{cN:"tag",b:c,r:0},{cN:"rules",b:"{",e:"}",i:/\S/,r:0,c:[e.CBCM,r]}]}});

(function() {
  var addClass, deleteUndefined, hasClass, merge, removeClass, requestAnimationFrame, setOptions, transformKey,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty;

  if (this.Utils == null) {
    this.Utils = {
      modules: []
    };
  }

  addClass = function(element, name) {
    removeClass(element, name);
    return element.className += " " + name + " ";
  };

  removeClass = function(element, name) {
    var regExp;
    regExp = new RegExp("(\\s|^)" + name + "(\\s|$)", "gi");
    return element.className = element.className.replace(regExp, "");
  };

  hasClass = function(element, name) {
    return new RegExp("(^| )" + name + "( |$)", 'gi').test(element.className);
  };

  merge = function() {
    var extension, extensions, property, target, _i, _len;
    target = arguments[0], extensions = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = extensions.length; _i < _len; _i++) {
      extension = extensions[_i];
      for (property in extension) {
        if (!__hasProp.call(extension, property)) continue;
        target[property] = extension[property];
      }
    }
    return target;
  };

  setOptions = function(options, defaults) {
    return merge({}, defaults, options);
  };

  deleteUndefined = function(obj) {
    var key, value, _results;
    _results = [];
    for (key in obj) {
      value = obj[key];
      if (value === null || value === void 0) {
        _results.push(delete obj[key]);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  transformKey = (function() {
    var el, key, transforms, _i, _len;
    el = document.createElement('div');
    transforms = ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
    for (_i = 0, _len = transforms.length; _i < _len; _i++) {
      key = transforms[_i];
      if (el.style[key] !== void 0) {
        return key;
      }
    }
  })();

  requestAnimationFrame = ((function(window) {
    var vendor, _i, _len, _ref;
    _ref = ['ms', 'moz', 'webkit', 'o'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      vendor = _ref[_i];
      if (window.requestAnimationFrame) {
        break;
      }
      window.requestAnimationFrame = window["" + vendor + "RequestAnimationFrame"];
    }
    return window.requestAnimationFrame || (window.requestAnimationFrame = function(callback) {
      return setTimeout(callback, 1000 / 60);
    });
  })(window)).bind(window);

  this.Utils = {
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    merge: merge,
    setOptions: setOptions,
    deleteUndefined: deleteUndefined,
    transformKey: transformKey,
    requestAnimationFrame: requestAnimationFrame
  };

}).call(this);

(function() {
  var addClass, createContext, hasClass, merge, removeClass, setOptions, transformKey, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ref = this.Utils, addClass = _ref.addClass, removeClass = _ref.removeClass, hasClass = _ref.hasClass, merge = _ref.merge, setOptions = _ref.setOptions, transformKey = _ref.transformKey;

  createContext = function(options) {
    var Anchor;
    return Anchor = (function() {
      var documentYBoundary, getXBounds, getYBounds;

      Anchor.prototype.defaults = {
        classPrefix: "us-anchor",
        openEvent: "click",
        showClose: true,
        isAjax: false
      };

      function Anchor(options) {
        var _ref1, _ref2;
        _ref1 = this.options = setOptions(options, this.defaults), this.target = _ref1.target, this.classPrefix = _ref1.classPrefix;
        if (this.target === null) {
          return;
        }
        this._boundEvents = [];
        this._closeTargets = [];
        _ref2 = this.create(), this.anchor = _ref2.anchor, this.arrow = _ref2.arrow, this.content = _ref2.content;
        this.setEvents(this.anchor);
        this.watchWindow();
      }

      Anchor.prototype.setEvents = function(anchor) {
        var hide, toggle;
        toggle = (function(_this) {
          return function(event) {
            event.preventDefault();
            event.stopPropagation();
            if (!_this.isOpen()) {
              return _this.show(anchor);
            } else {
              return _this.hide(anchor);
            }
          };
        })(this);
        hide = (function(_this) {
          return function(event) {
            var _ref1;
            if (!_this.isOpen()) {
              return;
            }
            if (_ref1 = event.target, __indexOf.call(_this._closeTargets, _ref1) >= 0) {
              event.preventDefault();
              event.stopPropagation();
              _this.hide(anchor);
            }
            if (event.target === anchor || anchor.contains(event.target)) {
              return;
            }
            if (event.target === _this.target || _this.target.contains(event.target)) {
              return;
            }
            return _this.hide(anchor);
          };
        })(this);
        this._on(this.target, this.options.openEvent, toggle);
        return this._on(document, this.options.openEvent, hide);
      };

      Anchor.prototype._on = function(element, event, handler) {
        this._boundEvents.push({
          element: element,
          event: event,
          handler: handler
        });
        return element.addEventListener(event, handler, false);
      };

      Anchor.prototype.show = function(anchor) {
        var fire, _ref1, _ref2;
        fire = (function(_this) {
          return function() {
            _this.content.appendChild(_this.options.content);
            if (!anchor.parentNode) {
              document.body.appendChild(anchor);
            }
            addClass(anchor, "" + _this.classPrefix + "--open");
            setTimeout(function() {
              return addClass(anchor, "" + _this.classPrefix + "--after-open");
            });
            return _this.setPosition();
          };
        })(this);
        if (this.options.isAjax) {
          return (_ref1 = this.options.onOpen) != null ? _ref1.call().done(function() {
            return fire();
          }) : void 0;
        } else {
          fire();
          return (_ref2 = this.options.onOpen) != null ? _ref2.call() : void 0;
        }
      };

      Anchor.prototype.hide = function(anchor) {
        var _ref1;
        removeClass(anchor, "" + this.classPrefix + "--open");
        removeClass(anchor, "" + this.classPrefix + "--after-open");
        return (_ref1 = this.options.onClose) != null ? _ref1.call() : void 0;
      };

      Anchor.prototype.isOpen = function() {
        return hasClass(this.anchor, "" + this.classPrefix + "--open");
      };

      Anchor.prototype.create = function() {
        var anchor, anchorCss, arrow, arrowInner, closeButton, content;
        content = document.createElement("div");
        addClass(content, "" + this.classPrefix + "__content");
        arrow = document.createElement("div");
        arrowInner = document.createElement("div");
        arrow.appendChild(arrowInner);
        addClass(arrowInner, "" + this.classPrefix + "__arrow-inner");
        addClass(arrow, "" + this.classPrefix + "__arrow");
        content.appendChild(arrow);
        if (this.options.showClose) {
          closeButton = document.createElement("a");
          closeButton.href = "#";
          addClass(closeButton, "" + this.classPrefix + "__close-button");
          content.appendChild(closeButton);
          this._closeTargets.push(closeButton);
        }
        anchor = document.createElement("div");
        addClass(anchor, this.classPrefix);
        anchorCss = anchor.style;
        anchorCss.position = 'absolute';
        anchorCss.zIndex = '9999';
        anchorCss.top = '0px';
        anchorCss.left = '0px';
        anchor.appendChild(content);
        addClass(document.documentElement, "" + this.classPrefix + "--ready");
        return {
          anchor: anchor,
          arrow: arrow,
          content: content
        };
      };

      Anchor.prototype.setPosition = function() {
        var bottomOffset, leftOffset, style, targetBounds, transformXOrigin, transformYOrigin;
        leftOffset = getXBounds(this.target, this.anchor, this.arrow);
        targetBounds = this.target.getBoundingClientRect();
        if (documentYBoundary(targetBounds, this.anchor)) {
          addClass(this.anchor, "" + this.classPrefix + "--bottom");
          removeClass(this.anchor, "" + this.classPrefix + "--top");
          transformYOrigin = "calc(100% + 12px)";
          bottomOffset = getYBounds(this.target, this.anchor, this.arrow);
        } else {
          addClass(this.anchor, "" + this.classPrefix + "--top");
          removeClass(this.anchor, "" + this.classPrefix + "--bottom");
          transformYOrigin = "-12px";
          bottomOffset = getYBounds(this.target, this.anchor, this.arrow);
        }
        style = "translateX(" + (Math.round(leftOffset)) + "px) ";
        style += "translateY(" + (Math.round(bottomOffset)) + "px)";
        if (transformKey !== 'msTransform') {
          style += " translateZ(0)";
        }
        this.anchor.style[transformKey] = style;
        transformXOrigin = (targetBounds.left - this.anchor.getBoundingClientRect().left) + (this.target.offsetWidth / 2);
        this.arrow.style.left = "" + transformXOrigin + "px";
        return this.content.style["" + transformKey + "Origin"] = "" + transformXOrigin + "px " + transformYOrigin;
      };

      getXBounds = function(target, anchor, arrow) {
        var calculatedWidth, centerPoint, targetBounds;
        targetBounds = target.getBoundingClientRect();
        centerPoint = targetBounds.left + target.offsetWidth / 2;
        calculatedWidth = targetBounds.left + (anchor.offsetWidth / 2) + (target.offsetWidth / 2);
        if (document.body.offsetWidth < calculatedWidth) {
          return document.body.offsetWidth - anchor.offsetWidth;
        } else if (centerPoint - anchor.offsetWidth / 2 < 0) {
          return 0;
        } else {
          return targetBounds.left - (anchor.offsetWidth / 2) + (target.offsetWidth / 2);
        }
      };

      getYBounds = function(target, anchor, arrow) {
        var targetBounds;
        targetBounds = target.getBoundingClientRect();
        if (documentYBoundary(targetBounds, anchor)) {
          return targetBounds.top - (anchor.offsetHeight - window.pageYOffset) + arrow.offsetHeight - target.offsetHeight;
        } else {
          return targetBounds.top + arrow.offsetHeight + target.offsetHeight + window.pageYOffset;
        }
      };

      documentYBoundary = function(target, anchor) {
        if (target.top < anchor.offsetHeight) {
          return;
        }
        return (window.innerHeight - target.top) < anchor.offsetHeight;
      };

      Anchor.prototype.watchWindow = function() {
        var event, _i, _len, _ref1, _results;
        _ref1 = ['resize', 'scroll', 'touchmove'];
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          event = _ref1[_i];
          _results.push(window.addEventListener(event, (function(_this) {
            return function(event) {
              var lastFired, maxWait, now, throttle, timer;
              if (!_this.isOpen()) {
                return;
              }
              now = +(new Date);
              throttle = 16;
              maxWait = throttle * 3;
              if (!timer) {
                if (now - lastFired > maxWait) {
                  _this.setPosition();
                  lastFired = now;
                }
                return timer = setTimeout(function(o) {
                  timer = null;
                  lastFired = +(new Date);
                  return _this.setPosition();
                }, throttle);
              }
            };
          })(this), false));
        }
        return _results;
      };

      Anchor;

      return Anchor;

    })();
  };

  window.Anchor = createContext();

}).call(this);

(function() {
  window.Backdrop = (function() {
    var backdrop, holds;

    backdrop = null;

    holds = 0;

    function Backdrop() {
      backdrop = document.createElement('div');
      Utils.addClass(backdrop, 'us-backdrop');
      document.body.appendChild(backdrop);
    }

    Backdrop.prototype.element = backdrop;

    Backdrop.prototype.retain = function() {
      if (++holds === 1) {
        Utils.addClass(backdrop, 'us-backdrop--visible');
        return Utils.requestAnimationFrame(function() {
          return Utils.addClass(backdrop, 'us-backdrop--active');
        });
      }
    };

    Backdrop.prototype.release = function() {
      if (--holds === 0) {
        return Utils.requestAnimationFrame(function() {
          Utils.removeClass(backdrop, 'us-backdrop--active');
          return setTimeout(function() {
            return Utils.removeClass(backdrop, 'us-backdrop--visible');
          }, 300);
        });
      }
    };

    return Backdrop;

  })();

}).call(this);

(function() {
  var addClass, hasClass, removeClass, requestAnimationFrame, setOptions, _ref;

  _ref = this.Utils, setOptions = _ref.setOptions, hasClass = _ref.hasClass, addClass = _ref.addClass, removeClass = _ref.removeClass, requestAnimationFrame = _ref.requestAnimationFrame;

  window.Overlay = (function() {
    var defaults;

    defaults = {
      bodyActiveClass: 'overlay--open',
      activeClass: 'us-overlay-parent--active',
      visibleClass: 'us-overlay-parent--visible',
      overlay: $('.us-overlay-parent'),
      openButton: '.js-open-overlay',
      closeButton: '.js-close-overlay',
      historyStatus: '#seedeal',
      history: false,
      preventDefault: true,
      animationSpeed: 300
    };

    function Overlay(options) {
      this.overlay = (this.options = setOptions(options, defaults)).overlay;
      if ((this.overlay != null) && (typeof Backdrop !== "undefined" && Backdrop !== null)) {
        this.backdrop = new Backdrop();
        this.addEventListeners();
      } else {
        throw new Error("There's no overlay or you haven't included Backdrop");
      }
    }

    Overlay.prototype.addEventListeners = function() {
      $(this.options.openButton).on('click.open-overlay', (function(_this) {
        return function(e) {
          if (_this.options.preventDefault) {
            e.preventDefault();
          }
          return _this.show(e);
        };
      })(this));
      this.overlay.on('click.close-overlay', (function(_this) {
        return function(e) {
          var target, targets, _i, _len, _results;
          targets = [_this.overlay[0], _this.overlay.find(_this.options.closeButton)[0]];
          _results = [];
          for (_i = 0, _len = targets.length; _i < _len; _i++) {
            target = targets[_i];
            if (e.target === target) {
              if (_this.options.preventDefault) {
                e.preventDefault();
              }
              _this.hide(e);
              break;
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        };
      })(this));
      if (this.hasHistory()) {
        return window.onpopstate = (function(_this) {
          return function(e) {
            if (_this.isOpen()) {
              return _this.hide(e);
            }
          };
        })(this);
      }
    };

    Overlay.prototype.show = function(e) {
      var that, _base;
      that = this;
      $(document.body).addClass(this.options.bodyActiveClass);
      this.backdrop.retain();
      addClass(this.overlay[0], this.options.visibleClass);
      requestAnimationFrame(function() {
        return addClass(that.overlay[0], that.options.activeClass);
      });
      if (typeof (_base = this.options).onOpen === "function") {
        _base.onOpen(e);
      }
      if (this.hasHistory()) {
        return history.pushState('open', window.document.title, this.options.historyStatus);
      }
    };

    Overlay.prototype.hide = function(e) {
      var that, _base;
      that = this;
      $(document.body).removeClass(this.options.bodyActiveClass);
      this.backdrop.release();
      requestAnimationFrame(function() {
        removeClass(that.overlay[0], that.options.activeClass);
        return setTimeout(function() {
          return removeClass(that.overlay[0], that.options.visibleClass);
        }, that.options.animationSpeed);
      });
      if (typeof (_base = this.options).onClose === "function") {
        _base.onClose(e);
      }
      if (this.hasHistory()) {
        if (history.state === 'open') {
          return history.back();
        }
      }
    };

    Overlay.prototype.isOpen = function() {
      return hasClass(this.overlay[0], this.options.activeClass);
    };

    Overlay.prototype.hasHistory = function() {
      return this.options.history && window.history && window.history.pushState;
    };

    return Overlay;

  })();

}).call(this);

(function() {
  var createContext, setOptions;

  setOptions = this.Utils.setOptions;

  createContext = function(options) {
    var Tabs;
    return Tabs = (function() {
      var getSelector, scrollToTab;

      Tabs.prototype.defaults = {
        tabContainer: ".us-tabs",
        tabLinks: ".us-tabs-nav-mainlink",
        tabTitle: "us-tab-title",
        changeUrls: true,
        activeClass: "active"
      };

      function Tabs(options) {
        var _ref;
        _ref = this.options = setOptions(options, this.defaults), this.tabContainer = _ref.tabContainer, this.tabLinks = _ref.tabLinks;
        this.tabs = $(this.tabContainer);
        this.tab = this.tabs.find(this.tabLinks);
        this.filter = this.tab.data("target") ? "data-target" : "href";
        this.hash = window.location.hash;
        this.init();
        $(this.tabLinks).on("click.ustyle.tab", (function(_this) {
          return function(e) {
            var target;
            target = $(e.currentTarget);
            _this.navigateTo(target);
            _this.hashChange(target);
            return e.preventDefault();
          };
        })(this));
      }

      Tabs.prototype.init = function() {
        var $first, $initialHash;
        $first = this.tab.hasClass(this.options.activeClass) ? this.tab.filter("." + this.options.activeClass) : this.tab.first();
        $initialHash = this.tab.filter("[" + this.filter + "='" + (this.hash.replace("!", "")) + "']");
        if ($initialHash.length) {
          return this.navigateTo($initialHash);
        } else {
          return this.navigateTo($first);
        }
      };

      Tabs.prototype.hashChange = function(selector) {
        if (!this.options.changeUrls) {
          return;
        }
        return location.replace("#!" + (getSelector(selector).replace(/#/, "")));
      };

      Tabs.prototype.navigateTo = function(activeSelector) {
        var $selected, selector;
        selector = getSelector(activeSelector);
        $selected = $(selector);
        this.tab.removeClass(this.options.activeClass).end();
        this.tab.filter("[" + this.filter + "='" + selector + "']").addClass(this.options.activeClass);
        $selected.siblings("." + this.options.activeClass).removeClass(this.options.activeClass).end().addClass(this.options.activeClass);
        if (activeSelector.parent().hasClass(this.options.tabTitle)) {
          scrollToTab($selected);
        }
        return $selected.trigger("ustyle.tab.active");
      };

      getSelector = function(clicked) {
        return clicked.data("target") || clicked.attr("href");
      };

      scrollToTab = function(activeTab) {
        return $("html,body").scrollTop(activeTab.offset().top);
      };

      Tabs;

      return Tabs;

    })();
  };

  window.Tabs = createContext();

}).call(this);

(function() {
  window.ClassToggler = (function() {
    var defaults;

    defaults = {
      containerClass: null,
      $target: null,
      activeClass: "active",
      inactiveClass: null,
      toggleOn: 'click'
    };

    function ClassToggler(options) {
      this.options = Utils.setOptions(options, defaults);
      if (this.options.$target) {
        this.addEventListeners();
      } else {
        console.trace("ClassToggle", this.options);
      }
    }

    ClassToggler.prototype.addEventListeners = function() {
      return this.options.$target.on(this.options.toggleOn, (function(_this) {
        return function(e) {
          var $togglableElement;
          $togglableElement = _this.options.containerClass ? $(e.target).closest(_this.options.containerClass) : $(e.delegateTarget);
          if (_this.isActive($togglableElement)) {
            return _this.hide($togglableElement, e);
          } else {
            return _this.show($togglableElement, e);
          }
        };
      })(this));
    };

    ClassToggler.prototype.isActive = function($togglableElement) {
      return $togglableElement.hasClass(this.options.activeClass);
    };

    ClassToggler.prototype.show = function($togglableElement, e) {
      var _base;
      if (typeof (_base = this.options).onShow === "function") {
        _base.onShow($togglableElement, e);
      }
      return $togglableElement.addClass(this.options.activeClass);
    };

    ClassToggler.prototype.hide = function($togglableElement, e) {
      var _base;
      if (typeof (_base = this.options).onHide === "function") {
        _base.onHide($togglableElement, e);
      }
      return $togglableElement.removeClass(this.options.activeClass);
    };

    return ClassToggler;

  })();

}).call(this);

(function() {
  window.RadioToggle = (function() {
    var defaults;

    defaults = {
      $target: $(".us-toggle")
    };

    function RadioToggle(options) {
      this.options = Utils.setOptions(options, defaults);
      if (this.options.$target) {
        this.addEventListeners();
      } else {
        throw new Error("No target defined");
      }
    }

    RadioToggle.prototype.addEventListeners = function() {
      return this.options.$target.on("change", "input:radio", function(e) {
        $("input[name=" + this.name + "]").removeClass("checked");
        if (this.checked) {
          $(this).addClass("checked");
        }
        return e.stopPropagation();
      });
    };

    return RadioToggle;

  })();

}).call(this);

function cleanWhiteSpace(codeBlocks){
    if (!codeBlocks) return;

    for (var i = codeBlocks.length - 1; i >= 0; i--) {
      var codeBlock = codeBlocks[i],
          lines, offset;

      var text = codeBlock.textContent || codeBlock.innerText;

      lines = text.split( '\n' );

      if ( lines.length > 1 && lines[ lines.length - 1 ].trim() === '' ){
        lines.pop();
      }

      var canClean = lines[1] != undefined;

      if (canClean) {
          // how much white-space do we need to remove form each line?
        offset = lines[ 1 ].match( /^\s*/ )[ 0 ].length;

        // remove the excess white-space from the beginning of each line
        lines = lines.map( function ( line ) {
            return line.slice( offset );
        });

        lines.shift();

        codeBlock.textContent = lines.join( '\n' );  
      }

      hljs.highlightBlock(codeBlock);
    };
  }

function humanFileSize(size) {
  if(size < 1024) return size;
  var i = Math.floor( Math.log(size) / Math.log(1024) );
  return ( size / Math.pow(1024, i) ).toFixed(2) * 1  + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

if (typeof reportData !== 'undefined' && reportData) {
  google.load('visualization', '1.1', {packages:['line']});
  google.setOnLoadCallback(drawChart);
}

function drawChart() {
  var simplicityData, simplicityTable, simplicityOptions, simplicityChart,
  sizeData, sizeTable, sizeOptions, sizeChart,
  formatter;

  simplicityData = reportData.reverse().map(function(e){return [e.version, e.rules, e.selectors]});
  simplicityData.unshift(['Version', 'Rules', 'Selectors']);
  simplicityTable = google.visualization.arrayToDataTable(simplicityData);

  simplicityOptions = {
    chart: {
      title: 'Simplicity chart',
      subtitle: 'Evolution of rules and selectors over ustyle releases',
      vAxis: {
        format: ''
      }
    }
  };

  simplicityChart = new google.charts.Line(document.getElementById('simplicity_chart'));
  simplicityChart.draw(simplicityTable, simplicityOptions);

  sizeData = reportData.map(function(e){return [e.version, e.size]});
  sizeData.unshift(['Version', 'Size (bytes)']);
  sizeTable = google.visualization.arrayToDataTable(sizeData);

  sizeOptions = {
    chart: {
      title: 'Size chart',
      subtitle: 'Evolution of ustyle size over releases',
      vAxis: {
        format: ''
      }
    }
  };

  sizeChart = new google.charts.Line(document.getElementById('size_chart'));
  sizeChart.draw(sizeTable, sizeOptions);

};

(function(document, window, cleanWhiteSpace, gumshoe, $, Overlay, ClassToggler, Tabs, Anchor, RadioToggle){
  "use strict";

  function App(){
    gumshoe.init({
      activeClass: 'sidebar__nav-link--active',
      offset: 190
    });

    var toggleLinks = document.querySelectorAll(".js-toggle__link");

    for (var i = toggleLinks.length - 1; i >= 0; i--) {
      var toggleLink = toggleLinks[i];
      toggleLink.addEventListener("click", clickToggle, false);
    };

    cleanWhiteSpace(document.querySelectorAll('pre code'));

    var overlays = [];

    $(".js-open-overlay").each(function(e){
      overlays.push( 
        new Overlay({
          openButton: $(".js-open-overlay[modifier='"+$(this).attr('modifier')+"']"),
          overlay: $(".us-overlay-parent[modifier='"+$(this).attr('modifier')+"']")
        })
      )
    })

    var tooltips = new ClassToggler({
      containerClass: '.us-tooltip',
      $target: $('.us-tooltip__icon'),
      activeClass: "us-tooltip--active"
    });
    
    var tabs = new Tabs();
    var radio = new RadioToggle();
    var anchor = new Anchor({
      target: document.querySelector(".js-example-anchor"),
      content: document.querySelector(".js-example-anchor__target")
    });
  }

  function clickToggle(event){
    var toggleLink = this;
    var target = document.querySelector("." + toggleLink.getAttribute("data-target"));
    var targetActiveClass = getActiveClass(target);
    var activeClass = getActiveClass(toggleLink);
    toggleLink.classList.toggle(activeClass);
    target.classList.toggle(targetActiveClass);
  }

  function getActiveClass(selector){
    return selector.classList[0] + "--active";
  }

  return new App();

})(document, window, cleanWhiteSpace, gumshoe, $, Overlay, ClassToggler, Tabs, Anchor, RadioToggle);
