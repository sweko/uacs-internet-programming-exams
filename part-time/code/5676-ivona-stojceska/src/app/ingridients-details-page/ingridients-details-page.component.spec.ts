import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngridientsDetailsPageComponent } from './ingridients-details-page.component';

describe('IngridientsDetailsPageComponent', () => {
  let component: IngridientsDetailsPageComponent;
  let fixture: ComponentFixture<IngridientsDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngridientsDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngridientsDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
