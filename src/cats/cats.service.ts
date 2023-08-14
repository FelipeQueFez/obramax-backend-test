import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './entities/cat.entity';
import * as firebase from 'firebase-admin';

export abstract class ICatsService {
  abstract create(cat: CreateCatDto): Promise<void>;
  abstract findOne(id: string): Promise<Cat>;
}

@Injectable()
export class CatsFirebaseService implements ICatsService {
  
  async create(cat: CreateCatDto): Promise<void> {
    try {
      const userCollection = firebase.firestore().collection('cats');
      await userCollection.doc("1").create({
        name: cat.name,
      });    
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }    
  }

  async findOne(id: string): Promise<Cat> {
    try {
      const userCollection = firebase.firestore().collection('cats');
      const data = (await userCollection.doc(id).get()).data();

      return Promise.resolve(data as Cat);  
    } catch (error) {
      return Promise.reject(error);
    }    
  }
}
