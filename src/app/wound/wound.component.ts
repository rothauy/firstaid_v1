import { Component, OnInit } from '@angular/core';
import { Wound } from './wound.model';

@Component({
  selector: 'app-wound',
  templateUrl: './wound.component.html',
  styleUrls: ['./wound.component.css']
})
export class WoundComponent implements OnInit {
  selectedWound: Wound;

  constructor() { }

  ngOnInit() {
  }

}
