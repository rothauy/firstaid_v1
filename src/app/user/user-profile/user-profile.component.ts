import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/authentication/auth.service';
import { UserData } from '../user.model';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { SignupComponent } from 'src/app/authentication/signup/signup.component';
import { AuthData } from 'src/app/authentication/auth.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  userProfile: UserData;
  userAuth: AuthData;

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.authService.getUserProfile()
    .subscribe( response => {
      this.userProfile = {
        ...response.userProfile,
        id: response.userProfile._id
      }
      this.userAuth = {
        ...response.userAuth,
        id: response.userAuth._id
      }
    });
    setTimeout( () => {
      this.formInit();
    }, 1000);  
  }

  formInit() {
    this.form = new FormGroup({
      firstName: new FormControl(this.userProfile.firstName, {
        validators: [Validators.required, Validators.minLength(1)]}),
      lastName: new FormControl(this.userProfile.lastName, {
        validators: [Validators.required, Validators.minLength(1)]}),
      email: new FormControl(this.userProfile.email, {
        validators: [Validators.required, Validators.email]}),
      password: new FormControl("*********", {
        validators: [
          Validators.required, 
          Validators.minLength(8)]}),
      phoneNumber: new FormControl(this.userProfile.phoneNumber, {
        validators: [Validators.required]}),
      address: new FormControl(this.userProfile.address, {
        validators: [Validators.required, Validators.minLength(3)]}),
      city: new FormControl(this.userProfile.city, {
        validators: [Validators.required, Validators.minLength(3)]}),
      state: new FormControl(this.userProfile.state, {
        validators: [Validators.required, Validators.minLength(2)]}),
      zipCode: new FormControl(this.userProfile.zipCode, {
        validators: [Validators.required]}),
      dateOfBirth: new FormControl(new Date (this.userProfile.dateOfBirth).toISOString().substr(0, 10), {
        validators: [Validators.required]}),
      gender: new FormControl(this.userProfile.gender, {
        validators: [Validators.required]}),
    });
    this.form.disable();
    this.isLoading = false;
  }

  onEdit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      authData: this.userAuth,
      userData: this.userProfile}; 
    this.dialog.open(SignupComponent, dialogConfig);
  }


}
