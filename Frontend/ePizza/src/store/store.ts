import { User } from 'firebase/auth'
import { InjectionKey } from '@vue/runtime-core'
import {
  ActionTree,
  createStore,
  GetterTree,
  MutationTree,
  Store,
  useStore as baseUseStore,
} from 'vuex'
import { Topping } from '../interfaces/topping'

//define typings for the store state
export type State = {
  user: User | null
  admin: boolean | undefined
  pizzaCounts: Record<string, number>
  toppingsArr: Array<Topping>
}

const state: State = {
  user: null,
  admin: undefined,
  pizzaCounts: {},
  toppingsArr: [],
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

// mutation enums
export enum MutationTypes {
  setUser = 'setUser',
  setAdmin = 'setAdmin',
  setPizzaCounts = 'setPizzaCounts',
  setToppingsArr = 'setToppingsArr',
}

// mutations types
export type Mutations = {
  [MutationTypes.setUser](state: State, payload: User | null): void
  [MutationTypes.setAdmin](state: State, payload: boolean | undefined): void
  [MutationTypes.setPizzaCounts](
    state: State,
    payload: Record<string, number>,
  ): void

  [MutationTypes.setToppingsArr](state: State, payload: Array<Topping>): void
}

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.setUser](state: State, payload: User | null) {
    state.user = payload
  },
  [MutationTypes.setAdmin](state: State, payload: boolean | undefined) {
    state.admin = payload
  },
  [MutationTypes.setPizzaCounts](
    state: State,
    payload: Record<string, number>,
  ) {
    state.pizzaCounts = payload
  },

  [MutationTypes.setToppingsArr](state: State, payload: Array<Topping>) {
    state.toppingsArr = payload
  },
}

// action enums
export enum ActionTypes {
  setUser = 'setUser',
  setAdmin = 'setAdmin',
}

export type Actions = {
  [ActionTypes.setUser]({ commit }: any, payload: User | null): void
  [ActionTypes.setAdmin]({ commit }: any, payload: boolean | undefined): void
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.setUser]({ commit }, user: User | null) {
    commit(MutationTypes.setUser, user)
  },
  async [ActionTypes.setAdmin]({ commit }, admin: boolean | undefined) {
    commit(MutationTypes.setAdmin, admin)
  },
}

// getter types
export type Getters = {
  getUser(state: State): User | null
  getAdmin(state: State): boolean | undefined
  getPizzaCounts(state: State): Record<string, number>
  getToppingsArr(state: State): Array<Topping>
}

export const getters: GetterTree<State, State> & Getters = {
  getUser: (state: State) => state.user,
  getAdmin: (state: State) => state.admin,
  getPizzaCounts: (state: State) => state.pizzaCounts,
  getToppingsArr: (state: State) => state.toppingsArr,
}

export const store = createStore<State>({
  state,
  mutations,
  actions,
  getters,
})

// composable to import store
export function useStore() {
  const store = baseUseStore(key)
  const user = store.getters.getUser
  const admin = store.getters.getAdmin

  return {
    store,
    user,
    admin,
  }
}
