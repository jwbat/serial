import { 
  objFromNr, 
  nrFromObj, 
  emptyObj, 
  QFromNr, 
  isValid, 
  sortByQ,
  getRandom,
  formatQ,
} from './utils.js';
// q: '012' --->  Q: 12

export const state = () => ({
  items: [], // [{ Q, nr, name, date }]
  Q: 1
})

export const mutations = {
  addItem(state, payload) {
    state.items = [...state.items, payload];
  },
  addManyItems(state, arr) {
    state.items = [...state.items, ...arr];
  },
  removeItem(state, Q) {
  },
  editItem(state, { idx, item }) {
    state.items.splice(idx, 1, item);
  },
  setQ(state, payload) {
    state.Q = payload;
  },
  incrementQ(state) {
    state.Q++;
  },
  deleteAll(state) {
    state.items = [];
  }
}


export const actions = {                               
  replaceAll({ commit, dispatch, getters }, payload) {    // TODO
//     const { nrObjects } = payload;
    const nrObj = { p, s, h, v, q, r };
    let nrs = nrObjects.map(obj => nrFromObj(obj));
    dispatch('deleteAll');
    commit('addManyNrs', nrs);
    commit('addManyItems', items);

    let Q = getters.largestQ;
    commit('setQ', Q + 1);
  },

  save({ commit, dispatch, getters }, item) {
    const { Q, nr, name, date } = item;

    if (!isValid(nr)) return;

    date = date || new Date().toISOString().slice(2, 10);
    const qExists = getters.QExists(Q);

    // add new item
    if (!qExists) {
      commit('addNr', nr);
      commit('addItem', { Q, name, date });
      dispatch('incrementQ');
    } else { // edit item
      const idx = getters.idxFromQ(Q);
      commit('editItem', { idx, item });
    }
//      commit('sortNrs');
  },

  move({ commit, dispatch, getters }, { obj, oldQ }) {
    if (!isValid(obj)) return;
    const nr = nrFromObj(obj);
    const newQ = QFromNr(nr);
    const qExists = getters.QExists(newQ);
    if (qExists || newQ > getters.nextQ) return;
    const item = getters.itemFromQ(oldQ);
    dispatch('remove', oldQ);
    commit('addItem', item);
//     commit('sortNrs');
  },

  remove({ commit, getters }, Q) {
    const idx = getters.idxFromQ(Q);
    commit('removeItem', idx);
  },

  incrementQ({ commit }) {
    commit('incrementQ');
  },

  editQ({ commit, getters }, newQ) {
    let Q = +newQ;
    let bigQ = getters.largestQ;
    if (Q < bigQ) return;
    commit('setQ', Q);
  },

  addNRandom({ commit, getters }, n) {
    let addNR = getRandom(n);
    let Q = getters.largestQ + 1;
    let { nrsArr, items } = addNR(Q);
    commit('addManyItems', items);
    Q = getters.largestQ + 1;
    commit('setQ', Q);
//     commit('sortNrs');
  },

  deleteAll({ commit, getters }) {
    commit('deleteAll');
    commit('setQ', 1);
  }
}

export const getters = {
  nrs(state) {
    return state.items.map(item => item.nr);
  },
  items(state) {
    return [...state.items];
  },
  itemFromQ(state) {
    return Q => state.items.filter(item => item.Q === Q)[0];
  },
  idxFromQ(state) {
    return Q => state.items.reduce((acc, val, idx) => val.Q === Q ? idx : acc, 0);
  },
  nextQ(state) {
    return state.Q;
  },
  nextq(state) {
    return formatQ(state.Q);
  },
//  nextEmptyObject(state) {
//    const q = String(state.Q).padStart(3, 0);
//    return { ...emptyObj, q };
//  },
  nrFromQ(state, getters) {
    return Q => state.items.reduce((acc, val, idx) => val.Q === Q ? val.nr : acc, null);
  },
  QExists(state) {
    return Q => state.items.filter(item => item.Q === Q).length > 0;
  },
  QIsUnique(state) {
    return Q => state.items.filter(item => item.Q === Q).length === 1;
  },
  largestQ(state) {
    if (state.items.length < 1) {
      return 0;
    }
    let Qs = state.items.map(item => item.Q);
    return Qs.reduce((x, y) => x > y ? x : y);
  },
};
