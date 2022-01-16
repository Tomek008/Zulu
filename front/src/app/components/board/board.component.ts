import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { ListComponent } from 'src/app/list/list.component';

@Component({
  selector: 'app-profile',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public lists : number[] = []
  public counter : number = 0;
  public list : ListComponent[] = [];
  public namess:any;
  public str:any;
  public nameChanged:any;
  edit = false;

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

  constructor() {

  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<any>) {
    console.log("DROPPED BOARD");
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  changeBoardName() {
    this.namess = this.str;
    this.board.name = this.str;
    this.nameChanged = true;
    this.edit = false;
    // TUTAJ DODAĆ REQUEST DO BACKENDU NA ZMIANĘ NAZWY TABLICY W BAZIE
  }  

  removeColumn(i:any) {
    this.board.columns.splice(i,1);
  }

  addList() {  
    this.lists.push(this.counter);
    this.counter++;
  }

  deleteList(toDelete:ListComponent){
    const index = this.list.indexOf(toDelete, 0);
    if(index > - 1){
      this.list.splice(index, 1);
      this.lists.splice(index, 1);
    }
    console.log(this.lists.length);
  }

}
