import axios from "axios";
import {ContactsType, PhotosType, ProfileType, UserType} from "../types/types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '5d1ce11a-f8c5-4486-b654-da9cfb3a67fa'
    }
})

type UsersResponseType = {
    items: UserType[]
    totalCount: number
    error: string
}
type FollowResponseType = {
    response: boolean
}
export const usersApi = {
    async requestUsers(currentPage: number, pageSize: number) {
        const response = await instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
        return response.data;
    },
    async getFriends(currentPage = 1, pageSize = 3) {
        const response = await instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}&friend=true`)
        return response.data;
    },
    async follow(userId: number) {
        const response = await instance.post<FollowResponseType>(`follow/${userId}`)
        return response.data;
    },
    async unfollow(userId: number) {
        const response = await instance.delete<FollowResponseType>(`follow/${userId}`)
        return response.data;
    },
    getProfile(userId: number) {
        console.warn('Absolute method. Please ProfileApi object')
        return instance.get(`profile/` + userId)
    }
}

type ProfileResponseType = {
    id: number
    lookingForAJob: boolean
    lookingForAJobDescription: boolean
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe?: string
}
type UpdateStatusType = {
    resultCode: number
    messages: string
    data: {}
}
export const profileApi = {
    getProfile(userId: number) {
        return instance.get<ProfileResponseType>(`profile/` + userId);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId)
    },
    async updateStatus(status: string) {
        const response = await instance.put<UpdateStatusType>(`profile/status/`, {status: status});
        return response.data;
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile/`, profile)
    }
}

export enum MeResultsCodes {
    Success = 0,
    Error = 1
}

export enum ResultsCodesCaptcha {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: Array<string>
}
type LoginResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        id: number
    }
}
type LogoutResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
export const authApi = {
    async me() {
        const response = await instance.get<MeResponseType>(`auth/me`);
        return response.data;
    },
    async login(email: string, password: string, rememberMe: boolean, captcha: string) {
        const response = await instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
        return response.data;
    },
    async logout() {
        const response = await instance.delete<LogoutResponseType>(`auth/login`);
        return response.data;
    }
}

type SecurityResponseType = {
    url: string
}
export const securityApi = {
    async getCaptcha() {
        const response = await instance.get<SecurityResponseType>(`security/get-captcha-url`);
        return response.data;
    }
}