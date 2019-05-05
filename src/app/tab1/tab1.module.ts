import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { SharedModule } from '../shared';
import  { FilterComponent } from '../filter/filter.component';
import { CollectionsListComponent } from '../collections-list/collections-list.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page, FilterComponent, CollectionsListComponent],
  entryComponents: [
    CollectionsListComponent
  ]
})
export class Tab1PageModule {}
