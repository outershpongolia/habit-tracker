import { ILogin } from "../interfaces"

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
    }).then(res => {
        return res.json()
    })
}