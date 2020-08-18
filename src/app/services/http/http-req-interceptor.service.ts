import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { JwtAuthenticationService } from '../jwt-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpReqInterceptorService implements HttpInterceptor{

  constructor(
    private jwtAuthenticationService: JwtAuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let headerString = this.jwtAuthenticationService.getAuthenticatedToken();
    //let username = this.jwtAuthenticationService.getAuthenticatedUser()
    //console.log('Inside interceptor: ' + basicAuthHeaderString + ' ' + username);
    if (headerString) {
      request = request.clone({
        setHeaders: {
          Authorization: headerString
        }
      })
    }
    return next.handle(request);
  }
}
