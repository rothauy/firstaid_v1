import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { WoundComponent } from './wound/wound.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { ResultComponent } from './result/result.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';


const routes: Routes = [
    {path: '', component: WoundComponent},
    {path: 'classification', component: WoundComponent},
    {path: 'result', component: ResultComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'profile', component: UserProfileComponent}
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}