import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {AuthenticationService} from '../authentication/services';

export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
        .pipe(
            retry(1),
            catchError(
                (error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        // auto logout if 401 response returned from api
                        this.authenticationService.logout();
                        location.reload();
                    }
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                    }
                    console.log(errorMessage);
                    // window.alert(errorMessage);
                    return throwError(errorMessage);
                }
            )
        );
    }
}
