import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { NewsPage } from './news.page';
import { NewsPageRoutingModule } from './news-routing.module';
import { MainToolbarComponentModule } from 'src/app/_components/main-toolbar/main-toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsPageRoutingModule,
    MainToolbarComponentModule
  ],
  declarations: [NewsPage]
})
export class NewsPageModule {}
