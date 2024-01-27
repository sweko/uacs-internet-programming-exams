import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceListComponent } from './place.component';

describe('PlaceComponent', () => {
  let component: PlaceListComponent;
  let fixture: ComponentFixture<PlaceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaceListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
