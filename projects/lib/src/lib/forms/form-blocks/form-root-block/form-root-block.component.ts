import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBlock, FormBlockRoot, FormRoot, FormUtils, IndexType } from '@codeffekt/ce-core-data';
import { CeFormRouteResolver } from '../../form-route.resolver';
import { FormBlockComponent } from '../form-block/form-block.component';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CeFormsService } from '../../../services';
import { firstValueFrom } from 'rxjs';
import { FormsRootDataSource } from '../../form-datasource';
import { FormQueryRootBuilder } from '../../forms-query';
import { RootChooserDialogComponent } from '../../../roots/root-chooser-dialog';

@UntilDestroy()
@Component({
  selector: 'ce-form-root-block',
  templateUrl: './form-root-block.component.html',
  styleUrls: ['./form-root-block.component.scss'],
  standalone: false
})
export class FormRootBlockComponent extends FormBlockComponent<FormBlockRoot> implements OnInit {

  displayedFields: FormBlock[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private formRouteResolver: CeFormRouteResolver,
    private formsService: CeFormsService,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit() {
    this.buildDisplayedFields();
  }

  openForm(formId: IndexType) {
    // this.formRouteResolver.resolve(this.formBlock.field, formId, this.formInstance);
  }

  edit() {

    const query = new FormQueryRootBuilder();

    if (this.formBlock.value) {
      query.setExcludedIndices([this.formBlock.value]);
    }

    if(this.formBlock.cat) {
      query.setCat(this.formBlock.cat);
    }

    const dialogRef = RootChooserDialogComponent.open(this.dialog,
      {
        query,
        dataSource: new FormsRootDataSource(
          this.formsService
        ),
      }
    );

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        this.value = form.id;        
        this.buildDisplayedFields();
      }
    });
  }

  delete() {    
    this.value = undefined;    
    this.buildDisplayedFields();
  }

  private async buildDisplayedFields() {

    this.displayedFields = [];

    if (!this.formBlock.value) {
      return;
    }

    const formRoot = await firstValueFrom(this.formsService.getFormRoot(this.formBlock.value));

    this.updateDisplayFields(this.formBlock, formRoot);
  }

  private updateDisplayFields(block: FormBlock, form: FormRoot) {
    const fields = block.params?.fields?.length ? block.params.fields : form.params?.fields;
    this.displayedFields = fields ? fields
      .map((f: string) => FormUtils.retrieveBlockFromField(form, f))
      .filter((f: string) => f !== undefined) : [];
  }
}
