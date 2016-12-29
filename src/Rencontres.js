import { RxMongo, RxCollection } from 'rxmongo'
import { MongoClient } from 'mongodb'

export class Rencontres {
  constructor(url) {
    RxMongo.connect(url).subscribe(db => {
    }, err => {
      console.log(`Err: ${err}`)
    })
  }
  lecture(id) {
    return new RxCollection("rencontres")
      .find({})
      .first()
  }
}
