import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { IUserBeforeAfterMatDialog } from "../interfaces/user-before-afrter-mat-dialog.interface";
import { UserBeforeAfterMatDialogComponent } from "../components/user-before-after-mat-dialog/user-before-after-mat-dialog.component";

@Injectable({
    providedIn: 'root'
})
export class UserBeforeAfterMatDialogService {
    private readonly _matDialog = inject(MatDialog);

    open(data: IUserBeforeAfterMatDialog, callback: (value: boolean) => void) {
        const confirmDialog = this._matDialog.open(UserBeforeAfterMatDialogComponent, { data, width: "70%" });

        confirmDialog.afterClosed().subscribe(callback);
    }
}