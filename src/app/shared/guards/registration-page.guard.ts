import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {RegisterService} from "../register.service";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})

export class RegistrationPageGuard implements CanActivate {
  constructor(
    private registerService: RegisterService,
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean>
    | Promise<boolean>
    | boolean {
    if (!this.registerService.isAuth()) {
      return true
    } else {
      this.router.navigate(['/dashboard'])
      return false
    }
  }
}
