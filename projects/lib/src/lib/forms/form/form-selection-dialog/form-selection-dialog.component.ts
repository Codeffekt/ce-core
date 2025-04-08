import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FormWrapper, IndexType } from '@codeffekt/ce-core-data';
import { map, Observable } from 'rxjs';
import { FormQueryBuilder } from '../../forms-query/formquery.builder';
import { CeFormQueryService } from '../../../services/ce-form-query.service';
import { FormWrappersDataSource } from '../../form-datasource/form-wrappers.datasource';
import { CeFormsService } from '../../../services/ce-forms.service';
import { CommonModule } from '@angular/common';
import { CeListModule } from '../../../list/list.module';
import { CeGridModule, CeRowModule } from '../../../layout';
import { MatButtonModule } from '@angular/material/button';
import { CeFormQueryWrapperModule } from '../../../formquery-wrapper';
import { FormQueryFilter } from '../../forms-query';
import { InputSearchComponent } from '../../../input-search';

export interface FormSelectionConfig {
    filterForms: IndexType[];
    queryBuilder: FormQueryBuilder;
    queryFilter?: FormQueryFilter;
    mainTitle: string;
    listTitle: string;
}

@Component({
    selector: 'ce-form-selection-dialog',
    templateUrl: './form-selection-dialog.component.html',
    styleUrls: ['./form-selection-dialog.component.scss'],
    imports: [
        CommonModule,
        CeListModule,
        CeGridModule,
        CeRowModule,
        CeFormQueryWrapperModule,
        MatButtonModule,
        MatDialogModule,
        InputSearchComponent,
    ],
    providers: [
        CeFormQueryService
    ],
})
export class FormSelectionDialogComponent implements OnInit {

    static open(dialog: MatDialog, config: FormSelectionConfig) {
        return dialog.open(FormSelectionDialogComponent, this.createDialog(config));
    }

    static createDialog(data: FormSelectionConfig): MatDialogConfig {
        return {                    
            data,
        };
    }

    formsDataSource!: FormWrappersDataSource;
    forms$!: Observable<readonly FormWrapper[]>;
    currentSelection: FormWrapper | undefined;
    hasQueryFilter: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: FormSelectionConfig,
        private dialogRef: MatDialogRef<FormSelectionDialogComponent>,
        private queryService: CeFormQueryService<FormWrapper>,
        formsService: CeFormsService,
    ) {
        this.formsDataSource = new FormWrappersDataSource(formsService);
        queryService.setQueryBuilder(data.queryBuilder);
        queryService.setDatasource(this.formsDataSource);

        if(data.queryFilter) {
            this.hasQueryFilter = true;
            queryService.setQueryFilter(data.queryFilter);
        }

        this.forms$ = queryService.connect().pipe(map(forms => this.filterForms(forms)));
    }

    ngOnInit(): void {
        this.queryService.load();
    }

    selectForm(currentSelection: FormWrapper) {
        this.currentSelection = currentSelection;
    }

    dismiss() {
        this.dialogRef.close();
    }

    submit() {
        this.dialogRef.close(this.currentSelection);
    }

    private filterForms(forms: readonly FormWrapper[]) {
        return forms
            .filter(form =>
                !this.data.filterForms.some(id => id === form.core.id));
    }
}
