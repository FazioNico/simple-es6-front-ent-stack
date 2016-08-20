<!--
@Author: Nicolas Fazio <webmaster-fazio>
@Date:   20-08-2016
@Email:  contact@nicolasfazio.ch
@Last modified by:   webmaster-fazio
@Last modified time: 21-08-2016
-->

# Simple ES6 Front-end Stack
  Build javascript ES6 applications with Bower, Gulp and Babel



## Features
  This starter kit include the following features:
  * Bower dependencies manager
    * Materialize CSS
    * jQuery
  * Gulp taskrunner
    * Babel
      * Full ES6 compatibility with Browserify + Babelify
    * Livereload with Browsersync
    * Sass to css with compiler
    * HTML remove comments
  * Production and Development builds (Uglify /Sourcemaps)



## Starting
  Before to use, you need Node.js, bower and npm. You should also have git installed.
  * 1: Clone the repository (or download the ZIP file)
  * 2: Install & Run project with `$ npm start`


## Usage
  Now you're ready to build your own application.

  WARNING: only use `dev/` folder to developpe your application (add or change files).

  Your application will be automaticly create by Gulp Task `$ gulp` in the final production folder `dist/`. You've nothing to do.

  To stop gulp dev server press `ctrl + c` in your CLI.
  You can restart server in development mode with `$ npm run dev`

  To deploy in production mode, use `$ npm run prod`


## About author
  Hi, i'm a Front-end developper living in Geneva Switzerland and i bulid web applications for almost 15 years.
  You can follow me on Twitter [@FazioNico](https://twitter.com/FazioNico) or checkout my own website [http://nicolasfazio.ch](http://nicolasfazio.ch)
