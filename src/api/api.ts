import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '5d1ce11a-f8c5-4486-b654-da9cfb3a67fa'
    }
})

export const usersApi = {
    requestUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => {
                return res.data;
            })
    },
    getFriends(currentPage = 1, pageSize = 3) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}&friend=true`)
            .then(res => {
                return res.data;
            })
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
            .then(res => res.data)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(res => res.data)
    },
    getProfile(userId) {
        console.warn('Absolute method. Please ProfileApi object')
        return instance.get(`profile/` + userId)
    }
}

export const profileApi = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, {status: status})
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append('image', photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile) {
        return instance.put(`profile/`, profile)
    }
}

export const authApi = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe, captcha) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

export const securityApi = {
    getCaptcha () {
        return instance.get(`security/get-captcha-url`)
    }
}