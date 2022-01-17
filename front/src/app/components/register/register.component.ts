import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router) { 
      this.registerForm = this.formBuilder.group({
        username: [null, [Validators.required, Validators.minLength(3)]],
        password: [null, [Validators.required, Validators.minLength(3)]],
        passwordConfirm: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.minLength(3)]],
      })
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if(this.registerForm.invalid)
    {
      return;
    }
    
    this.authService.register(this.registerForm.value).pipe(
      map(token => this.router.navigate(['login']))).subscribe();
      console.log(this.registerForm.value);
  }

}
