import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {information} from "../../../shared/my.interfaces";
import {delay} from "rxjs/operators";

@Injectable({providedIn: 'root'})

export class PlaceInfoService {

  load: boolean
  locateId: string
  locationInfo: information | undefined

  constructor(private http: HttpClient) {
  }

  getById(id: string): Observable<information> {
    return this.http.get<information>(`https://places-dsn.algolia.net/1/places/${id}`)
      .pipe(
        delay(500)
      )
  }
}
