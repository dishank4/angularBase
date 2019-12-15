import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpFilter implements HttpInterceptor {

    private apiUrl = environment.apiUrl;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addAuthentication(request));
    }

    private addAuthentication(request: HttpRequest<any>): HttpRequest<any> {

        if (!request.url.includes('/pri/')) {
            const token =  localStorage.getItem('token');
            if (token) {
                request = request.clone({
                    setHeaders: {Authorization: 'Bearer ' + token}
                });
            }
        }
        return request.clone({url: `${this.apiUrl}${request.url}`});

    }

}