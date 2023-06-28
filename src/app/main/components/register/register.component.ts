import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegisterFormData } from '../../interfaces/register-form-data';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  users: User[] = [];
  newEmail: string ='';
  newPassword: string='';
  newConfirmPassword: string='';
  newLastName: string='';
  newFirstName: string=''; 
  isAddingUser = false;

  constructor(private userService: UserService, private notificationService: NzNotificationService) {}

  ngOnInit(): void {
    this.getListOfUsers();
  }

  getListOfUsers(){
    this.userService.getListOfUsers().subscribe({
      next: (res)=>{
        this.users = res;
      },
      error: (err)=>{
        this.users =[];
        this.notificationService.error("Error","Something went wrong!");
      },
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword').setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword').setErrors(null);
    }
  }

  addNewUser(){
    this.isAddingUser = true;
    this.userService
      .createNewUser(this.newEmail, this.newPassword, this.newConfirmPassword, this.newLastName, this.newFirstName)
      .subscribe({
        next: (res) =>{
          this.isAddingUser = false;
          this.notificationService.success('Success', 'Added new user!');
          this.getListOfUsers();
        },
        error: (err)=>{
          this.isAddingUser = false;
          this.notificationService.error("Error","Something went wrong!");
        }
      });
  }
///-------
////kkkk
    
}
