import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditDoctorComponent } from './create-edit-doctor.component';

describe('CreateEditDoctorComponent', () => {
  let component: CreateEditDoctorComponent;
  let fixture: ComponentFixture<CreateEditDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
