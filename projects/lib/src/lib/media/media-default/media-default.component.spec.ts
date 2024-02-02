import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaDefaultComponent } from './media-default.component';

describe('MediaDefaultComponent', () => {
  let component: MediaDefaultComponent;
  let fixture: ComponentFixture<MediaDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
