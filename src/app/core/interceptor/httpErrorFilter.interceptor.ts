import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpErrorFilter implements HttpInterceptor {

    isRefreshingToken = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private authenticationService: AuthService, private toastr: ToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: any) => {
                if (error.status === 401 && !request.url.includes('login')) {
                    return this.handle401Error(request, next);
                }
                this.notify(error)
                return throwError(error);
            })
        );
    }
    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        return of(<any>this.authenticationService.logout());
        // if (request.url.includes('auth/refreshtoken')) {
        //     this.isRefreshingToken = false;
        //     return of(<any>this.authenticationService.logout());
        // }
        // if (!this.isRefreshingToken) {
        //     this.isRefreshingToken = true;
        //     this.tokenSubject.next(null);

        //     return this.authenticationService.refresh().pipe(switchMap(token => {
        //         if (token) {
        //             this.tokenSubject.next(token.value);
        //             return next.handle(request);
        //         }
        //         return of(<any>this.authS.logout());
        //     }),
        //     catchError(err => {
        //         this.authenticationService.logout();
        //         return throwError(err.error);
        //     }),
        //     finalize(() => {
        //         this.isRefreshingToken = false;
        //     }));
        // } 
        // else {
        //     this.isRefreshingToken = false;

        //     return this.tokenSubject
        //         .pipe(filter(token => token != null),
        //         take(1),
        //         switchMap(token => {
        //             return next.handle(request);
        //         }));
        // }
    }

    notify(error) {
        let errorMsg = "Something went wrong!!";
        if (error.error && error.error.error) {
            errorMsg = error.error.error;
        }
        this.toastr.error(errorMsg);
    }
}