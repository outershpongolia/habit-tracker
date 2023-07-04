import { ILogin, IRegister, IUpload } from "../interfaces"

export const getAllUsers = () => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/users/all/`, {
        method: 'GET'
    }).then(res => {
        return res.json()
    })
}

export const login = (auth: ILogin) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(auth),
        credentials: 'include'
    }).then(async res => {
        console.log({res})
        return res.json()
    })
}

export const register = (auth: IRegister) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/auth/register/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(auth)
    }).then(res => {
        return res.json()
    })
}

export const upload = (data: IUpload) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/upload/avatar`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    })
}