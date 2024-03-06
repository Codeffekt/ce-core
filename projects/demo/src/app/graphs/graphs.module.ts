import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphsRoutingModule } from './graphs-routing.module';
import { GraphsExampleComponent } from './graphs-example/graphs-example.component';
import { CeGridModule } from '@codeffekt/ce-core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    GraphsExampleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GraphsRoutingModule,
    CeGridModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
  ]
})
export class GraphsModule { }
