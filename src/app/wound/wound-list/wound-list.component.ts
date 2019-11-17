import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Wound } from '../wound.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wound-list',
  templateUrl: './wound-list.component.html',
  styleUrls: ['./wound-list.component.css']
})
export class WoundListComponent implements OnInit {
  @Output() woundWasSelected = new EventEmitter<Wound>();

  wounds: Wound[] = []
  private woundsSub: Subscription;

  constructor() { }

  ngOnInit() {
  }

  onWoundSelected(wound: Wound){
    this.woundWasSelected.emit(wound);
  }

}
