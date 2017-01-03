var W = require("x-widget");
var DB = require("tfw.data-binding");

describe('[x-widget]', function() {
    var result = null;
    window.APP = {
        slot: function(v) {
            result = v;
        }
    };

    it('should add slot on a button', function() {
        W( 'btnFemale', 'wdg.button', {
            text: "Voyageuse",
            value: "F"} );
        W.bind( 'btnFemale', { action: { S: ['slot'] } } );
        var btn = W.getById( 'btnFemale' );
        btn.action = 'GO';
        expect( result ).toBe( 'GO' );
    });

    it('should add the same slot on two buttons', function() {
        W( 'btnFemale', 'wdg.button', {
            text: "Voyageuse",
            value: "F"} );
        W.bind( 'btnFemale', { action: { S: ['slot'] } } );
        W( 'btnMale', 'wdg.button', {
            text: "Voyageuse",
            value: "F"} );
        W.bind( 'btnMale', { action: { S: ['slot'] } } );
        var btnF = W.getById( 'btnFemale' );
        DB.fire( btnF, 'action', 'F' );
        expect( result ).toBe( 'F' );
        var btnM = W.getById( 'btnMale' );
        btnM.action = 'M';
        expect( result ).toBe( 'M' );
    });

});
