import { inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUser } from "../../interfaces/user/user.interface";
import { AddressList } from "../../types/address-list";
import { PhoneList } from "../../types/phone-list";
import { DependentsList } from "../../types/dependents-list";
import { MusicsList } from "../../types/musics-list";
import { preparePhoneListToDisplay } from "../../utils/prepare-phone-list-to-display";
import { prepareAddressListToDisplay } from "../../utils/prepare-address-to-display-list";
import { existsByIdNotAndNameValidator } from "../../utils/validators/exists-by-id-not-and-name-validator";
import { UsersService } from "../../services/users.service";
import { existsByIdNotAndEmailValidator } from "../../utils/validators/exists-by-id-not-and-email-validator";
import { passwordStrengthValidator } from "../../utils/validators/password-strength-validator";
import { existsByIdNotAndPasswordValidator } from "../../utils/validators/exists-by-id-not-and-password-validator";

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

    get phoneList(): FormArray {
        return this.userForm.get("contactInformations.phoneList") as FormArray;
    }

    get addressList(): FormArray {
        return this.userForm.get("contactInformations.addressList") as FormArray;
    }

    get dependentInformations(): FormArray {
        return this.userForm.get("dependentInformations") as FormArray;
    }

    get musicInformations(): FormArray {
        return this.userForm.get("musicInformations") as FormArray;
    }

    fulfillUserForm(user: IUser) {
        this.fulfillGeneralInformations(user);
        this.fulfillPhoneList(user.phoneList);
        this.fulfillAddressList(user.addressList);
        this.fulfillDependents(user.dependents);
        this.fulfillMusics(user.musics);

        this.userForm.markAllAsTouched();
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
                country: ["", Validators.required],
                state: ["", Validators.required],
                maritalStatus: [null, Validators.required],
                monthlyIncome: [null, Validators.required],
                birthDate: [new Date(), Validators.required]
            }, {
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
        this.generalInformations.patchValue(user);
    }

    private fulfillPhoneList(phoneResponse: PhoneList) {
        preparePhoneListToDisplay(false, phoneResponse, (phone) => {
            this.phoneList.push(this._fb.group({
                type: [phone.type],
                typeDescription: [phone.typeDescription],
                number: [phone.number, [Validators.required]]
            }));
        });
    }

    private fulfillAddressList(addressResponse: AddressList) {
        prepareAddressListToDisplay(false, addressResponse, (address) => {
            this.addressList.push(this._fb.group({
                type: [address.type],
                typeDescription: [address.typeDescription],
                street: [address.street],
                complement: [address.complement],
                country: [address.complement],
                state: [address.state],
                city: [address.city]
            }));
        });
    }

    private fulfillDependents(dependentsResponse: DependentsList) {
        dependentsResponse.forEach(dependent => {
            this.dependentInformations.push(this._fb.group({
                name: [dependent.name, Validators.required],
                age: [dependent.age, Validators.required],
                document: [dependent.document, Validators.required]
            }));
        });
    }

    private fulfillMusics(musicsResponse: MusicsList) {
        musicsResponse.forEach(music => {
            this.musicInformations.push(this._fb.group({
                title: [music.title, Validators.required],
                band: [music.band, Validators.required],
                genre: [music.genre, Validators.required],
                isFavorite: [music.isFavorite, Validators.required]
            }));
        });
    }
}