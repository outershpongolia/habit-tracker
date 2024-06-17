import { IAuth } from "../interfaces"

export const login = (auth: IAuth) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(auth),
        credentials: 'include'
    }).then(async res => {
        return res.json()
    })
}

export const register = (auth: IAuth) => {
  return fetch(`${process.env.REACT_APP_BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(auth)
  }).then(async res => {
      return res.json()
  })
}

// export const updateUser = (userData: IUserData, email: string) => {
//     return fetch(`${process.env.REACT_APP_BASE_URL}/user/update`, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({userData: userData, email: email})
//     }).then(res => {
//         return res.json()
//     })
// }

// export const upload = (data: IUpload) => {
//     return fetch(`${process.env.REACT_APP_BASE_URL}/upload/avatar`, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(data)
//     }).then(res => {
//         return res.json()
//     })
// }