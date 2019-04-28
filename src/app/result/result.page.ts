import { Component, OnInit } from '@angular/core';
import {Parse} from 'parse';
import {ParseConfig} from '../../app/parse.config';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  
  room: any[] = [];
  constructor() {
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
      this.room = results;
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
    debugger;
  }
}
