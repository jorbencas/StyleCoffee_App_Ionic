import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionsListComponent } from './collections.component';

const routes: Routes = [
  {
    path: 'Collectionslist',
    component:CollectionsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsListRoutingModule { }
