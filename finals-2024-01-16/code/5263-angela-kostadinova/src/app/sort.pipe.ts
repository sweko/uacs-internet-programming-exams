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

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        // Case-insensitive string comparison
        return valueA.localeCompare(valueB) * factor;
      } else {
        // Numeric or other types comparison
        return (valueA - valueB) * factor;
      }
    });
  }
}
