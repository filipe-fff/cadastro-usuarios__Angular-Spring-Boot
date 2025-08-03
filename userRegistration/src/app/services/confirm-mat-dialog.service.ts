import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { IConfirmMatDialog } from "../interfaces/confirm-mat-dialog.interface";
import { ConfirmMatDialogComponent } from "../components/confirm-mat-dialog/confirm-mat-dialog.component";

@Injectable({
    providedIn: "root"
})
export class ConfirmMatDialogService {
    private readonly _matDialog = inject(MatDialog);

    open(data: IConfirmMatDialog, callback: (value: boolean) => void) {
        const dialog = this._matDialog.open(ConfirmMatDialogComponent, { data, width: "70%" });

        dialog.afterClosed().subscribe(callback);
    }
}