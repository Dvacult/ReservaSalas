import { Component } from '@angular/core';
import {Parse} from 'parse';
import {ParseConfig} from '../../app/parse.config';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  rooms: any[] = [];
  
  constructor(private storage: Storage) {
    this.getMyReverves();
  }
  
  getMyReverves() {

    this.storage.get('user').then((user) => {
      console.log('User ', user);

      Parse.initialize(ParseConfig.appId, ParseConfig.javascriptKey, ParseConfig.masterKey);
      Parse.serverURL = ParseConfig.serverURL;

      var query = new Parse.Query("Rooms");
      query.equalTo("userRev", this.getUser(user.id));
      query.find().then((results) => {
        console.log(results);
        this.rooms = results;
      }, err => {
        console.log('Error logging in', err);
      });
    });
    
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getMyReverves();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  getUser(userId){
      
    var user = Parse.Object.extend("_User");
    var user = new user();
    user.id = userId;
    
    return user;  
  }

  removeReserve(reserve){

  }
}
