import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { NotificatorService } from 'src/app/shared/notificator/notificator.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private notificatorService: NotificatorService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        let hasRouted = false;
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = error.error;
          hasRouted = this.validateErrorToRoute(error, errorMessage);
        }

        if (errorMessage !== '' && !hasRouted) {
          this.notificatorService.error(errorMessage);
        }

        return EMPTY;
      })
    );
  }

  private validateErrorToRoute(
    error: HttpErrorResponse,
    errorMessage: string
  ): boolean {
    let hasRouted = false;

    if (error.status === 404) {
      // Not Found
      this.notificatorService.error(errorMessage);
      hasRouted = true;
    } else if (error.status === 401 || error.status === 403) {
      // Unauthorized || Forbidden
      this.notificatorService.error('You are not authorized to preform this action!');
      hasRouted = true;
    } else if (error.status === 400) {
      // BadRequest
      this.notificatorService.error('The server cannot or process the request due to a unexpected error!');
    }

    return hasRouted;
  }
}
