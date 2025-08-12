import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../../../services/doctors/doctors.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctors',
  imports: [CommonModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit {
  doctors: any[] = [];

  constructor(private doctorsService: DoctorsService, private router: Router) { }

  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors() {
    this.doctorsService.getAllDoctors().subscribe(response => {
      if (!response) {
        console.error('No doctors data found');
      } else {
        this.doctors = response.doctors || [];
      }
    });
  }

  addDoctor() {
    this.router.navigate(['/doctors/create']);
  }

  editDoctor(doctor: any): void {
    console.log('Editing doctor:', doctor);
    this.router.navigate(['/doctors/edit', doctor._id]);
  }

  deleteDoctor(doctor: any): void {
    this.doctorsService.delete(doctor._id).subscribe({
      next: (response) => {
        if (response) {
          this.getAllDoctors();
        } else {
          alert('Failed to delete doctor');
        }
      },
      error: (err) => {
        alert('An error occurred while deleting the doctor: ' + err.message);
      }
    });
  }

  refreshDoctors() {
    this.getAllDoctors();
  }

  viewDoctor(doctor: any): void {
    this.router.navigate(['/doctors/profile', doctor._id]);
  }

  searchDoctors(): void {
    console.log('Searching doctors with query:');
  }



  exportDoctors(): void {
    console.log('Exporting doctors with filters:');
  }

  onSearch(): void {
    console.log('Searching doctors with query:');
  }
}
