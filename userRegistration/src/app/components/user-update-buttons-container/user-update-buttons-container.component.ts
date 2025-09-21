import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { ButtonStylePipe } from '../../pipes/button-style.pipe';

@Component({
  selector: 'app-user-update-buttons-container',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    ButtonStylePipe
  ],
  templateUrl: './user-update-buttons-container.component.html',
  styleUrl: './user-update-buttons-container.component.scss'
})
export class UserUpdateButtonsContainerComponent {

  @Input({ required: true }) isInEditMode: boolean = false;
  @Input({ required: true }) enableSaveButton: boolean = false;

  @Output("onUsersListRouterButton") onUsersListRouterButtonEmitt = new EventEmitter<boolean>();
  
  @Output("onDeleteButton") onDeleteButtonEmitt = new EventEmitter<void>();
  @Output("onEditButton") onEditButtonEmitt = new EventEmitter<void>();
  @Output("onCancelButton") onCancelButtonEmitt = new EventEmitter<void>();
  @Output("onSaveButton") onSaveButtonEmitt = new EventEmitter<void>();

  onUsersListRouterButton(dialogEnabled: boolean) {
    this.onUsersListRouterButtonEmitt.emit(dialogEnabled);
  }

  onDeleteButton() {
    this.onDeleteButtonEmitt.emit();
  }

  onEditButton() {
    this.onEditButtonEmitt.emit();
  }

  onCancelButton() {
    this.onCancelButtonEmitt.emit();
  }

  onSaveButton() {
    this.onSaveButtonEmitt.emit();
  }
}