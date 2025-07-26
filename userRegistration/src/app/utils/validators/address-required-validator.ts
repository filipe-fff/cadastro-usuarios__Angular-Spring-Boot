import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const addressRequiredValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    const controlsNameList = Object.keys(control.value).filter(controlName => controlName !== "type" && controlName !== "typeDescription");

    const hasControlChildDirty = controlsNameList.some(controlName => control.get(controlName)?.value.length > 0);

    for (const controlName of controlsNameList) {
        const controlChild = control.get(controlName) as FormControl;
        
        if (hasControlChildDirty) {

            if (controlChild.value) resetControlChild(controlChild);

            else {
                const otherErrors = controlChild.errors || null;
                controlChild.setErrors({ ...otherErrors, addressRequiredError: true });
            }

        } else resetControlChild(controlChild);
    }

    return null
};

const resetControlChild = (controlChild: FormControl) => {
    const { addressRequiredError, ...otherErrors } = controlChild.errors || {};
    
    const hasOtherErrors = Object.keys(otherErrors).length > 0;
    
    controlChild.setErrors(hasOtherErrors ? { ...otherErrors } : null);
};