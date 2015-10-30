var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');

gulp.task('clean', function() {
    return gulp.src('dist', {
            read: false
        })
        .pipe(clean());
});

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-optipng');
var imageminJpegtran = require('imagemin-jpegtran');

gulp.task('min-img', function() {
    return gulp.src('app/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant(), imageminJpegtran()]
        }))
        .pipe(gulp.dest('dist/img/'));
});


gulp.task('copy', function() {
    return gulp.src(['app/font'])
    .pipe(gulp.dest('dist'));

})

// var htmlmin = require('gulp-htmlmin');
//  gulp.task('minify', function() {
//    return gulp.src('app/*.html')
//       .pipe(htmlmin({
//             collapseWhitespace: true, 
//             removeComments:true
//         }))
//      .pipe(gulp.dest('dist'))
//  });

gulp.task('useref', function() {
   var assets = useref.assets();
   return gulp.src('app/*.html')
       .pipe(assets)
       .pipe(gulpif('*.js', uglify()))
       .pipe(gulpif('*.css', minifyCss()))
       .pipe(assets.restore())
       .pipe(useref())

       .pipe(gulp.dest('dist'));
 });


gulp.task('dist', ['clean', 'min-img', 'copy','useref'], function() {});

var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

var bower = require('gulp-bower');
 
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('libs/'))
});

gulp.task('default', ['serve']);



