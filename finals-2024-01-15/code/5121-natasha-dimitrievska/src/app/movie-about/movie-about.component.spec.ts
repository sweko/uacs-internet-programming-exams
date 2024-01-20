import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAboutComponent } from './movie-about.component';

describe('MovieAboutComponent', () => {
  let component: MovieAboutComponent;
  let fixture: ComponentFixture<MovieAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
