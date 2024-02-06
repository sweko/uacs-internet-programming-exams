import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesEditComponent } from './movies-edit.component';

describe('MoviesEditComponent', () => {
  let component: MoviesEditComponent;
  let fixture: ComponentFixture<MoviesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
