import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailsPage } from './details.page';
import { DetailsRoutingModule } from "./details.router.module";

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
