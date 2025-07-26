import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../interfaces/user/user.interface';
import { UsersService } from '../../services/users.service';
import { UserContainerComponent } from '../user-container/user-container.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-selected',
  standalone: true,
  imports: [
    UserContainerComponent
  ],
  templateUrl: './user-selected.component.html',
  styleUrl: './user-selected.component.scss'
})
export class UserSelectedComponent implements OnInit {
  userSelected: IUser = {} as IUser;
  userSelectedIndex!: string;

  isInEditMode: boolean = true;

  private readonly _activatedRoute = inject(ActivatedRoute);

  private readonly _usersService = inject(UsersService);

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this._activatedRoute.params.subscribe(params => this.userSelectedIndex = params["id"]);
    this._usersService.getUserById(this.userSelectedIndex as string).subscribe(userResponse => this.userSelected = userResponse);
  }
}