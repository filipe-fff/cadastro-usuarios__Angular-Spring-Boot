import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { distinctUntilChanged, Subject, Subscription, take } from 'rxjs';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { IUser } from '../../interfaces/user/user.interface';
import { CountriesService } from '../../services/countries.service';
import { StatesService } from '../../services/states.service';
import { CountriesList } from '../../types/countries-list';
import { StatesList } from '../../types/states-list';
import { ContactInformationsEditComponent } from '../contact-informations-edit/contact-informations-edit.component';
import { ContactInformationsComponent } from '../contact-informations/contact-informations.component';
import { DependentInformationsEditComponent } from '../dependent-informations-edit/dependent-informations-edit.component';
import { DependentInformationsComponent } from '../dependent-informations/dependent-informations.component';
import { GeneralInformationsEditComponent } from '../general-informations-edit/general-informations-edit.component';
import { GeneralInformationsComponent } from '../general-informations/general-informations.component';
import { MusicInformationsEditComponent } from '../music-informations-edit/music-informations-edit.component';
import { MusicInformationsComponent } from '../music-informations/music-informations.component';
import { UserController } from './user-controller';

@Component({
  selector: 'app-user-informations-container',
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
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss'
})
export class UserInformationsContainerComponent extends UserController implements OnInit, OnChanges, OnDestroy {
  currentTabIndex = 0;
  countriesList: CountriesList = [];
  statesList: StatesList = [];

  shouldFocusInvalid: boolean = false;

  userFormValueChangesSubs?: Subscription;
  focusFirstInvalidControlSubs?: Subscription;
  ngZoneSubs?: Subscription;

  @Input({ required: true }) userSelected: IUser = {} as IUser;
  @Input() userSelectedIndex: string | undefined;

  @Input({ required: true }) isInEditMode: boolean = false;
  @Input({ required: true }) shouldMarkUserFormTouchedAndValidity: boolean = false;

  @Input({ required: true }) focusFirstInvalidControl$!: Subject<void>;

  @Output("onEnableSaveButton") onEnableSaveButtonEmitt = new EventEmitter<boolean>();
  @Output("onUserFormFirstChange") onUserFormFirstChangeEmitt = new EventEmitter<void>();

  private readonly _elementRef = inject(ElementRef);
  private readonly _ngZone = inject(NgZone);
  private readonly _countriesService = inject(CountriesService);
  private readonly _statesService = inject(StatesService);

  ngOnInit() {
    this.getCountries();
    this.watchUserFormStatusChanges();
    this.watchFocusFirstInvalidControl();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    const HAS_USER_SELECTED = changes["userSelected"];
    
    if (HAS_USER_SELECTED) {
      if (this.userFormValueChangesSubs) this.userFormValueChangesSubs.unsubscribe();
      
      this.currentTabIndex = 0;
      this.fulfillUserForm(this.userSelected);
      this.getStates(this.userSelected.country);
      this.watchUserFormFirstValueChange();
      this.onUserFormTouchedAndValidity();
    }
  }

  ngOnDestroy() {
    this.userFormValueChangesSubs?.unsubscribe();
    this.focusFirstInvalidControlSubs?.unsubscribe();
  }

  onCountrySelected(countryName: string) {
    this.getStates(countryName);
  }

  onUserInfosTabAnimationDone() {
    this.onFocusFirstInvalidElement();
  }

  private onUserFormTouchedAndValidity() {
    console.log("onUserFormTouchedAndValidity");
    if (this.shouldMarkUserFormTouchedAndValidity) {
      this.userForm.markAllAsTouched();
      this.userForm.updateValueAndValidity();
    }
  }

  private getCountries() {
    this._countriesService
      .getCountries()
      .subscribe(countriesResponse => this.countriesList = countriesResponse);
  }

  private getStates(stateName: string) {
    if (!stateName) return;

    this.statesList = [];
    this._statesService
      .getStates(stateName)
      .subscribe(statesResponse => this.statesList = statesResponse);
  }

  private watchUserFormStatusChanges() {
    this.userForm
      .statusChanges
      .pipe(distinctUntilChanged())
      .subscribe(() => this.onEnableSaveButtonEmitt.emit(this.userForm.valid || this.userForm.pending));
  }

  private watchUserFormFirstValueChange() {
    this.userFormValueChangesSubs = this.userForm.
    valueChanges
    .pipe(take(1))
    .subscribe(() => this.onUserFormFirstChangeEmitt.emit());
  }

  private watchFocusFirstInvalidControl() {
    this.focusFirstInvalidControlSubs = this.focusFirstInvalidControl$.subscribe(() => this.onFocusFirstInvalidControl());
  }

  private onFocusFirstInvalidControl() {
    const previousTabIndex = this.currentTabIndex;
    this.shouldFocusInvalid = true;
    this.userForm.markAllAsTouched();

    if (!this.generalInformationsValid) this.currentTabIndex = 0;
    else if (!this.contactInformationsValid) this.currentTabIndex = 1;
    else if (!this.dependentInformationsValid) this.currentTabIndex = 2;
    else this.currentTabIndex = 3;

    if (previousTabIndex === this.currentTabIndex) {
      this._ngZone.onStable.pipe(take(1)).subscribe(() => this.onFocusFirstInvalidElement());
    }
  }

  private onFocusFirstInvalidElement() {
    if (!this.shouldFocusInvalid) return;
    this.shouldFocusInvalid = false;

    const invalidInput = this._elementRef.nativeElement.querySelector("input.ng-invalid");
      if (invalidInput) {
        (invalidInput as HTMLElement).focus();
        return;
      };

      const invalidMatSelect = this._elementRef.nativeElement.querySelector("mat-select.ng-invalid");
      if (invalidMatSelect) (invalidMatSelect as HTMLElement).click();
  }
}