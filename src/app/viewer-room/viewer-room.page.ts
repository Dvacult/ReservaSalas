import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-viewer-room',
  templateUrl: './viewer-room.page.html',
  styleUrls: ['./viewer-room.page.scss'],
})
export class ViewerRoomPage implements OnInit {

  @Input() value: number;

  constructor() { }

  ngOnInit() {
  }

}
