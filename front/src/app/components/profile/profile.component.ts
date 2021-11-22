import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  board: Board = new Board('Nazwa Tablicy', [
    new Column('To Do', [
      "Wyświetlanie tablic",
      "Dodanie nowej tablicy",
      "Wyświetlanie tablicy",
      "Wyświetlanie listy na tablicy",
      "Wyświetlanie karty na liście",
      "Edycja nazwy tablicy"
    ]),
    new Column('Work in Progress', [
      'Uwierzytelnianie'
    ]),
    new Column('Done', [
    ])
  ]);

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


}
