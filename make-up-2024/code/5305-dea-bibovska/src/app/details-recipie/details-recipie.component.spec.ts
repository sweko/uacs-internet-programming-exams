import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRecipieComponent } from './details-recipie.component';

describe('DetailsRecipieComponent', () => {
  let component: DetailsRecipieComponent;
  let fixture: ComponentFixture<DetailsRecipieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsRecipieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsRecipieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
