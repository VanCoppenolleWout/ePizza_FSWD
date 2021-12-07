export const fetchData = () => {
  const url = 'http://localhost:3001'

  const get = async (endpoint: string, bearer?: string) => {
    try {
      return await fetch(`${url}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${bearer}`,
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())
    } catch (error: any) {
      return error.message
    }
  }

  const post = async (endpoint: string, body: any) => {
    try {
      return await fetch(`${url}${endpoint}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then((res) => res.json())
    } catch (error: any) {
      return error.message
    }
  }

  const put = async (endpoint: string, body: any) => {
    try {
      return await fetch(`${url}${endpoint}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then((res) => res.json())
    } catch (error: any) {
      return error.message
    }
  }

  return {
    get,
    post,
    put,
  }
}
