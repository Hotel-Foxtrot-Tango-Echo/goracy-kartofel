import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipsAndTricksPageRoutingModule } from './tips-and-tricks-routing.module';

import { TipsAndTricksPage } from './tips-and-tricks.page';
import { MainToolbarComponentModule } from 'src/app/_components/main-toolbar/main-toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipsAndTricksPageRoutingModule,
    MainToolbarComponentModule

  ],
  declarations: [TipsAndTricksPage]
})
export class TipsAndTricksPageModule {}
