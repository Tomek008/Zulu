import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export interface LoginForm {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(loginForm: LoginForm){
    return this.http.post<any>('http://localhost:3000/auth/login', {username: loginForm.username, password: loginForm.password}).pipe(
      map((token) => {
    localStorage.setItem('blog-token', token.access_token);
    return token;

    }))
  }

}
