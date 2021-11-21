import { User } from '@firebase/auth'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  //declaring own store states
  interface State {
    user: User | null
  }

  //provide typings for this.$store
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
