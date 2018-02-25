/**
 * Interceptor to handle API authentication
 */
import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class APIAuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const authReq = req.clone({headers: req.headers.set('Authorization', '10210511215204928----EEE')});
    // const secureReq = req.clone({url: req.url.replace('http://', 'https://')});

    // const accessToken = this.auth.getToken();

    const auth = this.injector.get(AuthService);
    const accessToken = auth.getToken();

    // Continuing of token not set
    if (accessToken === undefined) {
      return next.handle(req);
    }

    // const authReq = req.clone({url: req.url.replace('http://', 'https://'), setHeaders: {'X-FB-API-Key': accessToken}});
    const authReq = req.clone({setHeaders: {'X-FB-API-Key': accessToken}});

    // Force HTTPS and add Header for API Token
    // const authReq = req.clone({url: req.url.replace('http://', 'https://'), setHeaders: {'X-FB-API-Key': '10210511215204928----
    // EAAJEjQ4HlCYBAKQoIZBmZB15HcSxhiwLfpUg
    // E5FCke55BsEPkS974VIWVmojypwxOWiE8R9SlT456ZC6Ygn7WpaPt3kuQdOAB1gpewOMGbo9VjPrn5ZCN9QuO3ULWxTVLZC89WauiA8ElGMRERSf4GuHdmWWO
    // jyDZBWbC96dVlsW8MM8BG9TYJcZC6XlMzSLZBRORD
    // 33gKlE6RLEZC2yoe7dF'}});

    return next.handle(authReq);
  }
}
