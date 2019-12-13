import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth.model';
import { Subject } from 'rxjs';
import { Router, Data } from '@angular/router';
import { UserData } from '../user/user.model';
import  *  as CryptoJS from 'crypto-js';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiURL + "api/user/";

@Injectable({ providedIn: "root" })
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private authStatusListener = new Subject<boolean>();
    private userRole: any;

    constructor(private http: HttpClient, private router: Router) {}

    getToken() {
        return this.token;
    }

    getUserRole() {
        if (!this.userRole) {
            return;
        }
        return CryptoJS.AES.decrypt(this.userRole, "This is my secret!").toString(CryptoJS.enc.Utf8);
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getUserProfile() {
        return this.http.post<{message: string, userProfile: any, userAuth: any}>(BACKEND_URL + "getProfile", this.token);

    }

    login(email: string, password: string) {
        const authData: AuthData = {id: null, email: email, password: password, role: null };
        this.http.post<{token: string, expiresIn: number, role: string}>(BACKEND_URL + "login", authData)
            .subscribe(response => {
                const userRole = response.role;
                this.userRole = CryptoJS.AES.encrypt(userRole, "This is my secret!").toString();
                const token = response.token;
                this.token = token;
                if (token){
                    const expireInDuration = response.expiresIn;
                    this.setAuthTimer(expireInDuration);
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expireInDuration * 1000);
                    this.saveAuthData(token, expirationDate, this.userRole);
                    this.router.navigate(["/"]);
                }
            }, error => {
                this.router.navigate(["/login"]);
                this.authStatusListener.next(false);
            });
    }

    logout() {
        this.token = null;
        this.userRole = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(["/"]);
    }

    autoAuthUser() {
        const authInfo = this.getAuthData();
        if (authInfo) {
            const now = new Date();
            const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
            if (expiresIn > 0) {
                this.token = authInfo.token;
                this.userRole = authInfo.role;
                this.isAuthenticated = true;
                this.setAuthTimer(expiresIn / 1000);
                this.authStatusListener.next(true);
            }
        }
    }

    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout( () => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date, role: string) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("role", role);
    }

    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("role");
    }

    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const role = localStorage.getItem("role");
        if (!token || !expirationDate || !role) {
            return;
        }
        return {token: token, expirationDate: new Date (expirationDate), role: role};
    }

}