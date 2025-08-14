import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { buttonStylePipe } from '../../pipes/button-style.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    buttonStylePipe
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  private readonly _router = inject(Router);

  onUsersList() {
    this._router.navigate(["/"]);
  }
}