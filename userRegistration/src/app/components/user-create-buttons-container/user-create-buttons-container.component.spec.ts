import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateButtonsContainerComponent } from './user-create-buttons-container.component';

describe('UserCreateButtonsContainerComponent', () => {
  let component: UserCreateButtonsContainerComponent;
  let fixture: ComponentFixture<UserCreateButtonsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCreateButtonsContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCreateButtonsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
