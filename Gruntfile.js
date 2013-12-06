module.exports = function(grunt) {

    var glob    = require('glob');

    var source  = glob.sync('js/**/*.js').filter(function(v) { return v.indexOf('vendor') === -1; });
    var port    = grunt.option('port') || 9002;

    //Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        dirs: {
            dist: 'build',
            src: 'js',
            test: 'test',
            sass: 'scss'
        },
        
        files: {
            mainJs: 'main',
            mainSass: '<%= dirs.sass %>/main.scss',

            devJs: '<%= dirs.dist %>/js/<%= pkg.name %>.js',
            distJs: '<%= dirs.dist %>/js/<%= pkg.name %>.min.js',
            devCss: '<%= dirs.dist %>/css/<%= pkg.name %>.css',
            distCss: '<%= dirs.dist %>/css/<%= pkg.name %>.min.css'
        },

        jshint: {
            src: source.concat('Gruntfile.js'),
            options: {
                jshintrc: '.jshintrc'
            }
        },

        concat: {
            dev: {
                src: ['<%= files.devJs %>'],
                dest: '<%= files.devJs %>'
            },
            dist: {
                src: ['<%= files.distJs %>'],
                dest: '<%= files.distJs %>'
            }
        },

        connect: {
            dev: {
                options: {
                    port: port,
                    base: './',
                }
            }
        },

        requirejs: {
            dist: {
                options: {
                    baseUrl: '<%= dirs.src %>',
                    name: '<%= files.mainJs %>',
                    out: '<%= files.devJs %>',
                    wrap: true
                }
            }
        },

        sass: {
            options: {
                loadPath: ['<%= dirs.sass %>']
            },
            dev: {
                options: {
                    lineNumbers: true
                },
                files: {
                    '<%= files.devCss %>': '<%= files.mainSass %>'
                }
            },
            dist: {
                files: {
                    '<%= files.distCss %>': '<%= files.mainSass %>'
                }
            }
        },

        watch: {
            options: { interrupt: true, spawn: false },

            sass: {
                files: ['<%= dirs.sass %>/**/*.scss'],
                tasks: ['sass:dev']
            },

            src: {
                files: ['<%= dirs.src %>/**/*.js'],
                tasks: ['jshint']
            }
        },

        concurrent: {
            dev: {
                tasks: ['watch:sass', 'watch:src'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concurrent');

    //setup shortcut tasks
    grunt.registerTask('default', ['sass:dev', 'connect:dev', 'concurrent:dev']);
};