var test = require('tap').test,
    s2 = require('../');

test('getCovering', function(t) {

    var cover = s2.getCover([
        new s2.S2LatLng(0, 0),
        new s2.S2LatLng(0, 10),
        new s2.S2LatLng(10, 10),
        new s2.S2LatLng(10, 0),
        new s2.S2LatLng(0, 0)
    ]);

    t.ok(cover, 'generates cover object');
    t.equal(cover.length, 3, 'cover.length');

    var cover2 = s2.getCover([
        new s2.S2LatLng(0, 0),
        new s2.S2LatLng(0, 10),
        new s2.S2LatLng(10, 10),
        new s2.S2LatLng(10, 0),
        new s2.S2LatLng(0, 0)
    ], {
        max_cells: 1
    });

    t.equal(cover2.length, 1, 'cover.length');

    var cover3 = s2.getCover([
        new s2.S2LatLng(0, 0),
        new s2.S2LatLng(0, 10),
        new s2.S2LatLng(10, 10),
        new s2.S2LatLng(10, 0),
        new s2.S2LatLng(0, 0)
    ], {
        max_cells: 1000
    });

    t.equal(cover3.length, 226, 'cover.length');

    t.throws(function() {
        new s2.getCover();
    }, 'invalid arguments');

    t.end();
});

test('getCovering - llrect', function(t) {
    var ll2 = new s2.S2LatLngRect(new s2.S2LatLng(10, 20), new s2.S2LatLng(20, 30));

    var llcover = s2.getCover(ll2, {
        max_cells: 100
    });

    t.equal(llcover.length, 34, 'cover.length');

    t.end();
});

test('getCovering - cell', function(t) {
    var cell = new s2.S2Cell(new s2.S2LatLng(10, 20));

    var llcover = s2.getCover(cell, {
        max_cells: 100
    });

    t.equal(llcover.length, 1, 'cover.length');

    t.end();
});

test('getCovering - cap', function(t) {
    var cap = new s2.S2Cap();

    var llcover = s2.getCover(cap, {
        max_cells: 100
    });

    t.equal(llcover.length, 0, 'cover.length');

    t.end();
});

test('getCovering - invalid', function(t) {
    t.throws(function() {
        var llcover = s2.getCover(1, {
            max_cells: 100
        });
    });
    t.end();
});
