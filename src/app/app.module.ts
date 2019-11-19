import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WoundComponent } from './wound/wound.component';
import { WoundListComponent } from './wound/wound-list/wound-list.component';
import { WoundItemComponent } from './wound/wound-list/wound-item/wound-item.component';
import { WoundDetailComponent } from './wound/wound-detail/wound-detail.component';
import { WoundCreateComponent } from './wound/wound-create/wound-create.component';
import { ImageUploadedComponent } from './image-uploaded/image-uploaded.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownDirective } from './shared/dropdown.directive';
import { HttpClientModule} from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import { MatDialogModule, MatDialogRef } from '@angular/material';

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
    SignupComponent,
    LoginComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
