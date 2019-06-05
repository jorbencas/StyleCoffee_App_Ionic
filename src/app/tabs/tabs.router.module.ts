import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'books_coffees',
        children: [
          { path: '', loadChildren: '../books_coffees/books_coffees.module#Tab1PageModule'}
        ]
      },
      {
        path: 'events',
        children: [
          { path: '', loadChildren: '../events/events.module#Tab3PageModule'
          }
        ]
      },
      {
        path:'favorites',
        children: [
          { path: '', loadChildren: '../favorites/favorites.module#FavoritesPageModule'}
        ]
      },
      {
        path:'reserves',
        children: [
          { path: '', loadChildren: '../reserve-list/reserve-list.module#ReserveListModule'}
        ]
      },
      {
        path:'collections',
        children: [
          { path: '', loadChildren: '../collections/collections.module#CollectionsListModule'}
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/books_coffees',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/books_coffees',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
