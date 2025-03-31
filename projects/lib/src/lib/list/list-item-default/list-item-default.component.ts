import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBlock, FormUtils, FormWrapper } from '@codeffekt/ce-core-data';
import { IListItemContent } from '../list-item-factory/list-item-models';

@Component({
    selector: 'lib-list-item-default',
    templateUrl: './list-item-default.component.html',
    styleUrls: ['./list-item-default.component.scss'],
    standalone: false
})
export class ListItemDefaultComponent implements OnInit, IListItemContent<FormWrapper> {

  itemChangedEvent?: EventEmitter<boolean>;
  item!: FormWrapper;
  block?: FormBlock;

  displayedFields: FormBlock[] = [];

  constructor() {     
  }  

  ngOnInit(): void {   
    this.retrieveDisplayFields();
  }

  private retrieveDisplayFields() {
    const fields = this.item.core.params?.fields;
    this.displayedFields = fields ? fields.map((f: string) => FormUtils.retrieveBlockFromField(this.item.core, f)) : [];
  }
}
