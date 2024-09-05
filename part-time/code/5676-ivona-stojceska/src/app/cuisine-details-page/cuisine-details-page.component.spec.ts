import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineDetailsPageComponent } from './cuisine-details-page.component';

describe('CuisineDetailsPageComponent', () => {
  let component: CuisineDetailsPageComponent;
  let fixture: ComponentFixture<CuisineDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CuisineDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuisineDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
