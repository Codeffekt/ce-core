import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsRoutingModule } from './lists-routing.module';
import { CeListModule, CePipesModule, ListItemStoreService } from '@codeffekt/ce-core';
import { ListWrapperExampleComponent } from './list-wrapper-example/list-wrapper-example.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { ListItemCompoundComponent } from './list-wrapper-example/list-item-compound/list-item-compound.component';

@NgModule({
  declarations: [
    ListWrapperExampleComponent,
    ListItemCompoundComponent
  ],
  imports: [
    CommonModule,
    ListsRoutingModule, 
    MatCardModule,
    MatMenuModule,
    CeListModule,
    CePipesModule,
  ]
})
export class ListsModule {
  constructor(
    listItemStore: ListItemStoreService,    
  ) {

    listItemStore.setComponents({
      'compound': {
        useClass: ListItemCompoundComponent
      }
    });    
  }
 }
