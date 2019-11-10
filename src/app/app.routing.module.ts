import { Routes, RouterModule } from '@angular/router';
import { WoundComponent } from './wound/wound.component';
import { ImageUploadedComponent } from './image-uploaded/image-uploaded.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
    {path: '', component: WoundComponent},
    {path: 'classification', component: WoundComponent},
    {path: 'result', component: ImageUploadedComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent}
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}