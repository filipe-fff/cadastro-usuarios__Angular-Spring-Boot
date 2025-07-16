import { Component, Input } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { GeneralInformationsComponent } from '../general-informations/general-informations.component';
import { IUser } from '../../interfaces/user/user.interface';
import { ContactInformationsComponent } from '../contact-informations/contact-informations.component';
import { DependentInformationsComponent } from '../dependent-informations/dependent-informations.component';

@Component({
  selector: 'app-user-container',
  standalone: true,
  imports: [
    AngularMaterialModule,
    GeneralInformationsComponent,
    ContactInformationsComponent,
    DependentInformationsComponent
  ],
  templateUrl: './user-container.component.html',
  styleUrl: './user-container.component.scss'
})
export class UserContainerComponent {
  currentTabIndex = 2;

  @Input({ required: true }) userSelected: IUser = {} as IUser;
}