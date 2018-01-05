import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    token: String;
    constructor(private spinnerService: SpinnerService) {}
      
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        debugger;
        const token = this.getToken('auth_token');
        if (token) {
            req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
            return next.handle(req);
        }
        this.spinnerService.startRequest();
        return next.handle(req).catch((error: Response) => {
            debugger;
            // tslint:disable-next-line:max-line-length
            if ((error.status === 401 || error.status === 403 || error.status === 500) && (window.location.href.match(/\?/g) || []).length < 2) {
              console.log(error);
            }
            return Observable.throw(error);
          })
          .finally(() => {
            this.spinnerService.endRequest();
          });
    }

    getToken(key: string) {
        return localStorage.getItem(key);
      }
}