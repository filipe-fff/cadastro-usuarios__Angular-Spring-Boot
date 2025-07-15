import { Component, Input } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { GeneralInformationsComponent } from '../general-informations/general-informations.component';
import { IUser } from '../../interfaces/user/user.interface';

@Component({
  selector: 'app-user-container',
  standalone: true,
  imports: [
    AngularMaterialModule,
    GeneralInformationsComponent
  ],
  templateUrl: './user-container.component.html',
  styleUrl: './user-container.component.scss'
})
export class UserContainerComponent {
  @Input({ required: true }) userSelected: IUser = {} as IUser;
}