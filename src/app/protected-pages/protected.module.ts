import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

import {DashboardComponent} from "./dashboard/dashboard.component";
import {PlaceInfoComponent} from "./place-info/place-info.component";
import {InfoComponent} from "./place-info/info/info.component";

import {ProtectedRouterModule} from "./protected-router.module";
import {DashboardChoseDirective} from "./dashboard/directive/dashboard-chose.directive";

@NgModule({
  declarations: [
    DashboardComponent,
    PlaceInfoComponent,
    DashboardChoseDirective,
    InfoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProtectedRouterModule,
    FormsModule
  ],
  exports: [
    RouterModule
  ],
  providers: []
})

export class protectedModule {
}
