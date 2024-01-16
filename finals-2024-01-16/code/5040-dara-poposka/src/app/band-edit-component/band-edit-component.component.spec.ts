import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandEditComponentComponent } from './band-edit-component.component';

describe('BandEditComponentComponent', () => {
  let component: BandEditComponentComponent;
  let fixture: ComponentFixture<BandEditComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BandEditComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BandEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
