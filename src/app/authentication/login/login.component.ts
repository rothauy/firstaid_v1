import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  form: FormGroup;

  private authStatusSub: Subscription;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private dialog: MatDialog) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe( authStatus => {
      this.isLoading = false;
    });
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(8)]})
    })
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  onLogin() {
    if (this.form.invalid) {
      return;
    }
    const email = this.form.value.email;
    this.isLoading = true;
    this.authService.login(email.toLowerCase(), this.form.value.password);
    this.router.navigate(['/']);
  }

  onSignUp() {
    const dialogConfig = new MatDialogConfig();
    const setHeight = Math.round(window.outerHeight * .8);
    if (setHeight > 600) {
      dialogConfig.maxHeight = "600px";
    } else {
      dialogConfig.maxHeight = setHeight.toString() + "px";
    }
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(SignupComponent,dialogConfig);
  }

}
