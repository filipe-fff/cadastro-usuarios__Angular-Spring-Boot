import { IGeneralInformationsUserForm } from "../interfaces/user-form/general-informations-user-form.interface";
import { IUserForm } from "../interfaces/user-form/user-form.interface";
import { IUserUpdate } from "../interfaces/user-update/user-update.interface";
import { AddressListUserForm } from "../types/address-list-user-form";
import { AddressListUserUpdate } from "../types/address-list-user-update";
import { DependentsListUserForm } from "../types/dependents-list-user-form";
import { DependentsListUserUpdate } from "../types/dependents-list-user-update";
import { MusicsListUserForm } from "../types/musics-list-user-form";
import { MusicsListUSerUpdate } from "../types/musics-list-user-update";
import { PhoneListUserForm } from "../types/phone-list-user-form";
import { PhoneListUserUpdate } from "../types/phone-list-user-update";
import { convertDateObjToEnDate } from "./convert-date-obj-to-en-date";

export const convertUserFormRawValueToUserUpdate = (userForm: IUserForm): IUserUpdate => {
    let user: Partial<IUserUpdate> = {} as Partial<IUserUpdate>;

    user = { ...convertToGeneralInformations(userForm.generalInformations) };
    user.phoneList = [ ...convertToPhoneListUserUpdate(userForm.contactInformations.phoneList) ];
    user.addressList = [ ...convertToAddressListUserUpdate(userForm.contactInformations.addressList) ];
    user.dependents = [ ...convertToDependentsListUserUpdate(userForm.dependentInformations) ];
    user.musics = [ ...convertToMusicsListUserUpdate(userForm.musicInformations) ];

    return user as IUserUpdate;
};

const convertToGeneralInformations = (general: IGeneralInformationsUserForm): Partial<IUserUpdate> => {

    return({
        id: general.id,
        name: general.name,
        photoUrl: general.photoUrl,
        email: general.email,
        password: general.password,
        country: general.country,
        state: general.state,
        maritalStatus: general.maritalStatus,
        monthlyIncome: general.monthlyIncome,
        birthDate: convertDateObjToEnDate(general.birthDate)
    });
};

const convertToPhoneListUserUpdate = (phoneList: PhoneListUserForm): PhoneListUserUpdate => {
    
    return phoneList
        .map(phone => ({
            id: phone.id,
            type: phone.type,
            internationalCode: "+" + phone.number.substring(0, 2),
            areaCode: phone.number.substring(2, 4),
            number: phone.number.slice(4, -4) + "-" + phone.number.slice(-4)
        })).filter(phone => phone.areaCode !== "") as PhoneListUserUpdate;
};

const convertToAddressListUserUpdate = (addressList: AddressListUserForm): AddressListUserUpdate => {
    
    return addressList
        .map(address => ({
            id: address.id,
            type: address.type,
            street: address.street,
            complement: address.complement,
            country: address.country,
            state: address.state,
            city: address.city
        })).filter(address => address.street !== "") as AddressListUserUpdate;
};

const convertToDependentsListUserUpdate = (dependentsList: DependentsListUserForm): DependentsListUserUpdate => {
    return dependentsList
        .map(dependent => ({
            id: dependent.id,
            name: dependent.name,
            age: Number(dependent.age),
            document: Number(dependent.document)
        })) as DependentsListUserUpdate;
};

const convertToMusicsListUserUpdate = (musicsList: MusicsListUserForm): MusicsListUSerUpdate => {
    return musicsList
        .map(music => ({
            id: music.id,
            title: music.title,
            band: music.band,
            genre: music.genre,
            isFavorite: music.isFavorite
        })).filter(music => music.title !== "") as MusicsListUSerUpdate;
};