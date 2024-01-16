import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDetailComponentComponent } from './country-detail-component.component';

describe('CountryDetailComponentComponent', () => {
  let component: CountryDetailComponentComponent;
  let fixture: ComponentFixture<CountryDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryDetailComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
