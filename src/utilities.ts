import { ReactNode } from "react"
import { EStatus } from "./constants"
import { IApiResponse, IStep } from "./interfaces"
import dayjs from 'dayjs'

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

// count total days difference between two dates
export const getPercentageFromDaysDifference = (startDate: Date | null, endDate: Date | null, daysAdded: number) => {
  const MILISECONDS_IN_SECOND = 1000
  const SECONDS_IN_MINUTE = 60
  const MINUTES_IN_HOUR = 60
  const HOURS_IN_DAYS = 24

  const startDateFormatted = dayjs(startDate)
  const endDateFormatted = dayjs(endDate)

  if (!startDate || !endDate) return 0

  const totalDuration = endDateFormatted.diff(startDateFormatted) // returns miliseconds

  const totalDays = totalDuration / MILISECONDS_IN_SECOND / SECONDS_IN_MINUTE / MINUTES_IN_HOUR / HOURS_IN_DAYS

  return 100 * daysAdded / totalDays
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
