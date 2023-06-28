import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post<LoginResponse>('https://reqres.in/api/login', loginData).subscribe(
      response => {
        console.log(response);

        if (this.rememberMe) {
          localStorage.setItem('token', response.token);
          // Remember user's token
        }
      },
      error => {
        console.error(error);
      }
    );
  }
}
