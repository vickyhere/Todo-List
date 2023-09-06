import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const connectSid = localStorage.getItem("sessionId");

    if (connectSid) {
      request = request.clone({
        setHeaders: {
          Cookie: `connect.sid=${connectSid}`,
      },
      });
    }
    return next.handle(request);
  }
}
