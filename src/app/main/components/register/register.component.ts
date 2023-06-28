import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegisterFormData } from '../../interfaces/register-form-data';
import { Router } from '@angular/router';
import { CustomValidators } from '../../helpers/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.passwordValidator]],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
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

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
  
    const formData: RegisterFormData = this.registerForm.value;
  
    this.http.post('https://reqres.in/api/register', formData)
      .subscribe(response => {
        console.log('Utilizatorul a fost înregistrat cu succes!', response);
        this.router.navigate(['/login']);
      }, error => {
        console.error('A apărut o eroare în timpul înregistrării!', error);
      });
  }  
}
