import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { ICanDeactivateWithDialog } from "../interfaces/can-deactivate-with-dialog.interface";
import { ConfirmMatDialogService } from "../services/confirm-mat-dialog.service";
import { ConfirmExistService } from "../services/confirm-exit.service";

export const confirmExitGuard = (): CanDeactivateFn<ICanDeactivateWithDialog> => {
    return (
        component: ICanDeactivateWithDialog,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): MaybeAsync<GuardResult> => {
        const confirmExitService = inject(ConfirmExistService);
        const confirmMatDialogService = inject(ConfirmMatDialogService);

        if (!confirmExitService.dialogEnabled) return true;

        return new Promise((resolve) => {
            confirmMatDialogService.open({
                title: "Confirmação de Saída",
                description: "Você está prestes a sair desta página. deseja realmente continuar?"
            }, (value) => resolve(value));
        });
    };
};