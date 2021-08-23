import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {RegistrationComponent} from "./registration/registration.component";
import {ErrorComponent} from "./error/error.component";

import {AuthGuard} from "./shared/guards/auth.guard";
import {RegistrationPageGuard} from "./shared/guards/registration-page.guard";

const routes: Routes = [
  {path: '', redirectTo: '/registration', pathMatch: 'full'},
  {path: 'registration', component: RegistrationComponent, canActivate: [RegistrationPageGuard]},
  {
    path: 'dashboard', loadChildren: () => import("./protected-pages/protected.module").then(m => m.protectedModule),
    canActivate: [AuthGuard]
  },
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo:'/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
