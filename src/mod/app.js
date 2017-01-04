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
    switch( id.toLowerCase() ) {
    case 'welcome':
        W('welcome').visible = true;
        break;
    }
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
    if( location != '#Welcome' ) location = '#Welcome';

    W('welcome').visible = false;
    window.setTimeout(function() {
        var img = new Image();
        img.src = "css/app/background.jpg";
        img.onload = function() {
            require("tfw.font-loader")("mystery-quest", "josefin").then(function() {
                $.removeClass( "LOGO", "fullscreen" );
                $.removeClass( "LOADING", "fullscreen" );
                window.setTimeout(function() {
                    $.addClass( "LOGO", "stick" );
                    $.detach( "LOADING" );
                    W('welcome').visible = true;
                }, 400);
            });
        };
    }, 300);
};
