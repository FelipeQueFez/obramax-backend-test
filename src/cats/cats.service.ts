import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './entities/cat.entity';
import * as firebase from 'firebase-admin';

export abstract class ICatsService {
  abstract create(cat: CreateCatDto): Promise<Cat>;
  abstract fetchAll(): Promise<Cat[]>;
}

@Injectable()
export class CatsFirebaseService implements ICatsService {

  private _catsCollection = firebase.firestore().collection('cats');
  private _LIMIT_QUERY = 10;

  async create(cat: CreateCatDto): Promise<Cat> {
    try {

      const docId = this._catsCollection.doc().id;
      
      await this._catsCollection.doc(docId).create({
        name: cat.name,
        age: cat.age,
        breed: cat.breed,
      });

      return Promise.resolve(Cat.fromJson({
        id: docId,
        name: cat.name,
        age: cat.age,
        breed: cat.breed,
      }));

    } catch (error) {
      return Promise.reject(error);
    }
  }

  async fetchAll(): Promise<Cat[]> {
    try {

      const cats = (await this._catsCollection.limit(this._LIMIT_QUERY).get());
      const result : Cat[] = [];

      cats.forEach(element => {
        const data = element.data();

        result.push(Cat.fromJson({
          id: element.id,
          name: data.name,
          age: data.age,
          breed: data.breed,
        }));
      });

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
