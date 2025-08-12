import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DoctorsService } from '../../../services/doctors/doctors.service';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  doctorId: string | null = null;
  doctorData: any
  errorResponse: string | null = null

  constructor(
    private activatedRoute: ActivatedRoute,
    private docterService: DoctorsService
  ) { }

  ngOnInit(): void {
    console.log('Method not implemented.');

    this.activatedRoute.paramMap.subscribe((params) => {
      this.doctorId = params.get('id')
      this.getDoctor(this.doctorId);
    })
  }

  getDoctor(id: any) {
    this.docterService.getDoctorById(id).subscribe({
      next: (response) => {
        this.doctorData = response?.doctor;
        console.log(response?.doctor);
      },
      error: (err) => {
        this.errorResponse = err?.message;
      }
    });
  }

}