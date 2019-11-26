import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class ResultService {

    constructor(private http: HttpClient) {}

    getResult(image: File) {
        const dummy = new FormData();
        dummy.append("image",image, "something");
        this.http
            .post<{message: string, type: string}>("http://localhost:3000/api/result", dummy)
            .subscribe(result => {
                return result;
            });
    }
}