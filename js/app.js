/** gumshoe v1.0.2, by Chris Ferdinandi | http://github.com/cferdinandi/gumshoe | Licensed under MIT: http://gomakethings.com/mit/ */
!function(e,t){"function"==typeof define&&define.amd?define([],t(e)):"object"==typeof exports?module.exports=t(e):e.gumshoe=t(e)}(this,function(e){"use strict";var t,n,a,r,o,c,i={},s=!!document.querySelector&&!!e.addEventListener,l=[],u={offset:0,activeClass:"active",callbackBefore:function(){},callbackAfter:function(){}},f=function(e,t,n){if("[object Object]"===Object.prototype.toString.call(e))for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.call(n,e[a],a,e);else for(var r=0,o=e.length;o>r;r++)t.call(n,e[r],r,e)},d=function(e,t){var n={};return f(e,function(t,a){n[a]=e[a]}),f(t,function(e,a){n[a]=t[a]}),n},v=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},m=function(e){return Math.max(e.scrollHeight,e.offsetHeight,e.clientHeight)},h=function(e){var n=0;if(e.offsetParent)do n+=e.offsetTop,e=e.offsetParent;while(e);return n=n-o-t.offset,n>=0?n:0},g=function(){l.sort(function(e,t){return e.distance>t.distance?-1:e.distance<t.distance?1:0})};i.setDistances=function(){a=v(),o=r?m(r)+h(r):0,f(l,function(e){e.distance=h(e.target)}),g()};var p=function(){var e=document.querySelectorAll("[data-gumshoe] a");f(e,function(e){e.hash&&l.push({nav:e,target:document.querySelector(e.hash),parent:"li"===e.parentNode.tagName.toLowerCase()?e.parentNode:null,distance:0})})},y=function(e){c&&(c.nav.classList.remove(t.activeClass),c.parent&&c.parent.classList.remove(t.activeClass)),t.callbackBefore(e),e.nav.classList.add(t.activeClass),e.parent&&e.parent.classList.add(t.activeClass),t.callbackAfter(e),c={nav:e.nav,parent:e.parent}};i.getCurrentNav=function(){var t=e.pageYOffset;if(e.innerHeight+t>=a)return y(l[0]);for(var n=0,r=l.length;r>n;n++){var o=l[n];if(o.distance<t)return y(o)}};var b=function(){f(l,function(e){e.nav.classList.contains(t.activeClass)&&(c={nav:e.nav,parent:e.parent})})};i.destroy=function(){t&&(e.removeEventListener("resize",C,!1),e.removeEventListener("scroll",C,!1),l=[],t=null,n=null,a=null,r=null,o=null,c=null)};var C=function(e){n||(n=setTimeout(function(){n=null,"scroll"===e.type&&i.getCurrentNav(),"resize"===e.type&&(i.setDistances(),i.getCurrentNav())},66))};return i.init=function(n){s&&(i.destroy(),t=d(u,n||{}),r=document.querySelector("[data-gumshoe-header]"),p(),0!==l.length&&(b(),i.setDistances(),i.getCurrentNav(),e.addEventListener("resize",C,!1),e.addEventListener("scroll",C,!1)))},i});

var hljs=new function(){function j(v){return v.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function t(v){return v.nodeName.toLowerCase()}function h(w,x){var v=w&&w.exec(x);return v&&v.index==0}function r(w){var v=(w.className+" "+(w.parentNode?w.parentNode.className:"")).split(/\s+/);v=v.map(function(x){return x.replace(/^lang(uage)?-/,"")});return v.filter(function(x){return i(x)||x=="no-highlight"})[0]}function o(x,y){var v={};for(var w in x){v[w]=x[w]}if(y){for(var w in y){v[w]=y[w]}}return v}function u(x){var v=[];(function w(y,z){for(var A=y.firstChild;A;A=A.nextSibling){if(A.nodeType==3){z+=A.nodeValue.length}else{if(t(A)=="br"){z+=1}else{if(A.nodeType==1){v.push({event:"start",offset:z,node:A});z=w(A,z);v.push({event:"stop",offset:z,node:A})}}}}return z})(x,0);return v}function q(w,y,C){var x=0;var F="";var z=[];function B(){if(!w.length||!y.length){return w.length?w:y}if(w[0].offset!=y[0].offset){return(w[0].offset<y[0].offset)?w:y}return y[0].event=="start"?w:y}function A(H){function G(I){return" "+I.nodeName+'="'+j(I.value)+'"'}F+="<"+t(H)+Array.prototype.map.call(H.attributes,G).join("")+">"}function E(G){F+="</"+t(G)+">"}function v(G){(G.event=="start"?A:E)(G.node)}while(w.length||y.length){var D=B();F+=j(C.substr(x,D[0].offset-x));x=D[0].offset;if(D==w){z.reverse().forEach(E);do{v(D.splice(0,1)[0]);D=B()}while(D==w&&D.length&&D[0].offset==x);z.reverse().forEach(A)}else{if(D[0].event=="start"){z.push(D[0].node)}else{z.pop()}v(D.splice(0,1)[0])}}return F+j(C.substr(x))}function m(y){function v(z){return(z&&z.source)||z}function w(A,z){return RegExp(v(A),"m"+(y.cI?"i":"")+(z?"g":""))}function x(D,C){if(D.compiled){return}D.compiled=true;D.k=D.k||D.bK;if(D.k){var z={};function E(G,F){if(y.cI){F=F.toLowerCase()}F.split(" ").forEach(function(H){var I=H.split("|");z[I[0]]=[G,I[1]?Number(I[1]):1]})}if(typeof D.k=="string"){E("keyword",D.k)}else{Object.keys(D.k).forEach(function(F){E(F,D.k[F])})}D.k=z}D.lR=w(D.l||/\b[A-Za-z0-9_]+\b/,true);if(C){if(D.bK){D.b="\\b("+D.bK.split(" ").join("|")+")\\b"}if(!D.b){D.b=/\B|\b/}D.bR=w(D.b);if(!D.e&&!D.eW){D.e=/\B|\b/}if(D.e){D.eR=w(D.e)}D.tE=v(D.e)||"";if(D.eW&&C.tE){D.tE+=(D.e?"|":"")+C.tE}}if(D.i){D.iR=w(D.i)}if(D.r===undefined){D.r=1}if(!D.c){D.c=[]}var B=[];D.c.forEach(function(F){if(F.v){F.v.forEach(function(G){B.push(o(F,G))})}else{B.push(F=="self"?D:F)}});D.c=B;D.c.forEach(function(F){x(F,D)});if(D.starts){x(D.starts,C)}var A=D.c.map(function(F){return F.bK?"\\.?("+F.b+")\\.?":F.b}).concat([D.tE,D.i]).map(v).filter(Boolean);D.t=A.length?w(A.join("|"),true):{exec:function(F){return null}};D.continuation={}}x(y)}function c(S,L,J,R){function v(U,V){for(var T=0;T<V.c.length;T++){if(h(V.c[T].bR,U)){return V.c[T]}}}function z(U,T){if(h(U.eR,T)){return U}if(U.eW){return z(U.parent,T)}}function A(T,U){return !J&&h(U.iR,T)}function E(V,T){var U=M.cI?T[0].toLowerCase():T[0];return V.k.hasOwnProperty(U)&&V.k[U]}function w(Z,X,W,V){var T=V?"":b.classPrefix,U='<span class="'+T,Y=W?"":"</span>";U+=Z+'">';return U+X+Y}function N(){if(!I.k){return j(C)}var T="";var W=0;I.lR.lastIndex=0;var U=I.lR.exec(C);while(U){T+=j(C.substr(W,U.index-W));var V=E(I,U);if(V){H+=V[1];T+=w(V[0],j(U[0]))}else{T+=j(U[0])}W=I.lR.lastIndex;U=I.lR.exec(C)}return T+j(C.substr(W))}function F(){if(I.sL&&!f[I.sL]){return j(C)}var T=I.sL?c(I.sL,C,true,I.continuation.top):e(C);if(I.r>0){H+=T.r}if(I.subLanguageMode=="continuous"){I.continuation.top=T.top}return w(T.language,T.value,false,true)}function Q(){return I.sL!==undefined?F():N()}function P(V,U){var T=V.cN?w(V.cN,"",true):"";if(V.rB){D+=T;C=""}else{if(V.eB){D+=j(U)+T;C=""}else{D+=T;C=U}}I=Object.create(V,{parent:{value:I}})}function G(T,X){C+=T;if(X===undefined){D+=Q();return 0}var V=v(X,I);if(V){D+=Q();P(V,X);return V.rB?0:X.length}var W=z(I,X);if(W){var U=I;if(!(U.rE||U.eE)){C+=X}D+=Q();do{if(I.cN){D+="</span>"}H+=I.r;I=I.parent}while(I!=W.parent);if(U.eE){D+=j(X)}C="";if(W.starts){P(W.starts,"")}return U.rE?0:X.length}if(A(X,I)){throw new Error('Illegal lexeme "'+X+'" for mode "'+(I.cN||"<unnamed>")+'"')}C+=X;return X.length||1}var M=i(S);if(!M){throw new Error('Unknown language: "'+S+'"')}m(M);var I=R||M;var D="";for(var K=I;K!=M;K=K.parent){if(K.cN){D+=w(K.cN,D,true)}}var C="";var H=0;try{var B,y,x=0;while(true){I.t.lastIndex=x;B=I.t.exec(L);if(!B){break}y=G(L.substr(x,B.index-x),B[0]);x=B.index+y}G(L.substr(x));for(var K=I;K.parent;K=K.parent){if(K.cN){D+="</span>"}}return{r:H,value:D,language:S,top:I}}catch(O){if(O.message.indexOf("Illegal")!=-1){return{r:0,value:j(L)}}else{throw O}}}function e(y,x){x=x||b.languages||Object.keys(f);var v={r:0,value:j(y)};var w=v;x.forEach(function(z){if(!i(z)){return}var A=c(z,y,false);A.language=z;if(A.r>w.r){w=A}if(A.r>v.r){w=v;v=A}});if(w.language){v.second_best=w}return v}function g(v){if(b.tabReplace){v=v.replace(/^((<[^>]+>|\t)+)/gm,function(w,z,y,x){return z.replace(/\t/g,b.tabReplace)})}if(b.useBR){v=v.replace(/\n/g,"<br>")}return v}function p(z){var y=b.useBR?z.innerHTML.replace(/\n/g,"").replace(/<br>|<br [^>]*>/g,"\n").replace(/<[^>]*>/g,""):z.textContent;var A=r(z);if(A=="no-highlight"){return}var v=A?c(A,y,true):e(y);var w=u(z);if(w.length){var x=document.createElementNS("http://www.w3.org/1999/xhtml","pre");x.innerHTML=v.value;v.value=q(w,u(x),y)}v.value=g(v.value);z.innerHTML=v.value;z.className+=" hljs "+(!A&&v.language||"");z.result={language:v.language,re:v.r};if(v.second_best){z.second_best={language:v.second_best.language,re:v.second_best.r}}}var b={classPrefix:"hljs-",tabReplace:null,useBR:false,languages:undefined};function s(v){b=o(b,v)}function l(){if(l.called){return}l.called=true;var v=document.querySelectorAll("pre code");Array.prototype.forEach.call(v,p)}function a(){addEventListener("DOMContentLoaded",l,false);addEventListener("load",l,false)}var f={};var n={};function d(v,x){var w=f[v]=x(this);if(w.aliases){w.aliases.forEach(function(y){n[y]=v})}}function k(){return Object.keys(f)}function i(v){return f[v]||f[n[v]]}this.highlight=c;this.highlightAuto=e;this.fixMarkup=g;this.highlightBlock=p;this.configure=s;this.initHighlighting=l;this.initHighlightingOnLoad=a;this.registerLanguage=d;this.listLanguages=k;this.getLanguage=i;this.inherit=o;this.IR="[a-zA-Z][a-zA-Z0-9_]*";this.UIR="[a-zA-Z_][a-zA-Z0-9_]*";this.NR="\\b\\d+(\\.\\d+)?";this.CNR="(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";this.BNR="\\b(0b[01]+)";this.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";this.BE={b:"\\\\[\\s\\S]",r:0};this.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[this.BE]};this.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[this.BE]};this.PWM={b:/\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/};this.CLCM={cN:"comment",b:"//",e:"$",c:[this.PWM]};this.CBCM={cN:"comment",b:"/\\*",e:"\\*/",c:[this.PWM]};this.HCM={cN:"comment",b:"#",e:"$",c:[this.PWM]};this.NM={cN:"number",b:this.NR,r:0};this.CNM={cN:"number",b:this.CNR,r:0};this.BNM={cN:"number",b:this.BNR,r:0};this.CSSNM={cN:"number",b:this.NR+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r:0};this.RM={cN:"regexp",b:/\//,e:/\/[gim]*/,i:/\n/,c:[this.BE,{b:/\[/,e:/\]/,r:0,c:[this.BE]}]};this.TM={cN:"title",b:this.IR,r:0};this.UTM={cN:"title",b:this.UIR,r:0}}();hljs.registerLanguage("coffeescript",function(c){var b={keyword:"in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",literal:"true false null undefined yes no on off",reserved:"case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf",built_in:"npm require console print module global window document"};var a="[A-Za-z$_][0-9A-Za-z$_]*";var f=c.inherit(c.TM,{b:a});var e={cN:"subst",b:/#\{/,e:/}/,k:b};var d=[c.BNM,c.inherit(c.CNM,{starts:{e:"(\\s*/)?",r:0}}),{cN:"string",v:[{b:/'''/,e:/'''/,c:[c.BE]},{b:/'/,e:/'/,c:[c.BE]},{b:/"""/,e:/"""/,c:[c.BE,e]},{b:/"/,e:/"/,c:[c.BE,e]}]},{cN:"regexp",v:[{b:"///",e:"///",c:[e,c.HCM]},{b:"//[gim]*",r:0},{b:"/\\S(\\\\.|[^\\n])*?/[gim]*(?=\\s|\\W|$)"}]},{cN:"property",b:"@"+a},{b:"`",e:"`",eB:true,eE:true,sL:"javascript"}];e.c=d;return{aliases:["coffee","cson","iced"],k:b,c:d.concat([{cN:"comment",b:"###",e:"###"},c.HCM,{cN:"function",b:"("+a+"\\s*=\\s*)?(\\(.*\\))?\\s*\\B[-=]>",e:"[-=]>",rB:true,c:[f,{cN:"params",b:"\\(",rB:true,c:[{b:/\(/,e:/\)/,k:b,c:["self"].concat(d)}]}]},{cN:"class",bK:"class",e:"$",i:/[:="\[\]]/,c:[{bK:"extends",eW:true,i:/[:="\[\]]/,c:[f]},f]},{cN:"attribute",b:a+":",e:":",rB:true,eE:true,r:0}])}});hljs.registerLanguage("css",function(a){var b="[a-zA-Z-][a-zA-Z0-9_-]*";var c={cN:"function",b:b+"\\(",rB:true,eE:true,e:"\\("};return{cI:true,i:"[=/|']",c:[a.CBCM,{cN:"id",b:"\\#[A-Za-z0-9_-]+"},{cN:"class",b:"\\.[A-Za-z0-9_-]+",r:0},{cN:"attr_selector",b:"\\[",e:"\\]",i:"$"},{cN:"pseudo",b:":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"},{cN:"at_rule",b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{cN:"at_rule",b:"@",e:"[{;]",c:[{cN:"keyword",b:/\S+/},{b:/\s/,eW:true,eE:true,r:0,c:[c,a.ASM,a.QSM,a.CSSNM]}]},{cN:"tag",b:b,r:0},{cN:"rules",b:"{",e:"}",i:"[^\\s]",r:0,c:[a.CBCM,{cN:"rule",b:"[^\\s]",rB:true,e:";",eW:true,c:[{cN:"attribute",b:"[A-Z\\_\\.\\-]+",e:":",eE:true,i:"[^\\s]",starts:{cN:"value",eW:true,eE:true,c:[c,a.CSSNM,a.QSM,a.ASM,a.CBCM,{cN:"hexcolor",b:"#[0-9A-Fa-f]+"},{cN:"important",b:"!important"}]}}]}]}]}});hljs.registerLanguage("ruby",function(f){var j="[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?";var i="and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor";var b={cN:"yardoctag",b:"@[A-Za-z]+"};var c={cN:"value",b:"#<",e:">"};var k={cN:"comment",v:[{b:"#",e:"$",c:[b]},{b:"^\\=begin",e:"^\\=end",c:[b],r:10},{b:"^__END__",e:"\\n$"}]};var d={cN:"subst",b:"#\\{",e:"}",k:i};var e={cN:"string",c:[f.BE,d],v:[{b:/'/,e:/'/},{b:/"/,e:/"/},{b:"%[qw]?\\(",e:"\\)"},{b:"%[qw]?\\[",e:"\\]"},{b:"%[qw]?{",e:"}"},{b:"%[qw]?<",e:">"},{b:"%[qw]?/",e:"/"},{b:"%[qw]?%",e:"%"},{b:"%[qw]?-",e:"-"},{b:"%[qw]?\\|",e:"\\|"},{b:/\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/}]};var a={cN:"params",b:"\\(",e:"\\)",k:i};var h=[e,c,k,{cN:"class",bK:"class module",e:"$|;",i:/=/,c:[f.inherit(f.TM,{b:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"}),{cN:"inheritance",b:"<\\s*",c:[{cN:"parent",b:"("+f.IR+"::)?"+f.IR}]},k]},{cN:"function",bK:"def",e:" |$|;",r:0,c:[f.inherit(f.TM,{b:j}),a,k]},{cN:"constant",b:"(::)?(\\b[A-Z]\\w*(::)?)+",r:0},{cN:"symbol",b:":",c:[e,{b:j}],r:0},{cN:"symbol",b:f.UIR+"(\\!|\\?)?:",r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{cN:"variable",b:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},{b:"("+f.RSR+")\\s*",c:[c,k,{cN:"regexp",c:[f.BE,d],i:/\n/,v:[{b:"/",e:"/[a-z]*"},{b:"%r{",e:"}[a-z]*"},{b:"%r\\(",e:"\\)[a-z]*"},{b:"%r!",e:"![a-z]*"},{b:"%r\\[",e:"\\][a-z]*"}]}],r:0}];d.c=h;a.c=h;var g=[{r:1,cN:"output",b:"^\\s*=> ",e:"$",rB:true,c:[{cN:"status",b:"^\\s*=>"},{b:" ",e:"$",c:h}]},{r:1,cN:"input",b:"^[^ ][^=>]*>+ ",e:"$",rB:true,c:[{cN:"prompt",b:"^[^ ][^=>]*>+"},{b:" ",e:"$",c:h}]}];return{aliases:["rb","gemspec","podspec","thor","irb"],k:i,c:g.concat(h)}});hljs.registerLanguage("haml",function(a){return{cI:true,c:[{cN:"doctype",b:"^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$",r:10},{cN:"comment",b:"^\\s*(!=#|=#|-#|/).*$",r:0},{b:"^\\s*(-|=|!=)(?!#)",starts:{e:"\\n",sL:"ruby"}},{cN:"tag",b:"^\\s*%",c:[{cN:"title",b:"\\w+"},{cN:"value",b:"[#\\.]\\w+"},{b:"{\\s*",e:"\\s*}",eE:true,c:[{b:":\\w+\\s*=>",e:",\\s+",rB:true,eW:true,c:[{cN:"symbol",b:":\\w+"},{cN:"string",b:'"',e:'"'},{cN:"string",b:"'",e:"'"},{b:"\\w+",r:0}]}]},{b:"\\(\\s*",e:"\\s*\\)",eE:true,c:[{b:"\\w+\\s*=",e:"\\s+",rB:true,eW:true,c:[{cN:"attribute",b:"\\w+",r:0},{cN:"string",b:'"',e:'"'},{cN:"string",b:"'",e:"'"},{b:"\\w+",r:0}]}]}]},{cN:"bullet",b:"^\\s*[=~]\\s*",r:0},{b:"#{",starts:{e:"}",sL:"ruby"}}]}});hljs.registerLanguage("javascript",function(a){return{aliases:["js"],k:{keyword:"in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document"},c:[{cN:"pi",b:/^\s*('|")use strict('|")/,r:10},a.ASM,a.QSM,a.CLCM,a.CBCM,a.CNM,{b:"("+a.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[a.CLCM,a.CBCM,a.RM,{b:/</,e:/>;/,r:0,sL:"xml"}],r:0},{cN:"function",bK:"function",e:/\{/,eE:true,c:[a.inherit(a.TM,{b:/[A-Za-z$_][0-9A-Za-z$_]*/}),{cN:"params",b:/\(/,e:/\)/,c:[a.CLCM,a.CBCM],i:/["'\(]/}],i:/\[|%/},{b:/\$[(.]/},{b:"\\."+a.IR,r:0}]}});hljs.registerLanguage("xml",function(a){var c="[A-Za-z0-9\\._:-]+";var d={b:/<\?(php)?(?!\w)/,e:/\?>/,sL:"php",subLanguageMode:"continuous"};var b={eW:true,i:/</,r:0,c:[d,{cN:"attribute",b:c,r:0},{b:"=",r:0,c:[{cN:"value",v:[{b:/"/,e:/"/},{b:/'/,e:/'/},{b:/[^\s\/>]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xsl","plist"],cI:true,c:[{cN:"doctype",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},{cN:"comment",b:"<!--",e:"-->",r:10},{cN:"cdata",b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{title:"style"},c:[b],starts:{e:"</style>",rE:true,sL:"css"}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{title:"script"},c:[b],starts:{e:"<\/script>",rE:true,sL:"javascript"}},{b:"<%",e:"%>",sL:"vbscript"},d,{cN:"pi",b:/<\?\w+/,e:/\?>/,r:10},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"title",b:"[^ /><]+",r:0},b]}]}});hljs.registerLanguage("markdown",function(a){return{aliases:["md","mkdown","mkd"],c:[{cN:"header",v:[{b:"^#{1,6}",e:"$"},{b:"^.+?\\n[=-]{2,}$"}]},{b:"<",e:">",sL:"xml",r:0},{cN:"bullet",b:"^([*+-]|(\\d+\\.))\\s+"},{cN:"strong",b:"[*_]{2}.+?[*_]{2}"},{cN:"emphasis",v:[{b:"\\*.+?\\*"},{b:"_.+?_",r:0}]},{cN:"blockquote",b:"^>\\s+",e:"$"},{cN:"code",v:[{b:"`.+?`"},{b:"^( {4}|\t)",e:"$",r:0}]},{cN:"horizontal_rule",b:"^[-\\*]{3,}",e:"$"},{b:"\\[.+?\\][\\(\\[].+?[\\)\\]]",rB:true,c:[{cN:"link_label",b:"\\[",e:"\\]",eB:true,rE:true,r:0},{cN:"link_url",b:"\\]\\(",e:"\\)",eB:true,eE:true},{cN:"link_reference",b:"\\]\\[",e:"\\]",eB:true,eE:true}],r:10},{b:"^\\[.+\\]:",e:"$",rB:true,c:[{cN:"link_reference",b:"\\[",e:"\\]",eB:true,eE:true},{cN:"link_url",b:"\\s",e:"$"}]}]}});hljs.registerLanguage("scss",function(a){var c="[a-zA-Z-][a-zA-Z0-9_-]*";var f={cN:"variable",b:"(\\$"+c+")\\b"};var d={cN:"function",b:c+"\\(",rB:true,eE:true,e:"\\("};var b={cN:"hexcolor",b:"#[0-9A-Fa-f]+"};var e={cN:"attribute",b:"[A-Z\\_\\.\\-]+",e:":",eE:true,i:"[^\\s]",starts:{cN:"value",eW:true,eE:true,c:[d,b,a.CSSNM,a.QSM,a.ASM,a.CBCM,{cN:"important",b:"!important"}]}};return{cI:true,i:"[=/|']",c:[a.CLCM,a.CBCM,d,{cN:"id",b:"\\#[A-Za-z0-9_-]+",r:0},{cN:"class",b:"\\.[A-Za-z0-9_-]+",r:0},{cN:"attr_selector",b:"\\[",e:"\\]",i:"$"},{cN:"tag",b:"\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",r:0},{cN:"pseudo",b:":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"},{cN:"pseudo",b:"::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"},f,{cN:"attribute",b:"\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",i:"[^\\s]"},{cN:"value",b:"\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"},{cN:"value",b:":",e:"$",c:[d,f,b,a.CSSNM,a.QSM,a.ASM,{cN:"important",b:"!important"}]},{cN:"at_rule",b:"@",e:"$",k:"mixin include extend for if else each while charset import debug media page content font-face namespace warn",c:[d,f,a.QSM,a.ASM,b,a.CSSNM,{cN:"preprocessor",b:"\\s[A-Za-z0-9_.-]+",r:0}]}]}});
(function() {
  var addClass, deleteUndefined, hasClass, merge, removeClass, setOptions, transformKey,
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
    return element.className = element.className.replace(new RegExp("(\\s|^)" + name + "(\\s|$)", "gi"), "");
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
    var el, key, _i, _len, _ref;
    el = document.createElement('div');
    _ref = ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      if (el.style[key] !== void 0) {
        return key;
      }
    }
  })();

  this.Utils = {
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    merge: merge,
    setOptions: setOptions,
    transformKey: transformKey,
    deleteUndefined: deleteUndefined
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
          return (_ref1 = this.options.onOpen) != null ? _ref1.call().done((function(_this) {
            return function() {
              return fire();
            };
          })(this)) : void 0;
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
        style = "translateX(" + (Math.round(leftOffset)) + "px) translateY(" + (Math.round(bottomOffset)) + "px)";
        if (transformKey !== 'msTransform') {
          style += " translateZ(0)";
        }
        this.anchor.style[transformKey] = style;
        transformXOrigin = (targetBounds.left - this.anchor.getBoundingClientRect().left) + (this.target.offsetWidth / 2);
        this.arrow.style.left = "" + transformXOrigin + "px";
        return this.content.style["" + transformKey + "Origin"] = "" + transformXOrigin + "px " + transformYOrigin;
      };

      getXBounds = function(target, anchor, arrow) {
        var centerPoint, targetBounds;
        targetBounds = target.getBoundingClientRect();
        centerPoint = targetBounds.left + target.offsetWidth / 2;
        if (document.body.offsetWidth < (targetBounds.left + (anchor.offsetWidth / 2) + (target.offsetWidth / 2))) {
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
  var setOptions;

  setOptions = this.Utils.setOptions;

  window.Overlay = (function() {
    var defaults;

    defaults = {
      openedClass: 'us-overlay--open',
      overlay: $('.us-overlay-parent'),
      openButton: $('.js-open-overlay'),
      closeButton: $('.js-close-overlay'),
      escapeKey: 27,
      historyStatus: '#seedeal',
      history: true,
      resetScroll: true,
      preventDefault: true
    };

    function Overlay(options) {
      this.overlay = (this.options = setOptions(options, defaults)).overlay;
      this.addEventListeners();
    }

    Overlay.prototype.addEventListeners = function() {
      this.options.openButton.on('click', (function(_this) {
        return function(e) {
          if (_this.options.preventDefault) {
            e.preventDefault();
          }
          return _this.show(e);
        };
      })(this));
      this.options.closeButton.on('click', (function(_this) {
        return function(e) {
          if (_this.options.preventDefault) {
            e.preventDefault();
          }
          return _this.hide(e);
        };
      })(this));
      $(document).on('keyup', (function(_this) {
        return function(e) {
          if (e.keyCode === _this.options.escapeKey) {
            return _this.hide();
          }
        };
      })(this));
      if (this.hasHistory()) {
        return window.onpopstate = (function(_this) {
          return function(event) {
            return _this.hide();
          };
        })(this);
      }
    };

    Overlay.prototype.show = function(e) {
      var _base;
      this.overlay.addClass(this.options.openedClass);
      if (typeof (_base = this.options).onOpen === "function") {
        _base.onOpen(e);
      }
      if (this.options.resetScroll) {
        this.overlay.find('.us-overlay__container').scrollTop(0);
      }
      if (this.hasHistory()) {
        return history.pushState('open', window.document.title, this.options.historyStatus);
      }
    };

    Overlay.prototype.hide = function(e) {
      var _base;
      this.overlay.removeClass(this.options.openedClass);
      if (typeof (_base = this.options).onClose === "function") {
        _base.onClose(e);
      }
      if (this.hasHistory()) {
        if (history.state === 'open') {
          return history.back();
        }
      }
    };

    Overlay.prototype.hasHistory = function() {
      if (this.options.history && uSwitch.hasHistory) {
        return true;
      } else {
        return false;
      }
    };

    return Overlay;

  })();

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

(function(root, document, window){
  "use strict";

  function stickySidebar(){
    var elem = document.querySelector(".js-sticky");
    
    if (elem === null) return;

    var box = elem.getBoundingClientRect();
    var targetOffset = box.top + window.pageYOffset - document.documentElement.clientTop;

    _listenToScroll(targetOffset, elem);

    window.addEventListener("scroll", function(e){
      _listenToScroll(targetOffset, elem)
    });
  }

  function _listenToScroll(targetOffset, elem){
    var winTop = window.pageYOffset;
    if (targetOffset < winTop){
      elem.classList.add("sticky");
    } else {
      elem.classList.remove("sticky");
    }
  }

  return new stickySidebar();

})(this, document, window);

;(function(document, $, root){
  "use strict";

  function tabScroll(activeTab, container){
    this.activeTab = activeTab;
    this.container = container;

    var activeTabWidth = this.activeTab.width() + 15;
    var activeTabIndex = this.activeTab.index();
    var scrollLeftDistance = activeTabWidth * activeTabIndex;

    container.animate({
      scrollLeft: scrollLeftDistance
    })
  }

  root.tabScroll = tabScroll

  return tabScroll;

})(document, $, this);

(function(document, window){
  "use strict";

  function App(){
    gumshoe.init({
      activeClass: 'sidebar__nav-link--active'
    });
    var tabs = new tabScroll($(".nav__link.active"), $(".nav-container"));

    var toggleLinks = document.querySelectorAll(".js-toggle__link");

    for (var i = toggleLinks.length - 1; i >= 0; i--) {
      var toggleLink = toggleLinks[i];
      toggleLink.addEventListener("click", clickToggle, false);
    };

    codeBlockClean();

    var overlays = []

    $(".js-open-overlay").each(function(e){
      overlays.push( 
        new Overlay({
          history: false,
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
    var anchor = new Anchor({
      target: document.querySelector(".js-example-anchor"),
      content: document.querySelector(".js-example-anchor__target")
    });
  }

  function codeBlockClean(){
    var codeBlocks = document.querySelectorAll('pre code');

    for (var i = codeBlocks.length - 1; i >= 0; i--) {
      var codeBlock = codeBlocks[i],
          lines, offset;

      lines = codeBlock.textContent.split( '\n' );

      if ( lines.length > 1 && lines[ lines.length - 1 ].trim() === '' ){
        lines.pop();
      }

      // how much white-space do we need to remove form each line?
      offset = lines[ 1 ].match( /^\s*/ )[ 0 ].length;

      // remove the excess white-space from the beginning of each line
      lines = lines.map( function ( line ) {
          return line.slice( offset );
      });

      lines.shift();

      codeBlock.textContent = lines.join( '\n' );

      hljs.highlightBlock(codeBlock);
    };
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

})(document, window);
