import { AddressList } from "../../types/address-list";
import { DependentsList } from "../../types/dependents-list";
import { MusicsList } from "../../types/musics-list";
import { PhoneList } from "../../types/phone-list";
import { UserPhoto } from "../../types/user-photo";

export interface IUser {
    id: string;
    photo?: UserPhoto;
    name: string;
    password: string;
    email: string;
    country: string;
    state: string;
    maritalStatus: number | null;
    monthlyIncome: number | null;
    birthDate: string;
    phoneList: PhoneList;
    addressList: AddressList;
    dependents: DependentsList;
    musics: MusicsList;
};