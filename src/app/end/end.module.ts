import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EndPageRoutingModule } from './end-routing.module';

import { EndPage } from './end.page';
import { MainToolbarComponentModule } from '../_components/main-toolbar/main-toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EndPageRoutingModule,
    MainToolbarComponentModule,

  ],
  declarations: [EndPage]
})
export class EndPageModule {}
