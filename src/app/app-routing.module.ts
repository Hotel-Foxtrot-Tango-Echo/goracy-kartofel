import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'przemienniki',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'page',
    loadChildren: () => import('./static/static.module').then( m => m.StaticPageRoutingModule)
  },  
  {
    path: 'repeater/:id',
    loadChildren: () => import('./repeater/repeater.module').then( m => m.RepeaterPageModule)
  },
  {
    path: 'export',
    loadChildren: () => import('./export/export.module').then( m => m.ExportPageModule)
  },  
  {path: '**', redirectTo: 'przemienniki'},
  {
    path: '',
    redirectTo: 'przemienniki',
    pathMatch: 'full'
  },
  // {
  //   path: '',
  //   loadComponent: () => import('./static/start/start.page').then( m => m.StartPage)
  // },

  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
