import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { SearchHint } from '../../model/search-hint';
import { SearchHintBaseWidget } from '../search-hint-widget-factory/search-hint-widget-factory.component';
@Component({
  selector: 'ce-search-hint-timestamp-widget',
  templateUrl: './search-hint-timestamp-widget.component.html',
  styleUrls: ['./search-hint-timestamp-widget.component.scss']
})
export class SearchHintTimestampWidgetComponent extends SearchHintBaseWidget implements OnInit {

  ngOnInit(): void { }

  onSelectDate(date: Moment) {
    this.value$.next(date.unix() * 1000)
  }
}
