import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CeFormQueryService } from '../services';
import { SortFilterMapper } from './sort-filter-dropdown/sort-filter.mapper';
import { FormQuerySortFieldWithLabel } from './sort-filter-dropdown/sort-filters.builder';

@Component({
  selector: 'ce-sort-filter',
  templateUrl: './sort-filter.component.html',
  styleUrls: ['./sort-filter.component.scss'],

})
export class SortFilterComponent<T = any> implements OnInit {

  @Input()
  sortFilter!: FormQuerySortFieldWithLabel;

  @ViewChild(CdkConnectedOverlay)
  connectedOverlay!: CdkConnectedOverlay;

  @ViewChild(CdkOverlayOrigin, { read: ElementRef })
  overlayOrigin!: ElementRef;

  shouldOpenFilter = false;

  overlayPositions: ConnectedPosition[] = [{
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top'
  }];

  constructor(private queryService: CeFormQueryService<T>) {
    this.initSortFilter();
  }

  ngOnInit(): void { }

  applySortFilter(sortFilter: FormQuerySortFieldWithLabel) {
    this.updateSortFilter({ ...sortFilter, order: this.sortFilter.order });
  }

  toggleSortDirection() {
    this.updateSortFilter({ ...this.sortFilter, order: this.sortFilter.order === 'asc' ? 'desc' : 'asc' });
  }

  toggleFilter() {
    if (this.shouldOpenFilter) {
      this.closeFilter();
    } else {
      this.openFilter();
    }
  }

  closeFilter() {
    this.shouldOpenFilter = false;
  }

  private initSortFilter() {
    this.sortFilter = SortFilterMapper.map(this.queryService.getSort());
  }

  private updateSortFilter(sortFilter: FormQuerySortFieldWithLabel) {
    this.sortFilter = sortFilter;
    this.queryService.setSort(sortFilter);
    this.queryService.load();
  }

  private openFilter() {
    this.shouldOpenFilter = true;
  }
}
