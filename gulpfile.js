var gulp = require("gulp");
var exec = require("gulp-exec");
var sass = require("gulp-sass");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var gutil = require("gulp-util");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var server = require("gulp-express");
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var gulp = require("gulp");
var jasmine = require("gulp-jasmine");
var proxyMiddleware = require("http-proxy-middleware");

gulp.task("test", function () {
  return gulp.src("test/tableau-test.js")
    // gulp-jasmine works on filepaths so you can't have any plugins before it
    .pipe(jasmine());
});

gulp.task("styles", function () {
  gulp.src("sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("public/"))
    .pipe(reload({
      stream: true
    }));
});

// Convertit es6 en es5 et assemble les morceaux
gulp.task("fabrique", function () {
  browserify({
    entries: "src/app.js",
    debug: true
  }).transform(babelify)
    .on("error", gutil.log)
    .bundle()
    .on("error", gutil.log)
    .pipe(source("app.js"))
    .pipe(gulp.dest("public"))
    .pipe(reload({
      stream: true
    }));
});

// Convertit es6 en es5 et assemble les morceaux
gulp.task("charger", function () {
  console.log("Chargement de la base de données");
  exec("node util/util.js", function (err, stdout, stderr) {
    console.log(err);
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

// Refabrique automatiquement sur tout Chargement des sources
gulp.task("dev", ["fabrique", "styles"], function () {
  // configure proxy middleware
  // context: "/" will proxy all requests
  //     use: "/api" to proxy request when path starts with "/api"
  var proxies = [];
  proxies.push(proxyMiddleware(["/api/**"], {
    target: "http://localhost"
  }));
  proxies.push(proxyMiddleware("/socket.io/**", {
    target: "http://localhost",
    ws: true
  }));
  browserSync.init({
    server: {
      baseDir: "public/",
      middleware: proxies
    }
  });
  gulp.watch(["*.html", "src/**/*.js"], ["fabrique"])
  gulp.watch("sass/**/*.scss", ["styles"])
  // gulp.watch("public/**/*").on("change", browserSync.reload);
  server.run(["serveur.js"]);
});

// Refabrique automatiquement sur tout Chargement des sources
gulp.task("styler", ["styles"], function () {
  // configure proxy middleware
  // context: "/" will proxy all requests
  //     use: "/api" to proxy request when path starts with "/api"
  var proxies = [];
  proxies.push(proxyMiddleware(["/api/**"], {
    target: "http://localhost"
  }));
  proxies.push(proxyMiddleware("/socket.io/**", {
    target: "http://localhost",
    ws: true
  }));
  browserSync.init({
    server: {
      baseDir: "public/",
      middleware: proxies
    }
  });
  gulp.watch("sass/**/*.scss", ["styles"])
  // gulp.watch("public/**/*").on("change", browserSync.reload);
  server.run(["serveur.js"]);
});

// Tache de démarrage du serveur
gulp.task("start", ["fabrique", "styles"], function () {
  console.log("Lancement du serveur");
  server.run(["serveur.js"]);
});

// Tache pour controler l'execution de gulp dans Atom
gulp.task("stop", function () {
  //server.stop()
  browserSync.exit();
});

// Tache pour tester la bonne connexion à la base de données
gulp.task("essai", function () {
  console.log("Lancement de l'utilitaire: ")
  //var urlParDefaut = "mongodb://dahu:dahu@localhost:27017/test"
  var urlParDefaut = "mongodb://organisateur:orga123@ds055905.mongolab.com:55905/heroku_5cn196b4"
  //PROD_MONGODB=mongodb://dbuser:dbpass@host1:port1,host2:port2/dbname
  const url = (process.env.PROD_MONGODB || urlParDefaut)
  console.log("url de la base de donnée: " + url)
  MongoClient.connect(url, function (err, db) {
    assert.equal(err, null, "Erreur de connexion: " + err);
    console.log("connexion réussie.");
    db.close();
  })
});

gulp.task("default", ["dev"]);
