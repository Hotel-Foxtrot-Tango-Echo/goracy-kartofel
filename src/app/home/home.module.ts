import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { RepeaterInfoComponentModule } from '../_components/repeater-info/repeater-info.module';
import { MapComponentModule } from '../_components/map/map.module';
import { MainToolbarComponentModule } from '../_components/main-toolbar/main-toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepeaterInfoComponentModule,
    HomePageRoutingModule,
    MapComponentModule,
    MainToolbarComponentModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
