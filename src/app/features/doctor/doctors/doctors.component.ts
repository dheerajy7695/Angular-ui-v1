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
    this.loadDoctors();
    // this.getAllDoctors();
  }

  loadDoctors() {
    this.doctorsService.getDoctors().subscribe(response => {
      if (!response || !Array.isArray(response)) {
        console.error('No doctors data found');
      } else {
        this.doctors = response || [];
        this.getAllDoctors();
      }
    });
  }

  getAllDoctors() {
    this.doctorsService.getAllDoctors().subscribe(response => {
      if (!response) {
        console.error('No doctors data found');
      } else {
        this.doctors.push(response.doctors[0]);
        console.log('Doctors loaded:', this.doctors);
      }
    });
  }

  editDoctor(doctor: any): void {
    console.log('Editing doctor:', doctor);
  }


  viewDoctor(doctor: any): void {
    console.log('Viewing doctor:', doctor);
  }


  deleteDoctor(doctor: any): void {
    console.log('Deleting doctor:', doctor);
  }

  addDoctor() {
    this.router.navigate(['/doctors/create']);
    console.log('Navigating to create doctor page');
  }

  searchDoctors(): void {
    console.log('Searching doctors with query:');
  }

  refreshDoctors(): void {
    console.log('Searching doctors wit:');
  }

  exportDoctors(): void {
    console.log('Searching doctors wit:');
  }

  onSearch(): void {
    console.log('Searching doctors with query:');
    // Implement search logic here
  }
}
