import { Component, Input } from '@angular/core';
import { UserInfosItemComponent } from '../user-infos-item/user-infos-item.component';
import { DependentsList } from '../../types/dependents-list';
import { CommonModule } from '@angular/common';
import { CpfPipe } from '../../pipes/cpf.pipe';

@Component({
  selector: 'app-dependent-informations',
  standalone: true,
  imports: [
    CommonModule,
    CpfPipe,
    UserInfosItemComponent
  ],
  templateUrl: './dependent-informations.component.html',
  styleUrl: './dependent-informations.component.scss'
})
export class DependentInformationsComponent {
  @Input({ required: true }) dependentsList: DependentsList = []
}