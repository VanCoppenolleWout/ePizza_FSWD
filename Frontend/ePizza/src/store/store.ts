import { getAuth, User } from 'firebase/auth'
import { InjectionKey } from '@vue/runtime-core'
import {
  ActionTree,
  createStore,
  GetterTree,
  MutationTree,
  Store,
  useStore as baseUseStore,
} from 'vuex'

//define typings for the store state
export type State = {
  user: User | null
}

const state: State = { user: null }

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

// mutation enums
export enum MutationTypes {
  setUser = 'setUser',
}

// mutations types
export type Mutations = {
  [MutationTypes.setUser](state: State, payload: User | null): void
}

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.setUser](state: State, payload: User | null) {
    state.user = payload
  },
}

// action enums
export enum ActionTypes {
  setUser = 'setUser',
}

export type Actions = {
  [ActionTypes.setUser]({ commit }: any, payload: User | null): void
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.setUser]({ commit }, user:User) {
    commit(MutationTypes.setUser, user)
  },
}

// getter types
export type Getters = {
  getUser(state: State): User | null
}

export const getters: GetterTree<State, State> & Getters = {
  getUser: (state) => state.user,
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
  return {
    store,
  }
}
