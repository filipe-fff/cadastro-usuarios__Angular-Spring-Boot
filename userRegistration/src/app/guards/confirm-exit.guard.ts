import { ActivatedRouteSnapshot, CanDeactivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { ICanDeactivateWithDialog } from "../interfaces/can-deactivate-with-dialog.interface";
import { ConfirmMatDialogService } from "../services/confirm-mat-dialog.service";
import { inject } from "@angular/core";

export const confirmExitGuard = (): CanDeactivateFn<ICanDeactivateWithDialog> => {
    return (
        component: ICanDeactivateWithDialog,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): MaybeAsync<GuardResult> => {
        const _confirmMatDialogService = inject(ConfirmMatDialogService);

        return new Promise((resolve) => {
            _confirmMatDialogService.open({
                title: "Confirmação de Saída",
                description: "Você está prestes a sair desta página. deseja realmente continuar?"
            }, (value) => resolve(value));
        });
    };
};