import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { count, first } from 'rxjs';
import { FormErrorComponent } from '../../../shared/form-error/form-error.component';
import { DoctorsService } from '../../../services/doctors/doctors.service';

@Component({
  selector: 'app-create-doctor',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './create-edit-doctor.component.html',
  styleUrls: ['./create-edit-doctor.component.css']
})
export class CreateEditDoctorComponent implements OnInit {

  doctorForm!: FormGroup;
  imageSrc: any = '';
  submitted: boolean = false;

  days: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  timeSlots: string[] = ['7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'];

  constructor(private router: Router,
    private fb: FormBuilder,
    private doctorService: DoctorsService
  ) {
    this.initializeForm();
  }

  initializeForm() {
    const availabilityGroup: { [key: string]: FormGroup } = {};
    this.days.forEach(day => {
      availabilityGroup[day] = this.fb.group({
        from: [''],
        to: ['']
      });
    });

    this.doctorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      maritalStatus: ['', Validators.required],
      qualification: ['', Validators.required],
      designation: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      createId: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      image: [''],
      bio: ['', Validators.required],
      availability: this.fb.group(availabilityGroup),
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]

    });
  }

  ngOnInit(): void {
    this.imageSrc = '';
  }

  uploadImage(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    if (target && target.files && target.files[0]) {
      const file = target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }

  cancel() {
    this.router.navigate(['/doctors']);
  }

  onSubmit() {
    this.submitted = true;
    if (this.doctorForm.valid) {
      console.log('Form Submitted', this.doctorForm.value);

      this.doctorService.create(this.doctorForm.value).subscribe({
        next: (response) => {
          this.submitted = false;
          console.log('Doctor created successfully', response);
          this.router.navigate(['/doctors']);
        },
        error: (error) => {
          alert('Error creating doctor: ' + error?.error?.message);
          this.submitted = false;
          console.error('Error creating doctor', error);
        }
      });
    } else {
      console.error('Form is invalid');
      Object.values(this.doctorForm.controls).forEach(control => { control.markAsTouched() });
      return;
    }
  }

}
