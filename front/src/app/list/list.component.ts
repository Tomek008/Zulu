import { Component, Inject, Injectable, OnInit, Optional } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgForm } from '@angular/forms';
import { Board } from '../models/board.model';
import { BoardComponent } from '../components/board/board.component';
 
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

@Injectable()
export class ListComponent implements OnInit {
 
  public static list : ListComponent[] = [];
  public static ids_list : Number[] = [];
  items: string[] = [];
  public id : Number = 0;
  public profile : BoardComponent;

  constructor(profile : BoardComponent) {
    this.profile = profile;
    this.id = Math.floor(Math.random() * (10000 - 1)) + 1;
    ListComponent.ids_list.push(this.id);
    console.log(this.id);
  }
 
  ngOnInit(): void {
  }
 
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
 
  onSubmit(newItemForm: NgForm) {
    this.items.push(newItemForm.value.newItem);
    newItemForm.reset();
  }

  delete(test:Number){
    let correct_id = ListComponent.ids_list.indexOf(test);
    console.log(correct_id);
  }
}