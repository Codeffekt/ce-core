import { EventEmitter, Component, OnInit, Output, OnDestroy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, tap } from 'rxjs';
import { SearchHint, SearchHints } from '../model/search-hint';
import { SearchHintService } from '../services/search-hint.service';
import { FormBlock } from '@codeffekt/ce-core-data';
@UntilDestroy()
@Component({
  selector: 'ce-search-hint-dropdown',
  templateUrl: './search-hint-dropdown.component.html',
  styleUrls: ['./search-hint-dropdown.component.scss']
})
export class SearchHintDropdownComponent implements OnInit {

  hints?: SearchHints;
  activeHint?: SearchHint;

  @Output()
  hint = new EventEmitter<SearchHint>();

  constructor(private searchHintsService: SearchHintService) { }

  ngOnInit(): void {
    this.listenHints();
    this.listenActiveHint();
  }

  select(hint: SearchHint) {
    this.hint.next(hint);
  }

  selectValue(value: any) {
    this.select({ value });
  }

  private listenActiveHint() {
    this.searchHintsService.activeHintChanges()
      .pipe(untilDestroyed(this))
      .subscribe(activeHint => this.activeHint = activeHint!);
  }

  private listenHints() {
    this.searchHintsService.hintsValues()
      .pipe(untilDestroyed(this))
      .subscribe(hints => this.hints = hints);
  }
}