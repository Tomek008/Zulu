import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BOARDNAMES } from 'src/app/models/hardcodedBoards.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor() { }
  boardnames = BOARDNAMES;
  ngOnInit(): void {
  }
  
  edit0 = false;
  edit1 = false;
  edit2 = false;
  edit3 = false;
  edit4 = false;
groupTitle = "";

changeEdit(id:any) {
  if(id == 0)
  {
    this.edit0 = true;
  }
  else if(id == 1)
  
  {
    this.edit1 = true;
  }
  else if(id == 2)
  
  {
    this.edit2 = true;
  }
  else if(id == 3)
  
  {
    this.edit3 = true;
  }
  else if(id == 4)
  
  {
    this.edit4 = true;
  }
}

}
