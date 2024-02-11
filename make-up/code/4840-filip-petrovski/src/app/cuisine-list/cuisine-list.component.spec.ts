import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineListComponent } from './cuisine-list.component';

describe('CuisineListComponent', () => {
  let component: CuisineListComponent;
  let fixture: ComponentFixture<CuisineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuisineListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuisineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
