import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SceltaCottaPageRoutingModule } from './scelta-cotta-routing.module';

import { SceltaCottaPage } from './scelta-cotta.page';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SceltaCottaPageRoutingModule,
    HeaderModule
  ],
  declarations: [SceltaCottaPage]
})
export class SceltaCottaPageModule {}
