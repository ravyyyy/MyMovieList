import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string;
  password: string;
  rememberMe: boolean;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post<LoginResponse>('https://reqres.in/api/login', loginData).subscribe( // Use for valid example: eve.holt@reqres.in - cityslicka
      response => {
        console.log(response);

        if (this.rememberMe) {
          localStorage.setItem('token', response.token);
          // Remember user's token
        }

        this.router.navigate(['/table/movies']);
      },
      error => {
        console.error(error);
      }
    );
  }
}
