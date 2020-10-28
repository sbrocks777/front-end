import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ErrPageComponent } from './components/err-page/err-page.component';
import { CardComponent } from './components/card/card.component';
import { RouterModule } from '@angular/router';

const modules = [
  CommonModule,
  LayoutModule,
  RouterModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule
]

const components = [
  MainNavComponent,
  ErrPageComponent, 
  CardComponent
]

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...modules, ...components]
})
export class SharedModule { }
