export default () => {
  const query = async (name: string, query: string, variables?: Object) => {
    const res = await fetch(`http://localhost:3001/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.error({ error }))

    return res.data[name]
  }

  return {
    query,
  }
}
