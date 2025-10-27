import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '688f3c2f-5a35-4247-a81a-0bf4f1bade2a'
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