var gulp = require('gulp');
var yargs = require('yargs');
var gulpif = require('gulp-if');
var react = require('gulp-react');
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var args = yargs.alias('p', 'production').argv;
var minifycss = require('gulp-minify-css');
var sass  = require('gulp-sass');
var notify = require("gulp-notify");
var uglify = require("gulp-uglify");
var webpack = require("gulp-webpack");

config = {
    paths : {
        bowerDir :'bower_components',
        sassPath : './src/scss',
        jsxPath : './src/jsx',
        jsPath: './src/js',
        distDir : 'dist',
        resources : {
            cssDir : '/css',
            fontsDir:'/fonts',
            jsDir: "/js"
        },
        cssDirs :
            [
            //'bower_components/bootstrap/dist/css/bootstrap.css',
                //'bower_components/bootstrap/dist/css/bootstrap-theme.css',
                'src/css/flatly.css',
                'bower_components/fontawesome/css/font-awesome.css'
        ],
        fontDirs :
            ['bower_components/bootstrap/dist/fonts',
              'bower_components/fontawesome/fonts'
            ],
        workDir : 'work'
    }
};


var displayError = function(error) {

    // Initial building up of the error
    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end

    // If the error contains the filename or line number add it to the string
    if(error.fileName)
        errorString += ' in ' + error.fileName;

    if(error.lineNumber)
        errorString += ' on line ' + error.lineNumber;

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
}



gulp.task('jsx', function () {
    return gulp.src(config.paths.jsxPath+'/*.jsx')
        .pipe(react())
        .pipe(gulp.dest(config.paths.workDir));
});

gulp.task('sass', function() {
    return gulp.src(config.paths.sassPath+'/*.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(rename('scss.css'))
        .pipe(gulp.dest(config.paths.workDir));
});

gulp.task('css', function() {
    var csss = [config.paths.workDir + '/*.css'];
    return gulp.src(csss.concat(config.paths.cssDirs))
        .pipe(concat("main.css"))
        .pipe(gulpif(args.production,minifycss()))
        .pipe(gulp.dest(config.paths.distDir+config.paths.resources.cssDir))
})

//todo clear work dir after finish
//todo pridat jshint
// todo pridat clear task on start

gulp.task('fonts', function() {
    var fonts = config.paths.fontDirs.map(function (item) {return item+='/*.*'});    return gulp.src(fonts)
        .pipe(gulp.dest(config.paths.distDir+config.paths.resources.fontsDir))
})

gulp.task('js',['jsx'], function () {
    return gulp.src([config.paths.jsPath+'/*.js',config.paths.workDir+'/*.js'])
        .pipe(webpack())
        .pipe(rename('app.js'))
        .pipe(gulpif(args.production, uglify()))
        .pipe(gulp.dest(config.paths.distDir+config.paths.resources.jsDir))
})



gulp.task('default', ['sass','css','fonts','js']);