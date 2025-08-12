import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { UsersService } from "../../services/users.service";
import { map, Observable, of } from "rxjs";

export const existsByIdAndDocumentValidator = (usersService: UsersService): AsyncValidatorFn => {

    return (control: AbstractControl): Observable<ValidationErrors | null> => {

        if (!control) return of(null);

        const parentControl = control.parent as FormGroup;

        const idControl = parentControl?.get("id") as FormControl;

        if (!idControl) return of(null);

        const id = idControl.value;
        const document = control.value;

        return usersService.existsByIdNotAndDocument(id, document)
            .pipe(
                map((existsResponse) => existsResponse ? { existsDocumentError: true } : null)
            );
    };
};