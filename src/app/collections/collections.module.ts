import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CollectionsListRoutingModule } from './collections-routing.module';
import { CollectionsListComponent } from './collections.component';

@NgModule({
  declarations: [CollectionsListComponent],
  imports: [
    CommonModule,
    IonicModule,
    CollectionsListRoutingModule
  ]
})
export class CollectionsListModule { }
