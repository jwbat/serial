import { 
  sequenceFromNrObj,
  getHighestQInSequence,
  nrExists,
  nrFromObj, 
  itemFromObj,
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
  insertItem(state, { idx, item }) {
    let arr = [...state.items];
    arr.splice(idx, 0, item);
    state.items = arr;
  },
  addManyItems(state, arr) {
    state.items = [...state.items, ...arr];
  },
  removeItem(state, idx) {
    let arr = [...state.items];
    arr.splice(idx, 1);
    state.items = arr;
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
    let date = getDate();

    let exists = getters.nrObjExists(nrObj);
    if (exists) {
      let hiQ = getters.highestQ(nrObj);
      const nr = nrFromObj({ ...nrObj, q: formatQ(hiQ + 1) });
      const item = { nr, name, date };
      let idx = getters.idxOfLastInSequence(nrObj) + 1;
      dispatch('insertItem', { idx, item });
    } else {
      const nr = nrFromObj({ ...nrObj, q: formatQ(1) });
      const item = { nr, name, date };
      commit('addItem', item);
    }
  },

  insertItem({ commit }, { idx, item }) {
    commit('insertItem', { idx, item });
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
  idxFromItem(state) {
    return item => state.items.reduce((acc, val, idx) =>  {
      return item.nr === val.nr ? idx : acc;
    }, null);
  },
  nrObjExists(state) {
    return nrObj => nrExists(nrObj, state.items);
  },
  highestQ(state) {
    return nrObj => {
      let seq = sequenceFromNrObj(nrObj, [...state.items]);
      return getHighestQInSequence(seq);
    };
  },
  idxOfLastInSequence(state, getters) {
    return nrObj => {
      let seq = sequenceFromNrObj(nrObj, [...state.items]);
      let obj = seq[seq.length - 1];
      let item = itemFromObj(obj);
      return getters.idxFromItem(item);
    };
  }
};
