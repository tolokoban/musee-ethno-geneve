/**********************************************************************
 require( 'require' )
 -----------------------------------------------------------------------
 @example

 var Path = require("node://path");  // Only in NodeJS/NW.js environment.
 var Button = require("tfw.button");

 **********************************************************************/

window.require = function() {
    var modules = {};
    var definitions = {};
    var nodejs_require = typeof window.require === 'function' ? window.require : null;

    var f = function(id, body) {
        if( id.substr( 0, 7 ) == 'node://' ) {
            // Calling for a NodeJS module.
            if( !nodejs_require ) {
                throw Error( "[require] NodeJS is not available to load module `" + id + "`!" );
            }
            return nodejs_require( id.substr( 7 ) );
        }

        if( typeof body === 'function' ) {
            definitions[id] = body;
            return;
        }
        var mod;
        body = definitions[id];
        if (typeof body === 'undefined') {
            var err = new Error("Required module is missing: " + id);   
            console.error(err.stack);
            throw err;
        }
        mod = modules[id];
        if (typeof mod === 'undefined') {
            mod = {exports: {}};
            var exports = mod.exports;
            body(f, mod, exports);
            modules[id] = mod.exports;
            mod = mod.exports;
            //console.log("Module initialized: " + id);
        }
        return mod;
    };
    return f;
}();
function addListener(e,l) {
    if (window.addEventListener) {
        window.addEventListener(e,l,false);
    } else {
        window.attachEvent('on' + e, l);
    }
};

addListener(
    'DOMContentLoaded',
    function() {
        document.body.parentNode.$data = {};
        // Attach controllers.
        APP = require('app');
setTimeout(function (){if(typeof APP.start==='function')APP.start()});
var W = require('x-widget');
        W('wdg.layout-stack9', 'wdg.layout-stack', {
            hash: "^#([a-zA-Z0-9]+)",
            value: "Welcome",
            content: [
          W({
              elem: "div",
              attr: {
                key: "Welcome",
                class: "x-page"},
              prop: {"$key": "Welcome"},
              children: [
                W({
                  elem: "div",
                  children: [
                    "\r\n    ",
                                        W('wdg.modal10', 'wdg.modal', {
                      visible: "true",
                      padding: "true",
                      content: [
                      W({
                          elem: "center",
                          children: [
                            "\r\n                ",
                            W({
                              elem: "p",
                              children: [
                                "Bonjour à toi qui vient visiter le ",
                                W({
                                  elem: "b",
                                  children: ["Musée d'Ethnographie de Genève"]}),
                                " !"]}),
                            "\r\n                ",
                            W({
                              elem: "p",
                              children: ["Comment dois-je t'appeler ?"]}),
                            "\r\n                ",
                            W({
                              elem: "div",
                              attr: {
                                class: "x-spc H",
                                style: "height:3rem"}}),
                            "\r\n                \r\n                ",
                                                        W('wdg.flex11', 'wdg.flex', {"content": [
                                                              W('btnFemale', 'wdg.button', {"text": "Voyageuse"}),
                              W({
                                  elem: "center",
                                  children: ["ou bien"]}),
                                                              W('btnMale', 'wdg.button', {"text": "Voyageur"})]}),
                            "\r\n            "]})]}),
                    "\r\n"]}),
                "\r\n"]})]})
        W.bind('wdg.layout-stack9',{"value":{"S":["onPage"]}});
    }
);
