import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  login: string;
  constructor(private storage: Storage, private router: Router){
    this.storage.get('login').then((login) => {
        this.login = login;
    });
  }
  editUser(){

  }

  logout(){
    this.storage.remove("user");
    this.storage.remove("login");
    this.router.navigateByUrl('');
  }
}
