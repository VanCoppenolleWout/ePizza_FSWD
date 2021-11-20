export const fetchData = () => {
  const url = 'http://localhost:3001'

  const get = async (endpoint: string) => {
    try {
      return await fetch(`${url}${endpoint}`).then((res) => res.json())
    } catch (error: any) {
      return error.message
    }
  }

  return {
    get,
  }
}
