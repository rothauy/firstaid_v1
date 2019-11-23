import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../authentication/auth.model';
import { Router} from '@angular/router';
import { UserData } from '../user/user.model';
import { Subject } from 'rxjs';
import { stringify } from 'querystring';


@Injectable({ providedIn: "root" })
export class UserService {

    constructor(private http: HttpClient, private router: Router, ) {}

    createUser(authData: AuthData, userData: UserData) {
        this.http.post("http://localhost:3000/api/user/signup", {authData, userData})
            .subscribe( response => {
            });
    }

    updateUser(authData: AuthData, userData: UserData) {
        this.http.put("http://localhost:3000/api/user/signup/" + userData.id, {authData, userData})
        .subscribe( response => {
        });
    }

}