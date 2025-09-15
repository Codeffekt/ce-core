import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { FormWrapper } from '@codeffekt/ce-core-data';
import { CeFormQueryEvt, CeFormQueryService, CeSearchboxModule, FormQueryLogicBuilder } from '@codeffekt/ce-core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class MockFormQueryService {

  private evt$: ReplaySubject<CeFormQueryEvt> = new ReplaySubject(1);

  setFilter(filter: string) {
    console.log("Filter", filter);
  }

  clearFilter() {
    console.log("Clear filter");
  }

  setPaginationFirstPage() {
    console.log("Set pagination first page");
  }

  evt() {
    return this.evt$;
  }

  load() {
    console.log("Load");
  }
}

@Component({
  selector: 'app-api',
  imports: [
    CeSearchboxModule,
  ],
  providers: [
    {
      provide: CeFormQueryService,
      useClass: MockFormQueryService,
    }
  ],
  templateUrl: './api.component.html',
  styleUrl: './api.component.scss'
})
export class ApiComponent {

  @Input() formWrapper!: FormWrapper;
  @Output() formChanges = new EventEmitter<FormWrapper>();

  private logicBuilder: FormQueryLogicBuilder = new FormQueryLogicBuilder();

  constructor() { }

  ngOnInit(): void {
  }

  onSearchChange(filter: string) {
    console.log("onSearchChange", filter);
    const query = this.logicBuilder.fromFilter(filter);
    if (query) {
      console.log("query=", query);
      console.log("filter=", this.logicBuilder.toFilter(query));
    }
  }



}
