import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsListComponent } from './collections-list.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [CollectionsListComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class CollectionsListModule { }
