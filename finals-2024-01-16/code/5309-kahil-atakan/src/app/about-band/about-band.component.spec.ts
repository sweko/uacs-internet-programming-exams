import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBandComponent } from './about-band.component';

describe('AboutBandComponent', () => {
  let component: AboutBandComponent;
  let fixture: ComponentFixture<AboutBandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutBandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
