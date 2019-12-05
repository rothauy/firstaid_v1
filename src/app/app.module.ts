import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatDialogRef } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ImageUploadedComponent } from './result/image-uploaded/image-uploaded.component';
import { ResultComponent } from './result/result.component';
import { ErrorComponent } from './error/error.component';

import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './authentication/auth.interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';

import { WoundModule } from './wound/wound.module';
import { UserModule } from './user/user.module';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImageUploadedComponent,
    ResultComponent,
    ErrorComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    WoundModule,
    UserModule,
    
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: ErrorInterceptor, 
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [SignupComponent,ErrorComponent]
})
export class AppModule { }
