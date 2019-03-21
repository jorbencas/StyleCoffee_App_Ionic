import { IonicModule } from '@ionic/angular';
import { EditRoutingModule } from './edit-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditPage } from './edit.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    EditRoutingModule
  ],
  declarations: [EditPage]
})
export class EditPageModule {}
