import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserHistory } from '../user.history.model';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit, OnDestroy {
  isLoading = true;
  histories: UserHistory[] = [];
  private historiesSub: Subscription;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.isLoading = true;
    this.userService.getHistories();
    this.historiesSub = this.userService.getHistoryUpdateListener()
      .subscribe((histories: UserHistory[]) => {
        this.isLoading = false;
        this.histories = histories;
      }); 
  }

  ngOnDestroy() {
    this.historiesSub.unsubscribe();
  }

  onDelete(id: string){
    this.userService.deleteHistory(id);
  }

}
