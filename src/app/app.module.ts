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
import { ListPageModule } from './list/list.module';
import { ProfileModule } from './profile/profile.module';
import { FilterModule } from './filter/filter.module';
import { ReserveModule } from './reserve/reserve.module';
import { ReserveListModule } from './reserve-list/reserve-list.module';
import { CardModule } from './card/card.module';
import { CardListModule } from './card-list/card-list.module';

@NgModule({
  declarations: [ AppComponent],
  imports: [BrowserModule,
    CoreModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    AuthModule,
    DetailsPageModule,
    ProfileModule,
    ListPageModule,
    CoffeeDetailsModule,
    FilterModule,
    CardModule,
    CardListModule,
    ReserveListModule,
    ReserveModule
],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
