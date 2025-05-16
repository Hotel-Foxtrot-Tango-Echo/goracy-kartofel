import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MainToolbarComponent } from './main-toolbar.component';
import { LogoComponentModule } from './logo/logo.module';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule, LogoComponentModule],
  declarations: [MainToolbarComponent],
  exports: [MainToolbarComponent]
})
export class MainToolbarComponentModule {}



