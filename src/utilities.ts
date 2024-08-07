import { ReactNode } from "react"
import { EStatus } from "./constants"
import { IApiResponse, IStep } from "./interfaces"

//api response
export function checkCodeStatus<T=any>(
  callback: (data: T) => void, 
  errCallback: (msg: string) => void
) {
  return (res: IApiResponse) => {
    if (res.status === EStatus.ERROR) {
      errCallback(res.message)
      return res
    }

    callback(res.data)

    return res
  }
}

// generate form step
export const generateStep = (header: string, content: ReactNode): IStep => {
  return { header, content }
}

// export const toBase64 = (file: File):Promise<string | ArrayBuffer | null> => new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onload = () => resolve(reader.result)
//     reader.onerror = reject
// })

// export const checkIfImageExists = (url: string, callback: (exists: boolean) => void) => {
//     const img = new Image()
//     img.src = url
    
//     if (img.complete) {
//         callback(true)
//     } else {
//         img.onload = () => {
//             callback(true)
//         }
        
//         img.onerror = () => {
//             callback(false)
//         }
//     }
// }
