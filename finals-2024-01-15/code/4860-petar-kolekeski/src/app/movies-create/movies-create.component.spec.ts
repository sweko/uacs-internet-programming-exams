import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesCreateComponent } from './movies-create.component';

describe('MoviesCreateComponent', () => {
  let component: MoviesCreateComponent;
  let fixture: ComponentFixture<MoviesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
