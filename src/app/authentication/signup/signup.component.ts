import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, _countGroupLabelsBeforeOption } from '@angular/material';
import { UserData } from 'src/app/user/user.model';
import { AuthData } from '../auth.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  userData: UserData;
  authData: AuthData;

  private mode = "create";
  private userId: string;
  private authId: string;

  constructor(
    public userService: UserService, 
    public dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]}),
      lastName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]}),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, {
        validators: [
          Validators.required, 
          Validators.minLength(8), 
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$!@#$%^&*?])[A-Za-z\d$!@#$%^&*?].{8,}')]}),
      phoneNumber: new FormControl(null, {
        validators: [Validators.required]}),
      address: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]}),
      city: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]}),
      state: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)]}),
      zipCode: new FormControl(null, {
        validators: [Validators.required]}),
      dateOfBirth: new FormControl(null, {
        validators: [Validators.required]}),
      gender: new FormControl(null, {
        validators: [Validators.required]}),
      registerCode: new FormControl(null, {
        validators: [Validators.required]}),
    });
    if (this.data !== null){
      this.mode = "edit";
      this.userId = this.data.userData.id;
      this.authId = this.data.authData.id;

      this.form.setValue({
        email: this.data.authData.email,
        pass: null,
        firstName: this.data.userData.firstName,
        lastName: this.data.userData.lastName,
        phoneNumber: this.data.userData.phoneNumber,
        address: this.data.userData.address,
        city: this.data.userData.city,
        state: this.data.userData.state,
        zipCode: this.data.userData.zipCode,
        dateOfBirth: this.data.userData.dateOfBirth,
        gender: this.data.userData.gender,
      });
    } else {
      this.mode = "create";
      this.userId = null;
      this.authId = null;
    }
  }

  onSignUp() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.authData = { 
        id: null,
        email: this.form.value.email,
        password: this.form.value.password };
      this.userData = {
        id: null,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        phoneNumber: this.form.value.phoneNumber,
        address: this.form.value.address,
        city: this.form.value.city,
        state: this.form.value.state,
        zipCode: this.form.value.zipCode,
        dateOfBirth: this.form.value.dateOfBirth,
        gender: this.form.value.gender,
        email: this.form.value.email
      }
      this.userService.createUser(this.authData, this.userData);

    } else {
      this.authData = { 
        id: this.authId,
        email: this.form.value.email,
        password: this.form.value.password };
      this.userData = {
        id: this.userId,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        phoneNumber: this.form.value.phoneNumber,
        address: this.form.value.address,
        city: this.form.value.city,
        state: this.form.value.state,
        zipCode: this.form.value.zipCode,
        dateOfBirth: this.form.value.dateOfBirth,
        gender: this.form.value.gender,
        email: this.form.value.email
      }
      this.userService.updateUser(this.authData, this.userData);
    };
    this.form.reset();
    this.dialogRef.close();
  }

  onClose() {
    this.dialogRef.close();
  }


}
