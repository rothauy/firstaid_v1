import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class ResultService {

    constructor(private http: HttpClient) {}

    getResult(imagePath: string) {
        const imageData = new FormData();
        imageData.append("imagePath", imagePath);

        this.http
            .post<{message: string, type: string}>("http://localhost:3000/api/result", ImageData)
            .subscribe(result => {
                return result;
            });
    }
}