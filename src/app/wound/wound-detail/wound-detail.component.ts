import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Wound } from '../wound.model';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { WoundCreateComponent } from '../wound-create/wound-create.component';
import { WoundService } from '../wound.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-wound-detail',
  templateUrl: './wound-detail.component.html',
  styleUrls: ['./wound-detail.component.css']
})
export class WoundDetailComponent implements OnInit, OnDestroy {
  @Input() wound: Wound;
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;
  userRole: string;
  
  constructor(
    public woundsService: WoundService,
    private dialog: MatDialog,
    public router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe( isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    setTimeout(() => {
      this.userRole = this.authService.getUserRole();
      console.log(this.userRole);
    }, 500);
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onEdit(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = this.wound;
    this.dialog.open(WoundCreateComponent,dialogConfig);
  }

  onDelete(){
    this.woundsService.deleteWound(this.wound.id);
  }

}
