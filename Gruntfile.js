module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'client/client.js',
                dest: 'server/public/assets/scripts/client.min.js'
            }
        },
        sass: {
            dist: {
                files: {
                    'server/public/assets/styles/stylesheet.css' : 'server/public/assets/styles/stylesheet.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: ['client/client.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "angular/angular.min.js",
                    "angular/angular.min.js.map",
                    "angular-route/angular-route.min.js"
                ],
                "dest": "server/public/vendors" +
                "/"
            }
        }
        // jshint: {
        //     files: 'client/scripts/client.js'
        // }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['copy', 'uglify', 'watch']);
};
