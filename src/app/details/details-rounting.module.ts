import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsPage } from './details.page';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: DetailsPage}])],
  exports: [RouterModule]
})
export class DetailsRoutingModule {}
