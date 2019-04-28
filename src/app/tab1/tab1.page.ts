import { Component } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  checkIn: String = "Inicio";
  checkOut: String = "Final";
  search: boolean = true;
  dateRange: { from: string; to: string; };
  
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsRange: CalendarComponentOptions = {
    pickMode: 'range',
    monthPickerFormat: ['JAN', 'FEB', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AUG', 'SET', 'OUT', 'NOV', 'DEZ'],
    weekdays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
  };
  constructor(private router: Router) { }

  onChange($event) {
    console.log($event);
    this.checkIn = $event.from.format("DD/MM/YYYY");
    this.checkOut = $event.to.format("DD/MM/YYYY");
    this.search = false;
  }
  resultRow($event) {
    this.router.navigateByUrl('/result');
  }
}
