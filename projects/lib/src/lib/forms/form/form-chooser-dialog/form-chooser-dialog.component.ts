import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { FormBlock, FormInstance, FormInstanceExt } from "@codeffekt/ce-core-data";
import { CeFormDataService } from "../../form-data.service";
import { FormQueryBuilder } from "../../forms-query/formquery.builder";
import { CeFormQueryService } from "../../../services/ce-form-query.service";
import { FormQueryDatasource } from "../../form-datasource";

export interface FormChooserDialogConfig {
    formBlock: FormBlock;
    query: FormQueryBuilder;
    dataSource: FormQueryDatasource;
}

@Component({
    selector: 'app-form-chooser-dialog',
    templateUrl: './form-chooser-dialog.component.html',
    styleUrls: ['./form-chooser-dialog.component.scss'],
    providers: [
        CeFormQueryService
    ]
})
export class FormChooserDialogComponent {

    static open(dialog: MatDialog, config: FormChooserDialogConfig) {
        return dialog.open(FormChooserDialogComponent, { data: config });
    }

    dataSource: FormQueryDatasource;
    displayedColumns: string[] = []

    constructor(
        @Inject(MAT_DIALOG_DATA) public config: FormChooserDialogConfig,
        api: CeFormDataService,
        private readonly queryService: CeFormQueryService<FormInstanceExt>,
        private dialogRef: MatDialogRef<FormChooserDialogComponent>,
    ) {
        this.dataSource = this.config.dataSource;        
    }

    ngOnInit(): void {
        this.buildDisplayedColumns();
        this.queryService.setDatasource(this.dataSource);
        this.queryService.setQueryBuilder(this.config.query);
        this.queryService.load();
    }

    select(form: FormInstance) {
        this.dialogRef.close(form);
    }

    private buildDisplayedColumns() {
        if (this.config.formBlock.params && this.config.formBlock.params.fields) {
            this.displayedColumns = [...this.config.formBlock.params?.fields];
        }
    }
}