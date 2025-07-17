import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../../../angular-material/angular-material.module';

@Component({
  selector: 'app-phone-list-edit',
  standalone: true,
  imports: [
    AngularMaterialModule
  ],
  templateUrl: './phone-list-edit.component.html',
  styleUrl: './phone-list-edit.component.scss'
})
export class PhoneListEditComponent { }