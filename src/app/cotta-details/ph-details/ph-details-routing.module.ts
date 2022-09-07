import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhDetailsPage } from './ph-details.page';

const routes: Routes = [
  {
    path: '',
    component: PhDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhDetailsPageRoutingModule {}
