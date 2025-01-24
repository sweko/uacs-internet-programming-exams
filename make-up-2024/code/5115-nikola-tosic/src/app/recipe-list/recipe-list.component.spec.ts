import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeListComponent } from './recipe-list.component';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeListComponent]
      // Include any necessary testing modules, mocks, etc.
    }).compileComponents();
    
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format time correctly', () => {
    // Example test for the formatTime method
    expect(component.formatTime(90)).toEqual('1 hours 30 minutes');
    expect(component.formatTime(45)).toEqual('45 minutes');
    // Add more test cases as needed
  });
});
