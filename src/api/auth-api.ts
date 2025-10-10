import {instance, APIResponseType, ResultsCodesEnum, ResultsCodesCaptchaEnum} from "./api";

type MeResponseType = {
        id: number
        email: string
        login: string
}
type LoginResponseType = {
        id: number
}

export const authApi = {
    async me() {
        const response = await instance.get<APIResponseType<MeResponseType>>(`auth/me`);
        return response.data;
    },
    async login(email: string, password: string, rememberMe: boolean, captcha: string) {
        const response = await instance.post<APIResponseType<LoginResponseType, ResultsCodesEnum | ResultsCodesCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha})
        return response.data;
    },
    async logout() {
        const response = await instance.delete(`auth/login`);
        return response.data;
    }
}