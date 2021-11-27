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
import { fetchData } from '../composables/useNetwork'

//define typings for the store state
export type State = {
  user: User | null
  admin: boolean | undefined
}

const state: State = { user: null, admin: undefined }

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

// mutation enums
export enum MutationTypes {
  setUser = 'setUser',
  setAdmin = 'setAdmin',
}

// mutations types
export type Mutations = {
  [MutationTypes.setUser](state: State, payload: User | null): void
  [MutationTypes.setAdmin](state: State, payload: boolean | undefined): void
}

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.setUser](state: State, payload: User | null) {
    state.user = payload
  },
  [MutationTypes.setAdmin](state: State, payload: boolean | undefined) {
    state.admin = payload
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
}

export const getters: GetterTree<State, State> & Getters = {
  getUser: (state) => state.user,
  getAdmin: (state) => state.admin,
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
