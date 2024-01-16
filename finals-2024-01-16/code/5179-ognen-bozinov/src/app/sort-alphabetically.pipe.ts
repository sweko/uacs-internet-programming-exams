
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortAlphabetically',
})
export class SortAlphabeticallyPipe implements PipeTransform {
  transform(array: string[] | null): string[] | null {
    if (!array) {
      return null;
    }

    return array.slice().sort((a, b) => a.localeCompare(b));
  }
}
