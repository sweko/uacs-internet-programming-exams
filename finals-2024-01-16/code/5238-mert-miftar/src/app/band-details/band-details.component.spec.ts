import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandDetailsComponent } from './band-details.component';

describe('BandDetailsComponent', () => {
  let component: BandDetailsComponent;
  let fixture: ComponentFixture<BandDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BandDetailsComponent]
    });
    fixture = TestBed.createComponent(BandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
