import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHintWidgetFactoryComponent } from './search-hint-widget-factory.component';

describe('SearchHintWidgetFactoryComponent', () => {
  let component: SearchHintWidgetFactoryComponent;
  let fixture: ComponentFixture<SearchHintWidgetFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchHintWidgetFactoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHintWidgetFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
