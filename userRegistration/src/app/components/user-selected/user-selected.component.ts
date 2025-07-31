import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../interfaces/user/user.interface';
import { UserFormRawValueService } from '../../services/user-form-raw-value.service';
import { UsersService } from '../../services/users.service';
import { convertUserUpdateFormRawValueToUser } from '../../utils/convert-user-update-form-raw-value-to-user';
import { convertUserUpdateFormRawValueToUserUpdate } from '../../utils/convert-user-update-form-raw-value-to-user-update';
import { UserBeforeAfterMatDialogComponent } from '../user-before-after-mat-dialog/user-before-after-mat-dialog.component';
import { UserInformationsContainerComponent } from '../user-informations-container/user-informations-container.component';
import { UserUpdateButtonsContainerComponent } from '../user-update-buttons-container/user-update-buttons-container.component';
import { IUserBeforeAfterMatDialog } from '../../interfaces/user-before-afrter-mat-dialog.interface';

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
export class UserSelectedComponent implements OnInit {
  userSelected: IUser = {} as IUser;
  userBefore: IUser = {} as IUser;
  userSelectedIndex!: string;

  isInEditMode: boolean = true;
  enableSaveButton: boolean = false;
  userFormFirstValueChange: boolean = false;
  
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _usersService = inject(UsersService);
  private readonly _userFormRawValueService = inject(UserFormRawValueService);
  private readonly _matDialog = inject(MatDialog);

  ngOnInit() {
    this.getUser();
  }

  onEditButton() {
    this.isInEditMode = true;
  }

  onCancelButton() {
    this.isInEditMode = false;

    this.userSelected = structuredClone(this.userSelected);
  }

  onSaveButton() {
    this.userSelected = structuredClone(convertUserUpdateFormRawValueToUser(this._userFormRawValueService.userFormRawValue));

    this.onUserBeforeAfterDialog({
      before: this.userBefore,
      after: this.userSelected
    }, (confirm) => {
      if (confirm) {
        this.userBefore = structuredClone(this.userSelected);

        const newUser = convertUserUpdateFormRawValueToUserUpdate(this._userFormRawValueService.userFormRawValue);
        console.log("newuser =>", newUser);

        this._usersService.update(newUser).subscribe();

        this.userFormFirstValueChange = false;
        this.isInEditMode = false;

      } else {
        this.userSelected = structuredClone(this.userBefore);
      }
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

  private onUserBeforeAfterDialog(data: IUserBeforeAfterMatDialog, callback: (confirm: boolean) => void) {
    const confirmDialog = this._matDialog.open(UserBeforeAfterMatDialogComponent, {
      data,
      width: "70%"
    });

    confirmDialog.afterClosed().subscribe(confirm);
  }
}