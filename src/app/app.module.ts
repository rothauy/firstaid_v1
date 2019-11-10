import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WoundComponent } from './wound/wound.component';
import { WoundListComponent } from './wound/wound-list/wound-list.component';
import { WoundItemComponent } from './wound/wound-list/wound-item/wound-item.component';
import { WoundDetailComponent } from './wound/wound-detail/wound-detail.component';
import { ImageUploadedComponent } from './image-uploaded/image-uploaded.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule
} from "@angular/material";
import { DropdownDirective } from './shared/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WoundComponent,
    WoundListComponent,
    WoundItemComponent,
    WoundDetailComponent,
    ImageUploadedComponent,
    SignupComponent,
    LoginComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
