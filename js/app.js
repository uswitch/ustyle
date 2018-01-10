!(function (e) { typeof exports !== 'undefined' ? e(exports) : (window.hljs = e({}), typeof define === 'function' && define.amd && define([], function () { return window.hljs })) }(function (e) { function n (e) { return e.replace(/&/gm, '&amp;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;') } function t (e) { return e.nodeName.toLowerCase() } function r (e, n) { var t = e && e.exec(n); return t && t.index == 0 } function a (e) { var n = (e.className + ' ' + (e.parentNode ? e.parentNode.className : '')).split(/\s+/); return n = n.map(function (e) { return e.replace(/^lang(uage)?-/, '') }), n.filter(function (e) { return N(e) || /no(-?)highlight|plain|text/.test(e) })[0] } function i (e, n) { var t, r = {}; for (t in e)r[t] = e[t]; if (n) for (t in n)r[t] = n[t]; return r } function o (e) { var n = []; return (function r (e, a) { for (var i = e.firstChild; i; i = i.nextSibling)i.nodeType == 3 ? a += i.nodeValue.length : i.nodeType == 1 && (n.push({event: 'start', offset: a, node: i}), a = r(i, a), t(i).match(/br|hr|img|input/) || n.push({event: 'stop', offset: a, node: i})); return a }(e, 0)), n } function u (e, r, a) { function i () { return e.length && r.length ? e[0].offset != r[0].offset ? e[0].offset < r[0].offset ? e : r : r[0].event == 'start' ? e : r : e.length ? e : r } function o (e) { function r (e) { return ' ' + e.nodeName + '="' + n(e.value) + '"' }l += '<' + t(e) + Array.prototype.map.call(e.attributes, r).join('') + '>' } function u (e) { l += '</' + t(e) + '>' } function c (e) { (e.event == 'start' ? o : u)(e.node) } for (var s = 0, l = '', f = []; e.length || r.length;) { var g = i(); if (l += n(a.substr(s, g[0].offset - s)), s = g[0].offset, g == e) { f.reverse().forEach(u); do c(g.splice(0, 1)[0]), g = i(); while (g == e && g.length && g[0].offset == s);f.reverse().forEach(o) } else g[0].event == 'start' ? f.push(g[0].node) : f.pop(), c(g.splice(0, 1)[0]) } return l + n(a.substr(s)) } function c (e) { function n (e) { return e && e.source || e } function t (t, r) { return new RegExp(n(t), 'm' + (e.cI ? 'i' : '') + (r ? 'g' : '')) } function r (a, o) { if (!a.compiled) { if (a.compiled = !0, a.k = a.k || a.bK, a.k) { var u = {}, c = function (n, t) { e.cI && (t = t.toLowerCase()), t.split(' ').forEach(function (e) { var t = e.split('|'); u[t[0]] = [n, t[1] ? Number(t[1]) : 1] }) }; typeof a.k === 'string' ? c('keyword', a.k) : Object.keys(a.k).forEach(function (e) { c(e, a.k[e]) }), a.k = u }a.lR = t(a.l || /\b\w+\b/, !0), o && (a.bK && (a.b = '\\b(' + a.bK.split(' ').join('|') + ')\\b'), a.b || (a.b = /\B|\b/), a.bR = t(a.b), a.e || a.eW || (a.e = /\B|\b/), a.e && (a.eR = t(a.e)), a.tE = n(a.e) || '', a.eW && o.tE && (a.tE += (a.e ? '|' : '') + o.tE)), a.i && (a.iR = t(a.i)), void 0 === a.r && (a.r = 1), a.c || (a.c = []); var s = []; a.c.forEach(function (e) { e.v ? e.v.forEach(function (n) { s.push(i(e, n)) }) : s.push(e == 'self' ? a : e) }), a.c = s, a.c.forEach(function (e) { r(e, a) }), a.starts && r(a.starts, o); var l = a.c.map(function (e) { return e.bK ? '\\.?(' + e.b + ')\\.?' : e.b }).concat([a.tE, a.i]).map(n).filter(Boolean); a.t = l.length ? t(l.join('|'), !0) : {exec: function () { return null }} } }r(e) } function s (e, t, a, i) { function o (e, n) { for (var t = 0; t < n.c.length; t++) if (r(n.c[t].bR, e)) return n.c[t] } function u (e, n) { if (r(e.eR, n)) { for (;e.endsParent && e.parent;)e = e.parent; return e } return e.eW ? u(e.parent, n) : void 0 } function f (e, n) { return !a && r(n.iR, e) } function g (e, n) { var t = E.cI ? n[0].toLowerCase() : n[0]; return e.k.hasOwnProperty(t) && e.k[t] } function p (e, n, t, r) { var a = r ? '' : x.classPrefix, i = '<span class="' + a, o = t ? '' : '</span>'; return i += e + '">', i + n + o } function d () { if (!L.k) return n(y); var e = '', t = 0; L.lR.lastIndex = 0; for (var r = L.lR.exec(y); r;) { e += n(y.substr(t, r.index - t)); var a = g(L, r); a ? (B += a[1], e += p(a[0], n(r[0]))) : e += n(r[0]), t = L.lR.lastIndex, r = L.lR.exec(y) } return e + n(y.substr(t)) } function h () { if (L.sL && !w[L.sL]) return n(y); var e = L.sL ? s(L.sL, y, !0, M[L.sL]) : l(y); return L.r > 0 && (B += e.r), L.subLanguageMode == 'continuous' && (M[L.sL] = e.top), p(e.language, e.value, !1, !0) } function b () { return void 0 !== L.sL ? h() : d() } function v (e, t) { var r = e.cN ? p(e.cN, '', !0) : ''; e.rB ? (k += r, y = '') : e.eB ? (k += n(t) + r, y = '') : (k += r, y = t), L = Object.create(e, {parent: {value: L}}) } function m (e, t) { if (y += e, void 0 === t) return k += b(), 0; var r = o(t, L); if (r) return k += b(), v(r, t), r.rB ? 0 : t.length; var a = u(L, t); if (a) { var i = L; i.rE || i.eE || (y += t), k += b(); do L.cN && (k += '</span>'), B += L.r, L = L.parent; while (L != a.parent);return i.eE && (k += n(t)), y = '', a.starts && v(a.starts, ''), i.rE ? 0 : t.length } if (f(t, L)) throw new Error('Illegal lexeme "' + t + '" for mode "' + (L.cN || '<unnamed>') + '"'); return y += t, t.length || 1 } var E = N(e); if (!E) throw new Error('Unknown language: "' + e + '"'); c(E); var R, L = i || E, M = {}, k = ''; for (R = L; R != E; R = R.parent)R.cN && (k = p(R.cN, '', !0) + k); var y = '', B = 0; try { for (var C, j, I = 0; ;) { if (L.t.lastIndex = I, C = L.t.exec(t), !C) break; j = m(t.substr(I, C.index - I), C[0]), I = C.index + j } for (m(t.substr(I)), R = L; R.parent; R = R.parent)R.cN && (k += '</span>'); return {r: B, value: k, language: e, top: L} } catch (S) { if (S.message.indexOf('Illegal') != -1) return {r: 0, value: n(t)}; throw S } } function l (e, t) { t = t || x.languages || Object.keys(w); var r = {r: 0, value: n(e)}, a = r; return t.forEach(function (n) { if (N(n)) { var t = s(n, e, !1); t.language = n, t.r > a.r && (a = t), t.r > r.r && (a = r, r = t) } }), a.language && (r.second_best = a), r } function f (e) { return x.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function (e, n) { return n.replace(/\t/g, x.tabReplace) })), x.useBR && (e = e.replace(/\n/g, '<br>')), e } function g (e, n, t) { var r = n ? E[n] : t, a = [e.trim()]; return e.match(/\bhljs\b/) || a.push('hljs'), e.indexOf(r) === -1 && a.push(r), a.join(' ').trim() } function p (e) { var n = a(e); if (!/no(-?)highlight|plain|text/.test(n)) { var t; x.useBR ? (t = document.createElementNS('http://www.w3.org/1999/xhtml', 'div'), t.innerHTML = e.innerHTML.replace(/\n/g, '').replace(/<br[ \/]*>/g, '\n')) : t = e; var r = t.textContent, i = n ? s(n, r, !0) : l(r), c = o(t); if (c.length) { var p = document.createElementNS('http://www.w3.org/1999/xhtml', 'div'); p.innerHTML = i.value, i.value = u(c, o(p), r) }i.value = f(i.value), e.innerHTML = i.value, e.className = g(e.className, n, i.language), e.result = {language: i.language, re: i.r}, i.second_best && (e.second_best = {language: i.second_best.language, re: i.second_best.r}) } } function d (e) { x = i(x, e) } function h () { if (!h.called) { h.called = !0; var e = document.querySelectorAll('pre code'); Array.prototype.forEach.call(e, p) } } function b () { addEventListener('DOMContentLoaded', h, !1), addEventListener('load', h, !1) } function v (n, t) { var r = w[n] = t(e); r.aliases && r.aliases.forEach(function (e) { E[e] = n }) } function m () { return Object.keys(w) } function N (e) { return w[e] || w[E[e]] } var x = {classPrefix: 'hljs-', tabReplace: null, useBR: !1, languages: void 0}, w = {}, E = {}; return e.highlight = s, e.highlightAuto = l, e.fixMarkup = f, e.highlightBlock = p, e.configure = d, e.initHighlighting = h, e.initHighlightingOnLoad = b, e.registerLanguage = v, e.listLanguages = m, e.getLanguage = N, e.inherit = i, e.IR = '[a-zA-Z]\\w*', e.UIR = '[a-zA-Z_]\\w*', e.NR = '\\b\\d+(\\.\\d+)?', e.CNR = '\\b(0[xX][a-fA-F0-9]+|(\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)', e.BNR = '\\b(0b[01]+)', e.RSR = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~', e.BE = {b: '\\\\[\\s\\S]', r: 0}, e.ASM = {cN: 'string', b: "'", e: "'", i: '\\n', c: [e.BE]}, e.QSM = {cN: 'string', b: '"', e: '"', i: '\\n', c: [e.BE]}, e.PWM = {b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/}, e.C = function (n, t, r) { var a = e.inherit({cN: 'comment', b: n, e: t, c: []}, r || {}); return a.c.push(e.PWM), a }, e.CLCM = e.C('//', '$'), e.CBCM = e.C('/\\*', '\\*/'), e.HCM = e.C('#', '$'), e.NM = {cN: 'number', b: e.NR, r: 0}, e.CNM = {cN: 'number', b: e.CNR, r: 0}, e.BNM = {cN: 'number', b: e.BNR, r: 0}, e.CSSNM = {cN: 'number', b: e.NR + '(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?', r: 0}, e.RM = {cN: 'regexp', b: /\//, e: /\/[gimuy]*/, i: /\n/, c: [e.BE, {b: /\[/, e: /\]/, r: 0, c: [e.BE]}]}, e.TM = {cN: 'title', b: e.IR, r: 0}, e.UTM = {cN: 'title', b: e.UIR, r: 0}, e })); hljs.registerLanguage('xml', function (t) { var e = '[A-Za-z0-9\\._:-]+', s = {b: /<\?(php)?(?!\w)/, e: /\?>/, sL: 'php', subLanguageMode: 'continuous'}, c = {eW: !0, i: /</, r: 0, c: [s, {cN: 'attribute', b: e, r: 0}, {b: '=', r: 0, c: [{cN: 'value', c: [s], v: [{b: /"/, e: /"/}, {b: /'/, e: /'/}, {b: /[^\s\/>]+/}]}]}]}; return {aliases: ['html', 'xhtml', 'rss', 'atom', 'xsl', 'plist'], cI: !0, c: [{cN: 'doctype', b: '<!DOCTYPE', e: '>', r: 10, c: [{b: '\\[', e: '\\]'}]}, t.C('<!--', '-->', {r: 10}), {cN: 'cdata', b: '<\\!\\[CDATA\\[', e: '\\]\\]>', r: 10}, {cN: 'tag', b: '<style(?=\\s|>|$)', e: '>', k: {title: 'style'}, c: [c], starts: {e: '</style>', rE: !0, sL: 'css'}}, {cN: 'tag', b: '<script(?=\\s|>|$)', e: '>', k: {title: 'script'}, c: [c], starts: {e: '</script>', rE: !0, sL: ''}}, s, {cN: 'pi', b: /<\?\w+/, e: /\?>/, r: 10}, {cN: 'tag', b: '</?', e: '/?>', c: [{cN: 'title', b: /[^ \/><\n\t]+/, r: 0}, c]}]} }); hljs.registerLanguage('coffeescript', function (e) { var c = {keyword: 'in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not', literal: 'true false null undefined yes no on off', reserved: 'case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf', built_in: 'npm require console print module global window document'}, n = '[A-Za-z$_][0-9A-Za-z$_]*', t = {cN: 'subst', b: /#\{/, e: /}/, k: c}, r = [e.BNM, e.inherit(e.CNM, {starts: {e: '(\\s*/)?', r: 0}}), {cN: 'string', v: [{b: /'''/, e: /'''/, c: [e.BE]}, {b: /'/, e: /'/, c: [e.BE]}, {b: /"""/, e: /"""/, c: [e.BE, t]}, {b: /"/, e: /"/, c: [e.BE, t]}]}, {cN: 'regexp', v: [{b: '///', e: '///', c: [t, e.HCM]}, {b: '//[gim]*', r: 0}, {b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/}]}, {cN: 'property', b: '@' + n}, {b: '`', e: '`', eB: !0, eE: !0, sL: 'javascript'}]; t.c = r; var i = e.inherit(e.TM, {b: n}), s = '(\\(.*\\))?\\s*\\B[-=]>', o = {cN: 'params', b: '\\([^\\(]', rB: !0, c: [{b: /\(/, e: /\)/, k: c, c: ['self'].concat(r)}]}; return {aliases: ['coffee', 'cson', 'iced'], k: c, i: /\/\*/, c: r.concat([e.C('###', '###'), e.HCM, {cN: 'function', b: '^\\s*' + n + '\\s*=\\s*' + s, e: '[-=]>', rB: !0, c: [i, o]}, {b: /[:\(,=]\s*/, r: 0, c: [{cN: 'function', b: s, e: '[-=]>', rB: !0, c: [o]}]}, {cN: 'class', bK: 'class', e: '$', i: /[:="\[\]]/, c: [{bK: 'extends', eW: !0, i: /[:="\[\]]/, c: [i]}, i]}, {cN: 'attribute', b: n + ':', e: ':', rB: !0, rE: !0, r: 0}])} }); hljs.registerLanguage('bash', function (e) { var t = {cN: 'variable', v: [{b: /\$[\w\d#@][\w\d_]*/}, {b: /\$\{(.*?)}/}]}, s = {cN: 'string', b: /"/, e: /"/, c: [e.BE, t, {cN: 'variable', b: /\$\(/, e: /\)/, c: [e.BE]}]}, a = {cN: 'string', b: /'/, e: /'/}; return {aliases: ['sh', 'zsh'], l: /-?[a-z\.]+/, k: {keyword: 'if then else elif fi for while in do done case esac function', literal: 'true false', built_in: 'break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp', operator: '-ne -eq -lt -gt -f -d -e -s -l -a'}, c: [{cN: 'shebang', b: /^#![^\n]+sh\s*$/, r: 10}, {cN: 'function', b: /\w[\w\d_]*\s*\(\s*\)\s*\{/, rB: !0, c: [e.inherit(e.TM, {b: /\w[\w\d_]*/})], r: 0}, e.HCM, e.NM, s, a, t]} }); hljs.registerLanguage('javascript', function (e) { return {aliases: ['js'], k: {keyword: 'in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as await', literal: 'true false null undefined NaN Infinity', built_in: 'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise'}, c: [{cN: 'pi', r: 10, v: [{b: /^\s*('|")use strict('|")/}, {b: /^\s*('|")use asm('|")/}]}, e.ASM, e.QSM, {cN: 'string', b: '`', e: '`', c: [e.BE, {cN: 'subst', b: '\\$\\{', e: '\\}'}]}, e.CLCM, e.CBCM, {cN: 'number', b: '\\b(0[xXbBoO][a-fA-F0-9]+|(\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)', r: 0}, {b: '(' + e.RSR + '|\\b(case|return|throw)\\b)\\s*', k: 'return throw case', c: [e.CLCM, e.CBCM, e.RM, {b: /</, e: />\s*[);\]]/, r: 0, sL: 'xml'}], r: 0}, {cN: 'function', bK: 'function', e: /\{/, eE: !0, c: [e.inherit(e.TM, {b: /[A-Za-z$_][0-9A-Za-z$_]*/}), {cN: 'params', b: /\(/, e: /\)/, c: [e.CLCM, e.CBCM], i: /["'\(]/}], i: /\[|%/}, {b: /\$[(.]/}, {b: '\\.' + e.IR, r: 0}, {bK: 'import', e: '[;$]', k: 'import from as', c: [e.ASM, e.QSM]}, {cN: 'class', bK: 'class', e: /[{;=]/, eE: !0, i: /[:"\[\]]/, c: [{bK: 'extends'}, e.UTM]}]} }); hljs.registerLanguage('markdown', function (e) { return {aliases: ['md', 'mkdown', 'mkd'], c: [{cN: 'header', v: [{b: '^#{1,6}', e: '$'}, {b: '^.+?\\n[=-]{2,}$'}]}, {b: '<', e: '>', sL: 'xml', r: 0}, {cN: 'bullet', b: '^([*+-]|(\\d+\\.))\\s+'}, {cN: 'strong', b: '[*_]{2}.+?[*_]{2}'}, {cN: 'emphasis', v: [{b: '\\*.+?\\*'}, {b: '_.+?_', r: 0}]}, {cN: 'blockquote', b: '^>\\s+', e: '$'}, {cN: 'code', v: [{b: '`.+?`'}, {b: '^( {4}| )', e: '$', r: 0}]}, {cN: 'horizontal_rule', b: '^[-\\*]{3,}', e: '$'}, {b: '\\[.+?\\][\\(\\[].*?[\\)\\]]', rB: !0, c: [{cN: 'link_label', b: '\\[', e: '\\]', eB: !0, rE: !0, r: 0}, {cN: 'link_url', b: '\\]\\(', e: '\\)', eB: !0, eE: !0}, {cN: 'link_reference', b: '\\]\\[', e: '\\]', eB: !0, eE: !0}], r: 10}, {b: '^\\[.+\\]:', rB: !0, c: [{cN: 'link_reference', b: '\\[', e: '\\]:', eB: !0, eE: !0, starts: {cN: 'link_url', e: '$'}}]}]} }); hljs.registerLanguage('scss', function (e) { { var t = '[a-zA-Z-][a-zA-Z0-9_-]*', i = {cN: 'variable', b: '(\\$' + t + ')\\b'}, r = {cN: 'function', b: t + '\\(', rB: !0, eE: !0, e: '\\('}, o = {cN: 'hexcolor', b: '#[0-9A-Fa-f]+'}; ({cN: 'attribute', b: '[A-Z\\_\\.\\-]+', e: ':', eE: !0, i: '[^\\s]', starts: {cN: 'value', eW: !0, eE: !0, c: [r, o, e.CSSNM, e.QSM, e.ASM, e.CBCM, {cN: 'important', b: '!important'}]}}) } return {cI: !0, i: "[=/|']", c: [e.CLCM, e.CBCM, r, {cN: 'id', b: '\\#[A-Za-z0-9_-]+', r: 0}, {cN: 'class', b: '\\.[A-Za-z0-9_-]+', r: 0}, {cN: 'attr_selector', b: '\\[', e: '\\]', i: '$'}, {cN: 'tag', b: '\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b', r: 0}, {cN: 'pseudo', b: ':(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)'}, {cN: 'pseudo', b: '::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)'}, i, {cN: 'attribute', b: '\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b', i: '[^\\s]'}, {cN: 'value', b: '\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b'}, {cN: 'value', b: ':', e: ';', c: [r, i, o, e.CSSNM, e.QSM, e.ASM, {cN: 'important', b: '!important'}]}, {cN: 'at_rule', b: '@', e: '[{;]', k: 'mixin include extend for if else each while charset import debug media page content font-face namespace warn', c: [r, i, e.QSM, e.ASM, o, e.CSSNM, {cN: 'preprocessor', b: '\\s[A-Za-z0-9_.-]+', r: 0}]}]} }); hljs.registerLanguage('ruby', function (e) { var c = '[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?', r = 'and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor', b = {cN: 'yardoctag', b: '@[A-Za-z]+'}, a = {cN: 'value', b: '#<', e: '>'}, n = [e.C('#', '$', {c: [b]}), e.C('^\\=begin', '^\\=end', {c: [b], r: 10}), e.C('^__END__', '\\n$')], s = {cN: 'subst', b: '#\\{', e: '}', k: r}, t = {cN: 'string', c: [e.BE, s], v: [{b: /'/, e: /'/}, {b: /"/, e: /"/}, {b: /`/, e: /`/}, {b: '%[qQwWx]?\\(', e: '\\)'}, {b: '%[qQwWx]?\\[', e: '\\]'}, {b: '%[qQwWx]?{', e: '}'}, {b: '%[qQwWx]?<', e: '>'}, {b: '%[qQwWx]?/', e: '/'}, {b: '%[qQwWx]?%', e: '%'}, {b: '%[qQwWx]?-', e: '-'}, {b: '%[qQwWx]?\\|', e: '\\|'}, {b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/}]}, i = {cN: 'params', b: '\\(', e: '\\)', k: r}, d = [t, a, {cN: 'class', bK: 'class module', e: '$|;', i: /=/, c: [e.inherit(e.TM, {b: '[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?'}), {cN: 'inheritance', b: '<\\s*', c: [{cN: 'parent', b: '(' + e.IR + '::)?' + e.IR}]}].concat(n)}, {cN: 'function', bK: 'def', e: ' |$|;', r: 0, c: [e.inherit(e.TM, {b: c}), i].concat(n)}, {cN: 'constant', b: '(::)?(\\b[A-Z]\\w*(::)?)+', r: 0}, {cN: 'symbol', b: e.UIR + '(\\!|\\?)?:', r: 0}, {cN: 'symbol', b: ':', c: [t, {b: c}], r: 0}, {cN: 'number', b: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b', r: 0}, {cN: 'variable', b: '(\\$\\W)|((\\$|\\@\\@?)(\\w+))'}, {b: '(' + e.RSR + ')\\s*', c: [a, {cN: 'regexp', c: [e.BE, s], i: /\n/, v: [{b: '/', e: '/[a-z]*'}, {b: '%r{', e: '}[a-z]*'}, {b: '%r\\(', e: '\\)[a-z]*'}, {b: '%r!', e: '![a-z]*'}, {b: '%r\\[', e: '\\][a-z]*'}]}].concat(n), r: 0}].concat(n); s.c = d, i.c = d; var o = '[>?]>', l = '[\\w#]+\\(\\w+\\):\\d+:\\d+>', u = '(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>', N = [{b: /^\s*=>/, cN: 'status', starts: {e: '$', c: d}}, {cN: 'prompt', b: '^(' + o + '|' + l + '|' + u + ')', starts: {e: '$', c: d}}]; return {aliases: ['rb', 'gemspec', 'podspec', 'thor', 'irb'], k: r, c: n.concat(N).concat(d)} }); hljs.registerLanguage('css', function (e) { var c = '[a-zA-Z-][a-zA-Z0-9_-]*', a = {cN: 'function', b: c + '\\(', rB: !0, eE: !0, e: '\\('}, r = {cN: 'rule', b: /[A-Z\_\.\-]+\s*:/, rB: !0, e: ';', eW: !0, c: [{cN: 'attribute', b: /\S/, e: ':', eE: !0, starts: {cN: 'value', eW: !0, eE: !0, c: [a, e.CSSNM, e.QSM, e.ASM, e.CBCM, {cN: 'hexcolor', b: '#[0-9A-Fa-f]+'}, {cN: 'important', b: '!important'}]}}]}; return {cI: !0, i: /[=\/|']/, c: [e.CBCM, r, {cN: 'id', b: /\#[A-Za-z0-9_-]+/}, {cN: 'class', b: /\.[A-Za-z0-9_-]+/, r: 0}, {cN: 'attr_selector', b: /\[/, e: /\]/, i: '$'}, {cN: 'pseudo', b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"']+/}, {cN: 'at_rule', b: '@(font-face|page)', l: '[a-z-]+', k: 'font-face page'}, {cN: 'at_rule', b: '@', e: '[{;]', c: [{cN: 'keyword', b: /\S+/}, {b: /\s/, eW: !0, eE: !0, r: 0, c: [a, e.ASM, e.QSM, e.CSSNM]}]}, {cN: 'tag', b: c, r: 0}, {cN: 'rules', b: '{', e: '}', i: /\S/, r: 0, c: [e.CBCM, r]}]} })

!(function (a, b) { typeof define === 'function' && define.amd ? define([], function () { return a.svg4everybody = b() }) : typeof module === 'object' && module.exports ? module.exports = b() : a.svg4everybody = b() }(this, function () { function a (a, b, c) { if (c) { var d = document.createDocumentFragment(), e = !b.hasAttribute('viewBox') && c.getAttribute('viewBox'); e && b.setAttribute('viewBox', e); for (var f = c.cloneNode(!0); f.childNodes.length;)d.appendChild(f.firstChild); a.appendChild(d) } } function b (b) { b.onreadystatechange = function () { if (b.readyState === 4) { var c = b._cachedDocument; c || (c = b._cachedDocument = document.implementation.createHTMLDocument(''), c.body.innerHTML = b.responseText, b._cachedTarget = {}), b._embeds.splice(0).map(function (d) { var e = b._cachedTarget[d.id]; e || (e = b._cachedTarget[d.id] = c.getElementById(d.id)), a(d.parent, d.svg, e) }) } }, b.onreadystatechange() } function c (c) { function e () { for (var c = 0; c < m.length;) { var h = m[c], i = h.parentNode, j = d(i); if (j) { var n = h.getAttribute('xlink:href') || h.getAttribute('href'); if (f && (!g.validate || g.validate(n, j, h))) { i.removeChild(h); var o = n.split('#'), p = o.shift(), q = o.join('#'); if (p.length) { var r = k[p]; r || (r = k[p] = new XMLHttpRequest(), r.open('GET', p), r.send(), r._embeds = []), r._embeds.push({parent: i, svg: j, id: q}), b(r) } else a(i, document.getElementById(q)) } } else ++c }l(e, 67) } var f, g = Object(c), h = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, i = /\bAppleWebKit\/(\d+)\b/, j = /\bEdge\/12\.(\d+)\b/; f = 'polyfill' in g ? g.polyfill : h.test(navigator.userAgent) || (navigator.userAgent.match(j) || [])[1] < 10547 || (navigator.userAgent.match(i) || [])[1] < 537; var k = {}, l = window.requestAnimationFrame || setTimeout, m = document.getElementsByTagName('use'); f && e() } function d (a) { for (var b = a; b.nodeName.toLowerCase() !== 'svg' && (b = b.parentNode););return b } return c }))

var slice = [].slice;
var hasProp = {}.hasOwnProperty;

if (this.Utils == null) {
  this.Utils = {
    modules: []
  };
}

var addClass = function(element, name) {
  removeClass(element, name);
  return element.className += " " + name + " ";
};

var removeClass = function(element, name) {
  var regExp = new RegExp("(\\s|^)" + name + "(\\s|$)", "gi");
  return element.className = element.className.replace(regExp, "");
};

var hasClass = function(element, name) {
  return new RegExp("(^| )" + name + "( |$)", "gi").test(element.className);
};

var merge = function() {
  var extension;
  var i;
  var len;
  var property;
  var target = arguments[0];
  var extensions = 2 <= arguments.length ? slice.call(arguments, 1) : [];

  for (i = 0, len = extensions.length; i < len; i++) {
    extension = extensions[i];
    for (property in extension) {
      if (!hasProp.call(extension, property)) continue;
      target[property] = extension[property];
    }
  }

  return target;
};

var setOptions = function(options, defaults) {
  return merge({}, defaults, options);
};

var deleteUndefined = function(obj) {
  var key;
  var value;
  var results = [];
  for (key in obj) {
    value = obj[key];
    if (value === null || value === void 0) {
      results.push(delete obj[key]);
    } else {
      results.push(void 0);
    }
  }

  return results;
};

var transformKey = (function() {
  var i;
  var key;
  var len;
  var el = document.createElement("div");
  var transforms = ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"];
  for (i = 0, len = transforms.length; i < len; i++) {
    key = transforms[i];
    if (el.style[key] !== void 0) {
      return key;
    }
  }
})();

var requestAnimationFrame = (function(window) {
  var i;
  var len;
  var vendor;
  var ref =  ["ms", "moz", "webkit", "o"];

  for (i = 0, len = ref.length; i < len; i++) {
    vendor = ref[i];
    if (window.requestAnimationFrame) {
      break;
    }

    window.requestAnimationFrame = window[vendor + "RequestAnimationFrame"];
  }

  return window.requestAnimationFrame || (window.requestAnimationFrame = function(callback) {
    return setTimeout(callback, 1000 / 60);
  });
})(window);

var forEach = function (array, callback, scope) {
  for (var i = array.length - 1; i >= 0; i--) {
    callback.call(scope, i, array[i]);
  }
};

this.Utils = {
  addClass: addClass,
  removeClass: removeClass,
  hasClass: hasClass,
  merge: merge,
  setOptions: setOptions,
  deleteUndefined: deleteUndefined,
  transformKey: transformKey,
  requestAnimationFrame: requestAnimationFrame,
  forEach: forEach
};

window.Backdrop = (function() {
  var holds = 0;
  var backdrop = null;
  var createBackdrop;

  function Backdrop() {
    backdrop = document.querySelector(".us-backdrop");
    if (backdrop == null) {
      backdrop = createBackdrop();
    }
  }

  Backdrop.prototype.element = backdrop;

  createBackdrop = function() {
    backdrop = document.createElement("div");
    Utils.addClass(backdrop, "us-backdrop");
    return document.body.appendChild(backdrop);
  };

  Backdrop.prototype.retain = function() {
    var onFrame;
    holds++;
    if (holds === 1) {
      Utils.addClass(backdrop, "us-backdrop--visible");
      onFrame = function() {
        if (holds >= 1) {
          return Utils.addClass(backdrop, "us-backdrop--active");
        }
      };

      return Utils.requestAnimationFrame.call(window, onFrame);
    }
  };

  Backdrop.prototype.release = function() {
    var onFrame;
    if (holds === 1) {
      Utils.removeClass(backdrop, "us-backdrop--active");
      onFrame = function() {
        return setTimeout(function() {
          if (holds === 0) {
            return Utils.removeClass(backdrop, "us-backdrop--visible");
          }
        }, 300);
      };

      Utils.requestAnimationFrame.call(window, onFrame);
    }

    return holds = Math.max(0, holds - 1);
  };

  return Backdrop;

})();

window.Overlay = (function(Utils) {
  var addClass = Utils.addClass;
  var hasClass = Utils.hasClass;
  var removeClass = Utils.removeClass;
  var setOptions = Utils.setOptions;
  var requestAnimationFrame = Utils.requestAnimationFrame;

  var defaults = {
    bodyActiveClass: "us-overlay--open",
    activeClass: "us-overlay-parent--active",
    visibleClass: "us-overlay-parent--visible",
    overlay: document.querySelector('.us-overlay-parent'),
    openButton: ".js-open-overlay",
    closeButton: ".js-close-overlay",
    historyStatus: "#seedeal",
    history: false,
    preventDefault: true,
    animationSpeed: 300
  };

  function Overlay(options) {
    this.overlay = (this.options = setOptions(options, defaults)).overlay;

    if (this.overlay instanceof jQuery) {
      this.overlay = document.querySelector(this.overlay.selector);
    }

    if (this.options.openButton instanceof jQuery) {
      this.options.openButton = document.querySelector(this.options.openButton.selector);
    }

    if ((this.overlay != null) && (typeof Backdrop !== "undefined" && Backdrop !== null)) {
      this.backdrop = new Backdrop();
      this.addEventListeners();
    } else {
      throw new Error("There's no overlay or you haven't included Backdrop");
    }
  }

  Overlay.prototype.addEventListeners = function () {
    var openOverlayEvent = new CustomEvent('click.open-overlay');
    var closeOverlayEvent = new CustomEvent('click.close-overlay');
    var openButton = typeof this.options.openButton === 'string' ? document.querySelector(this.options.openButton) : this.options.openButton;

    var onOpenButtonClick = (function (_this) {
      return function (e) {
        if (_this.options.preventDefault) {
          e.preventDefault();
        }

        openButton.dispatchEvent(openOverlayEvent);

        return _this.show(e);
      }
    })(this);

    if (openButton) {
      openButton.addEventListener('click', onOpenButtonClick);
    }

    var onCloseOverlay = (function (_this) {
      return function (e) {
        var results = [];
        var closeTargets = _this.overlay.querySelectorAll(_this.options.closeButton);
        var targets = [_this.overlay].concat(Array.prototype.slice.call(closeTargets));

        for (var i = targets.length - 1; i >= 0; i--) {
          var target = targets[i];
          if (e.target === target) {
            if (_this.options.preventDefault) {
              e.preventDefault();
            }

            _this.hide(e);
            break;
          } else {
            results.push(void 0);
          }
        };

        _this.overlay.dispatchEvent(closeOverlayEvent);

        return results;
      };
    })(this);

    this.overlay.addEventListener('click', onCloseOverlay);

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

  Overlay.prototype.show = function (e) {
    var onFrame;
    var _this = this;

    addClass(document.body, this.options.bodyActiveClass);
    this.backdrop.retain();
    addClass(this.overlay, this.options.visibleClass);

    onFrame = function() {
      addClass(_this.overlay, _this.options.activeClass);
      return setTimeout(function() {
        var base;
        return typeof (base = _this.options).onOpen === "function" ? base.onOpen(e) : void 0;
      }, _this.options.animationSpeed);
    };

    requestAnimationFrame.call(window, onFrame);
    if (this.hasHistory()) {
      return history.pushState("open", window.document.title, this.options.historyStatus);
    }
  };

  Overlay.prototype.hide = function(e) {
    var onFrame;
    var _this = this;

    removeClass(document.body, this.options.bodyActiveClass);
    this.backdrop.release();

    onFrame = function() {
      removeClass(_this.overlay, _this.options.activeClass);
      return setTimeout(function() {
        var base;
        removeClass(_this.overlay, _this.options.visibleClass);
        return typeof (base = _this.options).onClose === "function" ? base.onClose(e) : void 0;
      }, _this.options.animationSpeed);
    };

    requestAnimationFrame.call(window, onFrame);
    if (this.hasHistory() && history.state === "open") return history.back();
  };

  Overlay.prototype.isOpen = function() {
    return hasClass(this.overlay, this.options.activeClass);
  };

  Overlay.prototype.hasHistory = function() {
    return this.options.history && window.history && window.history.pushState;
  };

  return Overlay;

})(this.Utils);

window.Tabs = (function(Utils) {

  var addClass = Utils.addClass;
  var hasClass = Utils.hasClass;
  var removeClass = Utils.removeClass;
  var setOptions = Utils.setOptions;
  var forEach = Utils.forEach;

  Tabs.prototype.defaults = {
    tabContainer: ".us-tabs",
    tabLinks: ".us-tabs-nav-mainlink",
    tabNav: ".us-tabs-nav",
    changeUrls: true,
    activeClass: "active",
    collapsible: false,
    autoScroll: true
  };

  function Tabs(options) {
    var ref = this.options = setOptions(options, this.defaults);
    var tabContainer = ref.tabContainer;
    var tabLinks = ref.tabLinks;

    this.activeTabEvent = new CustomEvent('ustyle.tab.active');
    this.tabs = document.querySelectorAll(tabContainer + ' ' + tabLinks);
    if(!this.tabs.length) return;
    this.filter = this.tabs.item(0).getAttribute("data-target") ? "data-target" : "href";
    this.init();

    var handleClick = (function (_this) {
      return function (e) {
        var target = e.currentTarget;
        if (_this.isAccordion() && _this.options.collapsible && _this.isActive(target)) {
          _this.collapse(target);
          _this.hashClear();
        } else {
          _this.navigateTo(target);
          _this.scrollToTab(target);
          _this.hashChange(target);
        }

        return e.preventDefault();
      }
    })(this);

    forEach(this.tabs, function (index, tab) {
      tab.addEventListener('click', handleClick);
    });
  }

  Tabs.prototype.init = function() {
    var activeTab = this.activeTab();
    var initialHash = this.tabFromHash();

    if (initialHash) {
      return this.navigateTo(initialHash);
    } else if (activeTab) {
      return this.navigateTo(activeTab);
    } else if (!this.options.collapsible || !this.isAccordion()) {
      return this.navigateTo(this.tabs.item(0));
    }
  };

  Tabs.prototype.hashChange = function(target) {
    if (!this.options.changeUrls) return;

    return window.location.replace("#!" + (getSelector(target).replace(/#/, "")));
  };

  Tabs.prototype.hashClear = function() {
    if (!this.options.changeUrls) return;

    var url = window.location.pathname + window.location.search;
    return typeof history.replaceState === "function" ? history.replaceState("", document.title, url) : void 0;
  };

  Tabs.prototype.navigateTo = function(target) {
    var selector = getSelector(target);
    var selected = document.querySelector(selector);
    var activeClass = this.options.activeClass;
    var filter = this.filter;

    forEach(this.tabs, function (index, tab) {
      removeClass(tab, activeClass);
    });

    forEach(this.tabs, function (index, tab) {
      if (tab.getAttribute(filter) === selector) {
        return addClass(tab, activeClass);
      }
    });

    forEach(selected.parentNode.children, function (index, child) {
      if (child !== selected) {
        removeClass(child, activeClass);
      }
    });

    addClass(selected, activeClass);
    return selected.dispatchEvent(this.activeTabEvent);
  };

  Tabs.prototype.collapse = function(target) {
    var selected = document.querySelector(getSelector(target));
    var activeClass = this.options.activeClass;

    forEach(this.tabs, function (index, tab) {
      removeClass(tab, activeClass);
    });

    return removeClass(selected, activeClass);
  };

  Tabs.prototype.scrollToTab = function(target) {
    if (!(this.isAccordion() && this.options.autoScroll)) {
      return;
    }

    var selected = document.querySelector(getSelector(target));
    return selected.scrollIntoView();
  };

  Tabs.prototype.activeTab = function() {
    var activeTab = null;
    var activeClass = this.options.activeClass;
    var matchingTab = null;

    forEach(this.tabs, function (index, tab) {
      if (hasClass(tab, activeClass)) {
        return matchingTab = tab;
      }
    });

    return matchingTab;
  };

  Tabs.prototype.tabFromHash = function() {
    var tabId = window.location.hash.replace("!", "");
    var filter = this.filter;
    var matchingTab = null;

    forEach(this.tabs, function (index, tab) {
      if (tab.getAttribute(filter) === tabId) {
        return matchingTab = tab;
      }
    });

    return matchingTab;
  };

  Tabs.prototype.isActive = function(target) {
    return getSelector(target) === getSelector(this.activeTab());
  };

  Tabs.prototype.isAccordion = function() {
    var tabNav = document.querySelector(this.options.tabNav);

    return !(tabNav.offsetWidth > 0 || tabNav.offsetHeight > 0);
  };

  var getSelector = function(clicked) {
    return clicked.getAttribute("data-target") || clicked.getAttribute("href");
  };

  return Tabs;
})(this.Utils);

window.ClassToggler = (function(Utils) {
  var addClass = Utils.addClass;
  var hasClass = Utils.hasClass;
  var removeClass = Utils.removeClass;
  var forEach = Utils.forEach;

  var defaults = {
    containerClass: null,
    target: null,
    activeClass: "active",
    inactiveClass: null,
    toggleOn: "click"
  };

  var findAncestor = function (el, cls) {
    while ((el = el.parentElement) && ! hasClass(el, cls));
    return el;
  }

  function ClassToggler(options) {
    this.options = Utils.setOptions(options, defaults);

    if (!this.options.target && this.options.$target && this.options.$target instanceof jQuery) {
      this.options.target = document.querySelectorAll(this.options.$target.selector);
    }

    if (this.options.target) {
      this.addEventListeners();
    } else {
      console.trace("ClassToggle", this.options);
    }
  }

  ClassToggler.prototype.addEventListeners = function() {
    var toggleEvent = this.options.toggleOn;
    var onToggle = (function (_this) {
      return function(e) {
        var togglableElement = _this.options.containerClass ? findAncestor(e.target, _this.options.containerClass) : (e.delegateTarget);
        if (_this.isActive(togglableElement)) {
          return _this.hide(togglableElement, e);
        } else {
          return _this.show(togglableElement, e);
        }
      };
    })(this);

    forEach(this.options.target, function (i, t) {
      t.addEventListener(toggleEvent, onToggle);
    });
  };

  ClassToggler.prototype.isActive = function(togglableElement) {
    return hasClass(togglableElement, this.options.activeClass);
  };

  ClassToggler.prototype.show = function(togglableElement, e) {
    var base;
    if (typeof (base = this.options).onShow === "function") {
      base.onShow(togglableElement, e);
    }

    return togglableElement.addClass(this.options.activeClass);
  };

  ClassToggler.prototype.hide = function(togglableElement, e) {
    var base;
    if (typeof (base = this.options).onHide === "function") {
      base.onHide(togglableElement, e);
    }

    return removeClass(togglableElement, this.options.activeClass);
  };

  return ClassToggler;

})(this.Utils);

window.RadioToggle = function() {
  var message = "RadioToggle is now deprecated";
  if (window.Raven) window.Raven.captureMessage(message);
  console.warn(message);
};

google.charts.load('43', {packages: ['line']})

if (typeof reportData !== 'undefined' && reportData) {
  google.charts.setOnLoadCallback(drawChart)
}

function drawChart () {
  var simplicityData
  var simplicityTable
  var simplicityOptions
  var simplicityChart
  var sizeData
  var sizeTable
  var sizeOptions
  var sizeChart

  simplicityData = reportData.reverse().map(function (e) { return [e.version, e.rules, e.selectors] })
  simplicityData.unshift(['Version', 'Rules', 'Selectors'])
  simplicityTable = google.visualization.arrayToDataTable(simplicityData)

  simplicityOptions = {
    chart: {
      title: 'Simplicity chart',
      subtitle: 'Evolution of rules and selectors over uStyle releases',
      vAxis: {
        format: ''
      }
    }
  }

  sizeData = reportData.map(function (e) { return [e.version, e.size] })
  sizeData.unshift(['Version', 'Size (bytes)'])
  sizeTable = google.visualization.arrayToDataTable(sizeData)

  sizeOptions = {
    chart: {
      title: 'Size chart',
      subtitle: 'Evolution of uStyle size over releases',
      vAxis: {
        format: ''
      }
    }
  }

  simplicityChart = new google.charts.Line(document.getElementById('simplicity_chart'))
  simplicityChart.draw(simplicityTable, simplicityOptions)

  sizeChart = new google.charts.Line(document.getElementById('size_chart'))
  sizeChart.draw(sizeTable, sizeOptions)
};

(function (document, window, $, Overlay, ClassToggler, Tabs, RadioToggle) {
  'use strict'

  function cleanWhiteSpace (codeBlocks) {
    if (!codeBlocks) return

    for (var i = codeBlocks.length - 1; i >= 0; i--) {
      var codeBlock = codeBlocks[i]
      var offset
      var text = codeBlock.textContent || codeBlock.innerText
      var lines = text.split('\n')

      if (lines.length > 1 && lines[ lines.length - 1 ].trim() === '') {
        lines.pop()
      }

      var canClean = lines[1] !== undefined

      if (canClean) {
            // how much white-space do we need to remove form each line?
        offset = lines[ 1 ].match(/^\s*/)[ 0 ].length

          // remove the excess white-space from the beginning of each line
        lines = lines.map(function (line) {
          return line.slice(offset)
        })

        lines.shift()

        codeBlock.textContent = lines.join('\n')
      }

      hljs.highlightBlock(codeBlock)
    };
  }

  function App () {
    var toggleLinks = document.querySelectorAll('.js-toggle__link')

    for (var i = toggleLinks.length - 1; i >= 0; i--) {
      var toggleLink = toggleLinks[i]
      toggleLink.addEventListener('click', clickToggle, false)
    };

    var sidebarNavLinks = document.querySelectorAll('.js-sidebar-nav-link')

    for (var j = sidebarNavLinks.length - 1; j >= 0; j--) {
      var sidebarNavLink = sidebarNavLinks[j]
      sidebarNavLink.addEventListener('click', sideBarToggle, false)
    };

    if (!$('html').hasClass('ie8')) {
      cleanWhiteSpace(document.querySelectorAll('pre code'))
    }

    var stickySidebar = function () {
      var $sidebar = $('.js-sticky')
      if (!$sidebar.length) return
      var offset = $sidebar.offset()

      $(window).on('scroll', function () {
        var winTop = $(window).scrollTop()
        set(winTop)
      })

      function set (winTop) {
        if (offset.top < winTop) {
          $sidebar.addClass('stuck')
        } else {
          $sidebar.removeClass('stuck')
        }
      }
    }

    stickySidebar()
    svg4everybody()

    /* eslint-disable no-new */
    $('.js-open-overlay').each(function (e) {
      new Overlay({
        openButton: $(".js-open-overlay[modifier='" + $(this).attr('modifier') + "']"),
        overlay: $(".us-overlay-parent[modifier='" + $(this).attr('modifier') + "']")
      })
    })

    new ClassToggler({
      containerClass: '.us-tooltip',
      $target: $('.us-tooltip__icon'),
      activeClass: 'us-tooltip--active'
    })

    new Tabs({collapsible: true, autoScroll: false})
  }

  function clickToggle (event) {
    var toggleLink = event.currentTarget
    var target = document.querySelector('.' + toggleLink.getAttribute('data-target'))
    var targetActiveClass = getActiveClass(target)
    var activeClass = getActiveClass(toggleLink)
    toggleLink.classList.toggle(activeClass)
    target.classList.toggle(targetActiveClass)
  }

  function sideBarToggle (event) {
    event.preventDefault()
    var sidebarSubNav = event.currentTarget.parentElement
    sidebarSubNav.classList.toggle('active')
  }

  function getActiveClass (selector) {
    return selector.classList[0] + '--active'
  }

  return new App()
})(document, window, $, Overlay, ClassToggler, Tabs)
