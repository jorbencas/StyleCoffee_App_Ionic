import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CollectionsListRoutingModule } from './collections-routing.module';
import { CollectionsListComponent } from './collections.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CollectionsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectionsListRoutingModule
  ]
})
export class CollectionsListModule { }
