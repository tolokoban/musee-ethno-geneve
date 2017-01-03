/** @module app */require( 'app', function(require, module, exports) { var _=function(){var D={"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
    /**
 * @module app
 *
 *
 */
"use strict";

require("font.mystery-quest");
require("font.josefin");

var $ = require("dom");
var W = require("x-widget").getById;

var G = {
    gender: 'M'
};

exports.onPage = function( id ) {

};

exports.onGender = function( gender ) {
    G.gender = gender;
    console.info("[app] gender=...", gender);
    W('welcome').visible = false;
    window.setTimeout(function() {
        location = "#Intro";
    }, 300);
};


exports.start = function() {
    W('welcome').visible = false;
    window.setTimeout(function() {
        var img = new Image();
        img.src = "css/app/background.jpg";
        img.onload = function() {
            require("tfw.font-loader")("mystery-quest", "josefin").then(function() {
                $.removeClass( "LOGO", "fullscreen" );
                $.removeClass( "LOADING", "fullscreen" );
                window.setTimeout(function() {
                    $.detach( "LOADING" );
                    W('welcome').visible = true;
                }, 400);
            });
        };
    }, 300);
};


  
module.exports._ = _;
/**
 * @module app
 * @see module:$
 * @see module:font.mystery-quest
 * @see module:font.josefin
 * @see module:dom
 * @see module:x-widget
 * @see module:tfw.font-loader

 */
});