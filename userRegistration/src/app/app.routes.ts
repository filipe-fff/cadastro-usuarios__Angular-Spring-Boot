import { Routes } from '@angular/router';
import { UserSelectedComponent } from './components/user-selected/user-selected.component';
import { UsersListComponent } from './components/users-list/users-list.component';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "users-list"
    },
    {
        path: "users-list",
        component: UsersListComponent
    },
    {
        path: "user/:id",
        component: UserSelectedComponent
    }
];