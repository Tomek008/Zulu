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

}
