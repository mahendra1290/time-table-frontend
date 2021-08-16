import { Component, OnInit } from '@angular/core';
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { switchMap } from 'rxjs/operators';
import { Period } from '../models/period';
import { PeriodsService } from '../periods.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css'],
})
export class TimeTableComponent implements OnInit {
  constructor(private periodService: PeriodsService) {}

  periods: Period[] = [];

  ngOnInit(): void {
    this.periodService
      .getPeriods()
      .subscribe((periods) => (this.periods = periods));
  }
}
