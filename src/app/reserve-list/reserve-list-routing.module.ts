import { NgModule } from '@angular/core';
import { ReserveListComponent } from './reserve-list.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'reserve-list',
    component:ReserveListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReserveListRoutingModule { }
