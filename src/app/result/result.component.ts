import { Component, OnInit, Input } from '@angular/core';
import { WoundService } from '../wound/wound.service';
import { Wound } from '../wound/wound.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  wound: Wound;

  constructor(public woundService: WoundService) { }

  ngOnInit() {
  }

  
}
