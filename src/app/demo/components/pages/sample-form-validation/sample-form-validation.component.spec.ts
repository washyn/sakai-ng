import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleFormValidationComponent } from './sample-form-validation.component';

describe('SampleFormValidationComponent', () => {
  let component: SampleFormValidationComponent;
  let fixture: ComponentFixture<SampleFormValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleFormValidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SampleFormValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
