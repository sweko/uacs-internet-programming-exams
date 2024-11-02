import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeTransform',
})
export class TimeTransformPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (!value || value <= 0 || value == undefined) {
      return '0 minutes';
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${
        minutes > 1 ? 's' : ''
      }`;
    } else {
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
  }
}
