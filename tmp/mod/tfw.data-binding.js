{"intl":"var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\r\n","src":"/** @module tfw.data-binding */require( 'tfw.data-binding', function(require, module, exports) { var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\r\n    /**\r\n * @module\r\n *\r\n * Provide all the functions needed for data-binding.\r\n *\r\n * @example\r\n * var DB = require('tfw.data-binding');\r\n * DB.propAddClass( widget, 'visible', 'show' );\r\n */\r\nrequire(\"polyfill.string\");\r\nvar $ = require(\"dom\");\r\nvar ParseUnit = require(\"tfw.css\").parseUnit;\r\nvar Listeners = require(\"tfw.listeners\");\r\n\r\n\r\nvar ID = '_tfw.data-binding_';\r\n\r\nvar converters = {\r\n    castArray: function(v) {\r\n        if (Array.isArray( v )) return v;\r\n        return [v];\r\n    },\r\n    castBoolean: function(v) {\r\n        if (typeof v === 'boolean') return v;\r\n        if (typeof v === 'string') {\r\n            v = v.trim().toLowerCase();\r\n            if (v == '1' || v == 'true' || v == 'yes') {\r\n                return true;\r\n            } else if (v == '0' || v == 'false' || v == 'no') {\r\n                return false;\r\n            }\r\n        }\r\n        if (typeof v === 'number') {\r\n            return v ? true : false;\r\n        }\r\n        return null;\r\n    },\r\n    castColor: function(v) {\r\n        return \"\" + v;\r\n    },\r\n    castEnum: function( enumeration ) {\r\n        var lowerCaseEnum = enumeration.map(String.toLowerCase);\r\n        return function(v) {\r\n            if (typeof v === 'number') {\r\n                return enumeration[Math.floor( v ) % enumeration.length];\r\n            }\r\n            if (typeof v !== 'string') return enumeration[0];\r\n            var idx = lowerCaseEnum.indexOf( v.trim().toLowerCase() );\r\n            if (idx < 0) idx = 0;\r\n            return enumeration[idx];\r\n        };\r\n    },\r\n    castInteger: function(v) {\r\n        if (typeof v === 'number') {\r\n            return Math.floor( v );\r\n        }\r\n        if (typeof v === 'boolean') return v ? 1 : 0;\r\n        if (typeof v === 'string') {\r\n            return parseInt( v );\r\n        }\r\n        return Number.NaN;\r\n    },\r\n    castRegexp: function(v) {\r\n        if (v instanceof RegExp) return v;\r\n        if (typeof v === 'string' && v.trim().length != 0 ) {\r\n            try {\r\n                return new RegExp( v );\r\n            }\r\n            // Ignore Regular Expression errors.\r\n            catch (ex) {\r\n                console.error(\"[castRegexp] /\" + v + \"/ \", ex);\r\n            }\r\n        };\r\n        return null;\r\n    },\r\n    castString: function(v) {\r\n        if (typeof v === 'string') return v;\r\n        if (v === undefined || v === null) return '';\r\n        return JSON.stringify( v );\r\n    },\r\n    castStringArray: function(v) {\r\n        if (Array.isArray( v )) return v;\r\n        if (typeof v === 'string') {\r\n            return v.split( ',' ).map(String.trim);\r\n        }\r\n        return [JSON.stringify( v )];\r\n    },\r\n    castUnit: function(v) {\r\n        if( !v ) return { v: 0, u: 'px' };\r\n        if( typeof v.v !== 'undefined' ) {\r\n            v.v = parseFloat( v.v );\r\n            if( isNaN( v.v ) ) return { v: 0, u: 'px' };\r\n            if( typeof v.u !== 'string' ) v.u = 'px';\r\n            return { v: v.v, u: v.u };\r\n        }\r\n        if( typeof v === 'number' ) return { v: v, u: 'px' };\r\n        if( typeof v !== 'string' ) return { v: 0, u: 'px' };\r\n        return ParseUnit( '' + v );\r\n    },\r\n    castValidator: function(v) {\r\n        if (typeof v === 'function') return v;\r\n        if (typeof v === 'boolean') return function() { return v; };\r\n        if (typeof v === 'string' && v.trim().length != 0 ) {\r\n            try {\r\n                var rx = new RegExp( v );\r\n                return rx.test.bind( rx );\r\n            }\r\n            // Ignore Regular Expression errors.\r\n            catch (ex) {\r\n                console.error(\"[castValidator] /\" + v + \"/ \", ex);\r\n            }\r\n        };\r\n        return function() { return null; };\r\n    }\r\n};\r\n\r\n/**\r\n * @param {any|function} val - Default value, or a specific getter (if `val` is a function).\r\n */\r\nfunction propCast( caster, obj, att, val ) {\r\n    var hasSpecialGetter = typeof val === 'function';\r\n    if( typeof obj[ID] === 'undefined' ) obj[ID] = {};\r\n    obj[ID][att] = {\r\n        value: val,\r\n        event: new Listeners()\r\n    };\r\n    var setter;\r\n    if (typeof caster === 'function') {\r\n        setter = function(v) {\r\n            v = caster( v );\r\n            // If there is a special getter, any set will fire.\r\n            // Otherwise, we fire only if the value has changed.\r\n            if( hasSpecialGetter || obj[ID][att].value !== v) {\r\n                obj[ID][att].value = v;\r\n                obj[ID][att].event.fire( v, obj, att );\r\n            }\r\n        };\r\n    } else {\r\n        setter = function(v) {\r\n            // If there is a special getter, any set will fire.\r\n            // Otherwise, we fire only if the value has changed.\r\n            if( hasSpecialGetter || obj[ID][att].value !== v ) {\r\n                obj[ID][att].value = v;\r\n                obj[ID][att].event.fire( v, obj, att );\r\n            }\r\n        };\r\n    }\r\n    var getter = val;\r\n    if (!hasSpecialGetter) {\r\n        // Default getter.\r\n        getter = function() { return obj[ID][att].value; };\r\n    }\r\n    Object.defineProperty( obj, att, {\r\n        get: getter,\r\n        set: setter,\r\n        configurable: false,\r\n        enumerable: true\r\n    });\r\n    return exports.bind.bind(exports, obj, att);\r\n};\r\n\r\n/**\r\n * @export function fire\r\n *\r\n * Set a new value and fire the event even if the value has not changed.\r\n */\r\nexports.fire = function( obj, att, val ) {\r\n    var currentValue = obj[att];\r\n    if( typeof val === 'undefined' ) val = currentValue;\r\n\r\n    obj[ID][att].value = val;\r\n    obj[ID][att].event.fire( obj[att], obj, att );\r\n};\r\n\r\n/**\r\n * @export function set\r\n *\r\n * Set a new value without firing any event.\r\n */\r\nexports.set = function( obj, att, val ) {\r\n    if( typeof obj[ID] === 'undefined' ) obj[ID] = {};\r\n    if( typeof obj[ID][att] === 'undefined' ) obj[ID][att] = {};\r\n    obj[ID][att].value = val;\r\n};\r\n\r\n/**\r\n * @export function get\r\n *\r\n * Get a value without firing any event.\r\n */\r\nexports.get = function( obj, att ) {\r\n    if( typeof obj[ID] === 'undefined' ) return undefined;\r\n    if( typeof obj[ID][att] === 'undefined' ) return undefined;\r\n    return obj[ID][att].value;\r\n};\r\n\r\n/**\r\n * Create a property on which we can bind another property.\r\n * \r\n * @param {object} obj - Object to which we want to add a property.\r\n * @param {string} att - Name of the attribute of `obj`.\r\n * \r\n */\r\nexports.prop = propCast.bind( null, null );\r\n/**\r\n * @export @function propToggleClass\r\n * Create an enum attribute which toggles a CSS class when assigned.\r\n *\r\n * @param {array|object} values - If this is an array, we will convert\r\n * it  into an  object.  For instance `[\"show\",  \"hide\"]` will  become\r\n * `{show: \"show\", hide: \"hide\"}`.\r\n */\r\nexports.propToggleClass = function( target, attribute, values, prefix ) {\r\n    if( typeof prefix !== 'string' ) prefix = '';\r\n    var convertedValues = {};\r\n    if (typeof values === 'string') {\r\n        convertedValues[values] = values;\r\n    }\r\n    else if (Array.isArray(values)) {\r\n        values.forEach(function (itm) {\r\n            convertedValues[itm] = itm;\r\n        });\r\n    }\r\n    else {\r\n        convertedValues = values;\r\n    }\r\n    propCast( null, target, attribute )(function(v) {\r\n        var key, val;\r\n        for( key in convertedValues ) {\r\n            val = convertedValues[key];\r\n            if (key == v) {\r\n                $.addClass( target.element, prefix + val);\r\n            } else {\r\n                $.removeClass( target.element, prefix + val);\r\n            }\r\n        }\r\n    });\r\n};\r\n/**\r\n * @export @function propAddClass\r\n * Create a boolean attribute that toggle a CSS class on the `element` attribute of `target`.\r\n * If the value id `true`, `className` is added.\r\n * @example\r\n * DB.propAddClass( this, 'wide', 'fullscreen' );\r\n * DB.propAddClass( this, 'wide' );\r\n */\r\nexports.propAddClass = function( target, attribute, className ) {\r\n    if( typeof className === 'undefined' ) className = attribute;\r\n    propCast( converters.castBoolean, target, attribute )(function(v) {\r\n        if (v) $.addClass( target.element, className );\r\n        else $.removeClass( target.element, className );\r\n    });\r\n};\r\n/**\r\n * @export @function propAddClass\r\n * Create a boolean attribute that toggle a CSS class on the `element` attribute of `target`.\r\n * If the value id `true`, `className` is removed.\r\n * @example\r\n * DB.propRemoveClass( this, 'visible', 'hide' );\r\n */\r\nexports.propRemoveClass = function( target, attribute, className ) {\r\n    if( typeof className === 'undefined' ) className = attribute;\r\n    propCast( converters.castBoolean, target, attribute )(function(v) {\r\n        if (v) $.removeClass( target.element, className );\r\n        else $.addClass( target.element, className );\r\n    });\r\n};\r\nexports.propArray = propCast.bind( null, converters.castArray );\r\nexports.propBoolean = propCast.bind( null, converters.castBoolean );\r\nexports.propColor = propCast.bind( null, converters.castColor );\r\nexports.propEnum = function( enumeration ) {\r\n    return propCast.bind( null, converters.castEnum( enumeration ) );\r\n};\r\nexports.propInteger = propCast.bind( null, converters.castInteger );\r\nexports.propRegexp = propCast.bind( null, converters.castRegexp );\r\nexports.propString = propCast.bind( null, converters.castString );\r\nexports.propStringArray = propCast.bind( null, converters.castStringArray );\r\nexports.propUnit = propCast.bind( null, converters.castUnit );\r\nexports.propValidator = propCast.bind( null, converters.castValidator );\r\n\r\nexports.bind = function( srcObj, srcAtt, dstObj, dstAtt, options ) {\r\n    if( typeof srcObj[ID] === 'undefined' || typeof srcObj[ID][srcAtt] === 'undefined' ) {\r\n        console.error( srcAtt + \" is not a bindable property of \", srcObj );\r\n        throw Error( srcAtt + \" is not a bindable property!\" );\r\n    }\r\n\r\n    if( typeof options === 'undefined' ) options = {};\r\n    if (options.value) {\r\n        options.converter = function() {\r\n            return options.value;\r\n        };\r\n    }\r\n    var lambda = typeof dstObj === 'function' ? dstObj : function(v, obj, att) {\r\n        dstObj[dstAtt] = typeof options.converter === 'function' ? options.converter(v) : v;\r\n    };\r\n    srcObj[ID][srcAtt].event.add( lambda );\r\n\r\n    return options;\r\n};\r\n\r\n\r\nexports.extend = function( def, ext, obj ) {\r\n    var out = JSON.parse( JSON.stringify( def ) );\r\n\r\n    var key, val;\r\n    for( key in ext ) {\r\n        if (key.charAt(0) == '$') continue;\r\n        val = ext[key];\r\n        if( typeof out[key] === 'undefined' ) {\r\n            console.error(\"[tfw.data-binding.extend] Undefined argument: `\" + key + \"`!\");\r\n        } else {\r\n            out[key] = val;\r\n        }\r\n    }\r\n\r\n    if (typeof obj !== 'undefined') {\r\n        for( key in ext ) {\r\n            if (key.charAt(0) != '$') continue;\r\n            Object.defineProperty( obj, key, {\r\n                value: ext[key],\r\n                writable: false,\r\n                configurable: false,\r\n                enumerable: false\r\n            });\r\n        }\r\n        // Setting values.\r\n        for( key in out ) {\r\n            if (key.charAt(0) == '$') continue;\r\n            obj[key] = out[key];\r\n        }\r\n    }\r\n\r\n    return out;\r\n};\r\n\r\n\r\nexports.converters = converters;\r\n\r\n\r\n  \r\nmodule.exports._ = _;\n/**\n * @module tfw.data-binding\n * @see module:$\n * @see module:polyfill.string\n * @see module:dom\n * @see module:tfw.css\n * @see module:tfw.listeners\n\n */\n});","zip":"require(\"tfw.data-binding\",function(n,e,t){function r(n,e,r,o){var i=\"function\"==typeof o;\"undefined\"==typeof e[a]&&(e[a]={}),e[a][r]={value:o,event:new f};var u;u=\"function\"==typeof n?function(t){t=n(t),(i||e[a][r].value!==t)&&(e[a][r].value=t,e[a][r].event.fire(t,e,r))}:function(n){(i||e[a][r].value!==n)&&(e[a][r].value=n,e[a][r].event.fire(n,e,r))};var l=o;return i||(l=function(){return e[a][r].value}),Object.defineProperty(e,r,{get:l,set:u,configurable:!1,enumerable:!0}),t.bind.bind(t,e,r)}var o=function(){function e(){return r(t,arguments)}var t={en:{}},r=n(\"$\").intl;return e.all=t,e}();n(\"polyfill.string\");var i=n(\"dom\"),u=n(\"tfw.css\").parseUnit,f=n(\"tfw.listeners\"),a=\"_tfw.data-binding_\",l={castArray:function(n){return Array.isArray(n)?n:[n]},castBoolean:function(n){if(\"boolean\"==typeof n)return n;if(\"string\"==typeof n){if(n=n.trim().toLowerCase(),\"1\"==n||\"true\"==n||\"yes\"==n)return!0;if(\"0\"==n||\"false\"==n||\"no\"==n)return!1}return\"number\"==typeof n?!!n:null},castColor:function(n){return\"\"+n},castEnum:function(n){var e=n.map(String.toLowerCase);return function(t){if(\"number\"==typeof t)return n[Math.floor(t)%n.length];if(\"string\"!=typeof t)return n[0];var r=e.indexOf(t.trim().toLowerCase());return r<0&&(r=0),n[r]}},castInteger:function(n){return\"number\"==typeof n?Math.floor(n):\"boolean\"==typeof n?n?1:0:\"string\"==typeof n?parseInt(n):Number.NaN},castRegexp:function(n){if(n instanceof RegExp)return n;if(\"string\"==typeof n&&0!=n.trim().length)try{return new RegExp(n)}catch(e){console.error(\"[castRegexp] /\"+n+\"/ \",e)}return null},castString:function(n){return\"string\"==typeof n?n:void 0===n||null===n?\"\":JSON.stringify(n)},castStringArray:function(n){return Array.isArray(n)?n:\"string\"==typeof n?n.split(\",\").map(String.trim):[JSON.stringify(n)]},castUnit:function(n){return n?\"undefined\"!=typeof n.v?(n.v=parseFloat(n.v),isNaN(n.v)?{v:0,u:\"px\"}:(\"string\"!=typeof n.u&&(n.u=\"px\"),{v:n.v,u:n.u})):\"number\"==typeof n?{v:n,u:\"px\"}:\"string\"!=typeof n?{v:0,u:\"px\"}:u(\"\"+n):{v:0,u:\"px\"}},castValidator:function(n){if(\"function\"==typeof n)return n;if(\"boolean\"==typeof n)return function(){return n};if(\"string\"==typeof n&&0!=n.trim().length)try{var e=new RegExp(n);return e.test.bind(e)}catch(e){console.error(\"[castValidator] /\"+n+\"/ \",e)}return function(){return null}}};t.fire=function(n,e,t){var r=n[e];\"undefined\"==typeof t&&(t=r),n[a][e].value=t,n[a][e].event.fire(n[e],n,e)},t.set=function(n,e,t){\"undefined\"==typeof n[a]&&(n[a]={}),\"undefined\"==typeof n[a][e]&&(n[a][e]={}),n[a][e].value=t},t.get=function(n,e){if(\"undefined\"!=typeof n[a]&&\"undefined\"!=typeof n[a][e])return n[a][e].value},t.prop=r.bind(null,null),t.propToggleClass=function(n,e,t,o){\"string\"!=typeof o&&(o=\"\");var u={};\"string\"==typeof t?u[t]=t:Array.isArray(t)?t.forEach(function(n){u[n]=n}):u=t,r(null,n,e)(function(e){var t,r;for(t in u)r=u[t],t==e?i.addClass(n.element,o+r):i.removeClass(n.element,o+r)})},t.propAddClass=function(n,e,t){\"undefined\"==typeof t&&(t=e),r(l.castBoolean,n,e)(function(e){e?i.addClass(n.element,t):i.removeClass(n.element,t)})},t.propRemoveClass=function(n,e,t){\"undefined\"==typeof t&&(t=e),r(l.castBoolean,n,e)(function(e){e?i.removeClass(n.element,t):i.addClass(n.element,t)})},t.propArray=r.bind(null,l.castArray),t.propBoolean=r.bind(null,l.castBoolean),t.propColor=r.bind(null,l.castColor),t.propEnum=function(n){return r.bind(null,l.castEnum(n))},t.propInteger=r.bind(null,l.castInteger),t.propRegexp=r.bind(null,l.castRegexp),t.propString=r.bind(null,l.castString),t.propStringArray=r.bind(null,l.castStringArray),t.propUnit=r.bind(null,l.castUnit),t.propValidator=r.bind(null,l.castValidator),t.bind=function(n,e,t,r,o){if(\"undefined\"==typeof n[a]||\"undefined\"==typeof n[a][e])throw console.error(e+\" is not a bindable property of \",n),Error(e+\" is not a bindable property!\");\"undefined\"==typeof o&&(o={}),o.value&&(o.converter=function(){return o.value});var i=\"function\"==typeof t?t:function(n,e,i){t[r]=\"function\"==typeof o.converter?o.converter(n):n};return n[a][e].event.add(i),o},t.extend=function(n,e,t){var r,o,i=JSON.parse(JSON.stringify(n));for(r in e)\"$\"!=r.charAt(0)&&(o=e[r],\"undefined\"==typeof i[r]?console.error(\"[tfw.data-binding.extend] Undefined argument: `\"+r+\"`!\"):i[r]=o);if(\"undefined\"!=typeof t){for(r in e)\"$\"==r.charAt(0)&&Object.defineProperty(t,r,{value:e[r],writable:!1,configurable:!1,enumerable:!1});for(r in i)\"$\"!=r.charAt(0)&&(t[r]=i[r])}return i},t.converters=l,e.exports._=o});\n//# sourceMappingURL=tfw.data-binding.js.map","map":{"version":3,"file":"tfw.data-binding.js.map","sources":["tfw.data-binding.js"],"sourcesContent":["/** @module tfw.data-binding */require( 'tfw.data-binding', function(require, module, exports) { var _=function(){var D={\"en\":{}},X=require(\"$\").intl;function _(){return X(D,arguments);}_.all=D;return _}();\r\n    /**\r\n * @module\r\n *\r\n * Provide all the functions needed for data-binding.\r\n *\r\n * @example\r\n * var DB = require('tfw.data-binding');\r\n * DB.propAddClass( widget, 'visible', 'show' );\r\n */\r\nrequire(\"polyfill.string\");\r\nvar $ = require(\"dom\");\r\nvar ParseUnit = require(\"tfw.css\").parseUnit;\r\nvar Listeners = require(\"tfw.listeners\");\r\n\r\n\r\nvar ID = '_tfw.data-binding_';\r\n\r\nvar converters = {\r\n    castArray: function(v) {\r\n        if (Array.isArray( v )) return v;\r\n        return [v];\r\n    },\r\n    castBoolean: function(v) {\r\n        if (typeof v === 'boolean') return v;\r\n        if (typeof v === 'string') {\r\n            v = v.trim().toLowerCase();\r\n            if (v == '1' || v == 'true' || v == 'yes') {\r\n                return true;\r\n            } else if (v == '0' || v == 'false' || v == 'no') {\r\n                return false;\r\n            }\r\n        }\r\n        if (typeof v === 'number') {\r\n            return v ? true : false;\r\n        }\r\n        return null;\r\n    },\r\n    castColor: function(v) {\r\n        return \"\" + v;\r\n    },\r\n    castEnum: function( enumeration ) {\r\n        var lowerCaseEnum = enumeration.map(String.toLowerCase);\r\n        return function(v) {\r\n            if (typeof v === 'number') {\r\n                return enumeration[Math.floor( v ) % enumeration.length];\r\n            }\r\n            if (typeof v !== 'string') return enumeration[0];\r\n            var idx = lowerCaseEnum.indexOf( v.trim().toLowerCase() );\r\n            if (idx < 0) idx = 0;\r\n            return enumeration[idx];\r\n        };\r\n    },\r\n    castInteger: function(v) {\r\n        if (typeof v === 'number') {\r\n            return Math.floor( v );\r\n        }\r\n        if (typeof v === 'boolean') return v ? 1 : 0;\r\n        if (typeof v === 'string') {\r\n            return parseInt( v );\r\n        }\r\n        return Number.NaN;\r\n    },\r\n    castRegexp: function(v) {\r\n        if (v instanceof RegExp) return v;\r\n        if (typeof v === 'string' && v.trim().length != 0 ) {\r\n            try {\r\n                return new RegExp( v );\r\n            }\r\n            // Ignore Regular Expression errors.\r\n            catch (ex) {\r\n                console.error(\"[castRegexp] /\" + v + \"/ \", ex);\r\n            }\r\n        };\r\n        return null;\r\n    },\r\n    castString: function(v) {\r\n        if (typeof v === 'string') return v;\r\n        if (v === undefined || v === null) return '';\r\n        return JSON.stringify( v );\r\n    },\r\n    castStringArray: function(v) {\r\n        if (Array.isArray( v )) return v;\r\n        if (typeof v === 'string') {\r\n            return v.split( ',' ).map(String.trim);\r\n        }\r\n        return [JSON.stringify( v )];\r\n    },\r\n    castUnit: function(v) {\r\n        if( !v ) return { v: 0, u: 'px' };\r\n        if( typeof v.v !== 'undefined' ) {\r\n            v.v = parseFloat( v.v );\r\n            if( isNaN( v.v ) ) return { v: 0, u: 'px' };\r\n            if( typeof v.u !== 'string' ) v.u = 'px';\r\n            return { v: v.v, u: v.u };\r\n        }\r\n        if( typeof v === 'number' ) return { v: v, u: 'px' };\r\n        if( typeof v !== 'string' ) return { v: 0, u: 'px' };\r\n        return ParseUnit( '' + v );\r\n    },\r\n    castValidator: function(v) {\r\n        if (typeof v === 'function') return v;\r\n        if (typeof v === 'boolean') return function() { return v; };\r\n        if (typeof v === 'string' && v.trim().length != 0 ) {\r\n            try {\r\n                var rx = new RegExp( v );\r\n                return rx.test.bind( rx );\r\n            }\r\n            // Ignore Regular Expression errors.\r\n            catch (ex) {\r\n                console.error(\"[castValidator] /\" + v + \"/ \", ex);\r\n            }\r\n        };\r\n        return function() { return null; };\r\n    }\r\n};\r\n\r\n/**\r\n * @param {any|function} val - Default value, or a specific getter (if `val` is a function).\r\n */\r\nfunction propCast( caster, obj, att, val ) {\r\n    var hasSpecialGetter = typeof val === 'function';\r\n    if( typeof obj[ID] === 'undefined' ) obj[ID] = {};\r\n    obj[ID][att] = {\r\n        value: val,\r\n        event: new Listeners()\r\n    };\r\n    var setter;\r\n    if (typeof caster === 'function') {\r\n        setter = function(v) {\r\n            v = caster( v );\r\n            // If there is a special getter, any set will fire.\r\n            // Otherwise, we fire only if the value has changed.\r\n            if( hasSpecialGetter || obj[ID][att].value !== v) {\r\n                obj[ID][att].value = v;\r\n                obj[ID][att].event.fire( v, obj, att );\r\n            }\r\n        };\r\n    } else {\r\n        setter = function(v) {\r\n            // If there is a special getter, any set will fire.\r\n            // Otherwise, we fire only if the value has changed.\r\n            if( hasSpecialGetter || obj[ID][att].value !== v ) {\r\n                obj[ID][att].value = v;\r\n                obj[ID][att].event.fire( v, obj, att );\r\n            }\r\n        };\r\n    }\r\n    var getter = val;\r\n    if (!hasSpecialGetter) {\r\n        // Default getter.\r\n        getter = function() { return obj[ID][att].value; };\r\n    }\r\n    Object.defineProperty( obj, att, {\r\n        get: getter,\r\n        set: setter,\r\n        configurable: false,\r\n        enumerable: true\r\n    });\r\n    return exports.bind.bind(exports, obj, att);\r\n};\r\n\r\n/**\r\n * @export function fire\r\n *\r\n * Set a new value and fire the event even if the value has not changed.\r\n */\r\nexports.fire = function( obj, att, val ) {\r\n    var currentValue = obj[att];\r\n    if( typeof val === 'undefined' ) val = currentValue;\r\n\r\n    obj[ID][att].value = val;\r\n    obj[ID][att].event.fire( obj[att], obj, att );\r\n};\r\n\r\n/**\r\n * @export function set\r\n *\r\n * Set a new value without firing any event.\r\n */\r\nexports.set = function( obj, att, val ) {\r\n    if( typeof obj[ID] === 'undefined' ) obj[ID] = {};\r\n    if( typeof obj[ID][att] === 'undefined' ) obj[ID][att] = {};\r\n    obj[ID][att].value = val;\r\n};\r\n\r\n/**\r\n * @export function get\r\n *\r\n * Get a value without firing any event.\r\n */\r\nexports.get = function( obj, att ) {\r\n    if( typeof obj[ID] === 'undefined' ) return undefined;\r\n    if( typeof obj[ID][att] === 'undefined' ) return undefined;\r\n    return obj[ID][att].value;\r\n};\r\n\r\n/**\r\n * Create a property on which we can bind another property.\r\n * \r\n * @param {object} obj - Object to which we want to add a property.\r\n * @param {string} att - Name of the attribute of `obj`.\r\n * \r\n */\r\nexports.prop = propCast.bind( null, null );\r\n/**\r\n * @export @function propToggleClass\r\n * Create an enum attribute which toggles a CSS class when assigned.\r\n *\r\n * @param {array|object} values - If this is an array, we will convert\r\n * it  into an  object.  For instance `[\"show\",  \"hide\"]` will  become\r\n * `{show: \"show\", hide: \"hide\"}`.\r\n */\r\nexports.propToggleClass = function( target, attribute, values, prefix ) {\r\n    if( typeof prefix !== 'string' ) prefix = '';\r\n    var convertedValues = {};\r\n    if (typeof values === 'string') {\r\n        convertedValues[values] = values;\r\n    }\r\n    else if (Array.isArray(values)) {\r\n        values.forEach(function (itm) {\r\n            convertedValues[itm] = itm;\r\n        });\r\n    }\r\n    else {\r\n        convertedValues = values;\r\n    }\r\n    propCast( null, target, attribute )(function(v) {\r\n        var key, val;\r\n        for( key in convertedValues ) {\r\n            val = convertedValues[key];\r\n            if (key == v) {\r\n                $.addClass( target.element, prefix + val);\r\n            } else {\r\n                $.removeClass( target.element, prefix + val);\r\n            }\r\n        }\r\n    });\r\n};\r\n/**\r\n * @export @function propAddClass\r\n * Create a boolean attribute that toggle a CSS class on the `element` attribute of `target`.\r\n * If the value id `true`, `className` is added.\r\n * @example\r\n * DB.propAddClass( this, 'wide', 'fullscreen' );\r\n * DB.propAddClass( this, 'wide' );\r\n */\r\nexports.propAddClass = function( target, attribute, className ) {\r\n    if( typeof className === 'undefined' ) className = attribute;\r\n    propCast( converters.castBoolean, target, attribute )(function(v) {\r\n        if (v) $.addClass( target.element, className );\r\n        else $.removeClass( target.element, className );\r\n    });\r\n};\r\n/**\r\n * @export @function propAddClass\r\n * Create a boolean attribute that toggle a CSS class on the `element` attribute of `target`.\r\n * If the value id `true`, `className` is removed.\r\n * @example\r\n * DB.propRemoveClass( this, 'visible', 'hide' );\r\n */\r\nexports.propRemoveClass = function( target, attribute, className ) {\r\n    if( typeof className === 'undefined' ) className = attribute;\r\n    propCast( converters.castBoolean, target, attribute )(function(v) {\r\n        if (v) $.removeClass( target.element, className );\r\n        else $.addClass( target.element, className );\r\n    });\r\n};\r\nexports.propArray = propCast.bind( null, converters.castArray );\r\nexports.propBoolean = propCast.bind( null, converters.castBoolean );\r\nexports.propColor = propCast.bind( null, converters.castColor );\r\nexports.propEnum = function( enumeration ) {\r\n    return propCast.bind( null, converters.castEnum( enumeration ) );\r\n};\r\nexports.propInteger = propCast.bind( null, converters.castInteger );\r\nexports.propRegexp = propCast.bind( null, converters.castRegexp );\r\nexports.propString = propCast.bind( null, converters.castString );\r\nexports.propStringArray = propCast.bind( null, converters.castStringArray );\r\nexports.propUnit = propCast.bind( null, converters.castUnit );\r\nexports.propValidator = propCast.bind( null, converters.castValidator );\r\n\r\nexports.bind = function( srcObj, srcAtt, dstObj, dstAtt, options ) {\r\n    if( typeof srcObj[ID] === 'undefined' || typeof srcObj[ID][srcAtt] === 'undefined' ) {\r\n        console.error( srcAtt + \" is not a bindable property of \", srcObj );\r\n        throw Error( srcAtt + \" is not a bindable property!\" );\r\n    }\r\n\r\n    if( typeof options === 'undefined' ) options = {};\r\n    if (options.value) {\r\n        options.converter = function() {\r\n            return options.value;\r\n        };\r\n    }\r\n    var lambda = typeof dstObj === 'function' ? dstObj : function(v, obj, att) {\r\n        dstObj[dstAtt] = typeof options.converter === 'function' ? options.converter(v) : v;\r\n    };\r\n    srcObj[ID][srcAtt].event.add( lambda );\r\n\r\n    return options;\r\n};\r\n\r\n\r\nexports.extend = function( def, ext, obj ) {\r\n    var out = JSON.parse( JSON.stringify( def ) );\r\n\r\n    var key, val;\r\n    for( key in ext ) {\r\n        if (key.charAt(0) == '$') continue;\r\n        val = ext[key];\r\n        if( typeof out[key] === 'undefined' ) {\r\n            console.error(\"[tfw.data-binding.extend] Undefined argument: `\" + key + \"`!\");\r\n        } else {\r\n            out[key] = val;\r\n        }\r\n    }\r\n\r\n    if (typeof obj !== 'undefined') {\r\n        for( key in ext ) {\r\n            if (key.charAt(0) != '$') continue;\r\n            Object.defineProperty( obj, key, {\r\n                value: ext[key],\r\n                writable: false,\r\n                configurable: false,\r\n                enumerable: false\r\n            });\r\n        }\r\n        // Setting values.\r\n        for( key in out ) {\r\n            if (key.charAt(0) == '$') continue;\r\n            obj[key] = out[key];\r\n        }\r\n    }\r\n\r\n    return out;\r\n};\r\n\r\n\r\nexports.converters = converters;\r\n\r\n\r\n  \r\nmodule.exports._ = _;\n});"],"names":["require","module","exports","propCast","caster","obj","att","val","hasSpecialGetter","ID","value","event","Listeners","setter","v","fire","getter","Object","defineProperty","get","set","configurable","enumerable","bind","_","X","D","arguments","en","intl","all","$","ParseUnit","parseUnit","converters","castArray","Array","isArray","castBoolean","trim","toLowerCase","castColor","castEnum","enumeration","lowerCaseEnum","map","String","Math","floor","length","idx","indexOf","castInteger","parseInt","Number","NaN","castRegexp","RegExp","ex","console","error","castString","undefined","JSON","stringify","castStringArray","split","castUnit","parseFloat","isNaN","u","castValidator","rx","test","currentValue","prop","propToggleClass","target","attribute","values","prefix","convertedValues","forEach","itm","key","addClass","element","removeClass","propAddClass","className","propRemoveClass","propArray","propBoolean","propColor","propEnum","propInteger","propRegexp","propString","propStringArray","propUnit","propValidator","srcObj","srcAtt","dstObj","dstAtt","options","Error","converter","lambda","add","extend","def","ext","out","parse","charAt","writable"],"mappings":"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"},"dependencies":["mod/$","mod/polyfill.string","mod/dom","mod/tfw.css","mod/tfw.listeners"]}