import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngridientsListComponent } from './ingridients-list.component';

describe('IngridientsListComponent', () => {
  let component: IngridientsListComponent;
  let fixture: ComponentFixture<IngridientsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngridientsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngridientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
