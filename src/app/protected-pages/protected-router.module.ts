import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";

import {DashboardComponent} from "./dashboard/dashboard.component";
import {PlaceInfoComponent} from "./place-info/place-info.component";

import {PlaceInfoGuard} from "./shared/place-info.guard";
import {AuthGuard} from "../shared/guards/auth.guard";
import {InfoComponent} from "./place-info/info/info.component";

const routes: Routes = [
  {path: '', component: DashboardComponent, pathMatch: 'full'},
  {
    path: 'place-info',
    component: PlaceInfoComponent,
    canActivate: [PlaceInfoGuard, AuthGuard],
    canActivateChild: [AuthGuard, PlaceInfoGuard],
    children: [
      {path: 'info', component: InfoComponent}
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProtectedRouterModule {
}
