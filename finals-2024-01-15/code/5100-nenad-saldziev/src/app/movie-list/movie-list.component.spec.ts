import { ComponentFixture, TestBed } from '@angular/core/testing';

import { movieListComponent } from './movie-list.component';

describe('MovieListComponent', () => {
  let component: movieListComponent;
  let fixture: ComponentFixture<movieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [movieListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(movieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
