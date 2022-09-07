import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'scelta-cotta',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'scelta-cotta',
    loadChildren: () => import('./scelta-cotta/scelta-cotta.module').then( m => m.SceltaCottaPageModule)
  },
  {
    path: 'cotta-details',
    loadChildren: () => import('./cotta-details/cotta-details.module').then( m => m.CottaDetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
