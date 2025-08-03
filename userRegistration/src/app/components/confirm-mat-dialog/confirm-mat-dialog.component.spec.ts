import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMatDialogComponent } from './confirm-mat-dialog.component';

describe('ConfirmMatDialogComponent', () => {
  let component: ConfirmMatDialogComponent;
  let fixture: ComponentFixture<ConfirmMatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmMatDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmMatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
