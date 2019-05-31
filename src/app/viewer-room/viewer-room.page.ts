import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-viewer-room',
  templateUrl: './viewer-room.page.html',
  styleUrls: ['./viewer-room.page.scss'],
})
export class ViewerRoomPage implements OnInit {

  @Input() room: any;

  constructor(public alertController: AlertController,public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  reserve(room){
    this.modalCtrl.dismiss(room);
  }

}
