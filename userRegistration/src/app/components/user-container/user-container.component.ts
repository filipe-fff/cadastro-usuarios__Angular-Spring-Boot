import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { GeneralInformationsComponent } from '../general-informations/general-informations.component';
import { IUser } from '../../interfaces/user/user.interface';
import { ContactInformationsComponent } from '../contact-informations/contact-informations.component';
import { DependentInformationsComponent } from '../dependent-informations/dependent-informations.component';
import { MusicInformationsComponent } from '../music-informations/music-informations.component';
import { UserController } from './user-controller';

@Component({
  selector: 'app-user-container',
  standalone: true,
  imports: [
    AngularMaterialModule,
    GeneralInformationsComponent,
    ContactInformationsComponent,
    DependentInformationsComponent,
    MusicInformationsComponent
  ],
  templateUrl: './user-container.component.html',
  styleUrl: './user-container.component.scss'
})
export class UserContainerComponent extends UserController implements OnChanges {
  currentTabIndex = 3;

  @Input({ required: true }) userSelected: IUser = {} as IUser;
  @Input({ required: true }) userSelectedIndex!: string;

  ngOnChanges(changes: SimpleChanges): void {
    const HAS_USER_SELECTED = changes["userSelected"] && Object.keys(changes["userSelected"].currentValue).length > 0;

    if (HAS_USER_SELECTED) {
      this.fulfillUserForm(this.userSelected);

      console.log("userForm =>", this.userForm.value);
    }
  }
}