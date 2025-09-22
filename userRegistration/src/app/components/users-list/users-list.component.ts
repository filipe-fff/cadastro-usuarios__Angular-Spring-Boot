import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, forkJoin, map, Observable, of, Subject, switchMap, take, takeUntil } from 'rxjs';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { UsersService } from '../../services/users.service';
import { UsersListReponse } from '../../types/users-list-response';
import { IUser } from '../../interfaces/user/user.interface';

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
export class UsersListComponent implements OnInit, OnDestroy {
  usersList$: Observable<UsersListReponse> = of([]);
  
  private readonly _usersService = inject(UsersService);
  private readonly _router = inject(Router);
  private readonly _destroy$ = new Subject<void>();

  ngOnInit() {
    this.getUsers();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onUserSelected(userId: string) {
    this._router.navigate(["user", userId]);
  }

  onUserCreate() {
    this._router.navigate(["/user-create"]);
  }

  private getUsers() {
    this.usersList$ = this._usersService
      .getUsers()
      .pipe(takeUntil(this._destroy$),
        switchMap(users => {
          const usersWithPhoto = users.map(user => 
          this._usersService
            .getUserPhotoById(user.id)
            .pipe(
              take(1),
              takeUntil(this._destroy$),
              catchError(() => of(null)),
              map(photo => ({
                ...user,
                photo: photo === null ? null : URL.createObjectURL(photo)
              }) as IUser)
            ));
          return forkJoin(usersWithPhoto);
        }
      )
    );
  }
}