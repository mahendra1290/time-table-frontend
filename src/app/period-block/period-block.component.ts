import { Clipboard } from '@angular/cdk/clipboard';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Period } from '../models/period';

@Component({
  selector: 'app-period-block',
  templateUrl: './period-block.component.html',
  styleUrls: ['./period-block.component.css'],
})
export class PeriodBlockComponent implements OnInit {
  @Input()
  showEditDelete: boolean = false;

  @Input()
  period!: Period;

  @Input()
  currentTimeInMinutes = 0;

  @Input()
  currentDay: number = 0;

  timer!: any;

  hovered: boolean = false;

  state: string = 'display';

  inputDisplayState: string = 'none';

  currentTime = moment();

  @Output()
  edit: EventEmitter<Period> = new EventEmitter();

  @Output()
  delete: EventEmitter<string> = new EventEmitter();

  constructor(private snackBar: MatSnackBar, private clipboard: Clipboard) {}

  updatePeriod() {
    this.edit.emit(this.period);
    this.state = 'display';
  }

  enterEditState() {
    this.state = 'edit';
    this.inputDisplayState = 'block';
  }

  copyLink() {
    this.clipboard.copy(this.period.meetLink);
    this.snackBar.open('Link copied to clipboard', undefined, {
      duration: 2000,
    });
  }
  animend() {
    if (this.state == 'edit') {
      this.inputDisplayState = 'block';
    } else {
      this.inputDisplayState = 'none';
    }
  }

  ngOnInit(): void {}
}
