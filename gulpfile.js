var gulp = require('gulp');
var yargs = require('yargs');
var gulpif = require('gulp-if');
var react = require('gulp-react');
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var args = yargs.alias('p', 'production').argv;
var minifycss = require('gulp-minify-css');
var sass  = require('gulp-sass');
var uglify = require("gulp-uglify");
var webpack = require("gulp-webpack");
var path = require("path");


config = {
    paths : {
        bowerDir :'bower_components',
        sassPath : './public/scss',
        jsxPath : './components',
        jsPath: './lib',
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
                'bower_components/datetimepicker/jquery.datetimepicker.css',
                'public/css/yeti.css',
                'bower_components/fontawesome/css/font-awesome.css'
        ],
        fontDirs :
            ['bower_components/bootstrap/dist/fonts',
              'bower_components/fontawesome/fonts'
            ],
        workDir : 'work'
    }
};



//gulp.task('jsx', function () {
//    return gulp.src(config.paths.jsxPath+'/*.jsx')
//        .pipe(react())
//        .pipe(gulp.dest(config.paths.workDir));
//});

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
});

//todo clear work dir after finish
//todo pridat jshint
// todo pridat clear task on start

gulp.task('fonts', function() {
    var fonts = config.paths.fontDirs.map(function (item) {return item+='/*.*'});    return gulp.src(fonts)
        .pipe(gulp.dest(config.paths.distDir+config.paths.resources.fontsDir))
})

gulp.task('js', function () {
    return gulp.src(['./'])
        .pipe(webpack({
            entry:{
                index:   './views/index.jsx' ,
                starter:'./lib/starter.js'

            },
            module: {
                loaders: [
                    { test: /\.jsx$/, loader: 'jsx-loader' }
                ]
            },
            resolve :{
                modulesDirectories:["node_modules","components"]
            },
            output: {
                path: path.join(__dirname, "dist"),
                filename: "[name].js"
            }
        }))
        //.pipe(rename('app.js'))
        .pipe(gulpif(args.production, uglify()))
        .pipe(gulp.dest(config.paths.distDir+config.paths.resources.jsDir))
})



//gulp.task('default', ['sass','css','fonts','js']);
gulp.task('default', ['sass','css','fonts','js']);