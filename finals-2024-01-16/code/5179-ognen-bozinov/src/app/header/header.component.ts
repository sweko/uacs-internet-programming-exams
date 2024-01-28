import { Component, Input } from '@angular/core';
import { Country } from '../models/country';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() country: Country | undefined;

}
