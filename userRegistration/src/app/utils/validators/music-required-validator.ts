import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const musicRequiredValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    const controlsNameList = Object.keys(control.value);

    const hasControlChildDirty = controlsNameList.some(controlName => control.get(controlName)?.value);

    for (const controlName of controlsNameList) {

        if (controlName === "isFavorite") continue;

        const controlChild = control.get(controlName) as FormControl;

        if (hasControlChildDirty) {

            if (controlChild.value) resetControlChid(controlChild);

            else {
                const othersErrors = controlChild.errors || null;
                controlChild.setErrors({ ...othersErrors, musicRequiredError: true });
            }

        } else resetControlChid(controlChild);
    }

    return null;
};

const resetControlChid = (controlChild: FormControl) => {
    const { musicRequiredError, ...otherErrors } = controlChild.errors || {};

    const hasOtherErrors = Object.keys(otherErrors).length > 0;

    controlChild.setErrors(hasOtherErrors ? { ...otherErrors } : null);
}