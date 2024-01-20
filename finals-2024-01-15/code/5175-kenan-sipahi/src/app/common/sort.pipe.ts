import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(array: any[], field: string, direction: string = 'asc'): any[] {
    if (!Array.isArray(array) || !field) {
      return array;
    }

    const factor = direction === 'asc' ? 1 : -1;

    return array.sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];

      return valueA > valueB ? factor : valueA < valueB ? -factor : 0;
    });
  }
}