import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class AppendTokenInterceptor implements HttpInterceptor {

    constructor(private storageService: StorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.storageService.getAccessToken();
        if (token == null) {
            return next.handle(request);
        }
        
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });

        return next.handle(request);
    }
}
