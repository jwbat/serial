import createPersistedState from 'vuex-persist-indexeddb';

export default ({ store }) => {
  createPersistedState()(store)
}
