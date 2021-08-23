import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from "../shared/search.service";
import {PlaceInfoService} from "./shared/place-info.service";

@Component({
  selector: 'app-place-info',
  templateUrl: './place-info.component.html',
  styleUrls: ['./place-info.component.scss']
})
export class PlaceInfoComponent implements OnInit, OnDestroy {

  info = false

  constructor(
    private searchService: SearchService,
    public placeInfoService: PlaceInfoService,
  ) {
  }

  ngOnInit(): void {
    this.placeInfoService.locateId = this.searchService.locateId!
  }

  changeInfoVis() {
    if (!this.placeInfoService.locationInfo && !this.placeInfoService.load) {
      this.info = !this.info
      this.placeInfoService.load = true
    } else {
      return
    }
  }

  ngOnDestroy() {
    this.placeInfoService.load = false
    this.searchService.locateId = undefined
    this.placeInfoService.locationInfo = undefined
  }
}
