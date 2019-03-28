import { ModuleWithProviders, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../shared';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent
  ],
  providers: [
    NoAuthGuard
  ]
})
export class AuthModule {}
