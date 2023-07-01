import { IApiResponse } from "./interfaces"


export function checkCodeStatus<T=any>(
    callback: (data: T) => void, 
    errCallback: (msg: string) => void
) {
    return (res: IApiResponse) => {
        if (res.status === 'error') {
            errCallback(res.message)
            return res
        }

        callback(res.data)

        return res
    }
}
