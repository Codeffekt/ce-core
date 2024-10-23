import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { FormInstance, FormRoot } from '@codeffekt/ce-core-data';
import { Subscription } from 'rxjs';
import { PaginatorURLHandler } from '../../pages/paginator-url-handler';
import { CeFormsService } from '../../services/ce-forms.service';
import { LayoutService } from '../../services/layout.service';
import { FormsDataSource } from '../form-datasource/forms-datasource';
import { FormsFormQueryBuilder } from '../forms-query';
import { CeFormsRouteResolver, CE_FORMS_ROUTE_RESOLVER } from '../forms-route.resolver';

@Component({
  selector: 'ce-forms-table',
  templateUrl: './forms-table.component.html',
  styleUrls: ['./forms-table.component.scss']
})
export class FormsTableComponent implements OnInit {

  @ViewChild(MatSort) tableSort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() displayedColumns = ['id', 'ctime', 'mtime', 'title', 'delete'];
  @Input() queryBuilder: FormsFormQueryBuilder = new FormsFormQueryBuilder();

  formsDataSource!: FormsDataSource;
  paginatorUrl!: PaginatorURLHandler;

  private paginatorSubscription = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private layout: LayoutService,
    private formsService: CeFormsService,
    @Inject(CE_FORMS_ROUTE_RESOLVER) private routeResolver: CeFormsRouteResolver,
  ) { }

  ngOnInit(): void {
    this.formsDataSource = new FormsDataSource(this.formsService);
  }

  ngAfterViewInit() {
    this.observePaginator();
  }

  ngOnDestroy() {
    this.paginatorSubscription.unsubscribe();
  }

  applySort(sort: Sort) {
    const sortField = sort.direction ? { field: sort.active, order: sort.direction } : null;
    this.queryBuilder.setSort(sortField!);
    this.paginatorUrl.reset();
    this.load();
  }

  applyFilter(filterValue: string) {
    this.queryBuilder.setFilter(filterValue);
    this.paginatorUrl.reset();
    this.load();
  }

  onSelected(form: FormRoot) {
    this.router.navigate(this.routeResolver.resolve("forms.edit", form.id).route);
  }

  async delete(form: FormInstance) {
    try {
      await this.formsService.deleteForm(form.id);
      this.layout.showSingleMessage(`Formulaire supprimé avec succès`);
      this.load();
    } catch (err) {
      this.layout.showErrorMessage(`Erreur lors de la suppression du formulaire`);
    }
  }

  private observePaginator() {
    this.paginatorUrl = new PaginatorURLHandler(this.router, this.route, this.paginator);
    this.paginatorSubscription = this.paginatorUrl
      .connect()
      .subscribe((paginationState) => {
        this.queryBuilder.setPagination(paginationState.pageIndex, paginationState.pageSize);
        this.load();
      });
  }

  private load() {
    if (this.paginator) {
      this.formsDataSource.load(
        this.queryBuilder.create()
      );
    }
  }
}
