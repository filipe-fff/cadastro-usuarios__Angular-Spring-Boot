import { AddressList } from "../../types/address-list";
import { DependentsList } from "../../types/dependents-list";
import { MusicsList } from "../../types/musics-list";
import { PhoneList } from "../../types/phone-list";

export interface IUser {
    id: string;
    name: string;
    password: string;
    email: string;
    country: string;
    state: string;
    maritalStatus: number;
    monthlyIncome: number;
    birthDate: string;
    phoneList: PhoneList;
    addressList: AddressList;
    dependents: DependentsList;
    musics: MusicsList;
};