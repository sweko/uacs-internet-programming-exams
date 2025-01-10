import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorCreateComponent } from './author-create.component';

describe('AuthorCreateComponent', () => {
  let component: AuthorCreateComponent;
  let fixture: ComponentFixture<AuthorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
