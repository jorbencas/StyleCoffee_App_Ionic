import { IonicModule } from '@ionic/angular';
import { DetailsRoutingModule } from './details-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailsPage } from './details.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DetailsRoutingModule
  ],
  declarations: [DetailsPage]
})
export class DetailsPageModule {}
