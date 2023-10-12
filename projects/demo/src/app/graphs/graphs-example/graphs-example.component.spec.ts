import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphsExampleComponent } from './graphs-example.component';

describe('GraphsExampleComponent', () => {
  let component: GraphsExampleComponent;
  let fixture: ComponentFixture<GraphsExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphsExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
