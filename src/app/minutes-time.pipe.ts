import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'minutesTime',
})
export class MinutesTimePipe implements PipeTransform {
  convertToTime(timeInMinutes: number): string {
    var h = (timeInMinutes / 60) | 0,
      m = timeInMinutes % 60 | 0;
    return moment.utc().hours(h).minutes(m).format('hh:mm A');
  }

  transform(value: number): string {
    return this.convertToTime(value);
  }
}
