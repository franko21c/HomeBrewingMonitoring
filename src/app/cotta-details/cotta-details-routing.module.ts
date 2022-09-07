import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CottaDetailsPage } from './cotta-details.page';

const routes: Routes = [
  {
    path: '',
    component: CottaDetailsPage
  },
  {
    path: 'ph-details',
    loadChildren: () => import('./ph-details/ph-details.module').then( m => m.PhDetailsPageModule)
  },
  {
    path: 'temperatura-details',
    loadChildren: () => import('./temperatura-details/temperatura-details.module').then( m => m.TemperaturaDetailsPageModule)
  },
  {
    path: 'densita-details',
    loadChildren: () => import('./densita-details/densita-details.module').then( m => m.DensitaDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CottaDetailsPageRoutingModule {}
