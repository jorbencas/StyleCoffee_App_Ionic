import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { XatRoutingModule } from './xat-routing.module';
import { xatComponent } from './xat.component';

@NgModule({
  declarations: [xatComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XatRoutingModule
  ]
})
export class xatPageModule { }
