import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../authentication/auth.model';
import { Router} from '@angular/router';
import { UserData } from '../user/user.model';
import { map } from 'rxjs/operators';
import { UserHistory } from './user.history.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: "root" })
export class UserService {
    private histories: UserHistory[] = [];
    private historiesUpdated = new Subject<UserHistory[]>();

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

    getHistories() {
        this.http
            .get<{ message: string, histories: any }>("http://localhost:3000/api/result/histories")
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
        this.http.delete("http://localhost:3000/api/result/histories/" + id)
            .subscribe(() => {
                const updatedHistories = this.histories.filter(history => history.id !== id);
                this.histories = updatedHistories;
                this.historiesUpdated.next([...this.histories]);
            })
    }

}