import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { xatRoutingModule } from './xat-routing.module';
import { xatComponent } from './xat.component';

@NgModule({
  declarations: [xatComponent],
  imports: [
    CommonModule,
    xatRoutingModule
  ]
})
export class xatModule { }
