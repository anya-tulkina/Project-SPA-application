import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '5d1ce11a-f8c5-4486-b654-da9cfb3a67fa'
    }
})

export enum ResultsCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultsCodesCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsResponseType = {
    items: UserType[]
    totalCount: number
    error: string
}
export type APIResponseType<D = {}, RC = ResultsCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}