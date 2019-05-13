import { NgModule } from '@angular/core';
import { ReserveComponent } from './reserve.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'reserve/:id',
    component: ReserveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReserveRoutingModule { }

