export type PhotosType = {
    small: string | null
    large: string | null
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type ProfileType = {
    id: number
    lookingForAJob: boolean
    lookingForAJobDescription: boolean
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe?: string
}
export type UserType= {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type NewsType = {
    id: number
    news: string
}

export type AuthType = {
        userId:  number | null
        email: string | null
        login: string | null
        isAuth: boolean
        captchaUrl: string | null
    }
