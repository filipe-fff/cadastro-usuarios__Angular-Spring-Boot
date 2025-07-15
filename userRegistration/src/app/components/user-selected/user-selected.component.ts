import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../interfaces/user/user.interface';
import { UsersService } from '../../services/users.service';
import { UserContainerComponent } from '../user-container/user-container.component';

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

  private readonly _activatedRoute = inject(ActivatedRoute);

  private readonly _usersService = inject(UsersService);

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const userId = this._activatedRoute.snapshot.params["id"];
    this._usersService.getUserById(userId).subscribe(userResponse => {this.userSelected = userResponse; console.log(this.userSelected);});
  }
}