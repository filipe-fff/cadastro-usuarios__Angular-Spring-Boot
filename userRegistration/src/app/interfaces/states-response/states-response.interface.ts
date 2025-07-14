import { IBaseCountriesResponse } from "../base-countries-response.interface";
import { Idata } from "./data.interface";

export interface IStatesResponse extends IBaseCountriesResponse {
    data: Idata;
};