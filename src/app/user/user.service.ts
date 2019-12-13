import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../authentication/auth.model';
import { Router} from '@angular/router';
import { UserData } from '../user/user.model';
import { map } from 'rxjs/operators';
import { UserHistory } from './user.history.model';
import { Subject } from 'rxjs';
import { AuthService } from '../authentication/auth.service';

import { environment } from '../../environments/environment';

const BACKEND_URL_USER = environment.apiURL + "api/user/";
const BACKEND_URL_RESULT = environment.apiURL + "api/result/";

@Injectable({ providedIn: "root" })
export class UserService {
    private histories: UserHistory[] = [];
    private historiesUpdated = new Subject<UserHistory[]>();
    private userStatusUpdated = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router, private authService: AuthService ) {}

    createUser(authData: AuthData, userData: UserData) {
        this.http.post(BACKEND_URL_USER + "signup", {authData, userData}).subscribe(() => {
            this.router.navigate["/login"];
        }, error => {
            this.router.navigate["/login"];
            this.userStatusUpdated.next(false);
        });
    }

    updateUser(authData: AuthData, userData: UserData) {
        this.http.put(BACKEND_URL_USER + "signup", {authData, userData})
        .subscribe( response => {
            this.router.navigate["/profileUpdated"];
        }, error => {
            this.router.navigate["/profileUpdated"];
            this.userStatusUpdated.next(false);
        });
    }

    getUserUpdateListener() {
        return this.userStatusUpdated.asObservable();
    }

    getHistories() {
        this.http
            .get<{ message: string, histories: any }>(BACKEND_URL_RESULT + "histories")
            .pipe(
                map(historyData => {
                    return historyData.histories.map(history => {
                        return {
                            type: history.type,
                            imagePath: history.imagePath,
                            id: history._id
                        };
                    });
                })
            )
        .subscribe(transformedHistories => {
            this.histories = transformedHistories;
            this.historiesUpdated.next([...this.histories]);
        });
    }

    getHistoryUpdateListener() {
        return this.historiesUpdated.asObservable();
    }

    deleteHistory(id: string) {
        this.http.delete(BACKEND_URL_RESULT + "histories/" + id)
            .subscribe(() => {
                const updatedHistories = this.histories.filter(history => history.id !== id);
                this.histories = updatedHistories;
                this.historiesUpdated.next([...this.histories]);
            })
    }

}