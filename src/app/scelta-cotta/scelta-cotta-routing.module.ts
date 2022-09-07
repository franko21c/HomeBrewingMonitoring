import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SceltaCottaPage } from './scelta-cotta.page';

const routes: Routes = [
  {
    path: '',
    component: SceltaCottaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SceltaCottaPageRoutingModule {}
