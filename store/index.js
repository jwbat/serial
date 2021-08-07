import { 
  objFromNr, 
  nrFromObj, 
  emptyObj, 
  QFromNr, 
  isValid, 
  sortByQ,
  get10Random,
  formatQ,
} from './utils.js';
// q: '012' --->  Q: 12

export const state = () => ({
  nrs: [],
  Q: 1
})

export const mutations = {
  add(state, payload) {
    state.nrs = [...state.nrs, payload];
  },
  addMany(state, arr) {
    state.nrs = [...state.nrs, ...arr];
  },
  remove(state, idx) {
    state.nrs.splice(idx, 1);
  },
  edit(state, { idx, nr }) {
    state.nrs.splice(idx, 1, nr);
  },
  sort(state) {
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
  }
}

export const actions = {
  save({ commit, dispatch, getters }, obj) {
    if (!isValid(obj)) return;
    const nr = nrFromObj(obj);
    const Q = QFromNr(nr);
    const qExists = getters.QExists(Q);

    if (!qExists) {
      commit('add', nr);
      dispatch('incrementQ');
    } else {
      const idx = getters.idxFromQ(Q);
      commit('edit', { idx, nr });
    }
  },

  move({ commit, dispatch, getters }, { obj, oldQ }) {
    if (!isValid(obj)) return;
    const nr = nrFromObj(obj);
    const newQ = QFromNr(nr);
    const qExists = getters.QExists(newQ);
    if (qExists || newQ > getters.nextQ) return;
    dispatch('remove', oldQ);
    commit('add', nr);
    commit('sort');
  },

  remove({ commit, getters }, Q) {
    const idx = getters.idxFromQ(Q);
    commit('remove', idx);
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

  add10({ commit, getters }) {
    let Q = getters.largestQ + 1;
    console.log('Q: ', Q);
    let arr = get10Random(Q);
    commit('addMany', arr);
    Q = getters.largestQ + 1;
    commit('setQ', Q);
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
//     console.log('store. Qs: ', Qs);
    return Qs.reduce((x, y) => x > y ? x : y);
  },
  idxFromQ(state) {
    return Q => {
      for (let i = 0; i < state.nrs.length; i++) {
        if (QFromNr(state.nrs[i]) === Q) {
          return i;
        }
      }
    }
  }
}
