import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DensitaDetailsPageRoutingModule } from './densita-details-routing.module';

import { DensitaDetailsPage } from './densita-details.page';
import { HeaderModule } from 'src/app/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DensitaDetailsPageRoutingModule,
    HeaderModule
  ],
  declarations: [DensitaDetailsPage]
})
export class DensitaDetailsPageModule {}
