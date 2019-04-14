import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule} from './profile-routing.module';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    IonicModule,
    FormsModule,
    ProfileRoutingModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
