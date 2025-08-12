import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { map, Observable, of } from "rxjs";
import { UsersService } from "../../services/users.service";

export const existsByIdNotAndNameValidator = (usersService: UsersService): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {

        if (!control) return of(null);

        const parentControl = control.parent as FormGroup;

        const idControl = parentControl?.get("id") as FormControl;

        if(!idControl) return of(null);

        const id = idControl.value;
        const name = control.value;

        if (!name) return of(null);

        return usersService.
            existsByIdNotAndName(id, name)
            .pipe(
                map((existsResponse) => existsResponse ? { existsNameError: true } : null));
    };
};