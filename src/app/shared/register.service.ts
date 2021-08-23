import {Injectable} from '@angular/core';
import {User} from "./my.interfaces";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  errorEmail: string
  noSession: boolean

  constructor(
    private http: HttpClient
  ) {
  }

  get token() {
    if (
      new Date() > new Date(<string>localStorage.getItem('fb-token-exp'))
      || !localStorage.getItem('fb-token')
    ) {
      RegisterService.setToken(null)
      return null
    }
    return localStorage.getItem('fb-token')
  }

  private static setToken(response: Observable<any> | any) {
    if (response) {
      const expData = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token-exp', expData.toString())
      localStorage.setItem('fb-token', response.idToken)
      console.log('ok')
    } else {
      localStorage.clear()
    }
  }

  registration(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, user)
      .pipe(
        tap(RegisterService.setToken),
      )
  }

  isAuth() {
    return !!this.token
  }
}
