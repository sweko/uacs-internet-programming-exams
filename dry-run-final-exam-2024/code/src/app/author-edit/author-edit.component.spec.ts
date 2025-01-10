import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorEditComponent } from './author-edit.component';

describe('AuthorEditComponent', () => {
  let component: AuthorEditComponent;
  let fixture: ComponentFixture<AuthorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
