import { Component, OnInit, Input } from '@angular/core';
import { Wound } from '../wound.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wound-detail',
  templateUrl: './wound-detail.component.html',
  styleUrls: ['./wound-detail.component.css']
})
export class WoundDetailComponent implements OnInit {
  @Input() wound: Wound;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  
  constructor() { }

  ngOnInit() {
  }

}
