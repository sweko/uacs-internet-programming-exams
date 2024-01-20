import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastAddComponent } from './cast-add.component';

describe('CastAddComponent', () => {
  let component: CastAddComponent;
  let fixture: ComponentFixture<CastAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CastAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CastAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
