import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListContactsRecommendePageRoutingModule } from './list-contacts-recommende-routing.module';

import { ListContactsRecommendePage } from './list-contacts-recommende.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListContactsRecommendePageRoutingModule
  ],
  declarations: [ListContactsRecommendePage]
})
export class ListContactsRecommendePageModule {}
