import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUserBeforeAfterMatDialog } from '../../interfaces/user-before-after-mat-dialog.interface';
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
import { pipe, Subject, takeUntil } from 'rxjs';

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
export class UserBeforeAfterMatDialogComponent implements OnInit, OnDestroy {
  photoBefore: string | null = null;
  photoAfter: string | null = null;
  
  genresList: GenresListResponse = [];

  beforePhoneListToDisplay: PhoneListToDisplay = [];
  beforeAddressListToDisplay: AddressListToDisplay = [];
  beforeMusicsListToDisplay: MusicsListToDisplay = [];

  afterPhoneListToDisplay: PhoneListToDisplay = [];
  afterAddressListToDisplay: AddressListToDisplay = [];
  afterMusicsListToDisplay: MusicsListToDisplay = [];

  data: IUserBeforeAfterMatDialog = inject(MAT_DIALOG_DATA);

  private readonly _destroy$ =  new Subject<void>();
  private readonly _genresService = inject(GenresService);

  ngOnInit() {
    this.onPhotoBefore();
    this.onPhotoAfter();

    this.getGenresList();

    this.getBeforePhoneListToDisplay();
    this.getBeforeAddressListToDisplay();
    this.getBeforeMusicsListToDisplay();

    this.getAfterPhoneListToDisplay();
    this.getAfterAddressListToDisplay();
    this.getAfterMusicsListToDisplay();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
    this.urlReset();
  }

  getGenresList() {
    this._genresService.getGenres().pipe(takeUntil(this._destroy$)).subscribe(genresResponse => this.genresList = genresResponse);
  }

  onPhotoBefore() {
    const photo = this.data.before.photo;
    this.photoBefore = photo === undefined || photo === null ? null : URL.createObjectURL(photo);
  }

  onPhotoAfter() {
    const photo = this.data.after.photo;
    this.photoAfter = photo === undefined || photo === null ? null : URL.createObjectURL(photo);
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

  getAfterAddressListToDisplay() {
    prepareAddressListToDisplay(true, this.data.after.addressList, (address) => {
      this.afterAddressListToDisplay.push(address);
    });
  }

  getAfterMusicsListToDisplay() {
    prepareMusicsListToDisplay(true, this.data.after.musics, (music) => {
      this.afterMusicsListToDisplay.push(music);
    });
  }

  private urlReset() {
    if (this.photoBefore !== null) URL.revokeObjectURL(this.photoBefore);
    if (this.photoAfter !== null) URL.revokeObjectURL(this.photoAfter);
  }
}