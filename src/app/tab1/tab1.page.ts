import { Component } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  dates: any[] = [];
  intervals: any[] = [];
  search: boolean = true;
  timesToggle: boolean = true;
  allDayToggle: boolean = true;
  
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsRange: CalendarComponentOptions = {
    pickMode: 'multi',
    disableWeeks: [0],
    monthPickerFormat: ['JAN', 'FEB', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AUG', 'SET', 'OUT', 'NOV', 'DEZ'],
    weekdays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
  };
  constructor(private router: Router, public loadingController: LoadingController) {

  }

  onChange($event) {
    
    console.log($event);
    
    if($event.length > 0)
    {
      this.dates = new Array();
      for(let i = 0; i < $event.length; i++)
        this.dates.push($event[i].format("DD/MM/YYYY"));
      
      this.timesToggle = false;
      this.allDayToggle = false;
    }
    else
    {
      this.timesToggle = true;
      this.allDayToggle = true;
    }
  }
  
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      duration: 2000
    });
    await loading.present();
  }

  resultRow($event) {
    this.router.navigate(['/result', {dates: this.dates, intervals: this.intervals}]);
  }

  setAllDay($event){
    
    if($event.detail.checked)
    {
      this.timesToggle = true;
      this.intervals = new Array();
      this.intervals.push("0");
      this.search = false;
    }        
    else
    {
      this.intervals = new Array();
      this.timesToggle = false;
      this.search = true;
    }        
  }

  setTime($event){

    if($event.detail.checked)
    {
      this.intervals.push($event.detail.value);
      this.search = false;
    }      
    else
    {
      for(var i = 0; i < this.intervals.length; i++)
        if(this.intervals[i] == $event.detail.value)
          this.intervals.splice(i,1);
      
      if(this.intervals.length == 0)
        this.search = true;
    }
  }
  clearSearch(){
    this.search = true;
    this.timesToggle = true;
    this.allDayToggle = true;
  }

  clearCalendar()
  {
    this.dates = [];
    this.intervals = [];
    this.clearSearch();
  }
}
