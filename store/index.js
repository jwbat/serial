import { 
  sequenceFromItems,
  getHighestQInSequence,
  nrExists,
  nrFromObj, 
  getNRandomItems,
  formatQ,
  getDate,
  isValid
} from './utils.js';


export const state = () => ({
  items: [], // [{ nr, name, date }]
})


export const mutations = {
  addItem(state, item) {
    state.items = [...state.items, item];
  },
  addManyItems(state, arr) {
    state.items = [...state.items, ...arr];
  },
  removeItem(state, idx) {
    state.items.splice(idx, 1);
  },
  editItem(state, { idx, item }) {
    state.items.splice(idx, 1, item);
  },
  deleteAll(state) {
    state.items = [];
  }
}


export const actions = {                               
  replace({ commit, dispatch, getters }, objects) {
    const items = [];
    objects.forEach(obj => {
      const { p, s, h, v, q, r, name, date } = obj;
      const nr = nrFromObj({ p, s, h, v, q, r });
      const Q = +q;
      items.push({ Q, nr, name, date });
    });

    dispatch('deleteAll');
    commit('addManyItems', items);
  },

  addItem({ commit, dispatch, getters }, obj) {
    if (!isValid(obj)) return;
    const { p, s, h, v, r, name } = obj;
    const nrObj = { p, s, h, v, r };
    let Q = 1;
    if (getters.itemExists(nrObj)) {
      Q = getters.highestQ(nrObj);
      Q++;
    }
    const nr = nrFromObj({ ...nrObj, q: formatQ(Q) });
    const item = { nr, name, date: getDate() };
    commit('addItem', item);
  },

  removeItem({ commit, getters }, item) {
    let idx = getters.idxFromItem(item);
    commit('removeItem', idx);
  },

  addNRandom({ commit, getters }, n) {
    const items = getNRandomItems(n)();
    commit('addManyItems', items);

  },

  deleteAll({ commit }) {
    commit('deleteAll');
  }
}

export const getters = {
  items(state) {
    return [...state.items];
  },
  nrs(state) {
    return state.items.map(item => item.nr);
  },
  idxFromItem(state) {
    return item => state.items.reduce((acc, val, idx) =>  {
      return item.nr === val.nr ? idx : acc, null;
    });
  },
  itemExists(state) {
    return obj => nrExists(obj, state.items);
  },
  highestQ(state) {
    return nrObj => {
      let seq = sequenceFromItems(nrObj, [...state.items]);
      return getHighestQInSequence(seq);
    };
  },
};
