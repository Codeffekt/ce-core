import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from '../utils/Utils';

@Pipe({ name: 'calendarDate' })
export class CalendarDatePipe implements PipeTransform {

  transform(time: number, args?: number): string {
    return Utils.getCalendarDate(time);
  }
}

