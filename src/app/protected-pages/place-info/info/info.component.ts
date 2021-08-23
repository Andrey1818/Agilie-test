import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlaceInfoService} from "../shared/place-info.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {

  getId$ : Subscription

  constructor(
    public placeInfoService: PlaceInfoService,
  ) {
  }

  ngOnInit(): void {
    this.getById(this.placeInfoService.locateId!)
  }

  getById(locateId: string) {
    this.getId$ = this.placeInfoService.getById(locateId).subscribe(response => {
      this.placeInfoService.locationInfo = response
      this.placeInfoService.load = false
    })
  }

  ngOnDestroy() {
    this.placeInfoService.load = false
    this.getId$ ? this.getId$.unsubscribe() : true;
  }
}
