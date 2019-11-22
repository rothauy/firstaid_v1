import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WoundComponent } from './wound/wound.component';
import { WoundListComponent } from './wound/wound-list/wound-list.component';
import { WoundItemComponent } from './wound/wound-list/wound-item/wound-item.component';
import { WoundDetailComponent } from './wound/wound-detail/wound-detail.component';
import { WoundCreateComponent } from './wound/wound-create/wound-create.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { ImageUploadedComponent } from './result/image-uploaded/image-uploaded.component';
import { ResultComponent } from './result/result.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownDirective } from './shared/dropdown.directive';
import { HttpClientModule} from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogRef } from '@angular/material';
import { UserHistoryComponent } from './user/user-history/user-history.component';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WoundComponent,
    WoundListComponent,
    WoundItemComponent,
    WoundDetailComponent,
    WoundCreateComponent,
    ImageUploadedComponent,
    ResultComponent,
    SignupComponent,
    LoginComponent,
    UserHistoryComponent,
    UserProfileComponent,
    UserComponent,
    DropdownDirective,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [WoundCreateComponent, SignupComponent]
})
export class AppModule { }
