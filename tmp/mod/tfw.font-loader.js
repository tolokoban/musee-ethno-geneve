{"intl":"var _=function(){var D={\"en\":{},\"fr\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\r\n","src":"/** @module tfw.font-loader */require( 'tfw.font-loader', function(require, module, exports) { var _=function(){var D={\"en\":{},\"fr\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\r\n    \"use strict\";\r\n\r\nrequire(\"polyfill.promise\");\r\n\r\nmodule.exports = function() {\r\n    var args = [].slice.call( arguments );\r\n    if( document.fonts && typeof document.fonts.load === 'function') {\r\n        return fontAPI( args );\r\n    } else {\r\n        return fallback( args );\r\n    }\r\n};\r\n\r\n\r\n/**\r\n * Use the modern Font API.\r\n */\r\nfunction fontAPI( fonts ) {\r\n    var promises = [];\r\n    fonts.forEach(function (font) {\r\n        var pro = document.fonts.load( '64px \"' + font + '\"' );\r\n        promises.push( pro );\r\n    });\r\n    return Promise.all( promises );\r\n}\r\n\r\n\r\n/**\r\n * For old browsers, use a not-always-working trick.\r\n */\r\nfunction fallback( fonts ) {\r\n    return new Promise(function (resolve, reject) {\r\n        var divs = [];\r\n        var body = document.body;\r\n        fonts.forEach(function (font) {\r\n            var div = document.createElement( 'div' );\r\n            div.className = 'tfw-font-loader';\r\n            div.style.fontFamily = font;\r\n            body.appendChild( div );\r\n        });\r\n        // Ugly trick: juste wait 1.5 second.\r\n        window.setTimeout(function () {\r\n            divs.forEach(function (d) {\r\n                body.removeChild( d );\r\n            });\r\n            resolve( fonts );\r\n        }, 1500);\r\n    });\r\n}\r\n\r\n\r\n  \r\nmodule.exports._ = _;\n/**\n * @module tfw.font-loader\n * @see module:$\n * @see module:polyfill.promise\n\n */\n});","zip":"require(\"tfw.font-loader\",function(n,o,t){function e(n){var o=[];return n.forEach(function(n){var t=document.fonts.load('64px \"'+n+'\"');o.push(t)}),Promise.all(o)}function r(n){return new Promise(function(o,t){var e=[],r=document.body;n.forEach(function(n){var o=document.createElement(\"div\");o.className=\"tfw-font-loader\",o.style.fontFamily=n,r.appendChild(o)}),window.setTimeout(function(){e.forEach(function(n){r.removeChild(n)}),o(n)},1500)})}var f=function(){function o(){return e(t,arguments)}var t={en:{},fr:{}},e=n(\"$\").intl;return o.all=t,o}();n(\"polyfill.promise\"),o.exports=function(){var n=[].slice.call(arguments);return document.fonts&&\"function\"==typeof document.fonts.load?e(n):r(n)},o.exports._=f});\n//# sourceMappingURL=tfw.font-loader.js.map","map":{"version":3,"file":"tfw.font-loader.js.map","sources":["tfw.font-loader.js"],"sourcesContent":["/** @module tfw.font-loader */require( 'tfw.font-loader', function(require, module, exports) { var _=function(){var D={\"en\":{},\"fr\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\r\n    \"use strict\";\r\n\r\nrequire(\"polyfill.promise\");\r\n\r\nmodule.exports = function() {\r\n    var args = [].slice.call( arguments );\r\n    if( document.fonts && typeof document.fonts.load === 'function') {\r\n        return fontAPI( args );\r\n    } else {\r\n        return fallback( args );\r\n    }\r\n};\r\n\r\n\r\n/**\r\n * Use the modern Font API.\r\n */\r\nfunction fontAPI( fonts ) {\r\n    var promises = [];\r\n    fonts.forEach(function (font) {\r\n        var pro = document.fonts.load( '64px \"' + font + '\"' );\r\n        promises.push( pro );\r\n    });\r\n    return Promise.all( promises );\r\n}\r\n\r\n\r\n/**\r\n * For old browsers, use a not-always-working trick.\r\n */\r\nfunction fallback( fonts ) {\r\n    return new Promise(function (resolve, reject) {\r\n        var divs = [];\r\n        var body = document.body;\r\n        fonts.forEach(function (font) {\r\n            var div = document.createElement( 'div' );\r\n            div.className = 'tfw-font-loader';\r\n            div.style.fontFamily = font;\r\n            body.appendChild( div );\r\n        });\r\n        // Ugly trick: juste wait 1.5 second.\r\n        window.setTimeout(function () {\r\n            divs.forEach(function (d) {\r\n                body.removeChild( d );\r\n            });\r\n            resolve( fonts );\r\n        }, 1500);\r\n    });\r\n}\r\n\r\n\r\n  \r\nmodule.exports._ = _;\n});"],"names":["require","module","exports","fontAPI","fonts","promises","forEach","font","pro","document","load","push","Promise","all","fallback","resolve","reject","divs","body","div","createElement","className","style","fontFamily","appendChild","window","setTimeout","d","removeChild","_","X","D","arguments","en","fr","intl","args","slice","call"],"mappings":"AAA8BA,QAAS,kBAAmB,SAASA,EAASC,EAAQC,GAkBpF,QAASC,GAASC,GACd,GAAIC,KAKJ,OAJAD,GAAME,QAAQ,SAAUC,GACpB,GAAIC,GAAMC,SAASL,MAAMM,KAAM,SAAWH,EAAO,IACjDF,GAASM,KAAMH,KAEZI,QAAQC,IAAKR,GAOxB,QAASS,GAAUV,GACf,MAAO,IAAIQ,SAAQ,SAAUG,EAASC,GAClC,GAAIC,MACAC,EAAOT,SAASS,IACpBd,GAAME,QAAQ,SAAUC,GACpB,GAAIY,GAAMV,SAASW,cAAe,MAClCD,GAAIE,UAAY,kBAChBF,EAAIG,MAAMC,WAAahB,EACvBW,EAAKM,YAAaL,KAGtBM,OAAOC,WAAW,WACdT,EAAKX,QAAQ,SAAUqB,GACnBT,EAAKU,YAAaD,KAEtBZ,EAASX,IACV,QA/CoF,GAAIyB,GAAE,WAAuD,QAASA,KAAI,MAAOC,GAAEC,EAAEC,WAApE,GAAID,IAAGE,MAAQC,OAASJ,EAAE9B,EAAQ,KAAKmC,IAAiD,OAARN,GAAEhB,IAAIkB,EAASF,IAG/M7B,GAAQ,oBAERC,EAAOC,QAAU,WACb,GAAIkC,MAAUC,MAAMC,KAAMN,UAC1B,OAAIvB,UAASL,OAAwC,kBAAxBK,UAASL,MAAMM,KACjCP,EAASiC,GAETtB,EAAUsB,IA2CzBnC,EAAOC,QAAQ2B,EAAIA"},"dependencies":["mod/$","mod/polyfill.promise"]}