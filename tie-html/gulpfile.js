var gulp = require('gulp');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

// Load all gulp plugins automatically
// and attach them to the `plugins` object
var plugins = require('gulp-load-plugins')();

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');

var pkg = require('./package.json');
var dirs = pkg['h5bp-configs'].directories;
var env = "dev";

// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
// | css file tasks                                                      |
// ---------------------------------------------------------------------

//编译sass，压缩，重命名main.css,并拷贝到dist/css中
gulp.task('compile:css', function () {
    var banner = '/*! ' + pkg.name + ' v' + pkg.version +
        ' | ' + pkg.license.type + ' License' +
        ' | ' + pkg.homepage + ' */\n\n';
    gulp.src(dirs.src + "/css/main.scss")
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(plugins.header(banner))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 8', '> 1%'],
            cascade: false
        }))
        .pipe(gulp.dest(dirs.dist + "/css"));
});

// ---------------------------------------------------------------------
// | js file tasks                                                      |
// ---------------------------------------------------------------------

//校验js
gulp.task('lint:js', function () {
    return gulp.src([
        'gulpfile.js',
        dirs.src + '/js/*.js',
        dirs.test + '/*.js'
    ]).pipe(plugins.jscs())
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.jshint.reporter('fail'));
});

//合并,压缩，重命名,并拷贝到dist/js中
gulp.task('compile:js', function () {
    if (env === 'dev') {
        gulp.src(dirs.src + "/js/*.js")
            .pipe(concat('main.js'))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(dirs.dist + "/js"));
    } else {
        gulp.src(dirs.src + "/js/*.js")
            .pipe(concat('main.js'))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify({mangle: false}))
            .pipe(gulp.dest(dirs.dist + "/js"));
    }
});

gulp.task('compile', [
    'compile:css',
    'compile:js'
]);

// ---------------------------------------------------------------------
// | copy files tasks                                                      |
// ---------------------------------------------------------------------
gulp.task('copy', [
    'copy:views',
    'copy:libs',
    'copy:img',
    'copy:font'
]);

gulp.task('copy:font', function () {
    return gulp.src(dirs.src + '/font/**')
        .pipe(gulp.dest(dirs.dist + '/font'));
});

gulp.task('copy:views', function () {
    return gulp.src(dirs.src + '/views/**')
        .pipe(plugins.replace(/{{JQUERY_VERSION}}/g, pkg.dependencies.jquery))
        .pipe(plugins.replace(/{{MAIN_VERSION}}/g, pkg.version))
        .pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:libs', [
    'copy:jquery',
    'copy:normalize',
    'copy:bootstrap'
]);

gulp.task('copy:img', function () {
    return gulp.src(dirs.src + '/img/**')
        .pipe(gulp.dest(dirs.dist + '/img'));
});

gulp.task('copy:jquery', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
        .pipe(plugins.rename('jquery-' + pkg.dependencies.jquery + '.min.js'))
        .pipe(gulp.dest(dirs.dist + '/lib'));
});

gulp.task('copy:normalize', function () {
    return gulp.src('node_modules/normalize.css/normalize.css')
        .pipe(gulp.dest(dirs.dist + '/css'));
});

gulp.task('copy:bootstrap', function () {
    gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest(dirs.dist + '/lib/bootstrap'));
    gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest(dirs.dist + '/lib/bootstrap'));
});

// ---------------------------------------------------------------------
// | watch files tasks                                                      |
// ---------------------------------------------------------------------
gulp.task('watch', function () {
    gulp.watch(dirs.src + '/js/*.js', ['compile:js']);
    gulp.watch(dirs.src + '/css/*.scss', ['compile:css']);
    gulp.watch(dirs.src + '/views/**', ['copy:views']);
});

// ---------------------------------------------------------------------
// | clean files tasks                                                      |
// ---------------------------------------------------------------------

gulp.task('clean', function (done) {
    require('del')([
        dirs.archive,
        dirs.dist
    ]).then(function () {
        done();
    });
});


// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------

gulp.task('webserver', ['build', 'watch'], function () {
    connect.server({
        livereload: true,
        port: 2333
    });
});

gulp.task('archive', function (done) {
    runSequence(
        'build',
        'archive:create_archive_dir',
        'archive:zip',
        done);
});

gulp.task('build', function (done) {
    return runSequence(
        ['clean', 'lint:js'],
        'compile', 'copy',
        done);
});

gulp.task('default', ['build']);
