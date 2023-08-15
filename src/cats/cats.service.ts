import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './entities/cat.entity';
import * as firebase from 'firebase-admin';

export abstract class ICatsService {
  abstract create(cat: CreateCatDto): Promise<Cat>;
  abstract findOne(id: string): Promise<Cat>;
}

@Injectable()
export class CatsFirebaseService implements ICatsService {

  private _catsCollection = firebase.firestore().collection('cats');

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

  async findOne(id: string): Promise<Cat> {
    try {

      const data = (await this._catsCollection.doc(id).get()).data();

      return Promise.resolve(data as Cat);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
