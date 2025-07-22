import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { passwordStrengthProgressBar } from '../../utils/password-strength-progress-bar';

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
export class GeneralInformationsEditComponent implements OnInit {
  passwordStrength: number = 0;

  @Input({ required: true }) userForm: FormGroup = {} as FormGroup;

  ngOnInit() { }

  get nameControl(): FormControl {
    return this.userForm.get("generalInformations.name") as FormControl;
  }

  get emailControl(): FormControl {
    return this.userForm.get("generalInformations.email") as FormControl;
  }

  get passwordControl(): FormControl {
    return this.userForm.get("generalInformations.password") as FormControl;
  }

  get passwordConfirmControl (): FormControl {
    return this.userForm.get("generalInformations.passwordConfirm") as FormControl;
  }

  onPasswordInputAndChangesEvent(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.passwordStrength = passwordStrengthProgressBar(value);
  }
}