import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {RegisterService} from "../register.service";
import {Injectable} from "@angular/core";
import {SearchService} from "../../protected-pages/shared/search.service";

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private searchService: SearchService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean>
    | Promise<boolean>
    | boolean {
    if (this.registerService.isAuth()) {
      return true
    } else {
      this.searchService.deleteLocations().subscribe(() => {
        this.registerService.noSession = true
        this.router.navigate(['/registration'])
      })
      return false
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean>
    | Promise<boolean>
    | boolean {
    return this.canActivate(childRoute, state)
  }

}
