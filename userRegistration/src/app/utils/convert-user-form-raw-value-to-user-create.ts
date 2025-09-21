import { IUserCreate } from "../interfaces/user-create/user-create.interface";
import { IGeneralInformationsUserForm } from "../interfaces/user-form/general-informations-user-form.interface";
import { IUserForm } from "../interfaces/user-form/user-form.interface";
import { AddressListUserCreate } from "../types/address-list-user-create";
import { AddressListUserForm } from "../types/address-list-user-form";
import { DependentsListUserCreate } from "../types/dependents-list-user-create";
import { DependentsListUserForm } from "../types/dependents-list-user-form";
import { MusicsListUserCreate } from "../types/musics-list-user-create";
import { MusicsListUserForm } from "../types/musics-list-user-form";
import { PhoneListUserCreate } from "../types/phone-list-user-create";
import { PhoneListUserForm } from "../types/phone-list-user-form";
import { convertDateObjToEnDate } from "./convert-date-obj-to-en-date";

export const convertUserFormRawValueToUserCreate = (userForm: IUserForm): IUserCreate => {
    let user: Partial<IUserCreate> = {} as IUserCreate;

    user = convertToGeneralInformations(userForm.generalInformations);
    user.phoneList = [ ...convertToPhoneListUserCreate(userForm.contactInformations.phoneList) ];
    user.addressList = [ ...convertToAddressListUserCreate(userForm.contactInformations.addressList) ];
    user.dependents = [ ...convertToDependentsListUserCreate(userForm.dependentInformations) ];
    user.musics = [ ...convertToMusicsListUserCreate(userForm.musicInformations) ];

    return user as IUserCreate;
};

const convertToGeneralInformations = (general: IGeneralInformationsUserForm): Partial<IUserCreate> => {
    return ({
        name: general.name,
        email: general.email,
        password: general.password,
        country: general.country,
        state: general.state,
        maritalStatus: general.maritalStatus,
        monthlyIncome: general.monthlyIncome,
        birthDate: convertDateObjToEnDate(general.birthDate)
    });
};

const convertToPhoneListUserCreate = (phoneList: PhoneListUserForm): PhoneListUserCreate => {
    return phoneList
        .map(phone => ({
            type: phone.type,
            internationalCode: "+" + phone.number.substring(0, 2),
            areaCode: phone.number.substring(2, 4),
            number: phone.number.slice(4, -4) + "-" + phone.number.slice(-4)
        })).filter(phone => phone.areaCode !== "") as PhoneListUserCreate;
};

const convertToAddressListUserCreate = (addressList: AddressListUserForm): AddressListUserCreate => {
    return addressList
        .map(address => ({
            type: address.type,
            street: address.street,
            complement: address.complement,
            country: address.country,
            state: address.state,
            city: address.city
        })).filter(address => address.street !== "") as AddressListUserCreate;
};

const convertToDependentsListUserCreate = (dependentsList: DependentsListUserForm): DependentsListUserCreate => {
    return dependentsList.
        map(dependent => ({
            name: dependent.name,
            age: Number(dependent.age),
            document: Number(dependent.document)
        })) as DependentsListUserCreate;
};

const convertToMusicsListUserCreate = (musicsList: MusicsListUserForm): MusicsListUserCreate => {
    return musicsList
        .map(music => ({
            title: music.title,
            band: music.band,
            genre: music.genre || 0,
            isFavorite: music.isFavorite || false
        })).filter(music => music.title !== "") as MusicsListUserCreate;
};