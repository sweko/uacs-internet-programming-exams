import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandAddComponent } from './band-add.component';

describe('BandAddComponent', () => {
  let component: BandAddComponent;
  let fixture: ComponentFixture<BandAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BandAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BandAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});