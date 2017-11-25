# baskore
Publication des tableaux de marque de rencontres de basket.

Les utilisateurs spectateurs d'une rencontre, peuvent noter l'évolution du résultat sur cette table de marque
électronique. Ainsi, les utilisateurs distants qui n'ont pas pu se déplacer, voient depuis leur canapé, l'évolution
du résultat en temps réel (sans avoir à raffraichir le tableau).

Voici comment installer et démarrer l'application :

## Installation

```
npm install
```

## Lancement

```
npm start
```
ouvrir l'application à l'adresse http://localhost

## Utilisation

Voir le wiki de l'application : https://github.com/dahuchao/baskore/wiki

## Architecture

Cette application est un pretexte (POC) pour la mise en oeuvre des technologies suivantes : 
* REACT : https://facebook.github.io/react
* ReactiveX (PRF) : http://reactivex.io/
* Material-design (RWD) : http://www.material-ui.com
* Expressjs (API REST) : http://expressjs.com
* Socket.io (WebSocket) : http://socket.io
* Mongodb (NOSQL) : https://mongodb.github.io/node-mongodb-native

## Développement

Pour lancer l'application en mode développement avec la recompilation et le rechargement de l'application à la volée :

Démarrer le serveur back
```
npm start
```

et l'outil de développement front dans une autre console
```
npm run dev
```

## Lancement par docker

Installer les sources de l'application

git clone https://github.com/dahuchao/baskore.git

Fabrication de l'image applicative

sudo docker build -t dahu.chao/baskore .

Démarrage d'un conteneur

sudo docker run --restart always -d -p 80:81 dahu.chao/baskore

Voir la liste des conteneurs

sudo docker ps

Voir les logs d'un conteneur

sudo docker logs <PID>