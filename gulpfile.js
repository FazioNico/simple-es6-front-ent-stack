/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   09-08-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 21-08-2016
*/

// import gulp and gulp dependencies plugins
var gulp              = require('gulp')
    babel             = require('gulp-babel');
    browserSync       = require('browser-sync').create(),
    reload            = browserSync.reload,
    babelify          = require('babelify'),
    browserify        = require("browserify"),
    source            = require("vinyl-source-stream"),
    buffer            = require("vinyl-buffer"),
    transform         = require('vinyl-transform'),
    bower             = require('gulp-bower'),
    concat            = require('gulp-concat'),
    uglify            = require('gulp-uglify'),
    sass              = require('gulp-sass'),
    cssmin            = require('gulp-cssmin'),
    rename            = require("gulp-rename"),
    autoprefixer      = require('gulp-autoprefixer'),
    rmHtmlComments    = require('gulp-remove-html-comments');

// Config of project folders
var config = {
     bowerDir:  './dev/src/bower_components' ,
    desDir:    './dist'
}

// all bower dependencies js files you want add to your project
var bowerDependencies = [
  config.bowerDir + '/jquery/dist/jquery.min.js',
  config.bowerDir + '/materialize/dist/js/materialize.min.js'
]

//// Gulp runing task availables:
// 1: Default task. This will be run when no task is passed in arguments to $ gulp
gulp.task("run",[
  'js-dependencies',
  'sass-dependencies',
  'fonts-dependencies',
  'copyTemplateFiles',
  'copyStaticFiles',
  'sass',
  'build'
]);
gulp.task('default', ['run'], function() {
    gulp.start('startServer', 'watch');
});
// 2: prod task. This will be run when your project is ready to deploy on server production
// It will minify bundle.js file
gulp.task("prod",[
  'js-dependencies',
  'sass-dependencies',
  'fonts-dependencies',
  'copyTemplateFiles',
  'copyStaticFiles',
  'sass',
  'build-prod'
]);

//// Gulp Task Runing sequance :
//// 1 (run by '$ npm start'): run bower install for installing all dependencies
gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

/// 2 : task to get only one js file with all bower dependencies
gulp.task('js-dependencies', function() {
  return gulp.src(bowerDependencies)
      .pipe(concat('js-dependencies.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(config.desDir + '/js'))
});

// 3: materialize Sass task
gulp.task('sass-dependencies', function() { 
    return gulp.src([config.bowerDir + '/materialize/sass/*.scss'])
        .pipe(sass())
        .pipe(cssmin({keepSpecialComments : 0}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.desDir + '/css'))
});

// 4: Fonts task
gulp.task('fonts-dependencies', function() { 
    return gulp.src([config.bowerDir + '/materialize/fonts/**/*.*'])
        .pipe(gulp.dest(config.desDir + '/fonts')); 
});

// 5: Copy templates files in www dev/www folder to dist/www
gulp.task("copyTemplateFiles", function(){
    return gulp.src(['./dev/**/*.html'])
    .pipe(rmHtmlComments())
    .pipe(gulp.dest(config.desDir))
    .pipe(reload({stream:true}));
});

// 6: Copy static files from dev/src folder (but not bower_components) to build folders in dist/src folder
gulp.task("copyStaticFiles", function(){
    return gulp.src(["./dev/src/**/*.*", "!./dev/src/bower_components{,/**}"])
    .pipe(gulp.dest(config.desDir + "/src"));
});

// 7: bundle all sass files in dev/scss folder
gulp.task('sass', function () {
    return gulp.src('./dev/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.desDir + "/css"))
        .pipe(reload({stream:true}));
});

// 8.a: Convert ES6 code in main.js AND all js files imported in main.js and then
// build folder as bundle.js
// Put all your js files in dev/js folder
gulp.task("build", function(){
    return browserify("./dev/js/main.js",{
        debug: true
    })
    .transform(babelify.configure({
        presets : ["es2015"]
    }))
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest(config.desDir + '/js'))
    .pipe(reload({stream:true}));
});

// 8.b : same of previous task but it will uglify bundle output file
gulp.task("build-prod", function(){
  return browserify({
    entries: './dev/js/main.js'
  })
  .transform(babelify.configure({
      presets : ["es2015"]
  }))
  .bundle()
  .pipe(source("bundle.js"))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest(config.desDir + '/js'))
  .pipe(reload({stream:true}));
});

// 9: Start a test server with browserSync at build folder and
// listening to 3000 port. Home page = http://localhost:3000
gulp.task("startServer",  function() {
    //initialize browsersync
    browserSync.init({
      server: {
          baseDir: config.desDir
      },
      notify: true
    });
});

// 10: Watches task is use to run gulp task if a listed files change
// You can add more watch files if you need.
gulp.task('watch', function() {
  gulp.watch('./dev/js/*.js', ['build']);                    // watch js file changes
  gulp.watch('./dev/**/*.html', ['copyTemplateFiles']);      // watch all html template file changes
  gulp.watch('./dev/scss/**/*.scss', ['sass']);              // watch all sass file changes
  //gulp.watch('PATH-OF-FILES-TO-WATCH', ['TASK-TO-RUN']);   // Simply uncomment exemple and set your own params (files-to-watch && task-to-run).
})
