import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styles: [
  ]
})
export class TimePickerComponent implements OnInit {

  constructor() {
    for (let i = 0; i < 60; i += 5) {
      this.minutes.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      this.hours.push(i);
    }
  }

  hours: number[] = [];
  minutes: number[] = []
  period = ['AM', 'PM']

  ngOnInit(): void {

  }

}
