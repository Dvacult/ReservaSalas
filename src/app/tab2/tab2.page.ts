import { Component } from '@angular/core';
import { Parse } from 'parse';
import { ParseConfig } from '../../app/parse.config';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  rooms: any[] = [];
  
  constructor(private storage: Storage, public alertController: AlertController) {
    this.getMyReverves();
  }
  
  ionViewDidLoad() {  
    this.getMyReverves();  
  }

  getMyReverves() {

    this.storage.get('user').then((user) => {
      console.log('User ', user);

      Parse.initialize(ParseConfig.appId, ParseConfig.javascriptKey, ParseConfig.masterKey);
      Parse.serverURL = ParseConfig.serverURL;

      var query = new Parse.Query("Reverse");
      query.equalTo("userRev", this.getUser(user.id));
      query.include("roomRev");
      query.include("userRev");
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

  async presentAlertConfirm(reverve) {
    const alert = await this.alertController.create({
      header: 'Reserva de sala!',
      message: 'Confirma a reserva da sala: <p><strong>'+ reverve.attributes.roomRev.attributes.name +'</strong></p><p>Em '+ reverve.attributes.datesRev +'</p>',
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
            this.removeReserve(reverve);
          }
        }
      ]
    });

    await alert.present();
  }
}
