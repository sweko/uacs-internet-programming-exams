import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarComponentComponent } from './navigation-bar-component.component';

describe('NavigationBarComponentComponent', () => {
  let component: NavigationBarComponentComponent;
  let fixture: ComponentFixture<NavigationBarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationBarComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationBarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
