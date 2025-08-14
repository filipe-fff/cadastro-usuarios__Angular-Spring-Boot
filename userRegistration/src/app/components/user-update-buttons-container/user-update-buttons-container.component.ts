import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output("onUsersListRouterButton") onUsersListRouterButtonEmitt = new EventEmitter<boolean>();
  @Output("onEditButton") onEditButtonEmitt = new EventEmitter<void>();
  @Output("onCancelButton") onCancelButtonEmitt = new EventEmitter<void>();
  @Output("onSaveButton") onSaveButtonEmitt = new EventEmitter<void>();

  onUsersListRouterButton(dialogEnabled: boolean) {
    this.onUsersListRouterButtonEmitt.emit(dialogEnabled);
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