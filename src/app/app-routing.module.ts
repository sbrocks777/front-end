import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
    loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule),
    pathMatch: 'full'
  },
  {
    path: 'user', 
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
