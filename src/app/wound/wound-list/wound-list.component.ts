import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Wound } from '../wound.model';
import { Subscription } from 'rxjs';
import { WoundService } from '../wound.service';

@Component({
  selector: 'app-wound-list',
  templateUrl: './wound-list.component.html',
  styleUrls: ['./wound-list.component.css']
})
export class WoundListComponent implements OnInit, OnDestroy {
  @Output() woundWasSelected = new EventEmitter<Wound>();

  wounds: Wound[] = []
  private woundsSub: Subscription;

  constructor(public woundsService: WoundService) { }

  ngOnInit() {
    this.woundsService.getWounds();
    this.woundsSub = this.woundsService.getWoundUpdateListener()
      .subscribe( (wounds: Wound[]) => {
        this.wounds = wounds;
      })
  }

  ngOnDestroy() {
    this.woundsSub.unsubscribe();
  }

  onWoundSelected(wound: Wound){
    this.woundWasSelected.emit(wound);
  }

}
