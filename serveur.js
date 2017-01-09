// Chargement du module expressjs
var express = require("express")
var cors = require("express-cors")
var Immutable = require("immutable")
var controleur = require("./src/controleur")
var typesEvenement = require("./src/types-evenement")
var MongoClient = require("mongodb").MongoClient
var bodyParser = require("body-parser")
var multer = require("multer")
var upload = multer()
var ObjectId = require("mongodb").ObjectID

// Codec base 64 var base64 = require('base-64') Création de l'application
// express
var app = express()
app.use(cors({ allowedOrigins: ['localhost:3000'] }))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// Définition du port d'écoute
app.set('port', (process.env.PORT || 80))
// Répertoire des pages du site web
var repertoireSite = "./public"
console.log('Ouverture du répertoire des pages du site web : %s', repertoireSite)
// Répertoire racine
app.use('/', express.static(repertoireSite))

// ********************************************** Connection à la base de
// données vars urlParDefaut = "mongodb://dahu:azerty@localhost:27017/baskoredb"
var urlParDefaut = "mongodb://@localhost:27017/baskoredb"
// var urlParDefaut =
// "mongodb://baskore:baskore123@ds015774.mlab.com:15774/heroku_cmw92kb6"
// PROD_MONGODB=mongodb://dbuser:dbpass@host1:port1/dbname
const url = (process.env.MONGODB_URI || urlParDefaut)
console.log("url de la base de donnée: " + url)

// ********************************************** Traitement de la requête GET
// http://localhost/rencontres
app.get("/api/rencontres", function (req, res) {
  console.log("GET rencontres.")
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log("Base de données indisponible: " + err)
      console.log("Utilisation liste statique de test : " + JSON.stringify(rencontres))
      console.log("Nb rencontre dans la liste: " + rencontres.length)
      res.jsonp(rencontres);
    } else {
      db
        .collection("rencontres")
        .find()
        .toArray(function (err, rencontres) {
          if (err) {
            console.log("Les données rencontres indisponible: " + err)
          } else {
            // Lecture de la liste des rencontres
            console.log("Nombre de rencontre en base", rencontres.length)
            res.jsonp(rencontres);
          }
        })
      // Fermeture de la base de données
      db.close()
    }
  })
})

// ********************************************** Traitement de la requête GET
// http://localhost/rencontres/2
app.get("/api/rencontres/:id", function (req, res) {
  // Calcul du nom de la page recherchée
  let idRencontre = parseInt(req.params.id)
  console.log("GET rencontre: " + idRencontre)
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log("Base de données indisponible.")
      console.log('Ouverture de la recontre de puis la liste statique :' + idRencontre)
      rencontres.filter(function (rencontre) {
        return rencontre.id == idRencontre
      })
        .forEach(function (rencontre) {
          // Lecture de la rencontre
          res.jsonp(rencontre)
          console.log('Envoie de la rencontre ! ' + JSON.stringify(rencontre))
        })
    } else {
      db
        .collection("rencontres")
        .find({ id: idRencontre })
        .each(function (err, rencontre) {
          if (err) {
            console.log("Erreur: " + err)
          }
          if (rencontre != null) {
            // Lecture de la rencontre
            console.log("Envoie de la rencontre: " + JSON.stringify(rencontre))
            res.jsonp(rencontre)
          }
        })
      // Fermeture de la base de données
      db.close();
    }
  })
})

// ********************************************** Traitement de la requête PUT
// http://localhos t/rencontres/id
app.put("/api/rencontres/:id", upload.array(), function (req, res) {
  // Calcul du nom de la page recherchée
  let idRencontre = parseInt(req.params.id)
  console.log("PUT rencontre: " + idRencontre)
  let rencontreMAJ = req.body
  console.log("mise à jour rencontre: " + JSON.stringify(rencontreMAJ))
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log("Base de données indisponible.")
      console.log('Ouverture de la recontre de puis la liste statique :' + idRencontre)
      rencontres.filter(function (rencontre) {
        return rencontre.id == idRencontre
      })
        .map(function (rencontre) {
          return rencontreMAJ
        })
      // Lecture de la rencontre
      res.jsonp(rencontreMAJ)
      console.log('Envoie de la rencontre ! ' + JSON.stringify(rencontreMAJ))
    } else {
      db
        .collection("rencontres")
        .find({ id: idRencontre })
        .each(function (err, rencontre) {
          if (err) {
            console.log("Erreur: " + err)
          }
          if (rencontre != null) {
            rencontre.date = rencontreMAJ.date
            rencontre.hote.nom = rencontreMAJ.hote.nom
            rencontre.visiteur.nom = rencontreMAJ.visiteur.nom
            db
              .collection("rencontres")
              .update({
                _id: rencontre._id
              }, rencontre)
            // Fermeture de la base de données
            db.close()
            // Retour de la ressource
            res.jsonp(rencontre);
            console.log('Envoie de la rencontre ! ' + JSON.stringify(rencontre))
          }
        })
    }
  })
})

// ********************************************** Traitement de la requête POST
// http://localhost/rencontres
app.post("/api/rencontres", upload.array(), function (req, res) {
  let rencontre = req.body
  console.log("POST nouvelle rencontre: " + JSON.stringify(rencontre))
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log("Base de données indisponible: " + err)
      console.log("Utilisation liste statique de test.")
      // Calcul du plus grand identifiant
      idCalcule = rencontres.reduce((max, rencontre) => rencontre.id > max
        ? rencontre.id
        : max, 0)
      // Calcul de l'identifiant de la nouvelle rencontre
      rencontre.id = idCalcule + 1
      // Calcul de la nouvelle liste des rencontres
      rencontres = [
        ...rencontres,
        rencontre
      ]
      console.log("Nb rencontre dans la liste: " + rencontres.length)
      // Retour de la nouvelle liste de rencontres
      res
        .location("/api/rencontres/" + rencontre.id)
        .sendStatus(201);
    } else {
      db
        .collection("rencontres")
        .find()
        .map(rencontre => rencontre.id)
        .toArray(function (err, ids) {
          let idCalcule = ids.reduce((max, id) => {
            console.log("rencontre id/max: " + id + "/" + max)
            return id > max
              ? id
              : max
          }, 0)
          // Calcul de l'identifiant de la nouvelle rencontre
          idCalcule++;
          console.log("Nouvel id: " + idCalcule)
          rencontre.id = idCalcule
          // Insertion de la nouvelle rencontre
          db
            .collection("rencontres")
            .insert(rencontre, function (err, result) {
              if (err) {
                console.log("Chargement rencontres en erreur.")
                res.sendStatus(500)
              } else {
                const localisation = "/api/rencontres/" + rencontre.id
                console.log("Rencontres chargées: " + localisation)
                // Fermeture de la base de données
                db.close()
                res
                  .location(localisation)
                  .sendStatus(201)
              }
            })
        })
    }
  })
})

// ********************************************** Traitement de la requête DEL
// http://localhost/rencontres/id
app.delete("/api/rencontres/:id", upload.array(), function (req, res) {
  // Calcul du nom de la page recherchée
  let idRencontre = parseInt(req.params.id)
  console.log("DEL rencontre: " + idRencontre)
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log("Base de données indisponible.")
      console.log('Ouverture de la recontre de puis la liste statique :' + idRencontre)
      // Suppression de la rencontre
      rencontres = rencontres.filter((rencontre) => rencontre.id != idRencontre)
      console.log("Nb rencontre dans la liste: " + rencontres.length)
      // Retour de la nouvelle liste de rencontres
      res.sendStatus(204)
    } else {
      // Suppression de la rencontre
      db
        .collection("rencontres")
        .remove({
          id: idRencontre
        }, function (err, result) {
          if (err) {
            console.log("Erreur: " + err)
          }
          console.log("Résultat: " + result)
          // Calcul de la nouvelle liste
          db
            .collection("rencontres")
            .find()
            .toArray(function (err, rencontres) {
              console.log("Nb rencontre dans la liste: " + rencontres.length)
            })
          // Fermeture de la base de données
          db.close()
          // Retour de la nouvelle liste de rencontres
          res.sendStatus(204)
        })
    }
  })
})

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

//********************************************** Démarrage du serveur
var serveur = app.listen(app.get('port'), function () {
  console.log("Ecoute sur le port %d, à l'adresse http://localhost:80", serveur.address().port)
})
// Chargement de socket.io
var io = require('socket.io').listen(serveur);
// Configuration du controleur de bonne connexion
// io.set('heartbeat timeout', 3000); 
// io.set('heartbeat interval', 10000);
// Socket des abonnés au flux de publication des mesures de la sonde de
// température
var socketAbonnes = Immutable.Map()
// Quand on client se connecte, on le note dans la console
io
  .sockets
  .on('connect', function (socket) {
    socket.on('disconnect', function () {
      console.log('déconnection:' + socket.id)
      console.log(`Désabonnement du client ${socket.id}.`)
      socketAbonnes = socketAbonnes.delete(socket.id)
      console.log(`Nombre d'abonnés: ${socketAbonnes.count()}`)
    });
    console.log('Nouvelle connexion:' + socket.id)
    socket.emit('message', 'Vous êtes bien connecté au comité !')
    // Quand la table de marque recoit une demande d'abonnement à un tableau de
    // marque
    socket.on('ouvrirRencontre', function (idRencontre) {
      console.log('Abonnement à la recontre:' + idRencontre)
      MongoClient.connect(url, function (err, db) {
        if (err) {
          console.log("Base de données indisponible.")
          rencontres.filter(function (rencontre) {
            return rencontre.id == idRencontre
          })
            .forEach(function (rencontre) {
              socketAbonnes = socketAbonnes.set(socket.id, { socket, idRencontre })
              console.log(`Abonnement du client ${socket.id} à la rencontre ${rencontre.id}.`)
              console.log(`Nombre d'abonnés: ${socketAbonnes.count()}`)
            })
        } else {
          db
            .collection("rencontres")
            .find()
            .toArray(function (err, rencontres) {
              if (err) {
                console.log("Les rencontres.")
              } else {
                rencontres
                  .filter(function (rencontre) {
                    return rencontre.id == idRencontre
                  })
                  .forEach(function (rencontre) {
                    socketAbonnes = socketAbonnes.set(socket.id, { socket, idRencontre })
                    console.log(`Abonnement du client ${socket.id} à la rencontre ${rencontre.id}.`)
                    console.log(`Nombre d'abonnés: ${socketAbonnes.count()}`)
                  })
              }
            })
        }
      })
    });
    // Quand la table de marque recoit une demande d'abonnement à un tableau de
    // marque
    socket.on('fermerRencontre', function (idRencontre) {
      console.log('Des-abonnement à la recontre:' + idRencontre)
      socketAbonnes = socketAbonnes.delete(socket.id);
      console.log("Fermeture abonnement rencontre: " + rencontre.id)
      console.log("Nombres abonnés: " + socketAbonnes.count())
    });
    socket.on('commande', function (commande) {
      console.log(`Commande: ${JSON.stringify(commande)}`)
      controleur
        .commande$
        .next(commande)
    })
  })
controleur
  .evenement$
  .subscribe(evenement => {
    socketAbonnes
      .filter(client => {
        return client.idRencontre == evenement.idRencontre
      })
      .forEach((client, idSocket) => {
        client.socket.emit("evenement", evenement)
        console.log(`Envoi de l'évènement ${JSON.stringify(evenement)} au client: ${client.socket.id}`)
      })
  });
controleur
  .evenement$
  .subscribe(evenement => {
    MongoClient.connect(url, (err, db) => {
      if (err) {
        console.log("Base de données indisponible.")
        return
      }

      var evenements = {
        "DEFAUT": function () {
          return Immutable.fromJS(evenement)
        }
      }
      evenements[typesEvenement.CHANGEMENT_MARQUE] = function () {
        console.log("Enregistrement de la nouvelle marque.")
        db
          .collection("rencontres")
          .update({
            id: evenement.idRencontre
          }, {
            $set: {
              "hote.marque": evenement.marqueHote,
              "visiteur.marque": evenement.marqueVisiteur
            }
          })
      }
      evenements[typesEvenement.CHANGEMENT_PERIODE] = function () {
        console.log("Enregistrement de la nouvelle periode.")
        db
          .collection("rencontres")
          .update({
            id: evenement.idRencontre
          }, {
            $set: {
              "periode": evenement.periode
            }
          })
      }
      evenements[typesEvenement.NOUVEAU_COMMENTAIRE] = function () {
        console.log("| NOUVEAU_COMMENTAIRE.")
        db
          .collection("rencontres")
          .find({ id: evenement.idRencontre })
          .each((err, rencontre) => {
            if (err)
              return
            if (!rencontre)
              return
            console.log("Rencontre: " + JSON.stringify(rencontre))
            let commentaires = Immutable
              .fromJS(rencontre)
              .get("commentaires", Immutable.List())
              .push(evenement.commentaire)
            console.log(`Enregistrement du commentaire en base: ${commentaires}`)
            db
              .collection("rencontres")
              .update({
                id: evenement.idRencontre
              }, {
                $set: {
                  "commentaires": commentaires.toArray()
                }
              })
              .then(status => {
                console.log(`Statut de l'enregistrement: ${status}`)
              })
          })
      }
      var rien = (evenements[evenement.type] || evenements['DEFAUT'])();
    })
  });