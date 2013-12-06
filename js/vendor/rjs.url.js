/* rjs.url.js - returns a url for the given module */
/* globals define */
define(function() { 
    return {
        load: function(name, require, onload) {
            onload(require.toUrl(name));
        }
    }
});