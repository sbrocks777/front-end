import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrPageComponent } from './shared/components/err-page/err-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
    pathMatch: 'full',
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'events',
    loadChildren: () =>
      import('./modules/events/events.module').then((p) => p.EventsModule),
  },
  {
    path: '**',
    component: ErrPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
