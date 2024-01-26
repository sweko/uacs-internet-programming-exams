import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandCreateComponentComponent } from './band-create-component.component';

describe('BandCreateComponentComponent', () => {
  let component: BandCreateComponentComponent;
  let fixture: ComponentFixture<BandCreateComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BandCreateComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BandCreateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
