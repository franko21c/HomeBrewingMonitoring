import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DensitaDetailsPage } from './densita-details.page';

const routes: Routes = [
  {
    path: '',
    component: DensitaDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DensitaDetailsPageRoutingModule {}
