import { inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUser } from "../../interfaces/user/user.interface";
import { AddressList } from "../../types/address-list";
import { PhoneList } from "../../types/phone-list";
import { DependentsList } from "../../types/dependents-list";
import { MusicsList } from "../../types/musics-list";
import { preparePhoneListToDisplay } from "../../utils/prepare-phone-list-to-display";
import { prepareAddressListToDisplay } from "../../utils/prepare-address-to-display-list";

export class UserController {
    userForm!: FormGroup;

    private readonly _fb = inject(FormBuilder);

    constructor() {
        this.createUserForm();
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
    }

    private createUserForm() {
        this.userForm = this._fb.group({
            generalInformations: this._fb.group({
                uuid: [""],
                name: ["", Validators.required],
                photo: [""],
                email: ["", [ Validators.required, Validators.pattern ]],
                password: ["", [ Validators.required ]],
                passwordConfirm: ["", [Validators.required]],
                country: ["", Validators.required],
                state: ["", Validators.required],
                maritalStatus: [null, Validators.required],
                monthlyIncome: [null, Validators.required],
                birthDate: [Date, Validators.required]
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
        this.userForm.patchValue(user);
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