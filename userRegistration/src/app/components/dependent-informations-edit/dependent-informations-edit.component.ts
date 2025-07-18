import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { buttonStylePipe } from '../../pipes/button-style.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dependent-informations-edit',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    buttonStylePipe
  ],
  templateUrl: './dependent-informations-edit.component.html',
  styleUrl: './dependent-informations-edit.component.scss'
})
export class DependentInformationsEditComponent { }