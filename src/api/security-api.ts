import {instance} from "./api";

type GetCaptchaResponseType = {
    url: string
}
export const securityApi = {
    async getCaptcha() {
        const response = await instance.get<GetCaptchaResponseType>(`security/get-captcha-url`);
        return response.data;
    }
}