'use strict';

module.exports = function(grunt){

    require('load-grunt-parent-tasks')(grunt);
    require('time-grunt')(grunt);

       grunt.initConfig({
              config: {
                  sass: "sass",
                  css: "css",
                  js: "js"

              },

              sass: {
                  options: {
                      style: 'expanded'
                  },
                  dist: {
                      files: [{
                              "<%= config.css %>/default.css" : "<%= config.sass %>/default.scss",
                      }]
                  }
              },

              postcss: {
                  options: {
                    map: {
                        inline: false
                    },
                    processors: [
                      require('autoprefixer-core')({browsers: ['last 2 versions', 'ie 8', 'ie 9']}) 
                    ]
                  },
                  dist: {
                    src: '<%= config.css %>/*.css',

                  }
              },

              watch: { 
                  files: ['<%= config.sass %>/**/*.*'],
                   tasks: ['build'],
                   options: {
                          event: ['added', 'deleted', 'changed'],
                          debounceDelay: 250
                   }
              },

              pkg: grunt.file.readJSON('package.json')           
              
       });
       
       grunt.loadNpmTasks('grunt-autoprefixer');
       grunt.loadNpmTasks('grunt-contrib-sass');
       grunt.loadNpmTasks('grunt-contrib-clean');
       grunt.loadNpmTasks('grunt-postcss');
       grunt.loadNpmTasks('grunt-contrib-watch');
       grunt.registerTask('default', [ 'sass', 'postcss', 'watch' ]);
       grunt.registerTask('build', [ 'sass' ] );
       grunt.registerTask('javascript', ['concat','uglify'] );
       grunt.registerTask('css', ['sass'] );
};
