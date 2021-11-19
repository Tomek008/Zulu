import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    return this.http.post<any>('http://localhost:3000/auth/login', {username, password}).pipe(map((token) => {
    localStorage.setItem('blog-token', token.access_token);
    return token;

    }))
  }

}
