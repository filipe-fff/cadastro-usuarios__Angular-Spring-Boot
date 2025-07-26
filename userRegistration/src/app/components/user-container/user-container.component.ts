import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { IUser } from '../../interfaces/user/user.interface';
import { ContactInformationsComponent } from '../contact-informations/contact-informations.component';
import { DependentInformationsComponent } from '../dependent-informations/dependent-informations.component';
import { GeneralInformationsEditComponent } from '../general-informations-edit/general-informations-edit.component';
import { GeneralInformationsComponent } from '../general-informations/general-informations.component';
import { MusicInformationsComponent } from '../music-informations/music-informations.component';
import { UserController } from './user-controller';
import { ContactInformationsEditComponent } from '../contact-informations-edit/contact-informations-edit.component';
import { DependentInformationsEditComponent } from '../dependent-informations-edit/dependent-informations-edit.component';
import { MusicInformationsEditComponent } from '../music-informations-edit/music-informations-edit.component';
import { CountriesService } from '../../services/countries.service';
import { CountriesList } from '../../types/countries-list';
import { StatesService } from '../../services/states.service';
import { StatesList } from '../../types/states-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-container',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    GeneralInformationsComponent,
    ContactInformationsComponent,
    DependentInformationsComponent,
    MusicInformationsComponent,
    GeneralInformationsEditComponent,
    ContactInformationsEditComponent,
    DependentInformationsEditComponent,
    MusicInformationsEditComponent
  ],
  templateUrl: './user-container.component.html',
  styleUrl: './user-container.component.scss'
})
export class UserContainerComponent extends UserController implements OnInit, OnChanges {
  currentTabIndex = 0;
  countriesList: CountriesList = [];
  statesList: StatesList = [];

  @Input({ required: true }) userSelected: IUser = {} as IUser;
  @Input({ required: true }) userSelectedIndex: string | undefined;

  @Input({ required: true }) isInEditMode: boolean = false;

  private readonly _countriesService = inject(CountriesService);
  private readonly _statesService = inject(StatesService);

  ngOnInit() {
    this.getCountries();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const HAS_USER_SELECTED = changes["userSelected"] && Object.keys(changes["userSelected"].currentValue).length > 0;
    
    if (HAS_USER_SELECTED) {
      this.fulfillUserForm(this.userSelected);
      this.getStates(this.userSelected.country);
    }
  }

  onCountrySelected(countryName: string) {
    this.getStates(countryName);
  }

  private getCountries() {
    this._countriesService
      .getCountries()
      .subscribe(countriesResponse => this.countriesList = countriesResponse);
  }

  private getStates(stateName: string) {
    this.statesList = [];
    this._statesService
      .getStates(stateName)
      .subscribe(statesResponse => this.statesList = statesResponse);
  }
}