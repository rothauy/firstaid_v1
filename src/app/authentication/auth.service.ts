import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth.model';
import { Subject } from 'rxjs';
import { Router, Data } from '@angular/router';
import { UserData } from '../user/user.model';

@Injectable({ providedIn: "root" })
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router) {}

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    login(email: string, password: string) {
        const authData: AuthData = {id: null, email: email, password: password };
        this.http.post<{token: string, expiresIn: number}>("http://localhost:3000/api/user/login", authData)
            .subscribe(response => {
                const token = response.token;
                this.token = token;
                if (token){
                    const expireInDuration = response.expiresIn;
                    this.setAuthTimer(expireInDuration);
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expireInDuration * 1000);
                    this.saveAuthData(token, expirationDate);
                    this.router.navigate(["/"]);
                }
            });
    }

    logout() {
        this.token = null;
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
                this.isAuthenticated = true;
                this.setAuthTimer(expiresIn / 1000);
                this.authStatusListener.next(true);
            }
        }
    }

    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout( () => {
            this.logout();
        }, duration * 1000)
    }

    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem("token", this.token);
        localStorage.setItem("expiration", expirationDate.toISOString());
    }

    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
    }

    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        if (!token || !expirationDate) {
            return;
        }
        return {token: token, expirationDate: new Date (expirationDate)}
    }

}