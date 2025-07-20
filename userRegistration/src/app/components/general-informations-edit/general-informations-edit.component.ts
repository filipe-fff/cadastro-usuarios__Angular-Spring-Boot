import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';

@Component({
  selector: 'app-general-informations-edit',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './general-informations-edit.component.html',
  styleUrl: './general-informations-edit.component.scss'
})
export class GeneralInformationsEditComponent {
  @Input({ required: true }) userForm: FormGroup = {} as FormGroup;

  get nameControl(): FormControl {
    return this.userForm.get("generalInformations.name") as FormControl;
  }

  get emailControl(): FormControl {
    return this.userForm.get("generalInformations.email") as FormControl;
  }
}