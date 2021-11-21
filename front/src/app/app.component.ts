import { Component } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public _router: Router){}
  title = 'frontend'
}
