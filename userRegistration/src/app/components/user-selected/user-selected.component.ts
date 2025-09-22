import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { ICanDeactivateWithDialog } from '../../interfaces/can-deactivate-with-dialog.interface';
import { IUser } from '../../interfaces/user/user.interface';
import { ConfirmExistService } from '../../services/confirm-exit.service';
import { ConfirmMatDialogService } from '../../services/confirm-mat-dialog.service';
import { UserBeforeAfterMatDialogService } from '../../services/user-before-after-mat-dialog.service';
import { UserFormRawValueService } from '../../services/user-form-raw-value.service';
import { UsersService } from '../../services/users.service';
import { convertUserFormRawValueToUser } from '../../utils/convert-user-form-raw-value-to-user';
import { convertUserFormRawValueToUserUpdate } from '../../utils/convert-user-form-raw-value-to-user-update';
import { UserInformationsContainerComponent } from '../user-informations-container/user-informations-container.component';
import { UserUpdateButtonsContainerComponent } from '../user-update-buttons-container/user-update-buttons-container.component';
import { UserPhoto } from '../../types/user-photo';

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
export class UserSelectedComponent implements OnInit, OnDestroy, ICanDeactivateWithDialog {
  title: string = "Área de Usuário";
  userSelected: IUser = {} as IUser;
  userBefore: IUser = {} as IUser;
  userSelectedIndex!: string;

  isInEditMode: boolean = true;
  shouldMarkUserFormTouchedAndValidity: boolean = true;
  enableSaveButton: boolean = false;
  userFormFirstValueChange: boolean = false;

  focusFirstInvalidControl$ = new Subject<void>();
  
  private readonly _destroy$ = new Subject<void>();
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _usersService = inject(UsersService);
  private readonly _confirmMatDialogService = inject(ConfirmMatDialogService);
  private readonly _userBeforeAfterMatDialogService = inject(UserBeforeAfterMatDialogService);
  private readonly _userFormRawValueService = inject(UserFormRawValueService);
  private readonly _confirmExistService = inject(ConfirmExistService);

  ngOnInit() {
    this.getUser();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
    this.focusFirstInvalidControl$.complete();
  }

  onUsersListRouterButton(dialogEnabled: boolean) {
    this._confirmExistService.dialogEnabled = dialogEnabled;
    this._router.navigate(["/"]);
  }

  onDeleteButton() {
    this._confirmMatDialogService.open({
      title: "Confirmar exclusão de usuário.",
      description: "Tem certeza de que deseja excluir este usuário? Essa ação é permanente e não poderá ser desfeita."
    }, (value) => {
      if (!value) return;
      this._usersService
        .delete(this.userSelected.id)
        .pipe(takeUntil(this._destroy$))
        .subscribe({
          next: () => {
            console.log("Deletado com sucesso!")
            this._confirmExistService.dialogEnabled = false;
            this._router.navigate(["/"]);
          },
          error: (err) => console.error(err)
        });
    });
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
    if (!this.enableSaveButton) {
      this.focusFirstInvalidControl$.next();
      return;
    };

    const newUser = convertUserFormRawValueToUser(this._userFormRawValueService.userFormRawValue);

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
    });
  }

  onEnableSaveButton(enable: boolean) {
    setTimeout(() => this.enableSaveButton = enable, 0);
  }

  onUserFormFirstChange() {
    this.userFormFirstValueChange = true;
  }

  private getUser() {
    this._activatedRoute
        .params
        .pipe(
          tap(params => this.userSelectedIndex = params["id"] as string),
          switchMap(() => this._usersService.getUserById(this.userSelectedIndex)),
          takeUntil(this._destroy$)
        ).subscribe(userResponse => {
          this.userSelected = userResponse;
          this.userBefore = userResponse;
          this.getPhoto(this.userSelected.id);
        });
  }

  private getPhoto(id: string | null) {
    console.log("id =>", id);
    if (id === null) return;

    this._usersService
      .getUserPhotoById(id)
      .pipe(take(1), takeUntil(this._destroy$))
      .subscribe((photo: Blob | null) => {
        this.userSelected = { ...this.userSelected, photo };
      });
  }

  private onUserUpdate() {
    const newUser = convertUserFormRawValueToUserUpdate(this._userFormRawValueService.userFormRawValue);
    this._usersService
      .update(newUser)
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe({
        next: () => console.log("Atualizado com sucesso!"),
        error: (err) => console.error(err)
      });
  }
}