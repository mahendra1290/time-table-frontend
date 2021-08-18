import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Subject } from 'rxjs';
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
  constructor(
    private periodService: PeriodsService,
    private snackBar: MatSnackBar
  ) {}

  periods: Period[] = [];

  periodsGroupedByDay: { day: number; periods: Period[] }[] = [];

  deletePeriodAction = new Subject<[string, string]>();

  undoClicked = false;

  deletedPeriodRow: Period[] = [];

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  timer!: any;

  currentTime = moment();

  currentTimeInMinutes =
    this.currentTime.hour() * 60 + this.currentTime.minutes();

  currentDay = this.currentTime.day() - 1;

  //1 minutes
  updateTimeInMilliSeconds = 1 * 60 * 1000;

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
      // this.periodsGroupedByDay = [];
      // for (let i = 0; i < 5; i++) {
      // this.periodsGroupedByDay.push(this.groupPeriodsForDay(i, data.periods));
      // }
    });
  }

  showDeletedSnackbar(day: number, id: string) {
    this.undoClicked = false;
    const confirmationRef = this.snackBar.open('Period Deleted', 'Undo', {
      duration: 5000,
    });

    this.deletedPeriodRow = [...this.periodsGroupedByDay[day].periods];
    this.periodsGroupedByDay[day].periods = this.periodsGroupedByDay[
      day
    ].periods.filter((p) => p._id != id);

    confirmationRef.afterDismissed().subscribe(() => {
      if (!this.undoClicked) {
        this.deletePeriod(id);
      }
    });

    confirmationRef.onAction().subscribe(() => {
      this.undoClicked = true;
      this.periodsGroupedByDay[day].periods = this.deletedPeriodRow;
      this.deletedPeriodRow = [];
      this.snackBar.open('Action undone.');
    });
  }

  updatePeriod(period: Period) {
    this.periodService.updatePeriod(period).subscribe((data) => {
      this.periodsGroupedByDay = [];
      for (let i = 0; i < 5; i++) {
        this.periodsGroupedByDay.push(this.groupPeriodsForDay(i, data.periods));
      }
    });
  }

  ngOnInit(): void {
    this.periodService.getPeriods().subscribe((periods) => {
      for (let i = 0; i < 5; i++) {
        this.periodsGroupedByDay.push(this.groupPeriodsForDay(i, periods));
      }
    });

    this.timer = setInterval(() => {
      this.currentTime = moment();
      this.currentDay = this.currentTime.day() - 1;
      this.currentTimeInMinutes =
        this.currentTime.hour() * 60 + this.currentTime.minutes();
    }, this.updateTimeInMilliSeconds);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
