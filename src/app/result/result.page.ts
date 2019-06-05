import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Parse } from 'parse';
import { ParseConfig } from '../../app/parse.config';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ViewerRoomPage } from '../viewer-room/viewer-room.page';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  
  rooms: any[] = [];
  dates: any[] = [];
  intervals: any[] = [];

  loading: any;
  
  constructor(
    private storage: Storage,
    private router: Router,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public modalController: ModalController) {
    
    this.presentLoading();
    this.dates = this.route.snapshot.paramMap.get("dates").split(",");
    this.intervals = this.route.snapshot.paramMap.get("intervals").split(",");

    this.getRoom();
  }

  ngOnInit() {    
  }
  
  async presentModal(item) {
    const modal = await this.modalController.create({
      component: ViewerRoomPage,
      componentProps: { room: item }
    });

    modal.onDidDismiss()
      .then((data) => {
        const room = data['data'];
        this.presentAlertConfirm(room)
    });
    
    return await modal.present();      
  }  

  getRoom() {

    Parse.initialize(ParseConfig.appId, ParseConfig.javascriptKey, ParseConfig.masterKey);
    Parse.serverURL = ParseConfig.serverURL;

    var query = new Parse.Query("Rooms");
    query.find().then((results) => {
      console.log(results); 
      let range = Array();  

      for(var i = 0; i < results.length; ++i)
      { 
        if(results[i].attributes.datesRev != undefined)
        {
          let dates = results[i].attributes.datesRev;          
          if(dates != undefined )
          {
            for(var j = 0; j < dates.length; j++)
            {
              let dateRev = dates[j];
              for(var w = 0; w < this.dates.length; w++)
                if(dateRev == this.dates[w])
                  range.push(results[i]);                
            }                
          } 
        }
      }

      results = this.showResult(results, range);
      this.rooms = results;
      
    }, err => {
      console.log('Error logging in', err);
    });

  }
  
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      duration: 2000
    });
    await loading.present();
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
      var Reverse = Parse.Object.extend("Reverse");
      var rev = new Reverse();
      rev.set("roomRev", this.getRoomParse(room));
      rev.set("userRev", this.getUser(user.id));
      rev.set("datesRev", this.dates);
      rev.set("intervalsRev", this.intervals);
      console.log(room);
      rev.save().then((revSave) => {
        console.log(revSave);

        room.set("datesRev", this.getDatesRev(room));
        room.set("intervalsRev", this.getIntervalsRev(room));
        room.save().then((roomUpdate) => {
          console.log(roomUpdate);
          this.presentAlert(room)
          this.router.navigateByUrl('/tabs');
        }, err => {
          console.log('Error Room in', err);
        });
      }, err => {
        console.log('Error Reverse in', err);
      });

    });
  }

  getDatesRev(room){
    let datesSave = room.attributes.datesRev;
    if(datesSave == undefined)
      datesSave = new Array();

    return datesSave.concat(this.dates);
  }

  getIntervalsRev(room){
    let intervalSave = room.attributes.intervalsRev;
    if(intervalSave == undefined)
      intervalSave = new Array();
    
    return intervalSave.concat(this.intervals);
  }

  getUser(userId){
      
    var user = Parse.Object.extend("_User");
    var user = new user();
    user.id = userId;
    
    return user;  
  }

  getRoomParse(room){      
    var roomObj = Parse.Object.extend("Rooms");
    roomObj = new roomObj();
    roomObj.id = room.id;
    
    return roomObj;  
  }

  getReverseParse(reverse){      
    var reverseObj = Parse.Object.extend("Reverse");
    reverseObj = new reverseObj();
    reverseObj.id = reverse.id;
    
    return reverseObj;  
  }

  showResult(results, range){
    
    let show = Array();
    let intercetion = false;

    for(var i = 0; i < results.length; i++)
    {
      for(var j = 0; j < range.length; j++)
      {
        if(results[i].id == range[j].id)
          intercetion = true;
      }

      if(!intercetion)
        show.push(results[i]);
      else
        intercetion = false;
    }

    return show;
  }

  async presentAlert(room) {
    const alert = await this.alertController.create({
      header: 'Reversa da Sala',
      message: 'Confirmada a reserva da sala: <p><strong>'+ room.attributes.name,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertConfirm(room) {
    const alert = await this.alertController.create({
      header: 'Reserva de sala!',
      message: 'Confirma a reserva da sala: <p><strong>'+ room.attributes.name +'</strong></p><p>Em '+ this.dates +'</p>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Reserve',
          cssClass: 'primary',
          handler: () => {
            console.log('Confirm Okay');
            this.setReserve(room);
          }
        }
      ]
    });

    await alert.present();
  }
}
