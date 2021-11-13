import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `

    <button (click)="addHero()">Add</button>

    <ul><li *ngFor="let hero of heroes">{{hero}}</li></ul>
  `
})
export class LittleTourComponent {
  heroes = [''];
  addHero() {
    this.heroes.push('value from backend');
  }
}
