import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrPageComponent } from './components/err-page/err-page.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

import { CardComponent } from './components/card/card.component';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader';
import { FooterComponent } from './components/footer/footer.component';

const modules = [
  CommonModule,
  RouterModule,
  LayoutModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule,
  MatMenuModule,
  MatTableModule,
];

const components = [
  MainNavComponent,
  FooterComponent,
  ErrPageComponent,
  CardComponent,
  SkeletonLoaderComponent,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...modules, ...components],
})
export class SharedModule {}
