import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { WoundComponent } from './wound/wound.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { ResultComponent } from './result/result.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { AuthGuard } from './authentication/auth.guard';


const routes: Routes = [
    {path: '', component: WoundComponent},
    {path: 'classification', component: WoundComponent, canActivate: [AuthGuard]},
    {path: 'result', component: ResultComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
    {path: 'profileUpdated', component: UserProfileComponent, canActivate: [AuthGuard]}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}