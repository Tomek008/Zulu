import { Component } from '@angular/core';
import { HttpServiceService } from './http-service.service';

@Component({
  selector: 'app-root',
  template: `

    <button (click)="addHero()">Add</button>

    <ul><li *ngFor="let hero of heroes">{{hero}}</li></ul>
  `
})
export class LittleTourComponent {

  constructor(private httpService: HttpServiceService) { }
  posts : any;
  heroes = [''];
  addHero() {
    this.httpService.getPost().subscribe(
      (response) => { this.posts = JSON.stringify(response); },
      (error) => { console.log(error); });;
    this.heroes.push(this.posts);
  }
}
