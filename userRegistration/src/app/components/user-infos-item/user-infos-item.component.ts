import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-infos-item',
  standalone: true,
  imports: [],
  templateUrl: './user-infos-item.component.html',
  styleUrl: './user-infos-item.component.scss'
})
export class UserInfosItemComponent {
  @Input({ required: true }) title: string | null | undefined;
  @Input({ required: true }) description: string | null | undefined;
}