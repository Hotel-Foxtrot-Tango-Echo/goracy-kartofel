import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepeaterPage } from './repeater.page';

const routes: Routes = [
  {
    path: '',
    component: RepeaterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepeaterPageRoutingModule {}
