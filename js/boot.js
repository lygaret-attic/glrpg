/* global require */

require.config({
    baseUrl : '/js',

    paths   : {
        assets: '../assets'
    },

    shim    : {
        'vendor/pixi'   : { exports: 'PIXI' },
        'vendor/stats'  : { exports: 'Stats' },

        'vendor/poly.requestAnimationFrame' : { exports: 'requestAnimationFrame' }
    }
});

// start the application on domready
require(['vendor/rjs.domready!', 'main'], function(doc, main) { main(); });