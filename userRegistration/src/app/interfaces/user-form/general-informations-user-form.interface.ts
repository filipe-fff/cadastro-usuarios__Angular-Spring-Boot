export interface IGeneralInformationsUserForm {
    id?: string;
    name: string;
    photo: string;
    email: string;
    password: string;
    passwordConfirm: string;
    country: string;
    state: string;
    maritalStatus: number;
    monthlyIncome: number;
    birthDate: Date;
};