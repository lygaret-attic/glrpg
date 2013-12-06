/* globals define, requestAnimationFrame */

define(function(require) {

    var Pixi = require('vendor/pixi');
    var FPSMeter = require('vendor/stats');

    // make available
    require('vendor/poly.requestAnimationFrame');

    // initialize the stage
    function init(stage) {
        var bunnyUrl = require('vendor/rjs.url!assets/bunny.png');

        var texture = Pixi.Texture.fromImage(bunnyUrl);
        var bunny = new Pixi.Sprite(texture);

        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;

        bunny.position.x = stage.config.width / 2;
        bunny.position.y = stage.config.height / 2;

        stage.addChild(bunny);
        stage.entities.bunny = bunny;
    }

    // the game loop!
    function loop(renderer, stage, frame) {
        stage.entities.bunny.scale = new Pixi.Point(Math.sin(frame / 60) + 2, Math.cos(frame / 60) + 2);
        stage.entities.bunny.rotation += 0.1;

        renderer.render(stage);
    }

    // setup!
    return function() {

        // get the window dimensions
        var winWidth = window.innerWidth;
        var winHeight = window.innerHeight;

        // configure pixi renderer
        var renderer = new Pixi.autoDetectRenderer(800, 600);
        document.body.appendChild(renderer.view);

        // configure fpsmeter
        var meter = new FPSMeter();
        document.body.appendChild(meter.domElement);

        // initialize stage
        var stage = new Pixi.Stage(0x66FF99);
        stage.config = stage.config || {};
        stage.config.width = 800;
        stage.config.height = 600;

        stage.entities = stage.entities || {};

        var frame = 0;
        var gameloop = function() {
            meter.begin();
            
            requestAnimationFrame(gameloop);
            loop(renderer, stage, frame++);
            
            meter.end();
        };

        // start us up
        init(stage);
        requestAnimationFrame(gameloop);
    };

});
