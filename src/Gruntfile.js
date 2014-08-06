 'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js',
        '!../js/scripts.min.js'
      ]
    },
    less: {
      // Dev creates unminimized css file
      dev: {
        files: {
          '../css/style.min.css': [
            'assets/less/style.less'
          ]
        },
      },
      // Prod creates minified css file
      production: {
        files: {
          '../css/style.min.css': [
            'assets/less/style.less'
          ]
        },
        options: {
          compress: true,
        }
      }
    },

    // Concat for Dev
    concat: {
      dist: {
        src: [
          'assets/js/*.js',
          'bower/jquery-cookie/jquery.cookie.js'
        ],
        dest: '../js/scripts.min.js',
      }
    },

    // Uglify for Prod
    uglify: {
      dist: {
        files: {
          '../js/scripts.min.js': [
            '<%= concat.dist.src %>'
          ]
        },
      }
    },

    // Clean Production Files
    clean: {
      dist: [
        '../css/style.min.css',
        '../js/scripts.min.js'
      ]
    },

    watch: {
      less: {
        files: [
          'assets/less/*.less'
        ],
        tasks: ['less:dev'],
        options: {
          livereload: false
        },
      },
      css: {
        files: '../css/style.min.css',
        
        options: {
          livereload: true
        }
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'concat']
      },

      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: true
        },
        files: [
          '../js/scripts.min.js',
          '../*.php'
        ]
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Register tasks
  grunt.registerTask('default', [
    'less:dev',
    'concat'
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);

  grunt.registerTask('production', [
    'clean',
    'less:production',
    'uglify'
  ]);
};
