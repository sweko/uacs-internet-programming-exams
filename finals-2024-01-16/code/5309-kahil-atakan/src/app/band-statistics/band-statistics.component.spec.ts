import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandStatisticsComponent } from './band-statistics.component';

describe('BandStatisticsComponent', () => {
  let component: BandStatisticsComponent;
  let fixture: ComponentFixture<BandStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BandStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BandStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
