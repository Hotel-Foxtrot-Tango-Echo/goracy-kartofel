import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { RepeaterInfoTypeComponent } from './type.component';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [RepeaterInfoTypeComponent],
  exports: [RepeaterInfoTypeComponent]
})
export class RepeaterInfoTypeComponentModule {}



