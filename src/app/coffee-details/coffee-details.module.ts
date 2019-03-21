import { NgModule } from '@angular/core';
import { CoffeeDetailsRoutingModule } from './coffee-details-routing.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoffeeDetailsComponent } from './coffee-details.component';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    CoffeeDetailsRoutingModule
  ],
  declarations: [CoffeeDetailsComponent]
})
export class CoffeeDetailsModule { }
