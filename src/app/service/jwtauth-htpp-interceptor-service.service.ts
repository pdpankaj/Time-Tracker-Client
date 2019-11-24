import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class JWTAuthHtppInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
console.log('sessionStorage.getItem(username) '+sessionStorage.getItem('username'))
console.log('sessionStorage.getItem(token) '+sessionStorage.getItem('token'))
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token')
        }
      })
    }

    return next.handle(req);

  }
}
