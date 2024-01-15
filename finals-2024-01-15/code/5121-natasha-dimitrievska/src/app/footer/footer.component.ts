import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <p style="border: dashed 1px blue;">
      Natasha Dimitrievska - 5121
      <br />
      {{student?.id}} - {{student?.name}}
    </p>
    <p>&copy; {{ currentYear }} Your Name (Your ID) | <a routerLink="/about">About</a></p>
  `,
  styles: [],
})
export class FooterComponent {
  @Input() student: any;

  currentYear: number = new Date().getFullYear();
}
