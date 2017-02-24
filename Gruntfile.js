module.exports = function(grunt) {

  
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'package.json']
    },
    "update_submodules": {
      default: {}
    },
    jekyll: {
      build: {},
      serve: {
        options: {
          serve: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-update-submodules');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default',
    [
      'update_submodules',
      'jshint',
      'jekyll:build'
    ]);

};