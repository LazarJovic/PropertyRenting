import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsListDialogComponent } from './comments-list-dialog.component';

describe('CommentsListDialogComponent', () => {
  let component: CommentsListDialogComponent;
  let fixture: ComponentFixture<CommentsListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
