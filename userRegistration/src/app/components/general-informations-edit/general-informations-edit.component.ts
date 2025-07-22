import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { passwordStrengthProgressBar } from '../../utils/password-strength-progress-bar';
import { CountriesList } from '../../types/countries-list';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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
export class GeneralInformationsEditComponent implements OnInit, OnChanges {
  passwordStrength: number = 0;
  countriesListFiltered: CountriesList = [];

  @Input({ required: true }) userForm: FormGroup = {} as FormGroup;
  @Input({ required: true }) countriesList: CountriesList = [];

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void { }

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

  onCountryInputEvent(searchTerm: Event) {
    const countryName = (searchTerm.target as HTMLInputElement).value;

    if (!countryName) return;

    this.onFilterCountriesList(countryName);
  }

  onCountryFocusEvent() {
    this.countriesListFiltered = this.countriesList;
  }

  onCountrySelected(event: MatAutocompleteSelectedEvent) {
    const searchTerm = event.option.value;

    if (!searchTerm) return;
  }

  private onFilterCountriesList(searchTerm: string) {
    const countryName = searchTerm.toLocaleLowerCase().trim();
    
    this.countriesListFiltered = this.countriesList.filter(countryResponse => countryResponse.name.toLocaleLowerCase().includes(countryName));
  }
}