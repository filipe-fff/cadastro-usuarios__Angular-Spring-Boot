import { Routes } from '@angular/router';
import { UserSelectedComponent } from './components/user-selected/user-selected.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { confirmExitGuard } from './guards/confirm-exit.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

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
        path: "",
        canDeactivate: [ confirmExitGuard() ],
        children: [
            {
                path: "user/:id",
                loadComponent: () => import("./components/user-selected/user-selected.component").then(m => m.UserSelectedComponent)
            },
            {
                path: "user-create",
                loadComponent: () => import("./components/user-create/user-create.component").then(m => m.UserCreateComponent)
            }
        ]
    },
    {
        path: "**",
        loadComponent: () => import("./components/not-found/not-found.component").then(m => m.NotFoundComponent)
    }
];