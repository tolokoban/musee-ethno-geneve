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
