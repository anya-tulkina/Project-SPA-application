import {PhotosType, ProfileType} from "../types/types";
import {instance, APIResponseType} from "./api";

type SaveDataResponseType = {
    photos: PhotosType
}
export const profileApi = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
    },
    async updateStatus(status: string) {
        const response = await instance.put<APIResponseType>(`profile/status/`, {status: status});
        return response.data;
    },
    async savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append('image', photoFile);

        return await instance.put<APIResponseType<SaveDataResponseType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile/`, profile)
    }
}