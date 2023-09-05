import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IUser } from '../interface/IUser';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private platform:Platform,private storage:Storage) {}

  create(user: IUser) {
    this.platform.ready().then(() => {
      this.storage.create();
      this.storage.set('user', user);
    });
  };

  async get(){
    this.storage.create();
    return this.storage.get('user');
  }
}
