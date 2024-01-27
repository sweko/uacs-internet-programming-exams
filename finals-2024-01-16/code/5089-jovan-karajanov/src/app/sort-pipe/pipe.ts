import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(array: any[], field: string, direction: string): any[] {
    if (!Array.isArray(array) || !field || !direction) {
      return array;
    }

    const multiplier = direction === 'asc' ? 1 : -1;

    return array.sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];

      if (valueA < valueB) {
        return -1 * multiplier;
      } else if (valueA > valueB) {
        return 1 * multiplier;
      } else {
        return 0;
      }
    });
  }
}
