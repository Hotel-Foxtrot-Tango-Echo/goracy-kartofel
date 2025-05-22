import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { MainToolbarComponentModule } from 'src/app/_components/main-toolbar/main-toolbar.module';
import { OfflinePageRoutingModule } from './offline-routing.module';
import { OfflinePage } from './offline.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfflinePageRoutingModule,
    MainToolbarComponentModule
  ],
  declarations: [OfflinePage]
})
export class OfflinePageModule {}
