import { Component } from '@angular/core';
import { UserInfosItemComponent } from '../user-infos-item/user-infos-item.component';

@Component({
  selector: 'app-dependent-informations',
  standalone: true,
  imports: [
    UserInfosItemComponent
  ],
  templateUrl: './dependent-informations.component.html',
  styleUrl: './dependent-informations.component.scss'
})
export class DependentInformationsComponent {

}