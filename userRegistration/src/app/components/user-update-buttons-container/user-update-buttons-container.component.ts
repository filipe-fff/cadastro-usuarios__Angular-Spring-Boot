import { Component } from '@angular/core';
import { buttonStylePipe } from '../../pipes/button-style.pipe';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';

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
export class UserUpdateButtonsContainerComponent {}