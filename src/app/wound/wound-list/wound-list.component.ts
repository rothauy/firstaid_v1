import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Wound } from '../wound.model';
import { Subscription } from 'rxjs';
import { WoundService } from '../wound.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { WoundCreateComponent } from '../wound-create/wound-create.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-wound-list',
  templateUrl: './wound-list.component.html',
  styleUrls: ['./wound-list.component.css']
})
export class WoundListComponent implements OnInit, OnDestroy {
  @Output() woundWasSelected = new EventEmitter<Wound>();

  wounds: Wound[] = []
  private woundsSub: Subscription;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(
    private authService: AuthService,
    public woundsService: WoundService, 
    private dialog: MatDialog, 
    public router: Router) { }

  ngOnInit() {
    this.woundsService.getWounds();
    this.woundsSub = this.woundsService.getWoundUpdateListener()
      .subscribe( (wounds: Wound[]) => {
        this.wounds = wounds;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.woundsSub.unsubscribe();
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(WoundCreateComponent,dialogConfig);
  }

  onWoundSelected(wound: Wound){
    this.woundWasSelected.emit(wound);
  }

}
