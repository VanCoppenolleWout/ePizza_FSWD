import { Pizza } from '../interfaces/pizza'

export const useLocalStorage = () => {
  const addPizzasLocal = (pizzas: Array<Pizza>) => {
    localStorage.setItem('pizzas', JSON.stringify(pizzas))
  }

  const getPizzasLocal = (): Pizza[] => {
    return JSON.parse(localStorage.getItem('pizzas') || '[]')
  }

  const deletePizzaLocal = (pizza: Pizza) => {
    const pizzas = getPizzasLocal()

    for (const index in pizzas) {
      if (JSON.stringify(pizzas[index]) == JSON.stringify(pizza)) {
        pizzas.splice(parseInt(index), 1)
        break
      }
    }
    addPizzasLocal(pizzas)
    return getPizzasLocal()
  }

  const deletePizzasLocal = () => {
    localStorage.setItem('pizzas', '')
  }

  const addPizzaLocal = (pizza: Pizza) => {
    const pizzas: Array<Pizza> = JSON.parse(
      localStorage.getItem('pizzas') || '[]',
    )
    pizzas.push(pizza)
    addPizzasLocal(pizzas)
    return getPizzasLocal()
  }

  return {
    getPizzasLocal,
    deletePizzaLocal,
    addPizzaLocal,
    deletePizzasLocal,
  }
}
