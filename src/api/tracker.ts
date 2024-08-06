import { ITracker } from "../interfaces"

export const addNewTracker = (tracker: ITracker) => {
  return fetch(`${process.env.REACT_APP_BASE_URL}/tracker/add/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({...tracker})
  }).then(async res => {
    return res.json()
  })
}

export const getTrackers = ({userId}: {userId: string}) => {
  return fetch(`${process.env.REACT_APP_BASE_URL}/tracker/get-trackers`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({userId})
  }).then(async res => {
    return res.json()
  })
}