/* global require */

require.config({
    baseUrl : '/js',

    shim    : {
        'vendor/jquery' : { exports: '$' },
        'vendor/pixi'   : { exports: 'PIXI' }
    }
});

// start the application on domready
require(["vendor/rjs.domready!", "main"], function(doc, main) { main(); });