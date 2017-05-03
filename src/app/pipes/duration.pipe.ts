import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'durationPipe',
  pure: true
})
export class DurationPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let timestamp = '';
    const difference = new Date(value);
    if (difference.getTime() > 0) {
      const days = Math.floor(difference.getTime() / (24  *  60 * 60 * 1000));
      const daysms = difference.getTime() % (24 * 60 * 60 * 1000);
      const hours = Math.floor((daysms) / (60 * 60 * 1000));
      const hoursms = difference.getTime() % (60 * 60 * 1000);
      const minutes = Math.floor((hoursms) / (60 * 1000));
      const minutesms = difference.getTime() % (60 * 1000);
      const seconds = Math.floor((minutesms) / (1000));
      timestamp = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
    }
    return timestamp;
  }
}
