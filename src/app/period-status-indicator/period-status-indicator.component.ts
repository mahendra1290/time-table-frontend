import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-period-status-indicator',
  template: `
    <!-- <p class="rounded-full mt-[.20rem] mr-2 bg-red-500 w-4 h-4 text-4xl"
    *ngIf="currentDay == period.day && period.endTime < currentTimeInMinutes"></p>
    <p *ngIf="currentDay == period.day && period.startTime <= currentTimeInMinutes && period.endTime >= currentTimeInMinutes"
      class="rounded-full mr-2 bg-green-500 w-4 h-4 text-4xl"></p>
    <p *ngIf="currentDay == period.day && period.startTime > currentTimeInMinutes"
      class="rounded-full mr-2 bg-blue-500 w-4 h-4 text-4xl"></p> -->
  `,
  styles: [
  ]
})
export class PeriodStatusIndicatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
