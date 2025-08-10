import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSaveButtonsContainerComponent } from './user-save-buttons-container.component';

describe('UserSaveButtonsContainerComponent', () => {
  let component: UserSaveButtonsContainerComponent;
  let fixture: ComponentFixture<UserSaveButtonsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSaveButtonsContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSaveButtonsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
