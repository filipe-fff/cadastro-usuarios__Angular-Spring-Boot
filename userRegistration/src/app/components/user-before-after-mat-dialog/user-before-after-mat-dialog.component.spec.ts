import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBeforeAfterMatDialogComponent } from './user-before-after-mat-dialog.component';

describe('UserBeforeAfterMatDialogComponent', () => {
  let component: UserBeforeAfterMatDialogComponent;
  let fixture: ComponentFixture<UserBeforeAfterMatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBeforeAfterMatDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserBeforeAfterMatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
