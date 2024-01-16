import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandStatisticsComponent } from './band-statistics.component';

describe('BandStatisticsComponent', () => {
  let component: BandStatisticsComponent;
  let fixture: ComponentFixture<BandStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BandStatisticsComponent]
    });
    fixture = TestBed.createComponent(BandStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
