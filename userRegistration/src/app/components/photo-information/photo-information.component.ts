import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { UserPhoto } from '../../types/user-photo';
import { IUser } from '../../interfaces/user/user.interface';

@Component({
  selector: 'app-photo-information',
  standalone: true,
  imports: [
    CommonModule
],
  templateUrl: './photo-information.component.html',
  styleUrl: './photo-information.component.scss'
})
export class PhotoInformationComponent implements OnChanges, OnDestroy {
  photoUrl: string | null = null;

  @Input({ required: true }) userSelected: IUser = {} as IUser;

  ngOnChanges(changes: SimpleChanges) {
    const hasUserSelected = changes["userSelected"] && Object.keys(changes["userSelected"].currentValue).length > 0;

    if (hasUserSelected) {
      const userPhoto = this.userSelected.photo;

      if (userPhoto) {
        this.resetPhotoUrl();
        this.photoUrl = URL.createObjectURL(userPhoto);

      } else this.resetPhotoUrl();
    }
  }

  ngOnDestroy() {
    this.resetPhotoUrl();
  }

  resetPhotoUrl() {
    if (this.photoUrl !== null) {
      URL.revokeObjectURL(this.photoUrl);
      this.photoUrl = null;
    }
  }
}