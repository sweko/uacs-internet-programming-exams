import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandCountryComponent } from './band-country.component';

describe('BandCountryComponent', () => {
  let component: BandCountryComponent;
  let fixture: ComponentFixture<BandCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BandCountryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BandCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
