import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandDetailsComponentComponent } from './band-details-component.component';

describe('BandDetailsComponentComponent', () => {
  let component: BandDetailsComponentComponent;
  let fixture: ComponentFixture<BandDetailsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BandDetailsComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BandDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
