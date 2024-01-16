import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandCreateComponent } from './band-create.component';

describe('BandCreateComponent', () => {
  let component: BandCreateComponent;
  let fixture: ComponentFixture<BandCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BandCreateComponent]
    });
    fixture = TestBed.createComponent(BandCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
