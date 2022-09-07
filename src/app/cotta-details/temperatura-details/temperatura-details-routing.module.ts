import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemperaturaDetailsPage } from './temperatura-details.page';

const routes: Routes = [
  {
    path: '',
    component: TemperaturaDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemperaturaDetailsPageRoutingModule {}
