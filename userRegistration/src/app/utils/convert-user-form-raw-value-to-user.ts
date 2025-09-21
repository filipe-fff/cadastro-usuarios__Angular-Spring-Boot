import { IGeneralInformationsUserForm } from "../interfaces/user-form/general-informations-user-form.interface";
import { IUserForm } from "../interfaces/user-form/user-form.interface";
import { IUser } from "../interfaces/user/user.interface";
import { AddressList } from "../types/address-list";
import { AddressListUserForm } from "../types/address-list-user-form";
import { DependentsList } from "../types/dependents-list";
import { DependentsListUserForm } from "../types/dependents-list-user-form";
import { MusicsList } from "../types/musics-list";
import { MusicsListUserForm } from "../types/musics-list-user-form";
import { PhoneList } from "../types/phone-list";
import { PhoneListUserForm } from "../types/phone-list-user-form";
import { convertDateObjToEnDate } from "./convert-date-obj-to-en-date";

export const convertUserFormRawValueToUser = (userForm: IUserForm): IUser => {
    let user: Partial<IUser> = {} as Partial<IUser>;

    user = { ...convertToGeneralInformations(userForm.generalInformations) };
    user.phoneList = [ ...convertToPhoneList(userForm.contactInformations.phoneList) ];
    user.addressList = [ ...convertToAddressList(userForm.contactInformations.addressList) ];
    user.dependents = [ ...convertToDependentsList(userForm.dependentInformations) ];
    user.musics = [ ...convertToMusicsList(userForm.musicInformations) ];

    return user as IUser;
};

const convertToGeneralInformations = (general: IGeneralInformationsUserForm): Partial<IUser> => {
    
    return ({
        id: general.id,
        name: general.name,
        email: general.email,
        password: general.password,
        country: general.country,
        state: general.state,
        maritalStatus: general.maritalStatus,
        monthlyIncome: general.monthlyIncome,
        birthDate: convertDateObjToEnDate( general.birthDate)
    });
};

const convertToPhoneList = (phoneList: PhoneListUserForm): PhoneList => {
    
    return phoneList
        .map(phone => ({
            id: phone.id,
            type: phone.type,
            internationalCode: "+" + phone.number.substring(0, 2),
            areaCode: phone.number.substring(2, 4),
            number: phone.number.slice(4, -4) + "-" + phone.number.slice(-4)
        })).filter(phone => phone.areaCode !== "") as PhoneList;
};

const convertToAddressList = (addressList: AddressListUserForm): AddressList => {
    
    return addressList
        .map(address => ({
            id: address.id,
            type: address.type,
            street: address.street,
            complement: address.complement,
            country: address.country,
            state: address.state,
            city: address.city
        })).filter(address => address.street !== "") as AddressList;
};

const convertToDependentsList = (dependentsList: DependentsListUserForm): DependentsList => {
    
    return dependentsList
        .map(dependent => ({
            id: dependent.id,
            name: dependent.name,
            age: Number(dependent.age),
            document: Number(dependent.document)
        })) as DependentsList;
};

const convertToMusicsList = (musicsList: MusicsListUserForm): MusicsList => {
    return musicsList
        .map(music => ({
            id: music.id,
            title: music.title,
            band: music.band,
            genre: music.genre,
            isFavorite: music.isFavorite
        })).filter(music => music.title !== "") as MusicsList;
};