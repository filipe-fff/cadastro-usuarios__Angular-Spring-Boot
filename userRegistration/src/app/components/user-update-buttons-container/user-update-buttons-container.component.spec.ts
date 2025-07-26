import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateButtonsContainerComponent } from './user-update-buttons-container.component';

describe('UserUpdateButtonsContainerComponent', () => {
  let component: UserUpdateButtonsContainerComponent;
  let fixture: ComponentFixture<UserUpdateButtonsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserUpdateButtonsContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserUpdateButtonsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
