import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ICanDeactivateWithDialog } from '../../interfaces/can-deactivate-with-dialog.interface';
import { IUser } from '../../interfaces/user/user.interface';
import { ConfirmExistService } from '../../services/confirm-exit.service';
import { UserFormRawValueService } from '../../services/user-form-raw-value.service';
import { convertUserFormRawValueToUserCreate } from '../../utils/convert-user-form-raw-value-to-user-create';
import { UserCreateButtonsContainerComponent } from '../user-create-buttons-container/user-create-buttons-container.component';
import { UserInformationsContainerComponent } from '../user-informations-container/user-informations-container.component';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    UserInformationsContainerComponent,
    UserCreateButtonsContainerComponent
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent implements OnInit, OnDestroy, ICanDeactivateWithDialog {
  newUser: IUser = {} as IUser;

  isInEditMode: boolean = true;
  enableSaveButton: boolean = false;
  shouldMarkUserFormTouchedAndValidity: boolean = false;

  focusFirstInvalidControl$ = new Subject<void>();

  private readonly _router = inject(Router);
  private readonly _userFormRawValue = inject(UserFormRawValueService);
  private readonly _confirmExitService = inject(ConfirmExistService);

  ngOnInit() {
    this.getNewUser();
  }

  ngOnDestroy() {
    this.focusFirstInvalidControl$.complete();
  }

  onUsersListRouterButton(dialogEnabled: boolean) {
    this._confirmExitService.dialogEnabled = dialogEnabled;
    this._router.navigate(["/"]);
  }

  onCreateButton() {
    if (!this.enableSaveButton) {
      this.focusFirstInvalidControl$.next();
      return;
    }

    // this.isInEditMode = false;
    console.log("CRIOU !!!");
    console.log(convertUserFormRawValueToUserCreate(this._userFormRawValue.userFormRawValue));
  }

  onEnableSaveButton(enable: boolean) {
    setTimeout(() => {
      this.enableSaveButton = enable;
    });
  }

  showUserForm() {
    console.log("userForm =>", this._userFormRawValue.userFormRawValue);
  }

  private getNewUser() {
    this.newUser = ({
      id: "",
      name: "",
      photoUrl: "",
      email: "",
      password: "",
      country: "",
      state: "",
      maritalStatus: null,
      monthlyIncome: null,
      birthDate: "",
      phoneList: [],
      addressList: [],
      dependents: [],
      musics: []
    }) as IUser;
  }
}