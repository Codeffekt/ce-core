import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { FormBlockComponent } from '../form-block/form-block.component';

@Component({
  selector: 'ce-form-text-block',
  templateUrl: './form-text-block.component.html',
  styleUrls: ['./form-text-block.component.scss']
})
export class FormTextBlockComponent extends FormBlockComponent<string> implements OnInit {

  suggestions$ = new ReplaySubject<string[]>();

  constructor() {
    super()
  }

  ngOnInit() {
    this.initSuggestions();
  }

  valueChanged(value: string) {
    if (this.hasSuggestions()) {
      this.filterSuggestions(value);
    }
  }

  private initSuggestions() {
    if (this.hasSuggestions()) {
      this.filterSuggestions();
    }
  }

  private filterSuggestions(filterValue: string = '') {
    const filteredSuggestions =
      this.getFormSuggestions()
        .filter(suggestion => suggestion.toLowerCase().includes(filterValue.toLowerCase()));
    this.suggestions$.next(filteredSuggestions);
  }

  private hasSuggestions() {
    return !!this.formBlock?.params?.suggestions;
  }

  private getFormSuggestions(): string[] {
    return this.formBlock.params?.suggestions;
  }
}
