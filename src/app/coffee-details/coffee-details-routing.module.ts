import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoffeeDetailsComponent } from './coffee-details.component';

const routes: Routes = [
  {
    path: 'coffeedetails/:id',
    component: CoffeeDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoffeeDetailsRoutingModule {}