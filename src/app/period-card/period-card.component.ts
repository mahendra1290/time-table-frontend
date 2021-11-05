import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubjectPeriod } from '../add-period/add-period.component';

@Component({
  selector: 'app-period-card',
  templateUrl: './period-card.component.html',
  styles: [
  ]
})
export class PeriodCardComponent implements OnInit {
  @Input()
  subjectPeriod!: SubjectPeriod


  @Output()
  remove: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
