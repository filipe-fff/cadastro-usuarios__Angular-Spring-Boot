import { Component, inject, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUserBeforeAfterMatDialog } from '../../interfaces/user-before-afrter-mat-dialog.interface';
import { MaritalStatusPipe } from '../../pipes/marital-status.pipe';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { CommonModule } from '@angular/common';
import { PhoneListToDisplay } from '../../types/phone-list-to-display';
import { preparePhoneListToDisplay } from '../../utils/prepare-phone-list-to-display';
import { PhoneList } from '../../types/phone-list';
import { AddressListToDisplay } from '../../types/address-list-to-display';
import { prepareAddressListToDisplay } from '../../utils/prepare-address-list-to-display';
import { MusicsListToDisplay } from '../../types/musics-list-to-display';
import { prepareMusicsListToDisplay } from '../../utils/prepare-musics-list-to-display';
import { GenrePipe } from '../../pipes/genre.pipe';
import { YesNoPipe } from '../../pipes/yes-no.pipe';
import { GenresListResponse } from '../../types/genres-list-response';
import { GenresService } from '../../services/genres.service';
import { CpfPipe } from '../../pipes/cpf.pipe';
import { zipArraysPipe } from '../../pipes/zip-arrays.pipe';

@Component({
  selector: 'app-user-before-after-mat-dialog',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    MaritalStatusPipe,
    DateFormatPipe,
    CpfPipe,
    GenrePipe,
    YesNoPipe,
    zipArraysPipe
  ],
  templateUrl: './user-before-after-mat-dialog.component.html',
  styleUrl: './user-before-after-mat-dialog.component.scss'
})
export class UserBeforeAfterMatDialogComponent implements OnInit {
  genresList: GenresListResponse = [];

  beforePhoneListToDisplay: PhoneListToDisplay = [];
  beforeAddressListToDisplay: AddressListToDisplay = [];
  beforeMusicsListToDisplay: MusicsListToDisplay = [];

  afterPhoneListToDisplay: PhoneListToDisplay = [];
  afterAddressListToDisplay: AddressListToDisplay = [];
  afterMusicsListToDisplay: MusicsListToDisplay = [];

  data: IUserBeforeAfterMatDialog = inject(MAT_DIALOG_DATA);

  private readonly _genresService = inject(GenresService);

  ngOnInit() {
    this.getGenresList();

    this.getBeforePhoneListToDisplay();
    this.getBeforeAddressListToDisplay();
    this.getBeforeMusicsListToDisplay();

    this.getAfterPhoneListToDisplay();
    this.getAfterAddressListToDiplay();
    this.getAfterMusicsListToDisplay();
  }

  getGenresList() {
    this._genresService.getGenres().subscribe(genresResponse => this.genresList = genresResponse);
  }

  getBeforePhoneListToDisplay() {
    preparePhoneListToDisplay(true, this.data.before.phoneList, (phone) => {
      this.beforePhoneListToDisplay.push(phone);
    });
  }

  getBeforeAddressListToDisplay() {
    prepareAddressListToDisplay(true, this.data.before.addressList, (address) => {
      this.beforeAddressListToDisplay.push(address);
    });
  }

  getBeforeMusicsListToDisplay() {
    prepareMusicsListToDisplay(true, this.data.before.musics, (music) => {
      this.beforeMusicsListToDisplay.push(music);
    });
  }

  getAfterPhoneListToDisplay() {
    preparePhoneListToDisplay(true, this.data.after.phoneList, (phone) => {
      this.afterPhoneListToDisplay.push(phone);
    });
  }

  getAfterAddressListToDiplay() {
    prepareAddressListToDisplay(true, this.data.after.addressList, (address) => {
      this.afterAddressListToDisplay.push(address);
    });
  }

  getAfterMusicsListToDisplay() {
    prepareMusicsListToDisplay(true, this.data.after.musics, (music) => {
      this.afterMusicsListToDisplay.push(music);
    });
  }
}