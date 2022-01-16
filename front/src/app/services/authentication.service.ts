import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  password: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(loginForm: LoginForm){
    return this.http.post<any>('http://localhost:3000/api/auth/login', {username: loginForm.username, password: loginForm.password}).pipe(
      map((token) => {
    localStorage.setItem('blog-token', token.access_token);
    return token;

    }))
  }

  register(registerForm: RegisterForm){
    return this.http.post<any>('http://localhost:3000/api/auth/register', {login: registerForm.username, password: registerForm.password, email: registerForm.email})
    console.log("test");
  }


}
