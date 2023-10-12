import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SortFilterDropdownService } from './sort-filter-dropdown.service';
import { FormQuerySortFieldWithLabel } from './sort-filters.builder';

@UntilDestroy()
@Component({
  selector: 'ce-sort-filter-dropdown',
  templateUrl: './sort-filter-dropdown.component.html',
  styleUrls: ['./sort-filter-dropdown.component.scss'],
  providers: [SortFilterDropdownService]
})
export class SortFilterDropdownComponent implements OnInit, OnDestroy {

  sortFilters: FormQuerySortFieldWithLabel[] = [];

  @Output()
  sortFilter = new EventEmitter();

  @Input()
  activeFilter: FormQuerySortFieldWithLabel;

  constructor(private sortFiltersService: SortFilterDropdownService) {
    this.listenSortFilters();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.sortFiltersService.destroy();
  }

  select(sortFilter: FormQuerySortFieldWithLabel) {
    this.sortFilter.emit(sortFilter);
  }

  private listenSortFilters() {
    this.sortFiltersService
      .sortFiltersValues()
      .pipe(untilDestroyed(this))
      .subscribe(sortFilters => this.sortFilters = sortFilters);
  }
}
