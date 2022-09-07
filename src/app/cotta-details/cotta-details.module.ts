import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CottaDetailsPageRoutingModule } from './cotta-details-routing.module';

import { CottaDetailsPage } from './cotta-details.page';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CottaDetailsPageRoutingModule,
    HeaderModule
  ],
  declarations: [CottaDetailsPage]
})
export class CottaDetailsPageModule {}
