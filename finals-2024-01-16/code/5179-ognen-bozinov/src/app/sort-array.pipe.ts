import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortArray'
})
export class SortArrayPipe implements PipeTransform {
  transform(array: any[], key: string): any[] {
    if (!array || array.length === 0) {
      return array;
    }

    return array.sort((a, b) => {
      const valueA = a[key].toLowerCase();
      const valueB = b[key].toLowerCase();

      if (valueA < valueB) {
        return -1;
      } else if (valueA > valueB) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
