import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersListService } from './services/users-list.service';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  usersList$: Observable<any[]> = of([]);

  private readonly _usersListService = inject(UsersListService);

  ngOnInit(): void {
    this.usersList$ = this._usersListService.getUsers();
  }
}