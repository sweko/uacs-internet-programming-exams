import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | undefined, limit: number = 100): string {
    if (!value || value == undefined) {
      return '';
    }

    if (value.length <= limit) {
      return value;
    }

    const words = value.split(' ');
    let truncatedText = '';
    for (let i = 0; i < words.length; i++) {
      if (truncatedText.length + words[i].length + 1 > limit) {
        break;
      }
      truncatedText += words[i] + ' ';
    }

    return truncatedText + '...';
  }
}
