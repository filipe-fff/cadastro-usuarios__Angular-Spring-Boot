import { Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserContainerComponent } from './components/user-container/user-container.component';

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
        component: UserContainerComponent
    }
];