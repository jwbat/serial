import { objFromNr, nrFromObj, emptyObj, QFromNr, isValid } from './utils.js';
// q: '0012' --->  Q: 12

export const state = () => ({
  nrs: [],
  Q: 5
})

export const mutations = {
  add(state, payload) {
    state.nrs = [...state.nrs, payload];
  },
  remove(state, idx) {
    state.nrs.splice(idx, 1);
  },
  edit(state, { idx, nr }) {
    state.nrs.splice(idx, 1, nr);
  },
  incrementQ(state) {
    state.Q++;
  }
}

export const actions = {
  save({ commit, dispatch, getters }, obj) {
    if (!isValid(obj)) return ;
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

  edit({ commit }, { idx, newObj }) {
    const nr = nrFromObj(newObj);
    commit('edit', { idx, nr });
  },

  remove({ commit, getters }, Q) {
    const idx = getters.idxFromQ(Q);
    commit('remove', idx);
  },

  incrementQ({ commit }) {
    commit('incrementQ');
  },

}

export const getters = {
  nrs(state) {
    return state.nrs;
  },
  nextQ(state) {
    return state.Q;
  },
  nextq(state) {
    return String(state.Q).padStart(3, 0);
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
