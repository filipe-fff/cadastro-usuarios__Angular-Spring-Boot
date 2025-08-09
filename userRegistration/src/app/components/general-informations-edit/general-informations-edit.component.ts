import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { NgxMaskDirective } from 'ngx-mask';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { CountriesList } from '../../types/countries-list';
import { MaritalStatusObjList } from '../../types/marital-status-obj-list';
import { StatesList } from '../../types/states-list';
import { maritalStatusObjArray } from '../../utils/marital-status-description-map';
import { passwordStrengthProgressBar } from '../../utils/password-strength-progress-bar';

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
export class GeneralInformationsEditComponent implements OnInit {
  passwordStrength: number = 0;

  countriesListFiltered: CountriesList = [];
  statesListFiltered: StatesList = [];

  maxDate!: Date;
  minDate!: Date;

  @Input({ required: true }) userForm: FormGroup = {} as FormGroup;
  @Input({ required: true }) countriesList: CountriesList = [];
  @Input({ required: true }) statesList: StatesList = [];

  @Output("onCountrySelected") onCountrySelectedEmitt = new EventEmitter<string>();

  ngOnInit() {
    this.watchPasswordValueChanges();
    this.watchCountryValueChange();
    this.watchStateValueChange();

    this.getMinDate();
    this.getMaxDate();
  }

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

  watchPasswordValueChanges() {
    this.passwordControl.valueChanges.subscribe(password => this.passwordStrength = passwordStrengthProgressBar(password));
  }

  onCountryFocusEvent() {
    this.countriesListFiltered = this.countriesList;
  }

  onCountrySelected(event: MatAutocompleteSelectedEvent) {
    const searchTerm = event.option.value;

    if (!searchTerm) return;

    this.onCountrySelectedEmitt.emit(searchTerm);
  }

  onStateFocusEvent() {
    this.statesListFiltered = this.statesList;
  }

  private watchCountryValueChange() {
    this.countryControl.valueChanges.subscribe(this.onFilterCountriesList.bind(this));
  }

  private watchStateValueChange() {
    this.stateControl.valueChanges.subscribe(this.onFilterStatesList.bind(this));
  }

  private onFilterCountriesList(searchTerm: string) {
    if (!searchTerm) return;

    const countryName = searchTerm.toLocaleLowerCase().trim();
    
    this.countriesListFiltered = this.countriesList.filter(countryResponse => countryResponse.name.toLocaleLowerCase().includes(countryName));
  }

  private onFilterStatesList(searchTerm: string) {
    if (!searchTerm) return;

    const stateName = searchTerm.toLocaleLowerCase().trim();

    this.statesListFiltered = this.statesList.filter(stateResponse => stateResponse.name.toLocaleLowerCase().includes(stateName));
  }

  private getMinDate() {
    const date = new Date();

    this.minDate = new Date(date.getFullYear() - 100, 0, 1);
  }

  private getMaxDate() {
    this.maxDate = new Date();
  }
}