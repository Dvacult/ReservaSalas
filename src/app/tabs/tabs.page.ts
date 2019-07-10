import { Component } from '@angular/core';
import { Parse } from 'parse';
import { ParseConfig } from '../../app/parse.config';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  reverse: number;
  constructor(private storage: Storage) {
    this.getNumberReverse();
  }
  
  ionViewDidEnter() { 
    this.getNumberReverse();  
  }
  
  getNumberReverse(){
    this.storage.get('user').then((user) => {
      console.log('User ', user);

      Parse.initialize(ParseConfig.appId, ParseConfig.javascriptKey, ParseConfig.masterKey);
      Parse.serverURL = ParseConfig.serverURL;

      var query = new Parse.Query("Reverse");
      query.equalTo("userRev", this.getUser(user.id));
      query.find().then((results) => {
        console.log(results);
        this.reverse = results.length;
      }, err => {
        console.log('Error logging in', err);
      });
    });
  }

  getUser(userId){
      
    var user = Parse.Object.extend("_User");
    var user = new user();
    user.id = userId;
    
    return user;  
  }
  
}