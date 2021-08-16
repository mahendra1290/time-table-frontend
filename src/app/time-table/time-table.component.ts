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

  periods: { day: number; periods: Period[] }[] = [];

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  groupPeriodsForDay(
    day: number,
    periods: Period[]
  ): { day: number; periods: Period[] } {
    return { day: day, periods: periods.filter((p) => p.days.includes(day)) };
  }

  deletePeriod(id: string) {
    this.periodService.deletePeriod(id).subscribe((data) => {
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
  }
}
