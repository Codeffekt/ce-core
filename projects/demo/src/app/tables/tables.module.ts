import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TableWrapperExampleComponent } from './table-wrapper-example/table-wrapper-example.component';
import { TablesRoutingModule } from './tables-routing.module';
import { CeFormQueryWrapperModule, CeFormsPipesModule, CePipesModule, CeTableModule  } from '@codeffekt/ce-core';


@NgModule({
  declarations: [
    TableWrapperExampleComponent
  ],
  imports: [
    CommonModule,
    TablesRoutingModule,
    MatTableModule,
    MatSortModule,
    CePipesModule,
    CeFormsPipesModule,
    CeFormQueryWrapperModule,
    CeTableModule,   
  ]
})
export class TablesModule { }
