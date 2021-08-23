import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {SearchService} from "./search.service";

@Injectable({providedIn: 'root'})

export class PlaceInfoGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private searchService: SearchService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean>
    | Promise<boolean>
    | boolean {
    if (this.searchService.locateId) {
      return true
    }
    this.router.navigate(['/dashboard'])
    return false
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean>
    | Promise<boolean>
    | boolean {
    return this.canActivate(childRoute, state)
  }
}
