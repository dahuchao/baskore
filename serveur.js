// Chargement du module expressjs
var express = require("express")
var cors = require("express-cors")
var Immutable = require("immutable")
var controleur = require("./src/controleur")
var typesEvenement = require("./src/types-evenement")
var typesCommande = require("./src/types-commande")
var MongoClient = require("mongodb").MongoClient
var bodyParser = require("body-parser")
var multer = require("multer")
var upload = multer()
var ObjectId = require("mongodb").ObjectID
var Rx = require("rxjs")
var Rencontres = require('./src/Rencontres')

// Codec base 64 var base64 = require('base-64') Création de l'application
// express
var app = express()
app.use(cors({allowedOrigins: ['localhost:3000']}))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
// Définition du port d'écoute
app.set('port', (process.env.PORT || 80))
// Répertoire des pages du site web
var repertoireSite = "./public"
console.log('Ouverture du répertoire des pages du site web : %s', repertoireSite)
// Répertoire racine
app.use('/', express.static(repertoireSite))

// ****** Connection à la base de données vars urlParDefaut =
// "mongodb://dahu:azerty@localhost:27017/baskoredb"
var urlParDefaut = "mongodb://@localhost:27017/baskoredb"
// var urlParDefaut =
// "mongodb://baskore:baskore123@ds015774.mlab.com:15774/heroku_cmw92kb6"
// PROD_MONGODB=mongodb://dbuser:dbpass@host1:port1/dbname
const url = (process.env.MONGODB_URI || urlParDefaut)
console.log("url de la base de donnée: " + url)
Rencontres
  .connexion(url)
  .subscribe(db => {
    Rencontres.connecte = true
    // console.info(`Connecté? ${Rencontres.connecte}`)
  }, err => {
    console.log(`Err: ${err}`)
  });

// ■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■
// *** Démarrage du serveur
var serveur = app.listen(app.get('port'), function () {
  console.log("Ecoute sur le port %d, à l'adresse http://localhost:80", serveur.address().port)
})

// ■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■
// ▀ Chargement de socket.io
var io = require('socket.io').listen(serveur);
var nbSockets = 0
// Quand on client se connecte, on le note dans la console
io
  .sockets
  .on('connect', function (socket) {
    console.log('Nouvelle connexion:' + socket.id)
    // socket.emit('message', 'Vous êtes bien connecté au comité !')
    console.log(`Nombre d'abonnés: ${++ nbSockets}`)
    socket.on('disconnect', function () {
      console.log('déconnection:' + socket.id)
      console.log(`Nombre d'abonnés: ${-- nbSockets}`)
      console.log(`ààààààààààààààààààààààààààààààààààà`) 
      console.log(`ààààààààààààààààààààààààààààààààààà`) 
      console.log(`ààààààààààààààààààààààààààààààààààà`) 
      console.log(`ààààààààààààààààààààààààààààààààààà`) 
      console.log(`ààààààààààààààààààààààààààààààààààà`) 
      console.log(`ààààààààààààààààààààààààààààààààààà`) 
      eve.unsubscribe()
    })
    socket.on('commande', function (commande) {
      console.log(`Commande: ${JSON.stringify(commande)}`)
      controleur
        .commande$
        .next(commande)
    })
    var eve = controleur
      .evenement$
      .flatMap(evenement => {
        if (!evenement.type.match(typesEvenement.LECTURE_RENCONTRE)) 
          return Rx.Observable.of(evenement)
        return Rencontres.traiter(evenement)
      })
      .flatMap(evenement => {
        if (!evenement.type.match(typesEvenement.LECTURE_RENCONTRES)) 
          return Rx.Observable.of(evenement)
        return Rencontres.traiter(evenement)
      })
      .flatMap(evenement => {
        if (!evenement.type.match(typesEvenement.AJOUT_RENCONTRE)) 
          return Rx.Observable.of(evenement)
        return Rencontres.traiter(evenement)
      })
      .scan((message, evenement) => {
        // console.log(` | type: ${JSON.stringify(evenement)}.`)
        if (evenement.type.match(typesEvenement.LECTURE_RENCONTRE)) 
          message.idRencontre = evenement.idRencontre
        message.evenement = evenement
        return message
      }, {
        idRencontre: 0,
        evenement: null
      })
      .filter(message => message.evenement != null)
      .filter(message => message.evenement.idRencontre == message.idRencontre)
      .filter(message => message.evenement.idSocket == socket.id)
      .subscribe(message => {
        console.log("\\---- Communication vers le tableau de marque ---->")
        console.log(` | type: ${message.evenement.type}.`)
        console.log(`/ Envoi du message (${socket.id}):`)
        console.log(`${JSON.stringify(message)}`)
        // console.log(`/`)
        socket.emit("evenement", message.evenement)
      })
  })
// ■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■
// controleur   .evenement$   .flatMap(evenement => {     if
// (evenement.type.match(typesEvenement.AJOUT_RENCONTRE))       return
// Rx.Observable.of(evenement)     return Rencontres.traiter(evenement)   })
// .subscribe(evenement => {     console.log(` | typeeeee: ${evenement.type}.`)
// console.log(`${JSON.stringify(evenement)}`)     console.log(`/`)   }, err =>
// {     console.log(`Une erreur est survenue`)     console.log(`Err: ${err}`)
// })
// ■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■