import { Component, OnInit, Input } from '@angular/core';
import { Wound } from '../wound.model';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { WoundCreateComponent } from '../wound-create/wound-create.component';
import { WoundService } from '../wound.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wound-detail',
  templateUrl: './wound-detail.component.html',
  styleUrls: ['./wound-detail.component.css']
})
export class WoundDetailComponent implements OnInit {
  @Input() wound: Wound;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  
  constructor(
    public woundsService: WoundService,
    private dialog: MatDialog,
    public router: Router) { }

  ngOnInit() {
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
