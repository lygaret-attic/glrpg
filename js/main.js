/* globals define, requestAnimationFrame */

define(function(require) {

    var Pixi = require('vendor/pixi');
    var FPSMeter = require('vendor/stats');

    // make available
    require('vendor/poly.requestAnimationFrame');

    // the game loop!
    function loop(renderer, stage) {

        renderer.render(stage);

    }

    // setup!
    return function() {

        // get the window dimensions
        var winWidth = window.innerWidth;
        var winHeight = window.innerHeight;

        // configure pixi renderer
        var renderer = new Pixi.autoDetectRenderer(winWidth, winHeight);
        renderer.view.style.top = '0px';
        renderer.view.style.left = '0px';
        renderer.view.style.position = 'absolute';
        renderer.view.style.width = winWidth;
        renderer.view.style.height = winHeight;
        renderer.view.style.display = 'block';
        document.body.appendChild(renderer.view);

        // configure fpsmeter
        var meter = new FPSMeter();
        meter.domElement.style.position = 'absolute';
        meter.domElement.style.bottom = '0px';
        meter.domElement.style.right = '0px';
        document.body.appendChild(meter.domElement);

        // initialize stage
        var stage = new Pixi.Stage(0x66FF99);

        var gameloop = function() {
            meter.begin();
            
            requestAnimationFrame(gameloop);
            loop(renderer, stage);
            
            meter.end();
        };

        // start us up
        requestAnimationFrame(gameloop);
    };

});
