import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err){
          switch (err.status){
            case 400:
              // checking for the case of validation error
              if (err.error.errors){
                const modelStateErrors = [];
                for (const key in err.error.errors){
                  if (err.error.errors[key]){
                    // will push all errors coming from validation and store them in the array
                    modelStateErrors.push(err.error.errors[key])
                  }
                }
                throw modelStateErrors.flat();
              } else {
                this.toastr.error(err.error, err.status.toString());
              }
              break;
            case 401:
              this.toastr.error('Unauthorized', err.status.toString())
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              // getting the error and storing it in the router state
              const navigationExtras: NavigationExtras = {state: {error: err.error}};
              // then when we navigate to url, we get access to the error
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.toastr.error('Oops. Something unexpected went wrong');
              console.log(err);
              break;
          }
        }
        throw err;
      })
    )
  }
}
