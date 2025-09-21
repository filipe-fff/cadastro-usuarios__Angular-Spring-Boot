import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonStylePipe } from '../../pipes/button-style.pipe';
import { UserPhoto } from '../../types/user-photo';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-photo-information-edit',
  standalone: true,
  imports: [
    ButtonStylePipe,
    ReactiveFormsModule
  ],
  templateUrl: './photo-information-edit.component.html',
  styleUrl: './photo-information-edit.component.scss'
})
export class PhotoInformationEditComponent implements OnInit, OnChanges, OnDestroy {
  photoUrl: string | null = null;
  cacheBuster = Date.now();

  @Input({ required: true }) userForm: FormGroup = {} as FormGroup;

  get photoControl(): FormControl {
    return this.userForm.get("generalInformations.photo") as FormControl;
  }

  ngOnInit() {
    this.watchPhotoValueChanges();
  }

  ngOnDestroy() {
    this.resetPhotoUrl();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getPhotoUrl(this.photoControl.value);
  }

  onPhotoValueChanges(e: Event) {
    const input = (e.target as HTMLInputElement);
    
    if (!input.files?.length) return;

    const photo = input.files[0];
    this.photoControl.setValue(photo);
  }

  private watchPhotoValueChanges() {
    this.photoControl.valueChanges.subscribe(this.getPhotoUrl.bind(this))
  }

  private getPhotoUrl(photo: Blob | null) {
      if (photo !== null) {
        this.resetPhotoUrl();
        this.photoUrl = URL.createObjectURL(photo);

      } else this.resetPhotoUrl();

      this.cacheBuster = Date.now();
    ;
  }

  private resetPhotoUrl() {
    if (this.photoUrl !== null) {
      URL.revokeObjectURL(this.photoUrl);
      this.photoUrl = null;
    }
  }
}