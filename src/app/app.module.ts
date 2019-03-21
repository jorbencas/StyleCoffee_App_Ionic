import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared';
import { DetailsPageModule } from './details/details.module';
import { AuthModule } from './auth/auth.module';
import { CoffeeDetailsModule } from './coffee-details/coffee-details.module';
import { EditPageModule } from './edit/edit.module';
import { ListPageModule } from './list/list.module';
import { ProfileModule } from './profile/profile.module';
import { xatPageModule } from './xat/xat.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    CoreModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      SharedModule,
      AuthModule,
      DetailsPageModule,
      xatPageModule,
      ProfileModule,
      ListPageModule,
      EditPageModule,
      CoffeeDetailsModule
],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
