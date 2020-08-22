import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePropertyCardComponent } from './choose-property-card.component';

describe('ChoosePropertyCardComponent', () => {
  let component: ChoosePropertyCardComponent;
  let fixture: ComponentFixture<ChoosePropertyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosePropertyCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePropertyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
