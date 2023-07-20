import currencies from './assets/currencies.json'
import { ICurrency } from './interfaces'

export const toBase64 = (file: File):Promise<string | ArrayBuffer | null> => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
})

export const getCurrencyCodes = () => {
    const currencyData: ICurrency[] = currencies.currencies
    
    return currencyData.map(curr => curr.code)
}
