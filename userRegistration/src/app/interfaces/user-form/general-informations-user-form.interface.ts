import { UserPhoto } from "../../types/user-photo";

export interface IGeneralInformationsUserForm {
    id?: string;
    name: string;
    photo?: UserPhoto;
    email: string;
    password: string;
    passwordConfirm: string;
    country: string;
    state: string;
    maritalStatus: number;
    monthlyIncome: number;
    birthDate: Date;
};