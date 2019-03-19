import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoffeeDetailsComponent } from './coffee-details.component';
@NgModule({
  declarations: [CoffeeDetailsComponent],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: CoffeeDetailsComponent}])
  ]
})
export class CoffeeDetailsModule { }
