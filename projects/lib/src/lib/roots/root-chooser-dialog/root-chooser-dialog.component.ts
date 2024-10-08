import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CeFormQueryService } from '../../services/ce-form-query.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormQueryBuilder } from '../../forms/forms-query';
import { FormQueryDatasource } from '../../forms/form-datasource';
import { FormRoot, FormWrapper } from '@codeffekt/ce-core-data';
import { CeFormQueryWrapperModule } from '../../formquery-wrapper';
import { CeListModule } from '../../list/list.module';
import { Observable } from 'rxjs';

export interface RootChooserDialogConfig {
  query: FormQueryBuilder;
  dataSource: FormQueryDatasource<FormWrapper, FormRoot>;
}

@Component({
  selector: 'lib-root-chooser-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    CeFormQueryWrapperModule,
    CeListModule,
  ],
  templateUrl: './root-chooser-dialog.component.html',
  styleUrls: ['./root-chooser-dialog.component.scss'],
  providers: [
    CeFormQueryService,

  ]
})
export class RootChooserDialogComponent {

  static open(dialog: MatDialog, config: RootChooserDialogConfig) {
    return dialog.open(RootChooserDialogComponent, { data: config });
  }


  forms$!: Observable<readonly FormWrapper[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public config: RootChooserDialogConfig,    
    private readonly queryService: CeFormQueryService<FormWrapper>, 
    private dialogRef: MatDialogRef<RootChooserDialogComponent>,   
  ) {
    this.queryService.setDatasource(this.config.dataSource);
  }

  ngOnInit() {
    this.prepareQueryService();
  }

  select(form: FormWrapper) {
    this.dialogRef.close(form.core);
  }

  private async prepareQueryService() {
    this.queryService.setQueryBuilder(this.config.query);
    this.forms$ = this.queryService.connect();
    this.queryService.load();
  }
}
