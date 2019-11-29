import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { environment } from "../../environments/environment"
import { Wound } from '../wound/wound.model';

const BACKEND_URL_RESULT = environment.apiURL + "/result/";

@Injectable({providedIn: 'root'})
export class ResultService {

    constructor(private http: HttpClient) {}

    getResult(image: File) {
        const data = new FormData();
        data.append("image",image, "userResult");
        return this.http.post<{wound: Wound}>(BACKEND_URL_RESULT, data);
    }
}