import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { SignupComponent } from '../signup/signup.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;

  private authStatusSub: Subscription;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private dialog: MatDialog) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe( authStatus => {
      this.isLoading = false;
    })
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    this.isLoading = true;
    this.authService.login(email.toLowerCase(), form.value.password);
    this.router.navigate(['/']);
  }

  onSignUp() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(SignupComponent,dialogConfig);
  }

}
