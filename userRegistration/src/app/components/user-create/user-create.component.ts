import { Component, inject, OnInit } from '@angular/core';
import { ICanDeactivateWithDialog } from '../../interfaces/can-deactivate-with-dialog.interface';
import { UserInformationsContainerComponent } from '../user-informations-container/user-informations-container.component';
import { IUser } from '../../interfaces/user/user.interface';
import { UserFormRawValueService } from '../../services/user-form-raw-value.service';
import { UserCreateButtonsContainerComponent } from '../user-create-buttons-container/user-create-buttons-container.component';
import { Router } from '@angular/router';
import { ConfirmExistService } from '../../services/confirm-exit.service';
import { convertUserFormRawValueToUserCreate } from '../../utils/convert-user-form-raw-value-to-user-create';

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
export class UserCreateComponent implements OnInit, ICanDeactivateWithDialog {
  newUser: IUser = {} as IUser;

  isInEditMode: boolean = true;
  enableSaveButton: boolean = false;
  shouldMarkUserFormTouchedAndValidity: boolean = false;

  private readonly _router = inject(Router);
  private readonly _userFormRawValue = inject(UserFormRawValueService);
  private readonly _confirmExitService = inject(ConfirmExistService);

  ngOnInit(): void {
    this.getNewUser();
  }

  onUsersListRouterButton(dialogEnabled: boolean) {
    this._confirmExitService.dialogEnabled = dialogEnabled;
    this._router.navigate(["/"]);
  }

  onCreateButton() {
    // this.isInEditMode = false;
    // console.log("CRIOU !!!");
    console.log(convertUserFormRawValueToUserCreate(this._userFormRawValue.userFormRawValue));
  }

  onEnableSaveButton(enable: boolean) {
    this.enableSaveButton = enable;
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