var DB = require("tfw.data-binding");

describe('[tfw.data-binding]', function() {
    var result = null;
    var slot = function(v) {
        result = v;
    };

    it('should fire when asked to', function() {
        var obj = {};
        DB.prop( obj, 'value' );
        DB.bind( obj, 'value', slot );
        obj.value = 27;
        expect( result ).toBe( 27 );
    });

    it('should fire even if two objects share the same slot', function() {
        var objA = {};
        var objB = {};
        DB.prop( objA, 'value' );
        DB.bind( objA, 'value', slot );
        DB.prop( objB, 'value' );
        DB.bind( objB, 'value', slot );
        objA.value = 36;
        expect( result ).toBe( 36 );
        objB.value = 18;
        expect( result ).toBe( 18 );
    });


});
