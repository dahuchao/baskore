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
var Rencontres = require('./src/Rencontres.1')

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
// ********************************************** Démarrage du serveur
var serveur = app.listen(app.get('port'), function () {
  console.log("Ecoute sur le port %d, à l'adresse http://localhost:80", serveur.address().port)
})

// ■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■
// ▀ Chargement de socket.io
var io = require('socket.io').listen(serveur);
// Configuration du controleur de bonne connexion io.set('heartbeat timeout',
// 3000); io.set('heartbeat interval', 10000); Socket des abonnés au flux de
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
    })
    socket.on('commande', function (commande) {
      console.log(`Commande: ${JSON.stringify(commande)}`)
      controleur
        .commande$
        .next(commande)
    })
    controleur
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
      .scan((message, evenement) => {
        console.log(` | type: ${JSON.stringify(evenement)}.`)
        if (evenement.type.match(typesEvenement.LECTURE_RENCONTRE)) 
          message.idRencontre = evenement.idRencontre
        message.evenement = evenement
        return message
      }, {
        idRencontre: 0,
        evenement: null
      })
      // .filter(message => message.evenement != null)
      // .filter(message => message.evenement.idRencontre == message.idRencontre)
      .subscribe(message => {
        console.log("\\---- Communication vers les tableaux de marque ---->")
        console.log(` | type: ${message.evenement.type}.`)
        console.log(`_| Envoi du message`)
        console.log(`${JSON.stringify(message)}`)
        console.log(`/`)
        socket.emit("evenement", message.evenement)
      })
  })
// ■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■
controleur
  .evenement$
  .flatMap(evenement => {
    return Rencontres.traiter(evenement)
  })
  .subscribe(evenement => {
    console.log(` | type: ${evenement.type}.`)
    console.log(`${JSON.stringify(evenement)}`)
    console.log(`/`)
  }, err => {
    console.log(`Une erreur est survenue`)
    console.log(`Err: ${err}`)
  })
// ■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■▀■
// Liste des rencontes utilisées lorsque la base de données est inaccessible
var rencontres = [
  {
    id: 1,
    periode: 1,
    hote: {
      nom: "NEC",
      marque: 11
    },
    visiteur: {
      nom: "USJA",
      marque: 11
    }
  }, {
    id: 2,
    date: new Date("2016-09-02"),
    periode: 1,
    hote: {
      nom: "NEC",
      marque: 22
    },
    visiteur: {
      nom: "Montaigu",
      marque: 22
    }
  }, {
    id: 3,
    periode: 1,
    date: new Date("2016-10-16"),
    hote: {
      nom: "NEC",
      marque: 33
    },
    visiteur: {
      nom: "Coulaine",
      marque: 33
    }
  }
];
