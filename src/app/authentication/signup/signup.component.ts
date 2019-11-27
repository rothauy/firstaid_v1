import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, _countGroupLabelsBeforeOption } from '@angular/material';
import { UserData } from 'src/app/user/user.model';
import { AuthData } from '../auth.model';
import { UserService } from 'src/app/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  form: FormGroup;
  userData: UserData;
  authData: AuthData;
  today = new Date();

  private mode = "create";
  private userId: string;
  private authId: string;
  private email: string;

  private authStatusSub: Subscription;

  constructor(
    public userService: UserService, 
    private authService: AuthService,
    public dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router) {}

  ngOnInit() {
    this.authStatusSub = this.userService.getHistoryUpdateListener().subscribe(authStatus =>{
      this.isLoading = false;
    });
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
        validators: [Validators.required], updateOn: "submit"}),
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
        password: this.data.authData.password,
        firstName: this.data.userData.firstName,
        lastName: this.data.userData.lastName,
        phoneNumber: this.data.userData.phoneNumber,
        address: this.data.userData.address,
        city: this.data.userData.city,
        state: this.data.userData.state,
        zipCode: this.data.userData.zipCode,
        dateOfBirth:  new Date (this.data.userData.dateOfBirth).toISOString().substr(0, 10),
        gender: this.data.userData.gender,
        registerCode: "This will be something"
      });
      this.form.controls.email.disable();
    } else {
      this.mode = "create";
      this.userId = null;
      this.authId = null;
    };
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  onSignUp() { 
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.email = this.form.value.email;

    if (this.mode === "create") {
      this.authData = { 
        id: null,
        email: this.email,
        password: this.form.value.password,
        role: "user" };
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
        email: this.email
      }
      this.userService.createUser(this.authData, this.userData);

    } else {
      if (this.form.value.password === this.data.authData.password) {
        this.form.value.password = null;
      }
      this.authData = { 
        id: this.authId,
        email: this.form.value.email,
        password: this.form.value.password,
        role: this.data.authData.role };
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
      setTimeout(() => {
        if (this.form.value.password !== null) {
          this.authService.login(this.authData.email, this.authData.password);
        }
        this.router.navigate(['/profileUpdated']);
      }, 2000);
    };
    this.form.reset();
    this.dialogRef.close();

  }

  onClose() {
    this.dialogRef.close();
  }


}
