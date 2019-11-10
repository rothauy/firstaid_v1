import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Wound } from '../../wound.model';

@Component({
  selector: 'app-wound-item',
  templateUrl: './wound-item.component.html',
  styleUrls: ['./wound-item.component.css']
})
export class WoundItemComponent implements OnInit {
  @Input() wound: Wound;
  @Output() woundSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSelected(){
    this.woundSelected.emit();
  }

}
