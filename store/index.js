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
  nrs: [],
  items: [], // [{ Q, name, date }]
  Q: 1
})

export const mutations = {
  addNr(state, payload) {
    state.nrs = [...state.nrs, payload];
  },
  addItem(state, payload) {
    state.items = [...state.nrs, payload];
  },
  addManyNrs(state, arr) {
    state.nrs = [...state.nrs, ...arr];
  },
  addManyItems(state, arr) {
    state.items = [...state.items, ...arr];
  },
  removeNr(state, idx) {
    state.nrs.splice(idx, 1);
  },
  removeItem(state, Q) {
  },
  editNr(state, { idx, nr }) {
    state.nrs.splice(idx, 1, nr);
  },
  editItem(state, { idx, item }) {
    state.items.splice(idx, 1, item);
  },
  sortNrs(state) {
    state.nrs = sortByQ([...state.nrs]);
  },
  setQ(state, payload) {
    state.Q = payload;
  },
  incrementQ(state) {
    state.Q++;
  },
  deleteAll(state) {
    state.nrs = [];
    state.items = [];
  }
}

export const actions = {
  replaceAll({ commit, dispatch, getters }, payload) {
//     const { p, s, h, v, q, r, name } = payload;
    let nrs = nrObjects.map(obj => nrFromObj(obj));
    dispatch('deleteAll');
    commit('addManyNrs', nrs);
    commit('addManyItems', items);

    let Q = getters.largestQ;
    commit('setQ', Q + 1);
  },

  save({ commit, dispatch, getters }, payload) {
    const { p, s, h, v, q, r, name } = payload;

    const nrObj = { p, s, h, v, q, r };
    if (!isValid(nrObj)) return;

    const date = new Date().toLocaleDateString();
    const nr = nrFromObj(nrObj);
    const Q = QFromNr(nr);
    const qExists = getters.QExists(Q);

    if (!qExists) {
      commit('addNr', nr);
      commit('addItem', { Q, name, date });
      dispatch('incrementQ');
    } else {
      const nrIdx = getters.nrIdxFromQ(Q);
      const itemIdx = getters.itemIdxFromQ(Q);
      const item = { Q, name, date };
      commit('editNr', { nrIdx, nr });
      commit('editItem', { itemIdx, item });
    }
    commit('sortNrs');
  },

  move({ commit, dispatch, getters }, { obj, oldQ }) {
    if (!isValid(obj)) return;
    const nr = nrFromObj(obj);
    const newQ = QFromNr(nr);
    const qExists = getters.QExists(newQ);
    if (qExists || newQ > getters.nextQ) return;
    const item = getters.itemFromQ(oldQ);
    dispatch('remove', oldQ);
    commit('addNr', nr);
    commit('addItem', item);
    commit('sortNrs');
  },

  remove({ commit, getters }, Q) {
    const itemIdx = getters.itemIdxFromQ(Q);
    const nrIdx = getters.nrIdxFromQ(Q);
    commit('removeNr', nrIdx);
    commit('removeItem', itemIdx);
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
    commit('addManyNrs', nrsArr);
    commit('addManyItems', items);
    Q = getters.largestQ + 1;
    commit('setQ', Q);
    commit('sortNrs');
  },

  deleteAll({ commit, getters }) {
    commit('deleteAll');
    commit('setQ', 1);
  }
}

export const getters = {
  nrs(state) {
    return state.nrs;
  },
  items(state) {
    return [ ...state.items ];
  },
  itemFromQ(state) {
    return Q => [...state.items].filter(item => item.Q === Q)[0];
  },
  itemIdxFromQ(state) {
    return Q => [...state.items].reduce((acc, val, idx) => val.Q === Q ? idx : acc, 0);
  },
  nextQ(state) {
    return state.Q;
  },
  nextq(state) {
    return formatQ(state.Q);
  },
  nextEmptyObject(state) {
    const q = String(state.Q).padStart(3, 0);
    return { ...emptyObj, q };
  },
  objFromQ(state, getters) {
    return Q => {
      if (getters.QExists(Q)) {
        const nr = getters.nrFromQ(Q);
        return objFromNr(nr);
      }
    };
  },
  nrFromQ(state) {
    return Q => state.nrs.filter(nr => QFromNr(nr) === Q)[0];
  },
  QExists(state) {
    return Q => state.nrs.filter(nr => QFromNr(nr) === Q).length > 0;
  },
  QIsUnique(state) {
    return Q => state.nrs.filter(nr => QFromNr(nr) === Q).length === 1;
  },
  largestQ(state) {
    if (state.nrs.length < 1) {
      return 0;
    }
    let Qs = state.nrs.map(nr => QFromNr(nr));
    return Qs.reduce((x, y) => x > y ? x : y);
  },
  nrIdxFromQ(state) {
    return Q => {
      for (let i = 0; i < state.nrs.length; i++) {
        if (QFromNr(state.nrs[i]) === Q) {
          return i;
        }
      }
    }
  }
}
