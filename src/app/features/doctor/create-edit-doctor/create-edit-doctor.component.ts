import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormErrorComponent } from '../../../shared/form-error/form-error.component';
import { DoctorsService } from '../../../services/doctors/doctors.service';
import { COUNTRY_NAMES } from '../../../../../public/assets/data/country-data'; // adjust path as needed


@Component({
  selector: 'app-create-doctor',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './create-edit-doctor.component.html',
  styleUrls: ['./create-edit-doctor.component.css']
})
export class CreateEditDoctorComponent implements OnInit {

  countries = COUNTRY_NAMES;
  doctorForm!: FormGroup;
  imageSrc: string | ArrayBuffer | null = null;
  submitted: boolean = false;
  isEdit: boolean = false;
  doctorId: string | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  days: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  timeSlots: string[] = ['7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private doctorService: DoctorsService
  ) { }

  initializeForm() {
    const availabilityGroup: { [key: string]: FormGroup } = {};
    this.days.forEach(day => { availabilityGroup[day] = this.fb.group({ from: [''], to: [''] }) });

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

  getDoctorNPatch(id: string): void {
    this.doctorService.getDoctorById(id).subscribe({
      next: (response) => {
        if (this.doctorForm && response.doctor) {
          this.doctorForm.patchValue({
            ...response.doctor,
            firstName: response.doctor.firstName,
            lastName: response.doctor.lastName,
            dob: response.doctor.dob ? response.doctor.dob.substring(0, 10) : '',
            gender: response.doctor.gender,
            email: response.doctor.email,
            mobile: response.doctor.mobile,
            maritalStatus: response.doctor.maritalStatus,
            qualification: response.doctor.qualification,
            designation: response.doctor.designation,
            bloodGroup: response.doctor.bloodGroup,
            createId: response.doctor.createId,
            address: response.doctor.address,
            country: response.doctor.country,
            state: response.doctor.state,
            city: response.doctor.city,
            postalCode: response.doctor.postalCode,
            bio: response.doctor.bio,
            username: response.doctor.username,
            image: response.doctor.image || ''
          });

          const availabilityForm = this.doctorForm.get('availability') as FormGroup;
          this.days.forEach(day => {
            if (response.doctor.availability?.[day]) {
              availabilityForm.get(day)?.patchValue({
                from: response.doctor.availability[day].from || '',
                to: response.doctor.availability[day].to || ''
              });
            }
          });

          this.imagePreview = response.doctor.image || '';

          this.doctorForm.get('password')?.clearValidators();
          this.doctorForm.get('confirmPassword')?.clearValidators();
          this.doctorForm.get('password')?.updateValueAndValidity();
          this.doctorForm.get('confirmPassword')?.updateValueAndValidity();
        }
      },
      error: (err) => {
        console.error('Error fetching doctor', err);
      }
    });
  }

  ngOnInit(): void {
    this.initializeForm();

    this.route.paramMap.subscribe(params => {
      this.doctorId = params.get('id');
      if (this.doctorId) {
        this.isEdit = true;
        this.getDoctorNPatch(this.doctorId);
      }
    });
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.doctorForm.patchValue({ image: base64 });
      this.imagePreview = base64;
    };
    reader.readAsDataURL(file);
  }

  cancel() {
    this.router.navigate(['/doctors']);
  }

  onSubmit() {
    this.submitted = true;
    if (this.doctorForm.valid) {
      const formValue = this.doctorForm.value;

      if (this.isEdit && this.doctorId) {
        if (formValue?.password) delete formValue.password;
        if (formValue?.confirmPassword) delete formValue.confirmPassword;

        this.doctorService.update(formValue, this.doctorId).subscribe({
          next: (response) => {
            this.submitted = false;
            console.log('Doctor updated successfully', response);
            this.router.navigate(['/doctors']);
          },
          error: (error) => {
            alert('Error updating doctor: ' + error?.error?.message);
            this.submitted = false;
            console.error('Error updating doctor', error);
          }
        });
      } else {
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
      }
    } else {
      Object.values(this.doctorForm.controls).forEach(control => { control.markAsTouched() });
      return;
    }
  }

}