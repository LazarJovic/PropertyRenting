import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePropertyTypeDialogComponent } from './create-property-type-dialog.component';

describe('CreatePropertyTypeDialogComponent', () => {
  let component: CreatePropertyTypeDialogComponent;
  let fixture: ComponentFixture<CreatePropertyTypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePropertyTypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePropertyTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
