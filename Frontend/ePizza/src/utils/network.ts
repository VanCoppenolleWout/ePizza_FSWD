// const url = 'http://localhost:3001'
export const signUp = async (url: string, body: any) =>
  fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    method: 'POST',
  }).then((res) => res.json())
