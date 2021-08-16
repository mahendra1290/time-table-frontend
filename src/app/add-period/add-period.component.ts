import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { periodTimings } from 'src/assets/period-timing';
import { MultiSelectComponent } from '../multi-select/multi-select.component';
import * as moment from 'moment';
import { PeriodsService } from '../periods.service';
import { Period } from '../models/period';

@Component({
  selector: 'app-add-period',
  templateUrl: './add-period.component.html',
  styleUrls: ['./add-period.component.css'],
})
export class AddPeriodComponent implements OnInit, AfterViewInit {
  subject = new FormControl('', {
    updateOn: 'change',
    validators: Validators.required,
  });

  @ViewChild('section_multiselect')
  sectionSelector: MultiSelectComponent | null = null;

  meetLink = new FormControl('', Validators.required);

  days = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri'];

  periodTimings = periodTimings;

  sectionOptions = ['CS A', 'CS B', 'CS 1', 'CS 2'];

  periodNumbers = periodTimings.map(
    (p) => `${p.periodNumber} (${p.startTime} - ${p.endTime})`
  );

  selectedPeriod: number[] = [0, -1];

  selectedDay: number = 0;

  togglePeriod(period: number) {
    if (this.selectedPeriod[0] === period) {
      // this.selectedPeriod[0] = -1;
      // } else if (this.selectedPeriod[1] === period) {
      //   this.selectedPeriod[1] = -1;
      // } else if (this.selectedPeriod[0] == -1) {
      // this.selectedPeriod[0] = period;
      // } else if (this.selectedPeriod[1] == -1) {
      //   this.selectedPeriod[1] = period;
    } else {
      // this.selectedPeriod[0] = this.selectedPeriod[1];
      this.selectedPeriod[0] = period;
    }
  }

  toggleDay(day: number) {
    this.selectedDay = day;
  }

  addPeriod() {
    let st = this.periodTimings[this.selectedPeriod[0]].startTime;
    let et = this.periodTimings[this.selectedPeriod[0]].endTime;
    let startTime: moment.Moment = moment(st, 'hh:mm a');
    let endTime: moment.Moment = moment(et, 'HH:mm a');
    let startTimeInMinutes = startTime.hours() * 60 + startTime.minutes();
    let endTimeInMinutes = endTime.hours() * 60 + endTime.minutes();

    const period: Omit<Period, '_id'> = {
      startTime: startTimeInMinutes,
      endTime: endTimeInMinutes,
      subject: this.subject.value,
      meetLink: this.meetLink.value,
      days: [this.selectedDay],
      sections: Array.from(this.sectionSelector?.selected || []),
    };

    this.periodsService.addPeriod(period).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );

    console.log(startTime);
    console.log(startTimeInMinutes);
    console.log(
      this.subject.value,
      this.meetLink.value,
      Array.from(this.sectionSelector?.selected || []),
      this.selectedDay,
      this.selectedPeriod[0]
    );
  }

  constructor(private periodsService: PeriodsService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log(this.sectionSelector);
  }
}
