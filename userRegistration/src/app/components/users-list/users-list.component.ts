import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { UsersService } from '../../services/users.service';
import { UsersListReponse } from '../../types/users-list-response';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    AngularMaterialModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  $usersList: Observable<UsersListReponse> = of([]);

  private readonly _usersService = inject(UsersService);
  private readonly _router = inject(Router);

  ngOnInit() {
    this.$usersList = this._usersService.getUsers();
  }

  onUserSelected(userId: string) {
    this._router.navigate(["user", userId]);
  }

  onUserCreate() {
    this._router.navigate(["/user-create"]);
  }
}