import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReserveListRoutingModule } from './reserve-list-routing.module';
import { ReserveListComponent } from './reserve-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReserveListComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReserveListRoutingModule
  ]
})
export class ReserveListModule { }
