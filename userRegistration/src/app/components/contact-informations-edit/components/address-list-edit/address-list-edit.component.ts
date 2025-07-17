import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../../../angular-material/angular-material.module';

@Component({
  selector: 'app-address-list-edit',
  standalone: true,
  imports: [
    AngularMaterialModule
  ],
  templateUrl: './address-list-edit.component.html',
  styleUrl: './address-list-edit.component.scss'
})
export class AddressListEditComponent { }