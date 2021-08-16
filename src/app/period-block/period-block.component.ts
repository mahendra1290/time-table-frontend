import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Period } from '../models/period';

@Component({
  selector: 'app-period-block',
  templateUrl: './period-block.component.html',
  styleUrls: ['./period-block.component.css'],
  animations: [
    trigger('openClosed', [
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
        })
      ),
      transition('open => closed', [animate('0.2s ease-in-out')]),
      transition('closed => open', [animate('0.3s 100ms ease-in-out')]),
    ]),
  ],
})
export class PeriodBlockComponent implements OnInit {
  @Input()
  period!: Period;

  hovered: boolean = false;

  state: string = 'display';

  @Output()
  edit: EventEmitter<string> = new EventEmitter();

  @Output()
  delete: EventEmitter<string> = new EventEmitter();

  constructor() {}

  enterEditState() {
    this.state = 'edit';
  }

  ngOnInit(): void {}
}
