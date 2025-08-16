import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ICanDeactivateWithDialog } from '../../interfaces/can-deactivate-with-dialog.interface';
import { IUser } from '../../interfaces/user/user.interface';
import { ConfirmExistService } from '../../services/confirm-exit.service';
import { UserFormRawValueService } from '../../services/user-form-raw-value.service';
import { convertUserFormRawValueToUserCreate } from '../../utils/convert-user-form-raw-value-to-user-create';
import { UserCreateButtonsContainerComponent } from '../user-create-buttons-container/user-create-buttons-container.component';
import { UserInformationsContainerComponent } from '../user-informations-container/user-informations-container.component';
import { ConfirmMatDialogService } from '../../services/confirm-mat-dialog.service';
import { convertUserFormRawValueToUser } from '../../utils/convert-user-form-raw-value-to-user';
import { UsersService } from '../../services/users.service';
import { IUserCreate } from '../../interfaces/user-create/user-create.interface';

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
  title: string = "Criar Usuário";
  
  userSelected: IUser = {} as IUser;

  isInEditMode: boolean = true;
  enableSaveButton: boolean = false;
  shouldMarkUserFormTouchedAndValidity: boolean = false;

  focusFirstInvalidControl$ = new Subject<void>();

  private readonly _destroy$ = new Subject<void>();
  private readonly _router = inject(Router);
  private readonly _usersService = inject(UsersService);
  private readonly _userFormRawValue = inject(UserFormRawValueService);
  private readonly _confirmExitService = inject(ConfirmExistService);
  private readonly _confirmMatDialogService = inject(ConfirmMatDialogService);

  ngOnInit() {
    this.getNewUser();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
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

    this._confirmMatDialogService.open({
      title: "Criar um Novo Usuário",
      description: "Um novo Usuário registrado, você quer realmente criar um novo usuário?"
    }, (value) => {
      if (!value) return;

      this.isInEditMode = false;
      this.userSelected = structuredClone(convertUserFormRawValueToUser(this._userFormRawValue.userFormRawValue));
      const newUser = convertUserFormRawValueToUserCreate(this._userFormRawValue.userFormRawValue);
      this.onUserCreate(newUser);
    });
  }

  onEnableSaveButton(enable: boolean) {
    setTimeout(() => {
      this.enableSaveButton = enable;
    });
  }

  private getNewUser() {
    this.userSelected = ({
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

  private onUserCreate(newUser: IUserCreate) {
    this._usersService
      .save(newUser)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: () => console.log("Criado com sucesso!"),
        error: (err) => console.error(err)
      })
  }
}