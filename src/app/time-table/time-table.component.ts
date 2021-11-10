import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Period } from '../models/period';
import { PeriodsService } from '../periods.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css'],
})
export class TimeTableComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private periodService: PeriodsService,
    private snackBar: MatSnackBar,
    private auth: AuthService
  ) {}

  @ViewChildren('day_box')
  dayBoxes!: QueryList<ElementRef<HTMLDivElement>>;

  periodsLoading = true;

  showEditDeleteOption = false;

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
    this.periodService.deletePeriod(id).then((res) => console.log(res));
  }

  showDeletedSnackbar(day: number, id: string) {
    this.undoClicked = false;
    const confirmationRef = this.snackBar.open('Period Deleted', 'Undo', {
      duration: 5000,
    });

    this.deletedPeriodRow = [...this.periodsGroupedByDay[day].periods];
    this.periodsGroupedByDay[day].periods = this.periodsGroupedByDay[
      day
    ].periods.filter((p) => p.id != id);

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

  async updatePeriod(period: Period) {
    await this.periodService.updatePeriod(period);
    this.snackBar.open('Link updated', undefined, { duration: 2000 });
  }

  ngOnInit(): void {
    this.periodService.periods.subscribe((periods) => {
      this.periodsLoading = false;
      this.scrollToCurrentDay();

      this.periodsGroupedByDay = [];

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

    this.auth.user$.subscribe(user => {
      if (user) {
        this.showEditDeleteOption = true;
      } else {
        this.showEditDeleteOption = false;
      }
    })
  }

  scrollToCurrentDay() {
    const autoscroll = localStorage.getItem('auto-scroll');
    if (autoscroll && autoscroll == 'On') {
      this.dayBoxes.forEach((item, index) => {
        if (index == this.currentDay) {
          setTimeout(() => {
            console.log(item);
            item.nativeElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }, 3000);
        }
      });
    }
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
