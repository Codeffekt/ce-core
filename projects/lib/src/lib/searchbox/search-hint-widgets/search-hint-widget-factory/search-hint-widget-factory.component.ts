import { AfterViewInit, Component, ComponentRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBlock } from '@codeffekt/ce-core-data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, Subject } from 'rxjs';
import { SearchHint } from '../../model/search-hint';
import { SearchHintWidgetFactoryService } from '../../services/search-hint-widget-factory.service';

export class SearchHintBaseWidget {

  formBlock: FormBlock;

  protected value$ = new Subject<any>();

  valueChanged(): Observable<any> {
    return this.value$;
  }
}

@UntilDestroy()
@Component({
  selector: 'ce-search-hint-widget-factory',
  templateUrl: './search-hint-widget-factory.component.html',
  styleUrls: ['./search-hint-widget-factory.component.scss']
})
export class SearchHintWidgetFactoryComponent implements AfterViewInit {

  @Input() formBlock: FormBlock;
  @Output() value = new EventEmitter();

  @ViewChild('container', { read: ViewContainerRef }) vcr: ViewContainerRef;
  private hintWidgetComponent: ComponentRef<SearchHintBaseWidget>;

  constructor(
    private factoryService: SearchHintWidgetFactoryService
  ) { }


  ngAfterViewInit(): void {
    if (!this.formBlock) {
      return;
    }

    const componentType = this.factoryService.getBuilder(this.formBlock);
    if (componentType) {
      this.hintWidgetComponent = this.vcr.createComponent(componentType);
      this.hintWidgetComponent.instance.formBlock = this.formBlock;
      this.hintWidgetComponent.instance.valueChanged()
        .pipe(untilDestroyed(this))
        .subscribe(value => this.value.emit(value))
      this.hintWidgetComponent.changeDetectorRef.detectChanges();
    }
  }

}
