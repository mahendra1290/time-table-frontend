import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { periodTimings } from 'src/assets/period-timing';
import { MultiSelectComponent } from '../multi-select/multi-select.component';
import * as moment from 'moment';
import { PeriodsService } from '../periods.service';
import { Period } from '../models/period';
import { groupBy } from 'rxjs/operators';
import { UserSettingsService } from '../user-settings.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface SubjectPeriod {
  periodNo: string;
  day: string;
  meetLink: string;
  sections: string[];
}
@Component({
  selector: 'app-add-period',
  templateUrl: './add-period.component.html',
  styleUrls: ['./add-period.component.css'],
})
export class AddPeriodComponent implements OnInit, AfterViewInit {
  addingPeriodLoading: boolean = false;

  subjectPeriods: SubjectPeriod[] = [];

  subjectform = this.fb.group({
    subjectCode: [''],
    subjectName: ['', Validators.required],
    meetLink: ['', Validators.required],
    facultyName: [''],
    branch: ['', Validators.required],
    semester: ['', Validators.required],
    period: this.fb.group({
      periodNo: ['', Validators.required],
      day: ['0', Validators.required],
      meetLink: ['', Validators.required],
      sections: [''],
    }),
  });

  @ViewChild('section_multiselect')
  sectionSelector: MultiSelectComponent | null = null;

  days = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri'];

  periodTimings = periodTimings;

  periodNumbers = periodTimings.map(
    (p) => `${p.periodNumber} (${p.startTime} - ${p.endTime})`
  );

  timings = ['8:30 AM'];

  selectedDay: number = 0;

  selectedBranchCode?: string = '';

  constructor(
    private periodsService: PeriodsService,
    private fb: FormBuilder,
    private userSettings: UserSettingsService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subjectform.get('meetLink')?.valueChanges.subscribe((val) => {
      3;
      this.subjectform.get('period.meetLink')?.setValue(val);
    });
    this.userSettings.userBranch.subscribe((branch) => {
      this.subjectform.get('branch')?.setValue(branch?.label);
      this.selectedBranchCode = branch?.code;
      this.subjectform
        .get('branch')
        ?.disable({ onlySelf: true, emitEvent: false });
    });
    this.userSettings.userSem.subscribe((sem) => {
      this.subjectform.get('semester')?.setValue(sem);
      this.subjectform.get('semester')?.disable();
    });
  }

  ngAfterViewInit(): void {
    // console.log(this.sectionSelector);
  }

  toggleDay(day: number) {
    this.selectedDay = day;
    this.subjectform.get('period.day')?.setValue(day);
  }

  /**
   * Returns start time and end time from period no string
   * @param periodNo period timing string of format hh:mm:a|hh:mm:a
   * @returns [number, number] tuple of start time and endtime
   */
  getStartTimeEndTime(periodNo: string): [number, number] {
    let st = periodNo.split('|')[0];
    let et = periodNo.split('|')[1];
    let startTime: moment.Moment = moment(st, 'hh:mm a');
    let endTime: moment.Moment = moment(et, 'HH:mm a');
    let startTimeInMinutes = startTime.hours() * 60 + startTime.minutes();
    let endTimeInMinutes = endTime.hours() * 60 + endTime.minutes();
    return [startTimeInMinutes, endTimeInMinutes];
  }

  addPeriod() {
    const periodNo = this.subjectform.get('period.periodNo')?.value;
    const day = this.subjectform.get('period.day')?.value;
    const meetLink = this.subjectform.get('period.meetLink')?.value;
    const sections = this.subjectform.get('period.sections')?.value.split(',');
    const globalMeetLink = this.subjectform.get('meetLink')?.value;

    this.subjectform.get('period')?.reset({ meetLink: globalMeetLink });

    this.subjectPeriods.push({
      periodNo: periodNo,
      day: this.days[day],
      meetLink: meetLink,
      sections: sections || [],
    });
  }

  removePeriod(index: number) {
    this.subjectPeriods = this.subjectPeriods.filter((_, ind) => ind != index);
  }

  addSubject() {
    this.addingPeriodLoading = true;
    const subject = this.subjectform.get('subjectName')?.value;
    const branch = this.selectedBranchCode;
    const sem = this.subjectform.get('semester')?.value;
    const periods: Period[] = [];
    for (const period of this.subjectPeriods) {
      const [startTimeInMinutes, endTimeInMinutes] = this.getStartTimeEndTime(
        period.periodNo
      );
      periods.push({
        startTime: startTimeInMinutes,
        endTime: endTimeInMinutes,
        subject: subject,
        meetLink: period.meetLink,
        branch: branch,
        semester: sem,
        sections: period.sections,
        day: this.days.findIndex((day) => day == period.day),
      });
    }
    this.periodsService
      .addPeriod(periods)
      .then((data) => {
        this.addingPeriodLoading = false;
        this.snackbar.open('Subject added successfully', '', {
          duration: 2000,
        });
        this.subjectform.reset();
        this.subjectPeriods = [];
      })
      .catch((err) => {
        this.snackbar.open('Something went wrong', '', { duration: 2000 });
        this.addingPeriodLoading = false;
      });
  }
}
