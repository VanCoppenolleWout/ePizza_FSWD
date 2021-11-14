import { User } from '../interfaces/user'

const url = 'http://localhost:3001'
export const signUp = async (endpoint: string, body: User) =>
  fetch(`${url}/${endpoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json())
