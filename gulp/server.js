'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var rsync = require('gulp-rsync');
var runSequence = require('run-sequence');  
var gulpNgConfig = require('gulp-ng-config');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes
  };

  /*
   * You can add a proxy to your backend by uncommenting the line below.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.9.0/README.md
   */
  // server.middleware = proxyMiddleware('/users', {target: 'http://jsonplaceholder.typicode.com', changeOrigin: true});

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

/**
  Make config
**/
gulp.task('config', function () {
  gulp.src(path.join(conf.paths.src, '/app/config.json'))
    .pipe(gulpNgConfig('app.config', {
      environment: 'local'
    }))
    .pipe(gulp.dest(path.join(conf.paths.src, '/app/')))
});

gulp.task('config:dev', function () {
  gulp.src(path.join(conf.paths.src, '/app/config.json'))
    .pipe(gulpNgConfig('app.config', {
      environment: 'dev'
    }))
    .pipe(gulp.dest(path.join(conf.paths.src, '/app/')))
});

gulp.task('config:build', function () {
  gulp.src(path.join(conf.paths.src, '/app/config.json'))
    .pipe(gulpNgConfig('app.config', {
      environment: 'production'
    }))
    .pipe(gulp.dest(path.join(conf.paths.src, '/app/')))
});


gulp.task('serve', ['config', 'watch'], function () {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['config', 'build'], function () {
  browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function () {
  browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  browserSyncInit(conf.paths.dist, []);
});


gulp.task('rsync-prod', function() {  
    return gulp.src('dist/**/*.*')
        // .pipe(stripDebug)
        .pipe(rsync({
            root: 'dist',
            username: 'ubuntu',
            hostname: 'prod',
            destination: '/var/www/myAppName'
        }));
});

gulp.task('deploy-prod', function() {  
  runSequence('clean', 'config:build', 'build','rsync-prod');
});

gulp.task('rsync-dev', function() {  
    return gulp.src('dist/**/*.*')
        // .pipe(stripDebug)
        .pipe(rsync({
            root: 'dist',
            username: 'ubuntu',
            hostname: 'dev',
            destination: '/var/www/myAppName'
        }));
});

gulp.task('deploy-dev', function() {  
  runSequence('clean', 'config:dev', 'build','rsync-prod');
});