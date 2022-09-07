import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhDetailsPageRoutingModule } from './ph-details-routing.module';

import { PhDetailsPage } from './ph-details.page';
import { HeaderModule } from 'src/app/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhDetailsPageRoutingModule,
    HeaderModule
  ],
  declarations: [PhDetailsPage]
})
export class PhDetailsPageModule {}
