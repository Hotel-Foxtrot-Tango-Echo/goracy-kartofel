import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportPageRoutingModule } from './export-routing.module';

import { ExportPage } from './export.page';
import { MainToolbarComponentModule } from '../_components/main-toolbar/main-toolbar.module';
import { ShowRowComponent } from './show-row/show-row.component';
import { FileSaverModule } from 'ngx-filesaver';
import { RepeaterInfoTypeComponentModule } from '../_components/repeater-info-type/type.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExportPageRoutingModule,
    MainToolbarComponentModule,
    FileSaverModule,
    RepeaterInfoTypeComponentModule
  ],
  declarations: [ExportPage, ShowRowComponent]
})
export class ExportPageModule {}
