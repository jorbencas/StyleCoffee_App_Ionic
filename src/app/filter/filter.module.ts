import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { FilterRoutingModule } from './filter-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FilterRoutingModule,
    IonicModule,
  ]
})
export class FilterModule { }
