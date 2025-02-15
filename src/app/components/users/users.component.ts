import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/users/user.service';
import { NgIf, NgFor } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  @ViewChild('closebutton') closebutton: any;
  @ViewChild('closeDeleteModel') closeDeleteModel: any;

  userList: any;
  userError: string = '';

  createUserForm!: FormGroup;
  deleteUserData: any;
  updateUserData: any;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.createFormFn();
  }

  createFormFn() {
    this.createUserForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  };

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        if (response?.users.length) {
          this.userList = response?.users;
          this.userError = '';
        } else {
          this.userError = 'No record found!';
        }
      },
      error: (err) => {
        this.userError = err?.error?.message;
        console.log(err);
      }
    })
  }

  refreshFn() {
    this.getUsers();
  }

  openCreateModal() {
    this.createFormFn();
    if (this.updateUserData) {
      this.updateUserData = '';
    }
  }

  onCreateUser() {
    if (this.createUserForm.valid) {
      console.log(this.createUserForm.value);

      this.userService.create(this.createUserForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.getUsers();
          this.closebutton.nativeElement.click();
        },
        error: (err) => {
          alert(err?.error?.message);
          console.log(err);
        }
      })
    }
  }

  deleteUserModel(user: any) {
    this.deleteUserData = user;
  }

  deleteUser() {
    this.userService.delete(this.deleteUserData?._id).subscribe({
      next: (response) => {
        console.log(response);
        this.getUsers();
        this.closeDeleteModel.nativeElement.click();
      },
      error: (err) => {
        alert(err?.error?.message);
        console.log(err);
      }
    })
  }

  editUserModel(data: any) {
    this.updateUserData = data;
    this.createUserForm.patchValue(data);
  }

  updateUser() {
    let editRequestData = this.createUserForm.value;
    if (editRequestData) delete editRequestData.password;

    if (editRequestData.name && editRequestData.email) {
      this.userService.update(editRequestData, this.updateUserData._id).subscribe({
        next: (response) => {
          this.getUsers();
          alert(`${response.email} user updated successfully`);
          this.closebutton.nativeElement.click();
        },
        error: (err) => {
          alert(err?.error.message);
        }
      })
    }
  }

}
