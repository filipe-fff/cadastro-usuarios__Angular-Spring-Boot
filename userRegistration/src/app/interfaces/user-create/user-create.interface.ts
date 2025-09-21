import { AddressListUserCreate } from "../../types/address-list-user-create";
import { DependentsListUserCreate } from "../../types/dependents-list-user-create";
import { MusicsListUserCreate } from "../../types/musics-list-user-create";
import { PhoneListUserCreate } from "../../types/phone-list-user-create";

export interface IUserCreate {
    name: string;
    email: string;
    password: string;
    country: string;
    state: string;
    maritalStatus: number;
    monthlyIncome: number;
    birthDate: string;
    phoneList: PhoneListUserCreate;
    addressList: AddressListUserCreate;
    dependents: DependentsListUserCreate;
    musics: MusicsListUserCreate
};