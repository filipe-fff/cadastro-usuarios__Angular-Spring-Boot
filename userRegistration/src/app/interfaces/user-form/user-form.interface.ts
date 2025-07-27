import { DependentsListUserForm } from "../../types/dependents-list-user-form";
import { MusicsListUserForm } from "../../types/musics-list-user-form";
import { IContactInformationsUserForm } from "./contact-informations-user-form.interface";
import { IGeneralInformationsUserForm } from "./general-informations-user-form.interface";

export interface IUserForm {
    generalInformations: IGeneralInformationsUserForm;
    contactInformations: IContactInformationsUserForm;
    dependentInformations: DependentsListUserForm;
    musicInformations: MusicsListUserForm;
};