import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeModule } from '../home/home.module';
import { HomeComponent } from '../home/home/home.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
]

@NgModule({
  declarations: [BasicLayoutComponent, FooterComponent],
  imports: [
    SharedModule,
    HomeModule,
    RouterModule.forChild(routes)
  ]
})
export class LayoutModule { }
