import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListContactsRecommendePage } from './list-contacts-recommende.page';

const routes: Routes = [
  {
    path: '',
    component: ListContactsRecommendePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListContactsRecommendePageRoutingModule {}
