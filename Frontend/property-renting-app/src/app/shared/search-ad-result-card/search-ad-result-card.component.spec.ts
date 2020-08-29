import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAdResultCardComponent } from './search-ad-result-card.component';

describe('SearchAdResultCardComponent', () => {
  let component: SearchAdResultCardComponent;
  let fixture: ComponentFixture<SearchAdResultCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAdResultCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAdResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
