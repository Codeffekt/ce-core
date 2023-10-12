import { Component, Input, OnInit } from '@angular/core';
import { IndexType } from '@codeffekt/ce-core-data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CeFormQueryBookmarks, FormQueryBookmark } from '../forms/forms-query';
import { CeFormQueryService } from '../services/ce-form-query.service';

export type BookmarksComponentDisplayMode = 'tabs' | 'menu';

@UntilDestroy()
@Component({
  selector: 'ce-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent<T> implements OnInit {

  @Input() displayMode: BookmarksComponentDisplayMode = 'tabs';
  @Input() menuTitle: string = "Menu";
  bookmarks$: Observable<CeFormQueryBookmarks>;
  activeBookmark: IndexType;

  constructor(private queryService: CeFormQueryService<T>) { }

  ngOnInit(): void {
    this.initBookmarks();
    this.observeActiveBookmark();
  }

  setBookmark(bookmark: FormQueryBookmark) {
    this.queryService.setActiveBookmark(bookmark);
    this.queryService.setPaginationFirstPage();
    this.queryService.load();
  }

  private initBookmarks() {
    this.bookmarks$ = this.queryService.bookmarks();
  }

  private observeActiveBookmark() {
    this.queryService.evt().pipe(
      untilDestroyed(this),
      filter(evt => evt.type === "active-bookmark")
    ).subscribe(evt => this.activeBookmark = evt.data?.id);
  }
}
