import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-doctor',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css']
})
export class CreateDoctorComponent implements OnInit {

  imageSrc: any = '';

  days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  timeSlots: string[] = [
    '7AM', '8AM', '9AM', '10AM', '11AM', '12PM',
    '1PM', '2PM', '3PM', '4PM', '5PM', '6PM',
    '7PM', '8PM', '9PM'
  ];

  availability: { [key: string]: { from: string; to: string } } = {};

  constructor() {
    this.days.forEach(day => {
      this.availability[day] = { from: '', to: '' };
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

}
