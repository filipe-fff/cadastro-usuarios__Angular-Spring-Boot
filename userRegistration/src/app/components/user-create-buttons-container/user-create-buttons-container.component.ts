import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { buttonStylePipe } from '../../pipes/button-style.pipe';

@Component({
  selector: 'app-user-create-buttons-container',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    buttonStylePipe
  ],
  templateUrl: './user-create-buttons-container.component.html',
  styleUrl: './user-create-buttons-container.component.scss'
})
export class UserCreateButtonsContainerComponent {

  @Input({ required: true }) isInEditMode: boolean = false;
  @Input({ required: true }) enableSaveButton: boolean = false;

  @Output("onUsersListRouterButton") onUsersListRouterButtonEmitt = new EventEmitter<boolean>();
  @Output("onCreateButton") onCreateButtonEmitt = new EventEmitter<void>();

  onUsersListButton(dialogEnabled: boolean) {
    this.onUsersListRouterButtonEmitt.emit(dialogEnabled);
  }

  onCreateButton() {
    this.onCreateButtonEmitt.emit();
  }
}