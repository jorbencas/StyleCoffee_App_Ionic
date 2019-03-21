import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditPage } from './edit.page';

const routes: Routes = [
  {
    path: 'edit/:id',
    component: EditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule {}