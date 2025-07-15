import { Component, inject, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { Observable, of } from 'rxjs';
import { UsersListReponse } from '../../types/users-list-response';
import { UsersService } from '../../services/users.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
}