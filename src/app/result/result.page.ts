import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Parse} from 'parse';
import {ParseConfig} from '../../app/parse.config';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  
  rooms: any[] = [];
  constructor(private storage: Storage, private router: Router) {
    this.getRoom();
  }

  ngOnInit() {    
  }

  getRoom() {

    Parse.initialize(ParseConfig.appId, ParseConfig.javascriptKey, ParseConfig.masterKey);
    Parse.serverURL = ParseConfig.serverURL;

    var query = new Parse.Query("Rooms");
    query.equalTo("status", "Open");
    query.find().then((results) => {
      console.log(results);
      this.rooms = results;
    }, err => {
      console.log('Error logging in', err);
    });

  }
  
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  setReserve(room){

    this.storage.get('user').then((user) => {
      console.log('User ', user);
      
      Parse.initialize(ParseConfig.appId, ParseConfig.javascriptKey, ParseConfig.masterKey);
      Parse.serverURL = ParseConfig.serverURL;      

      room.set("userRev", this.getUser(user.id));
      room.set("status", "Reserve");
      console.log(room);
      room.save().then((roomSave) => {
        console.log(roomSave);
        this.router.navigateByUrl('/tabs');
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
