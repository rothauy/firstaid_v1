import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { ErrorComponent } from './error/error.component';
import { throwError } from 'rxjs';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor (private dialog: MatDialog) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorTitle = "Error"
                let errorMsg = "An unknown error has occurred.";
                if (error.error.message) {
                    errorMsg = error.error.message;
                }
                if (error.error.title) {
                    errorTitle = error.error.title;
                }
                this.dialog.open(ErrorComponent, {data: {title: errorTitle, message: errorMsg}});
                return throwError(error);
            })
        );
    }
}