import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { xatComponent } from './xat.component';

const routes: Routes = [
  {
    path: 'xat',
    component: xatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XatRoutingModule {}