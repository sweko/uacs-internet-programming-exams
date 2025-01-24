import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecipieComponent } from './create-recipie.component';

describe('CreateRecipieComponent', () => {
  let component: CreateRecipieComponent;
  let fixture: ComponentFixture<CreateRecipieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRecipieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRecipieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
