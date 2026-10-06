import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CookieInfoPageRoutingModule } from './cookie-info-routing.module';

import { CookieInfoPage } from './cookie-info.page';
import { MainToolbarComponentModule } from 'src/app/_components/main-toolbar/main-toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CookieInfoPageRoutingModule,
    MainToolbarComponentModule
  ],
  declarations: [CookieInfoPage]
})
export class CookieInfoPageModule {}
