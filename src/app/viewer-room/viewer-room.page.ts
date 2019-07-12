import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-viewer-room',
  templateUrl: './viewer-room.page.html',
  styleUrls: ['./viewer-room.page.scss'],
})
export class ViewerRoomPage implements OnInit {

  @Input() room: any;    
  @ViewChild("slides") slides;
  
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  images: any[] = [];

  constructor(public alertController: AlertController,public modalCtrl: ModalController) { }

  ngOnInit() {
    this.images = this.room.attributes.slidesID
  }

  reserve(room){
    this.modalCtrl.dismiss(room);
  }

  nextSlide() {
    this.slides.slideNext();
  }

  prevSlide() {
    this.slides.slidePrev();
  }

}
