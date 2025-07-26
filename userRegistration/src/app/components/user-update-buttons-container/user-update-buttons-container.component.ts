import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { buttonStylePipe } from '../../pipes/button-style.pipe';

@Component({
  selector: 'app-user-update-buttons-container',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    buttonStylePipe
  ],
  templateUrl: './user-update-buttons-container.component.html',
  styleUrl: './user-update-buttons-container.component.scss'
})
export class UserUpdateButtonsContainerComponent {

  @Input({ required: true }) isInEditMode: boolean = false;
  @Input({ required: true }) enableSaveButton: boolean = false;

  @Output("onEditButton") onEditButtonEmitt = new EventEmitter<void>();
  @Output("onCancelButton") onCancelButtonEmitt = new EventEmitter<void>();
  @Output("onSaveButton") onSaveButtonEmitt = new EventEmitter<void>();

  private readonly _router = inject(Router);

  onUsersListButton() {
    this._router.navigate(["/users-list"]);
  }

  onEditButton() {
    this.onEditButtonEmitt.emit();
  }

  onCancelButton() {
    this.onCancelButtonEmitt.emit();
  }

  onSaveButton() {
    if (!this.enableSaveButton) return;

    this.onSaveButtonEmitt.emit();
  }
}