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

  period = new FormControl('', Validators.required);

  days = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri'];

  periodTimings = periodTimings;

  sectionOptions = [
    'CS A',
    'CS B',
    'CS 1',
    'CS 2',
    'CS 3',
    'CS 4',
    'CS 5',
    'CS 6',
  ];

  periodNumbers = periodTimings.map(
    (p) => `${p.periodNumber} (${p.startTime} - ${p.endTime})`
  );

  selectedDay: number = 0;

  toggleDay(day: number) {
    this.selectedDay = day;
  }

  addPeriod() {
    let st = this.period.value.split('|')[0];
    let et = this.period.value.split('|')[1];

    let startTime: moment.Moment = moment(st, 'hh:mm a');
    let endTime: moment.Moment = moment(et, 'HH:mm a');
    let startTimeInMinutes = startTime.hours() * 60 + startTime.minutes();
    let endTimeInMinutes = endTime.hours() * 60 + endTime.minutes();

    const period: Omit<Period, '_id'> = {
      startTime: startTimeInMinutes,
      endTime: endTimeInMinutes,
      subject: this.subject.value,
      meetLink: this.meetLink.value,
      day: this.selectedDay,
      sections: Array.from(this.sectionSelector?.selected || []),
    };

    this.periodsService.addPeriod(period).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
  }

  constructor(private periodsService: PeriodsService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log(this.sectionSelector);
  }
}
