import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { switchMap } from 'rxjs/operators';
import { Period } from '../models/period';
import { PeriodsService } from '../periods.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css'],
})
export class TimeTableComponent implements OnInit, OnDestroy {
  constructor(private periodService: PeriodsService) {}

  periods: { day: number; periods: Period[] }[] = [];

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  timer!: any;

  currentTime = moment();

  currentTimeInMinutes =
    this.currentTime.hour() * 60 + this.currentTime.minutes();

  currentDay = this.currentTime.day() - 1;

  //5 minutes
  updateTimeInMilliSeconds = 5 * 60 * 1000;

  groupPeriodsForDay(
    day: number,
    periods: Period[]
  ): { day: number; periods: Period[] } {
    return {
      day: day,
      periods: periods
        .filter((p) => p.day === day)
        .sort((a, b) => a.startTime - b.startTime),
    };
  }

  deletePeriod(id: string) {
    this.periodService.deletePeriod(id).subscribe((data) => {
      this.periods = [];
      for (let i = 0; i < 5; i++) {
        this.periods.push(this.groupPeriodsForDay(i, data.periods));
      }
    });
  }

  updatePeriod(period: Period) {
    this.periodService.updatePeriod(period).subscribe((data) => {
      this.periods = [];
      for (let i = 0; i < 5; i++) {
        this.periods.push(this.groupPeriodsForDay(i, data.periods));
      }
    });
  }

  ngOnInit(): void {
    this.periodService.getPeriods().subscribe((periods) => {
      for (let i = 0; i < 5; i++) {
        this.periods.push(this.groupPeriodsForDay(i, periods));
      }
    });

    console.log(this.currentTimeInMinutes);
    console.log(this.currentDay, 'gy');
    this.timer = setInterval(() => {
      // this.currentTime = moment();
      this.currentTimeInMinutes += 2;
      // this.currentTime.hour() * 60 + this.currentTime.minutes();
    }, this.updateTimeInMilliSeconds);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
