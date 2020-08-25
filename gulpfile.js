let gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglifyjs     = require('gulp-uglifyjs'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.sass')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
   browserSync.init({
       server: 'app'
   });
});

gulp.task('scripts', function() {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/bootstrap/dist/js/bootstrap.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglifyjs())
    .pipe(gulp.dest('app/js'));
});

gulp.task('css-libs', function() {
    return gulp.src('app/css/libs.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))    
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
    .pipe(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/img'))
});

gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
    gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('build', function() {
    let buildCss = gulp.src([
        'app/css/min.css',
        'app/css/libs.min.css'
    ])
    .pipe(gulp.dest('dist/css'));

    let buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

    let buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));

    let buildHTML = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('start', gulp.parallel('sass', 'css-libs', 'scripts', 'watch','browser-sync'));