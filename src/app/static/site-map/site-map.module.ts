import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SiteMapPageRoutingModule } from './site-map-routing.module';

import { SiteMapPage } from './site-map.page';
import { MainToolbarComponentModule } from 'src/app/_components/main-toolbar/main-toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SiteMapPageRoutingModule,
    MainToolbarComponentModule
  ],
  declarations: [SiteMapPage]
})
export class SiteMapPageModule {}
