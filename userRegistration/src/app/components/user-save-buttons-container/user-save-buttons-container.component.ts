import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { buttonStylePipe } from '../../pipes/button-style.pipe';

@Component({
  selector: 'app-user-save-buttons-container',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    buttonStylePipe
  ],
  templateUrl: './user-save-buttons-container.component.html',
  styleUrl: './user-save-buttons-container.component.scss'
})
export class UserSaveButtonsContainerComponent {

}