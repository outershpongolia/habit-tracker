import { ReactNode } from "react"
import { EStatus } from "./constants"
import { IApiResponse, IStep, ITableCell } from "./interfaces"
import { v4 } from "uuid"

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

/* generate array of numbers from zero or one to n number */
export const makeArrayOfNumbers = (n: number, zeroAllowed?: boolean) => {
  return zeroAllowed
    ? Array.from(Array(n).keys())
    : Array.from(Array(n + 1).keys()).filter(x => x !== 0)
}

/* generate table cells, for each to contain id */
export const generateTableCells = (arrayOfDates: Date[]): ITableCell[] => {
  return arrayOfDates.map(date => {
    return {
      id: v4(),
      date: date,
      color: '',
    }
  })
}

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
