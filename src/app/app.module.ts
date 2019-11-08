import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WoundComponent } from './wound/wound.component';
import { WoundListComponent } from './wound/wound-list/wound-list.component';
import { WoundItemComponent } from './wound/wound-list/wound-item/wound-item.component';
import { WoundDetailComponent } from './wound/wound-detail/wound-detail.component';
import { ImageUploadedComponent } from './image-uploaded/image-uploaded.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WoundComponent,
    WoundListComponent,
    WoundItemComponent,
    WoundDetailComponent,
    ImageUploadedComponent,
    UserHistoryComponent,
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
