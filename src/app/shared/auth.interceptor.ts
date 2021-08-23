import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {RegisterService} from "./register.service";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {SearchService} from "../protected-pages/shared/search.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private registerService: RegisterService,
    private searchService: SearchService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.registerService.isAuth()) {
      req = req.clone({
        setParams: {
          auth: (<any>this.registerService.token)
        }
      })
    }
    return next.handle(req)
      .pipe(
        catchError(err => {
          if (err.status === 400) {
            this.registerService.errorEmail = err.error.error.message
          }
          if (err.status === 401) {
            this.registerService.noSession = true
            this.searchService.deleteLocations().subscribe(() => {
              this.router.navigate(['/registration'])
            })
          }
          return throwError(err)
        })
      )
  }

}
