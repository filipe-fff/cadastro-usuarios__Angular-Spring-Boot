import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IUserBeforeAfterMatDialog } from '../../interfaces/user-before-afrter-mat-dialog.interface';
import { IUser } from '../../interfaces/user/user.interface';
import { UserFormRawValueService } from '../../services/user-form-raw-value.service';
import { UsersService } from '../../services/users.service';
import { convertUserUpdateFormRawValueToUser } from '../../utils/convert-user-update-form-raw-value-to-user';
import { convertUserUpdateFormRawValueToUserUpdate } from '../../utils/convert-user-update-form-raw-value-to-user-update';
import { UserBeforeAfterMatDialogComponent } from '../user-before-after-mat-dialog/user-before-after-mat-dialog.component';
import { UserInformationsContainerComponent } from '../user-informations-container/user-informations-container.component';
import { UserUpdateButtonsContainerComponent } from '../user-update-buttons-container/user-update-buttons-container.component';
import { ConfirmMatDialogService } from '../../services/confirm-mat-dialog.service';
import { UserBeforeAfterMatDialogService } from '../../services/user-before-after-mat-dialog.service';
import { ICanDeactivateWithDialog } from '../../interfaces/can-deactivate-with-dialog.interface';

@Component({
  selector: 'app-user-selected',
  standalone: true,
  imports: [
    UserUpdateButtonsContainerComponent,
    UserInformationsContainerComponent
  ],
  templateUrl: './user-selected.component.html',
  styleUrl: './user-selected.component.scss'
})
export class UserSelectedComponent implements OnInit, ICanDeactivateWithDialog {
  userSelected: IUser = {} as IUser;
  userBefore: IUser = {} as IUser;
  userSelectedIndex!: string;

  isInEditMode: boolean = true;
  enableSaveButton: boolean = false;
  userFormFirstValueChange: boolean = false;
  
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _usersService = inject(UsersService);
  private readonly _confirmMatDialogService = inject(ConfirmMatDialogService);
  private readonly _userBeforeAfterMatDialogService = inject(UserBeforeAfterMatDialogService);
  private readonly _userFormRawValueService = inject(UserFormRawValueService);

  ngOnInit() {
    this.getUser();
  }

  onEditButton() {
    this.isInEditMode = true;
  }

  onCancelButton() {

    if (this.userFormFirstValueChange) {

      this._confirmMatDialogService.open({
        title: "Cancelar as Alterações.",
        description: "O Formulário foi alterado, você quer realmente cancelar as alterações?"
      }, (value: boolean) => {
        if (!value) return;

        this.userSelected = structuredClone(this.userSelected);

        this.isInEditMode = false;
        this.userFormFirstValueChange = false;
      });

    } else {
      this.isInEditMode = false;
    }
  }

  onSaveButton() {
    const newUser = convertUserUpdateFormRawValueToUser(this._userFormRawValueService.userFormRawValue);

    this._userBeforeAfterMatDialogService.open({
      before: this.userBefore,
      after: newUser
    }, (value) => {
      
      if (!value) return;

        this.userSelected = structuredClone(newUser);
        this.userBefore = structuredClone(newUser);

        this.onUserUpdate();

        this.userFormFirstValueChange = false;
        this.isInEditMode = false;

        console.log("SALVOU !!!");
    });
  }

  onEnableSaveButton(enable: boolean) {
    setTimeout(() => this.enableSaveButton = enable, 0);
  }

  onUserFormFirstChange() {
    console.log("onUserFormFirstValueChange");

    this.userFormFirstValueChange = true;
  }

  private getUser() {
    this._activatedRoute.params.subscribe(params => this.userSelectedIndex = params["id"]);

    this._usersService
      .getUserById(this.userSelectedIndex as string)
      .subscribe(userResponse => {
        this.userSelected = userResponse;
        this.userBefore = userResponse;
      });
  }

  private onUserUpdate() {
    const newUser = convertUserUpdateFormRawValueToUserUpdate(this._userFormRawValueService.userFormRawValue);
    this._usersService.update(newUser).subscribe({
      next: () => console.log("Atualizado com sucesso!"),
      error: (err) => console.log(err)
    });
  }
}