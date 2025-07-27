import { inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUser } from "../../interfaces/user/user.interface";
import { AddressList } from "../../types/address-list";
import { PhoneList } from "../../types/phone-list";
import { DependentsList } from "../../types/dependents-list";
import { MusicsList } from "../../types/musics-list";
import { preparePhoneListToDisplay } from "../../utils/prepare-phone-list-to-display";
import { prepareAddressListToDisplay } from "../../utils/prepare-address-list-to-display";
import { existsByIdNotAndNameValidator } from "../../utils/validators/exists-by-id-not-and-name-validator";
import { UsersService } from "../../services/users.service";
import { existsByIdNotAndEmailValidator } from "../../utils/validators/exists-by-id-not-and-email-validator";
import { passwordStrengthValidator } from "../../utils/validators/password-strength-validator";
import { existsByIdNotAndPasswordValidator } from "../../utils/validators/exists-by-id-not-and-password-validator";
import { passwordConfirmEqualValidator } from "../../utils/validators/password-confirm-equal-validator";
import { convertEnDateToDateObj } from "../../utils/convert-en-date-to-date-obj";
import { addressRequiredValidator } from "../../utils/validators/address-required-validator";
import { IDependent } from "../../interfaces/user/dependent.interface";
import { prepareMusicsListToDisplay } from "../../utils/prepare-musics-list-to-display";
import { musicRequiredValidator } from "../../utils/validators/music-required-validator";

export class UserController {
    userForm!: FormGroup;

    private readonly emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

    private readonly _fb = inject(FormBuilder);
    private readonly _usersService = inject(UsersService);

    constructor() {
        this.createUserForm();
    }

    get generalInformations(): FormGroup {
        return this.userForm.get("generalInformations") as FormGroup;
    }

    get contactInformations(): FormGroup {
        return this.userForm.get("contactInformations") as FormGroup;
    }

    get dependentInformations(): FormArray {
        return this.userForm.get("dependentInformations") as FormArray;
    }

    get musicInformations(): FormArray {
        return this.userForm.get("musicInformations") as FormArray;
    }

    get phoneList(): FormArray {
        return this.userForm.get("contactInformations.phoneList") as FormArray;
    }

    get addressList(): FormArray {
        return this.userForm.get("contactInformations.addressList") as FormArray;
    }

    get generalInformationsValid(): boolean {
        return this.generalInformations.valid;
    }

    get contactInformationsValid(): boolean {
        return this.contactInformations.valid;
    }

    get dependentInformationsValid(): boolean {
        return this.dependentInformations.valid;
    }

    get musicInformationsValid(): boolean {
        return this.musicInformations.valid;
    }

    fulfillUserForm(user: IUser) {
        this.fulfillGeneralInformations(user);
        this.fulfillPhoneList(user.phoneList);
        this.fulfillAddressList(user.addressList);
        this.fulfillDependents(user.dependents);
        this.fulfillMusics(user.musics);

        this.userForm.markAllAsTouched();
    }

    addDependent() {
        this.createDependentGroup();
        this.dependentInformations.markAllAsTouched();
        this.dependentInformations.markAsDirty();
    }

    removeDependent(id: number) {
        this.dependentInformations.removeAt(id);
        this.dependentInformations.markAllAsTouched();
        this.dependentInformations.markAsDirty();
    }

    private createUserForm() {
        this.userForm = this._fb.group({
            generalInformations: this._fb.group({
                id: [""],
                name: ["", { validators: [ Validators.required ], updateOn: "blur" }],
                photo: [""],
                email: ["", {
                    updateOn: "blur",
                    validators: [
                        Validators.required,
                        Validators.pattern(this.emailPattern)
                    ]
                }],
                password: ["", {
                    updateOn: "blur",
                    validators: [ Validators.required, passwordStrengthValidator ]
                }],
                passwordConfirm: ["", [ Validators.required ]],
                country: ["", Validators.required],
                state: ["", Validators.required],
                maritalStatus: [1],
                monthlyIncome: [null, Validators.required],
                birthDate: [new Date(), Validators.required]
            }, {
                validators: [ passwordConfirmEqualValidator ],
                asyncValidators: [
                    existsByIdNotAndNameValidator(this._usersService),
                    existsByIdNotAndEmailValidator(this._usersService),
                    existsByIdNotAndPasswordValidator(this._usersService)
                ],
            }),
            contactInformations: this._fb.group({
                phoneList: this._fb.array([]),
                addressList: this._fb.array([])
            }),
            dependentInformations: this._fb.array([]),
            musicInformations: this._fb.array([])
        });
    }

    private fulfillGeneralInformations(user: IUser) {
        this.generalInformations.patchValue({
            ...user,
            passwordConfirm: user.password,
            birthDate: convertEnDateToDateObj(user.birthDate)
            // birthDate: null
        });
    }

    private fulfillPhoneList(phoneResponse: PhoneList) {
        preparePhoneListToDisplay(false, phoneResponse, (phone) => {
            const phoneValidation = phone.type === 3 ? [] : [ Validators.required ];
            this.phoneList.push(this._fb.group({
                type: [phone.type],
                typeDescription: [phone.typeDescription],
                number: [phone.number, phoneValidation]
            }));
        });
    }

    private fulfillAddressList(addressResponse: AddressList) {
        prepareAddressListToDisplay(false, addressResponse, (address) => {
            this.addressList.push(this._fb.group({
                type: [address.type],
                typeDescription: [{value: address.typeDescription, disabled: true }],
                street: [address.street],
                complement: [address.complement],
                country: [address.complement],
                state: [address.state],
                city: [address.city]
            }, { validators: [ addressRequiredValidator ] }));
        });
    }

    private fulfillDependents(dependentsResponse: DependentsList) {
        dependentsResponse.forEach(this.createDependentGroup.bind(this));
    }

    private createDependentGroup(dependent: IDependent | null = null) {
        if (dependent) {
            this.dependentInformations.push(this._fb.group({
                name: [dependent.name, Validators.required],
                age: [dependent.age, Validators.required],
                document: [dependent.document, Validators.required]
            }));
        } else {
            this.dependentInformations.push(this._fb.group({
                name: ["", Validators.required],
                age: ["", Validators.required],
                document: ["", Validators.required]
            }));
        }
    }

    private fulfillMusics(musicsResponse: MusicsList) {
        prepareMusicsListToDisplay(false, musicsResponse, (music) => {
            this.musicInformations.push(this._fb.group({
                title: [music.title],
                band: [music.band],
                genre: [music.genre],
                isFavorite: [music.isFavorite]
            }, { validators: [ musicRequiredValidator ] }));
        });
    }
}