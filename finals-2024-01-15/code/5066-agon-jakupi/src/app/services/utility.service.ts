

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  getOscars(oscars: { [key: string]: string }): string {
    if (!oscars) return '';
    return Object.entries(oscars).map(([type, recipient]) => `${type}: ${recipient}`).join(', ');
  }
}
