import { ErrorHandler, Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'projects/environments/environment';
import { Logger } from 'projects/hive/src/lib/services';
import { Router } from '@angular/router';


const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private readonly injector: Injector) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    if (!environment.production) {
      // Do something with the error
      log.error('Request error', response);
    } else {
      if (response instanceof HttpErrorResponse) {
        switch (response.status) {
          case 401: {
            const router = this.injector.get<Router>(Router);
            router.navigate(['auth/login']);
            return;
          }
          case 422: {
            // TODO: Show error modal
            // const appModalService = this.injector.get<AppModalService>(
            //   AppModalService
            // );
            // appModalService.alert(response.error);
            return;
          }
        }
      }
    }
    throw response;
  }
}
