import { Store } from 'vuex';// path to store file

declare module '@vue/runtime-core' {
    interface State {
        count: number
    }
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}