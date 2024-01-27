import { max } from "lodash"
import { MONTH_LIST } from "./constants"
import { IDateObject, IStep, ITableCell, ITableLabel } from "./interfaces"
import { v4 } from "uuid"
import { ReactNode } from "react"

/* convert date from type Date to number object day-month-year */
export const convertDate = (date: Date): IDateObject => {
  const day = date.getUTCDate()
  const month = date.getUTCMonth() + 1
  const year = date.getUTCFullYear()

  return { day, month, year }
}

/* generate array of numbers from zero or one to n number */
export const makeArrayOfNumbers = (n: number, zeroAllowed?: boolean) => {
  return zeroAllowed
    ? Array.from(Array(n).keys())
    : Array.from(Array(n + 1).keys()).filter(x => x !== 0)
}

/* generate labels for table rows and cols */
export const generateLabelsForTable = (startMonth: number, endMonth: number): ITableLabel => {
  const months = MONTH_LIST.filter(month => (month.value >= startMonth) && (month.value <= endMonth))

  const maxColumns = max(months.map(month => month.numberOfDays))
  const columns = makeArrayOfNumbers(maxColumns || 31)

  return {
    columns: columns,
    rows: months.map(month => month.label)
  }
}

/* generate table cells, for each to contain id */
export const generateTableCells = (columns: number[]): ITableCell[] => {
  return columns.map(() => {
    return {
      id: v4(),
      color: ''
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
