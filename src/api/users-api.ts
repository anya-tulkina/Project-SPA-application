import {GetItemsResponseType, instance, APIResponseType} from "./api";


export const usersApi = {
    async requestUsers(currentPage: number, pageSize: number, term: string = '') {
        const response = await instance.get<GetItemsResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`);
        return response.data;
    },
    async getFriends(currentPage = 1, pageSize = 3) {
        const response = await instance.get<GetItemsResponseType>(`users?page=${currentPage}&count=${pageSize}&friend=true`)
        return response.data;
    },
    async follow(userId: number) {
        const response = await instance.post<APIResponseType>(`follow/${userId}`)
        return response.data;
    },
    async unfollow(userId: number) {
        const response = await instance.delete<APIResponseType>(`follow/${userId}`)
        return response.data;
    }
}