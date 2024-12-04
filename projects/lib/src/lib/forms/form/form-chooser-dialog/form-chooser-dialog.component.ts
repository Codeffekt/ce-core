import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from "@angular/material/dialog";
import { FormBlock, FormInstance, FormInstanceBase, FormInstanceExt } from "@codeffekt/ce-core-data";
import { FormQueryBuilder } from "../../forms-query/formquery.builder";
import { CeFormQueryService } from "../../../services/ce-form-query.service";
import { FormQueryDatasource } from "../../form-datasource";
import { CommonModule } from "@angular/common";
import { CeFormQueryWrapperModule } from "../../../formquery-wrapper";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { CeFormsPipesModule } from "../../../forms-pipes";
import { CeTableModule } from "../../../table/table.module";
import { CeFormsService } from "../../../services/ce-forms.service";
import { firstValueFrom } from "rxjs";

export interface FormChooserDialogConfig {
    formBlock: FormBlock;
    query: FormQueryBuilder;
    dataSource: FormQueryDatasource;
}

@Component({
    selector: 'app-form-chooser-dialog',
    standalone: true,
    imports: [
        CommonModule,
        CeFormQueryWrapperModule,
        MatDialogModule,
        MatTableModule,
        MatIconModule,
        CeFormsPipesModule,
        CeTableModule,
    ],
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
    displayedColumns: string[] = [];
    private formRoot!: FormInstanceBase;

    constructor(
        @Inject(MAT_DIALOG_DATA) public config: FormChooserDialogConfig,
        private formService: CeFormsService,
        private readonly queryService: CeFormQueryService<FormInstanceExt>,
        private dialogRef: MatDialogRef<FormChooserDialogComponent>,
    ) {
        this.dataSource = this.config.dataSource;
    }

    ngOnInit(): void {
        this.init();
    }

    select(form: FormInstance) {
        this.dialogRef.close(form);
    }

    private async init() {
        await this.prepareQueryService();
        this.buildDisplayedColumns();
        // this.queryService.load();
    }

    private async prepareQueryService() {
        this.queryService.setDatasource(this.dataSource);
        this.queryService.setQueryBuilder(this.config.query);
        this.formRoot = await firstValueFrom(this.formService.getFormRoot(this.config.formBlock.root!));
        this.queryService.setModel(this.formRoot);
    }

    private buildDisplayedColumns() {
        const fields: string[] | undefined = this.config.formBlock.params?.fields?.length ? this.config.formBlock.params.fields : this.formRoot.params?.fields;
        this.displayedColumns = fields ?? ["$id", "$ctime"];
    }
}