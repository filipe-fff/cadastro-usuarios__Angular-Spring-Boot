import { inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IDependent } from "../../interfaces/user/dependent.interface";
import { IUser } from "../../interfaces/user/user.interface";
import { UserFormRawValueService } from "../../services/user-form-raw-value.service";
import { UsersService } from "../../services/users.service";
import { AddressList } from "../../types/address-list";
import { DependentsList } from "../../types/dependents-list";
import { MusicsList } from "../../types/musics-list";
import { PhoneList } from "../../types/phone-list";
import { convertEnDateToDateObj } from "../../utils/convert-en-date-to-date-obj";
import { prepareAddressListToDisplay } from "../../utils/prepare-address-list-to-display";
import { prepareMusicsListToDisplay } from "../../utils/prepare-musics-list-to-display";
import { preparePhoneListToDisplay } from "../../utils/prepare-phone-list-to-display";
import { addressRequiredValidator } from "../../utils/validators/address-required-validator";
import { existsByIdNotAndEmailValidator } from "../../utils/validators/exists-by-id-not-and-email-validator";
import { existsByIdNotAndPhoneValidator } from "../../utils/validators/exists-by-id-not-and-phone-validator";
import { musicRequiredValidator } from "../../utils/validators/music-required-validator";
import { passwordConfirmEqualValidator } from "../../utils/validators/password-confirm-equal-validator";
import { passwordStrengthValidator } from "../../utils/validators/password-strength-validator";
import { existsByIdAndDocumentValidator } from "../../utils/validators/exists-by-id-not-and-document-validator";
import { existsByIdNotAndNameValidator } from "../../utils/validators/exists-by-id-not-and-name-validator";
import { existsByIdNotAndPasswordValidator } from "../../utils/validators/exists-by-id-not-and-password-validator";
import { Subject, takeUntil } from "rxjs";

export class UserController {
    userForm!: FormGroup;

    protected readonly _destroy$ = new Subject<void>();

    private readonly emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    private readonly _fb = inject(FormBuilder);
    private readonly _usersService = inject(UsersService);
    private readonly _userFormRawValueService = inject(UserFormRawValueService);

    constructor() {
        this.createUserForm();

        this.watchUserFormValueChanges();
    }

    get generalInformations(): FormGroup {
        return this.userForm.get("generalInformations") as FormGroup;
    }

    get contactInformations(): FormGroup {
        return this.userForm.get("contactInformations") as FormGroup;
    }

    get dependentsList(): FormArray {
        return this.userForm.get("dependentInformations") as FormArray;
    }

    get musicsList(): FormArray {
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
        return this.dependentsList.valid;
    }

    get musicInformationsValid(): boolean {
        return this.musicsList.valid;
    }

    fulfillUserForm(user: IUser) {
        this.resetUserForm();

        this.fulfillGeneralInformations(user);
        this.fulfillPhoneList(user.id ,user.phoneList);
        this.fulfillAddressList(user.addressList);
        this.fulfillDependents(user.dependents);
        this.fulfillMusics(user.musics);
    }

    addDependent() {
        this.createDependentGroup();
        
        this.dependentsList.markAsDirty();
    }

    removeDependent(id: number) {
        this.dependentsList.removeAt(id);

        this.dependentsList.markAsDirty();
    }

    private createUserForm() {
        this.userForm = this._fb.group({
            generalInformations: this._fb.group({
                id: [null],
                name: ["", {
                    // updateOn: "blur", // Ative o blur quando deixar a validação assincrona
                    validators: [ Validators.required ],
                    asyncValidators: [
                        // existsByIdNotAndNameValidator(this._usersService)
                    ]
                }],
                photo: [""],
                email: ["", {
                    updateOn: "blur",
                    validators: [
                        Validators.required,
                        Validators.pattern(this.emailPattern)
                    ],
                    asyncValidators: [
                        existsByIdNotAndEmailValidator(this._usersService)
                    ]
                }],
                password: ["", {
                    // updateOn: "blur", // Ative o blur quando deixar a validação assincrona
                    validators: [ Validators.required, passwordStrengthValidator ],
                    asyncValidators: [
                        // existsByIdNotAndPasswordValidator(this._usersService)
                    ]
                }],
                passwordConfirm: ["", [ Validators.required ]],
                country: ["", Validators.required],
                state: ["", Validators.required],
                maritalStatus: [null, Validators.required],
                monthlyIncome: [null, Validators.required],
                birthDate: [new Date(), Validators.required]
            }, {
                validators: [ passwordConfirmEqualValidator ]
            }),
            contactInformations: this._fb.group({
                phoneList: this._fb.array([]),
                addressList: this._fb.array([])
            }),
            dependentInformations: this._fb.array([]),
            musicInformations: this._fb.array([])
        });
    }

    private resetUserForm() {
        this.userForm.reset();

        this.generalInformations.reset();

        this.phoneList.reset();
        this.phoneList.clear();
        
        this.addressList.reset();
        this.addressList.clear();

        this.dependentsList.reset();
        this.dependentsList.clear()

        this.musicsList.reset();
        this.musicsList.clear();
    }

    private fulfillGeneralInformations(user: IUser) {
        this.generalInformations.patchValue({
            ...user,
            passwordConfirm: user.password,
            birthDate: convertEnDateToDateObj(user.birthDate)
        });
    }

    private fulfillPhoneList(userId: string, phoneResponse: PhoneList) {
        preparePhoneListToDisplay(false, phoneResponse, (phone) => {
            const phoneValidation = phone.type === 3 ? [] : [ Validators.required ];
            this.phoneList.push(this._fb.group({
                id: [phone.id ?? null],
                type: [phone.type],
                typeDescription: [phone.typeDescription],
                number: [phone.number,
                    {
                        updateOn: "blur",
                        validators: phoneValidation,
                        asyncValidators: [
                            existsByIdNotAndPhoneValidator(userId, this._usersService)
                        ]
                    }],
            }));
        });
    }

    private fulfillAddressList(addressResponse: AddressList) {
        prepareAddressListToDisplay(false, addressResponse, (address) => {
            this.addressList.push(this._fb.group({
                id: [address.id],
                type: [address.type],
                typeDescription: [{value: address.typeDescription, disabled: true }],
                street: [address.street],
                complement: [address.complement],
                country: [address.country],
                state: [address.state],
                city: [address.city]
            }, { validators: [ addressRequiredValidator ] }));
        });
    }

    private fulfillDependents(dependentsResponse: DependentsList) {
        (dependentsResponse ?? []).forEach(this.createDependentGroup.bind(this));
    }

    private createDependentGroup(dependent: IDependent | null = null) {

        this.dependentsList.push(this._fb.group({
            id: [dependent?.id ?? null],
            name: [dependent?.name ?? "", Validators.required],
            age: [dependent?.age ?? null, Validators.required],
            document: [dependent?.document ?? null, {
                updateOn: "blur",
                validators: [ Validators.required ],
                asyncValidators: [
                    existsByIdAndDocumentValidator(this._usersService)
                ]
            }]
            }));
    }

    private fulfillMusics(musicsResponse: MusicsList) {
        prepareMusicsListToDisplay(false, musicsResponse, (music) => {
            this.musicsList.push(this._fb.group({
                id: [music.id],
                title: [music.title],
                band: [music.band],
                genre: [music.genre],
                isFavorite: [music.isFavorite || false]
            }, { validators: [ musicRequiredValidator ] }));
        });
    }

    private watchUserFormValueChanges() {
        this.userForm.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() =>
            this._userFormRawValueService.userFormRawValue = this.userForm.getRawValue()
        );
    }
}