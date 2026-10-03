import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapCreatePageRoutingModule } from './map-create-routing.module';

import { MapCreatePage } from './map-create.page';
import { MainToolbarComponentModule } from '../_components/main-toolbar/main-toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapCreatePageRoutingModule,
    MainToolbarComponentModule,    
  ],
  declarations: [MapCreatePage]
})
export class MapCreatePageModule {}
