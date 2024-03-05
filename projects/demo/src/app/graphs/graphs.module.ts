import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphsRoutingModule } from './graphs-routing.module';
import { GraphsExampleComponent } from './graphs-example/graphs-example.component';
import { CeGridModule } from '@codeffekt/ce-core';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { FormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';


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
