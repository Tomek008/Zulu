import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  public static newString: string = "";

  public text: string = "";
  public myList: ListComponent;
  public desc: string = "";
  public edit: boolean = false;
  public newText: any;
  public newDesc: any;
  public nameChanged: any;

  constructor(myList : ListComponent) {
    this.myList = myList;
    this.text = TaskComponent.newString;
    TaskComponent.newString = "";
    myList.items.push(this);
  }

  ngOnInit(): void {
  }

  getText(){
    return this.text;
  }

  editTask(){
    this.text = this.newText;
    this.desc = this.newDesc;
    this.edit = false;
  }

  deleteTask(){
    this.myList.deleteTaskFromList(this.text);
  }
}
