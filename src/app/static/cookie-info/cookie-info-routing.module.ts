import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CookieInfoPage } from './cookie-info.page';

const routes: Routes = [
  {
    path: '',
    component: CookieInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CookieInfoPageRoutingModule {}
