import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from "@angular/forms";
import { UsersService } from "../../services/users.service";
import { map, Observable, of } from "rxjs";

export const existsByIdAndDocumentValidator = (usersService: UsersService): AsyncValidatorFn => {

    return (control: AbstractControl): Observable<ValidationErrors | null> => {

        if (!control) return of(null);

        const idControl = control.get("id") as FormControl;
        const documentControl = control.get("document") as FormControl;

        if (!idControl || !documentControl) return of(null);

        const id = idControl.value;
        const document = documentControl.value;

        return usersService.existsByIdNotAndDocument(id, document)
            .pipe(
                map((existsResponse) => {
                    if (existsResponse) {
                        const otherErrors = documentControl.errors || null;
                        documentControl.setErrors({ ...otherErrors, existsDocumentError: true });
                    } else {
                        if (documentControl.hasError("existsDocumentError")) {
                            const { existsDocumentError, ...otherErrors } = documentControl.errors || {};
                            const hasOtherErrors = Object.keys(otherErrors).length > 0;
                            documentControl.setErrors(hasOtherErrors ? otherErrors : null);
                        }
                    }
                    return null;
                })
            );
    };
};