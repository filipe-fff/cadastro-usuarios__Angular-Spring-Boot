import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { passwordStrengthProgressBar } from '../../utils/password-strength-progress-bar';
import { CountriesList } from '../../types/countries-list';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { StatesList } from '../../types/states-list';
import { MaritalStatusObjList } from '../../types/marital-status-obj-list';
import { maritalStatusObjArray } from '../../utils/marital-status-description-map';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-general-informations-edit',
  standalone: true,
  imports: [
    CommonModule,
    NgxMaskDirective,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './general-informations-edit.component.html',
  styleUrl: './general-informations-edit.component.scss'
})
export class GeneralInformationsEditComponent implements OnInit, OnChanges {
  passwordStrength: number = 0;
  countriesListFiltered: CountriesList = [];
  statesListFiltered: StatesList = [];

  @Input({ required: true }) userForm: FormGroup = {} as FormGroup;
  @Input({ required: true }) countriesList: CountriesList = [];
  @Input({ required: true }) statesList: StatesList = [];

  @Output("onCountrySelected") onCountrySelectedEmitter = new EventEmitter<string>();

  ngOnInit() {
    this.watchCountryValueChange();
    this.watchStateValueChange();
  }

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

  get countryControl(): FormControl {
    return this.userForm.get("generalInformations.country") as FormControl;
  }

  get stateControl(): FormControl {
    return this.userForm.get("generalInformations.state") as FormControl;
  }

  get maritalStatusObjList(): MaritalStatusObjList {
    return maritalStatusObjArray;
  }

  get monthlyIncome(): FormControl {
    return this.userForm.get("generalInformations.monthlyIncome") as FormControl;
  }

  onPasswordInputAndChangesEvent(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.passwordStrength = passwordStrengthProgressBar(value);
  }

  watchCountryValueChange() {
    this.countryControl.valueChanges.subscribe(this.onFilterCountriesList.bind(this));
  }

  onCountryFocusEvent() {
    this.countriesListFiltered = this.countriesList;
  }

  onCountrySelected(event: MatAutocompleteSelectedEvent) {
    const searchTerm = event.option.value;

    if (!searchTerm) return;

    this.onCountrySelectedEmitter.emit(searchTerm);
  }

  onStateFocusEvent() {
    this.statesListFiltered = this.statesList;
  }

  watchStateValueChange() {
    this.stateControl.valueChanges.subscribe(this.onFilterStatesList.bind(this));
  }

  private onFilterCountriesList(searchTerm: string) {
    const countryName = searchTerm.toLocaleLowerCase().trim();
    
    this.countriesListFiltered = this.countriesList.filter(countryResponse => countryResponse.name.toLocaleLowerCase().includes(countryName));
  }

  private onFilterStatesList(searchTerm: string) {
    const stateName = searchTerm.toLocaleLowerCase().trim();

    this.statesListFiltered = this.statesList.filter(stateResponse => stateResponse.name.toLocaleLowerCase().includes(stateName));
  }
}