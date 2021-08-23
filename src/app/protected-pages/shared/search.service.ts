import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {information, Locate, Search} from "../../shared/my.interfaces";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {delay, map} from "rxjs/operators";

@Injectable({providedIn: 'root'})

export class SearchService {

  locateId: string | undefined

  constructor(private http: HttpClient) {
  }

  searchLocation(searchObj: Search): Observable<Locate> {
    return this.http.post("https://places-dsn.algolia.net/1/places/query", JSON.stringify(searchObj))
  }

  userLocation(location: information) {
    return this.http.post(`${environment.fbDbKey}/resolve.json`, location)
      .pipe(
        delay(1000)
      )
  }

  getUserPastLocations(): Observable<any> {
    return this.http.get(`${environment.fbDbKey}/resolve.json`)
      .pipe(
        map((response: { [key: string]: any } | null) => {
          if (response) {
            return Object
              .keys(response)
              .map(key => ({
                ...response[key]
              }))
          }
          return null
        })
      )
  }

  deleteLocations(): Observable<any> {
    localStorage.clear()
    return this.http.delete(`${environment.fbDbKey}/resolve.json`)
  }

}
