import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyvalue',
})
export class KeyValuePipe implements PipeTransform {
  transform(value: any): any[] {
    return Object.entries(value).map(([key, value]) => ({ key, value }));
  }
}