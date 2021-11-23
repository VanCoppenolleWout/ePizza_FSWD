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

  return {
    get,
  }
}
