import { Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { ButtonStylePipe } from '../../pipes/button-style.pipe';
import { ConfirmMatDialogService } from '../../services/confirm-mat-dialog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-information-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    ButtonStylePipe
],
  templateUrl: './photo-information-edit.component.html',
  styleUrl: './photo-information-edit.component.scss'
})
export class PhotoInformationEditComponent implements OnInit, OnChanges, OnDestroy {
  photoUrl: string | null = null;
  cacheBuster = Date.now();

  @Input({ required: true }) userForm: FormGroup = {} as FormGroup;

  private readonly _confirmMatDialogService = inject(ConfirmMatDialogService);

  get photoControl(): FormControl {
    return this.userForm.get("generalInformations.photo") as FormControl;
  }

  ngOnInit() {
    this.watchPhotoValueChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getPhotoUrl(this.photoControl.value);
  }

  ngOnDestroy() {
    this.resetPhotoUrl();
  }

  onPhotoValueChanges(e: Event) {
    const input = (e.target as HTMLInputElement);
    
    if (!input.files?.length) return;

    const photo = input.files[0];
    this.photoControl.setValue(photo);
  }

  onPhotoRemove() {
    this._confirmMatDialogService.open({
      title: "Removendo Foto",
      description: "Você deseja realmente remover esta foto?"
    }, (value) => {
      if (!value) return;
      this.photoControl.setValue(null);
    });
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