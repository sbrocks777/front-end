import { NgModule } from '@angular/core';
import { EventDetailsComponent } from './event-details/event-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategorizedEventsComponent } from './categorized-events/categorized-events.component';
import { EventsLayoutComponent } from './events-layout/events-layout.component';

const routes: Routes = [
  {
    path: '',
    component: EventsLayoutComponent,
    children: [
      {
        path: 'details/:id',
        component: EventDetailsComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'categories/:name',
        component: CategorizedEventsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    EventDetailsComponent,
    CategorizedEventsComponent,
    CategoriesComponent,
    EventsLayoutComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class EventsModule {}
