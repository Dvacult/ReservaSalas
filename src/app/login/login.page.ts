import { Component, OnInit } from '@angular/core';
import { NavController, ToastController} from '@ionic/angular';
import { Router } from '@angular/router';
import { Parse } from 'parse';
import { ParseConfig } from '../../app/parse.config';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: string;
  pass: string;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private storage: Storage,
    private router: Router,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {  
  }
  
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      duration: 2000
    });
    await loading.present();
  }
  
  async displayToast(message, duration) {
    let toast = await this.toastCtrl.create({
        message: message,
        duration: duration
      });
      toast.present();
  }

  onLogin() {
    
    this.presentLoading();
    Parse.initialize(ParseConfig.appId, ParseConfig.javascriptKey, ParseConfig.masterKey);
    Parse.serverURL = ParseConfig.serverURL;
    Parse.User.logIn(this.login,this.pass).then((user) => {
        console.log('Logged in successfully', user);
        
        this.storage.set('user', user);
        this.storage.set('login', this.login);
        this.router.navigateByUrl('/tabs');

      }, err => {
        console.log('Error logging in', err);

        // The login failed. Check error to see why.
        console.log("Login Error");
        // The login failed. Check error to see why.
        this.displayToast('Usuário ou senha errados!', 5000);        
      });
  }

}
