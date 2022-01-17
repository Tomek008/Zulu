import { Component, Inject, Injectable, OnInit, Optional } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgForm } from '@angular/forms';
import { Board } from '../models/board.model';
import { BoardComponent } from '../components/board/board.component';
import { TaskComponent } from '../task/task.component';
 
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

@Injectable()
export class ListComponent implements OnInit {
 
  items: TaskComponent[] = [];
  tasks: number[] = [];
  public counter: number = 0;
  public id : Number = 0;
  public profile : BoardComponent;

  constructor(profile : BoardComponent) {
    this.profile = profile;
    this.id = Math.floor(Math.random() * (10000 - 1)) + 1;
    this.profile.list.push(this);
  }
 
  ngOnInit(): void {
  }
 
  drop(event: CdkDragDrop<any>) {
    console.log("DROPPED");
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
    
    console.log(event.container.data);
  }
 
  onSubmit(newItemForm: NgForm) {
    TaskComponent.newString = newItemForm.value.newItem;
    if(TaskComponent.newString ==""){
      return;
    }
    newItemForm.reset();
    this.tasks.push(this.counter);
    this.counter++;
  }

  delete(){
    this.profile.deleteList(this);
  }

  deleteTaskFromList(text: string){
    let counter = 0;
    let idx = -1;
    this.items.forEach(element => {
      if(element.text == text){
        idx = counter;
      }
      counter++;
    });

    if(idx > -1){
      this.items.splice(idx, 1);
      this.tasks.splice(idx, 1);
    }
  }
}