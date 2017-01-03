{"intl":"var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\r\n","src":"/** @module tfw.hash-watcher */require( 'tfw.hash-watcher', function(require, module, exports) { var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\r\n    /**\r\n * The HASH is a very convenient way to deal with the browser history.\r\n * You can use the `:target` CSS selector, but there are few annoying caveats.\r\n * This module is a watcher for hash changes. Just pass it a callback as argument.\r\n * It will be called as soon as the hash changed.\r\n */\r\nvar Listeners = require(\"tfw.listeners\");\r\n\r\nvar lastHash = \"?random-hash.\" + Date.now();\r\nvar timer = 0;\r\nvar hash = '';\r\nvar args = [];\r\nvar listeners = new Listeners();\r\n\r\nmodule.exports = function(onChange) {\r\n    listeners.add( onChange );\r\n    if (!timer) {\r\n        timer = window.setInterval(\r\n            function() {\r\n                var currentHash = window.location.hash;\r\n                if (lastHash == currentHash) return;\r\n                lastHash = currentHash;\r\n                if (currentHash.charAt(0) == '#') {\r\n                    currentHash = currentHash.substr(1);\r\n                }\r\n                hash = currentHash;\r\n                while (currentHash.charAt(0) == '/') {\r\n                    currentHash = currentHash.substr(1);\r\n                }\r\n                args = currentHash.split(\"/\");\r\n                listeners.fire( args, window.location.hash );\r\n            },\r\n            50\r\n        );\r\n    }\r\n};\r\n\r\n\r\nmodule.exports.args = function() {\r\n    return args;\r\n};\r\n\r\nmodule.exports.hash = function() {\r\n    return hash;\r\n};\r\n\r\n\r\n  \r\nmodule.exports._ = _;\n/**\n * @module tfw.hash-watcher\n * @see module:$\n * @see module:tfw.listeners\n\n */\n});","zip":"require(\"tfw.hash-watcher\",function(n,t,r){var o=function(){function t(){return o(r,arguments)}var r={en:{}},o=n(\"$\").intl;return t.all=r,t}(),a=n(\"tfw.listeners\"),e=\"?random-hash.\"+Date.now(),i=0,s=\"\",u=[],h=new a;t.exports=function(n){h.add(n),i||(i=window.setInterval(function(){var n=window.location.hash;if(e!=n){for(e=n,\"#\"==n.charAt(0)&&(n=n.substr(1)),s=n;\"/\"==n.charAt(0);)n=n.substr(1);u=n.split(\"/\"),h.fire(u,window.location.hash)}},50))},t.exports.args=function(){return u},t.exports.hash=function(){return s},t.exports._=o});\n//# sourceMappingURL=tfw.hash-watcher.js.map","map":{"version":3,"file":"tfw.hash-watcher.js.map","sources":["tfw.hash-watcher.js"],"sourcesContent":["/** @module tfw.hash-watcher */require( 'tfw.hash-watcher', function(require, module, exports) { var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\r\n    /**\r\n * The HASH is a very convenient way to deal with the browser history.\r\n * You can use the `:target` CSS selector, but there are few annoying caveats.\r\n * This module is a watcher for hash changes. Just pass it a callback as argument.\r\n * It will be called as soon as the hash changed.\r\n */\r\nvar Listeners = require(\"tfw.listeners\");\r\n\r\nvar lastHash = \"?random-hash.\" + Date.now();\r\nvar timer = 0;\r\nvar hash = '';\r\nvar args = [];\r\nvar listeners = new Listeners();\r\n\r\nmodule.exports = function(onChange) {\r\n    listeners.add( onChange );\r\n    if (!timer) {\r\n        timer = window.setInterval(\r\n            function() {\r\n                var currentHash = window.location.hash;\r\n                if (lastHash == currentHash) return;\r\n                lastHash = currentHash;\r\n                if (currentHash.charAt(0) == '#') {\r\n                    currentHash = currentHash.substr(1);\r\n                }\r\n                hash = currentHash;\r\n                while (currentHash.charAt(0) == '/') {\r\n                    currentHash = currentHash.substr(1);\r\n                }\r\n                args = currentHash.split(\"/\");\r\n                listeners.fire( args, window.location.hash );\r\n            },\r\n            50\r\n        );\r\n    }\r\n};\r\n\r\n\r\nmodule.exports.args = function() {\r\n    return args;\r\n};\r\n\r\nmodule.exports.hash = function() {\r\n    return hash;\r\n};\r\n\r\n\r\n  \r\nmodule.exports._ = _;\n});"],"names":["require","module","exports","_","X","D","arguments","en","intl","all","Listeners","lastHash","Date","now","timer","hash","args","listeners","onChange","add","window","setInterval","currentHash","location","charAt","substr","split","fire"],"mappings":"AAA+BA,QAAS,mBAAoB,SAASA,EAASC,EAAQC,GAAW,GAAIC,GAAE,WAA+C,QAASA,KAAI,MAAOC,GAAEC,EAAEC,WAA5D,GAAID,IAAGE,OAASH,EAAEJ,EAAQ,KAAKQ,IAAiD,OAARL,GAAEM,IAAIJ,EAASF,KAOrMO,EAAYV,EAAQ,iBAEpBW,EAAW,gBAAkBC,KAAKC,MAClCC,EAAQ,EACRC,EAAO,GACPC,KACAC,EAAY,GAAIP,EAEpBT,GAAOC,QAAU,SAASgB,GACtBD,EAAUE,IAAKD,GACVJ,IACDA,EAAQM,OAAOC,YACX,WACI,GAAIC,GAAcF,OAAOG,SAASR,IAClC,IAAIJ,GAAYW,EAAhB,CAMA,IALAX,EAAWW,EACkB,KAAzBA,EAAYE,OAAO,KACnBF,EAAcA,EAAYG,OAAO,IAErCV,EAAOO,EACyB,KAAzBA,EAAYE,OAAO,IACtBF,EAAcA,EAAYG,OAAO,EAErCT,GAAOM,EAAYI,MAAM,KACzBT,EAAUU,KAAMX,EAAMI,OAAOG,SAASR,QAE1C,MAMZd,EAAOC,QAAQc,KAAO,WAClB,MAAOA,IAGXf,EAAOC,QAAQa,KAAO,WAClB,MAAOA,IAKXd,EAAOC,QAAQC,EAAIA"},"dependencies":["mod/$","mod/tfw.listeners"]}