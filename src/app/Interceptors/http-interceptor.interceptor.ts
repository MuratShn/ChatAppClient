import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let copyRequest = request.clone({headers:request.headers.set("Authorization",`Bearer ${localStorage.getItem("_T")}`)});
    

    console.log(copyRequest)
    return next.handle(copyRequest);
  }
}
