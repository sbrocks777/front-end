import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';

const routes: Routes = [
  {
    path: '',
    component: BasicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../modules/home/home.module').then((m) => m.HomeModule),
      },
    ],
  },
];

@NgModule({
  declarations: [BasicLayoutComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class LayoutModule {}
