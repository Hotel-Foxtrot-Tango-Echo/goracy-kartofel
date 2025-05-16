import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepeaterPageRoutingModule } from './repeater-routing.module';
import { RepeaterInfoComponentModule } from '../_components/repeater-info/repeater-info.module';
import { RepeaterPage } from './repeater.page';
import { MainToolbarComponentModule } from '../_components/main-toolbar/main-toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepeaterInfoComponentModule,
    RepeaterPageRoutingModule,
    MainToolbarComponentModule
  ],
  declarations: [RepeaterPage]
})
export class RepeaterPageModule {}
