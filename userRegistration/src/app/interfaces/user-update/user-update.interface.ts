import { AddressListUserUpdate } from "../../types/address-list-user-update";
import { DependentsListUserUpdate } from "../../types/dependents-list-user-update";
import { MusicsListUSerUpdate } from "../../types/musics-list-user-update";
import { PhoneListUserUpdate } from "../../types/phone-list-user-update";

export interface IUserUpdate {
    id: string;
    name: string;
    photoUrl: string;
    email: string;
    password: string;
    country: string;
    state: string;
    maritalStatus: number;
    monthlyIncome: number;
    birthDate: string;
    phoneList: PhoneListUserUpdate;
    addressList: AddressListUserUpdate;
    dependents: DependentsListUserUpdate;
    musics: MusicsListUSerUpdate;
};