// Chargement du module expressjs
var express = require("express")
var cors = require("express-cors")
var Immutable = require("immutable")
var MongoClient = require("mongodb").MongoClient
var bodyParser = require("body-parser")
var multer = require("multer")
var upload = multer()
var ObjectId = require("mongodb").ObjectID

const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const historyApiFallback = require('connect-history-api-fallback')
const config = require('./webpack.config.js')


// Codec base 64 var base64 = require('base-64') Création de l'application
// express
var app = express()
app.use(cors({ allowedOrigins: ['localhost:3000'] }))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// Définition du port d'écoute
app.set('port', (process.env.PORT || 80))


let isDeveloping = process.env.NODE_ENV !== 'production'
isDeveloping = true
if (isDeveloping) {
  const compiler = webpack(config)
  const devMiddleware = webpackDevMiddleware(compiler, {
    contentBase: "./public",
    publicPath: '/',
    filename: "app.js",
    // publicPath: config.output.publicPath,
    // contentBase: "./public",
    // do not print bundle build stats
    noInfo: false,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    stats: {
      colors: true
      // hash: false,
      // timings: true,
      // chunks: false,
      // chunkModules: false,
      // modules: false
    }
  })
//   app.use(historyApiFallback({
//    verbose: false
//  }))
  app.use(devMiddleware);
  // Step 3: Attach the hot middleware to the compiler & the server
  // app.use(require("webpack-hot-middleware")(compiler, {
  //   log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  // }))
    
  // app.get("/", function(req, res) {
  //   console.log(`Lecture de la page sur /`)
  //   res.sendFile(__dirname + '/public/index.html');
  // });
  // app.use('/', express.static("./public"))

  // app.use(webpackHotMiddleware(compiler))
  // app.get('*', function response(req, res) {
  //   res.sendFile(path.join(__dirname, 'public/index.html'));
  // })
} else {
  // Répertoire des pages du site web
  var repertoireSite = "./public"
  console.log('Ouverture du répertoire des pages du site web : %s', repertoireSite)
  // Répertoire racine
  app.use('/', express.static(repertoireSite))
}

//********************************************** Démarrage du serveur
var serveur = app.listen(app.get('port'), function () {
  console.log("Ecoute sur le port %d, à l'adresse http://localhost:80", serveur.address().port)
})