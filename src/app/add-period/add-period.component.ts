import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { periodTimings } from 'src/assets/period-timing';
import { MultiSelectComponent } from '../multi-select/multi-select.component';
import * as moment from 'moment';
import { PeriodsService } from '../periods.service';
import { Period } from '../models/period';
import { groupBy } from 'rxjs/operators';

export interface SubjectPeriod {
  periodNo: string,
  day: string,
  meetLink: string,
  sections: string[]
}
@Component({
  selector: 'app-add-period',
  templateUrl: './add-period.component.html',
  styleUrls: ['./add-period.component.css'],
})
export class AddPeriodComponent implements OnInit, AfterViewInit {

  addingPeriodLoading: boolean = false;

  subjectPeriods: SubjectPeriod[] = []

  subjectform = this.fb.group({
    subjectCode: [''],
    subjectName: [''],
    meetLink: [''],
    facultyName: [''],
    branch: [''],
    semester: [''],
    period: this.fb.group({
      periodNo: [''],
      day: ['0'],
      meetLink: [''],
      sections: ['']
    })
  })

  @ViewChild('section_multiselect')
  sectionSelector: MultiSelectComponent | null = null;

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

  timings = ['8:30 AM']

  selectedDay: number = 0;


  constructor(private periodsService: PeriodsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.subjectform.valueChanges.subscribe(val => {
    //   console.log(val);

    // })
    this.subjectform.get('meetLink')?.valueChanges.subscribe(val => {
      3


      this.subjectform.get('period.meetLink')?.setValue(val);
    })
  }

  ngAfterViewInit(): void {
    // console.log(this.sectionSelector);
  }

  toggleDay(day: number) {
    this.selectedDay = day;
    this.subjectform.get('period.day')?.setValue(day)
  }

  addPeriod() {
    let periodNo = this.subjectform.get('period.periodNo')?.value;
    let st = periodNo.split('|')[0];
    let et = periodNo.split('|')[1];

    let startTime: moment.Moment = moment(st, 'hh:mm a');
    let endTime: moment.Moment = moment(et, 'HH:mm a');
    let startTimeInMinutes = startTime.hours() * 60 + startTime.minutes();
    let endTimeInMinutes = endTime.hours() * 60 + endTime.minutes();

    const period: Period = {
      startTime: startTimeInMinutes,
      endTime: endTimeInMinutes,
      subject: this.subjectform.get('subjectName')?.value,
      meetLink: this.subjectform.get('meetLink')?.value,
      day: this.subjectform.get('period.day')?.value,
      sections: this.subjectform.get('period.sections')?.value.split(','),
      branch: this.subjectform.get('branch')?.value,
      semester: this.subjectform.get('semester')?.value
    };

    // this.addingPeriodLoading = true;

    console.log(period);

    this.subjectform.get('period')?.reset({ meetLink: period.meetLink })

    this.subjectPeriods.push({ periodNo: periodNo, day: this.days[period.day], meetLink: period.meetLink, sections: period.sections || [] })

    // this.periodsService.addPeriod(period).then((data) => {
    //   console.log("period added", data);
    //   this.addingPeriodLoading = false;

    // }).catch(err => {
    //   console.log(err);
    //   this.addingPeriodLoading = false;

    // });
  }

  removePeriod(index: number) {
    this.subjectPeriods = this.subjectPeriods.filter((_, ind) => ind != index);
  }

}
