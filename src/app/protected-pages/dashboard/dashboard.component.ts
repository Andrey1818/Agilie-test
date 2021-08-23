import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from "../shared/search.service";
import {information, Search} from "../../shared/my.interfaces";
import {Router} from "@angular/router";
import {RegisterService} from "../../shared/register.service";
import {visibilityErrorOrSuccess} from "../../shared/my.animations";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [visibilityErrorOrSuccess]
})
export class DashboardComponent implements OnInit, OnDestroy {

  getPastLocs$: Subscription
  searchLoc$: Subscription
  postLoc$: Subscription

  search: string = ''
  arrLocate: Array<information> | undefined = []
  arrPastLocations: Array<information> | undefined = []
  arrApiLocations: Array<information> | undefined = []
  locate: information | undefined
  submitted: boolean
  locationError: boolean

  constructor(
    public searchService: SearchService,
    private router: Router,
    private registerService: RegisterService
  ) {
  }

  ngOnInit(): void {
    this.getPastLocs$ = this.searchService.getUserPastLocations().subscribe(response => {
      if (response) {
        this.arrPastLocations = response.reverse().slice(0, 3)
      }
    })
  }

  listenKey() {
    if (this.search.length >= 2) {
      let searchObj: Search = {
        query: this.search
      }
      this.searchLoc$ = this.searchService.searchLocation(searchObj).subscribe((locate) => {
        this.arrApiLocations = locate.hits
        this.arrLocate = this.arrPastLocations?.concat(this.arrApiLocations!)
      })
    } else {
      this.locate = undefined
      this.arrLocate = []
    }
  }

  chose(locate: information) {
    this.locationError = false
    this.locate = locate
  }

  submit(locate: information | undefined) {
    this.locationError = false

    if (!this.submitted && locate) {
      if (this.registerService.isAuth()) {
        this.submitted = true
        this.searchService.locateId = locate.objectID

        this.postLoc$ = this.searchService.userLocation(locate).subscribe(() => {
          this.submitted = false
          this.router.navigate(['/dashboard/place-info'])
        })
      } else {
        this.searchService.deleteLocations().subscribe(() => {
          this.registerService.noSession = true
          this.router.navigate(['/registration'])
        })
      }
    } else {
      this.locationError = true
      return
    }
  }

  ngOnDestroy(): void {
    this.getPastLocs$ ? this.getPastLocs$.unsubscribe() : true;
    this.searchLoc$ ? this.searchLoc$.unsubscribe() : true;
    this.postLoc$ ? this.postLoc$.unsubscribe() : true;
  }
}
