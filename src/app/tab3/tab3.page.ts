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
  setor: string;
  email: string;
  nUSP: number;

  constructor(private storage: Storage, private router: Router){
    this.storage.get('user_attr').then((user_attr) => {
        this.login = user_attr.username;
        this.setor = user_attr.setor;
        this.email = user_attr.email;
        this.nUSP = user_attr.nUSP;
    });
  }
  editUser(){

  }

  logout(){
    this.storage.remove("user");
    this.storage.remove("user_attr");
    this.router.navigateByUrl('');
  }
}
