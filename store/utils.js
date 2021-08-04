export const nrFromObj = obj => {
  const { p, s, h, v, q, r } = obj;
  return `${ p }-${ s }${ h }-V${ v }-${ q }_REV${ r }`;
};

export const emptyObj = { p: '', s: '', h: '', v: '', r: '' };

// e.g,  n = 'ART-4R-V120-003_REVC'
//            --- --  --- ---    -
//             p  sh   v   q     r
export const objFromNr = n => {
  const arr = n.split(/[-_]+/);
  const p = arr[0];
  const s = arr[1][0];
  const h = arr[1][1];
  const v = arr[2].slice(1);
  const q = arr[3];
  const r = arr[4].match(/(?<=REV).*/g)[0];
  return { p, s, h, v, q, r };
};

export const QFromNr = nr => {
  const obj = objFromNr(nr)
  const q = obj.q;
  return +q;
};

export const isValid = obj => {
  return obj.p.length > 0 &&
    obj.s.length > 0 &&
    obj.h.length > 0 &&
    obj.v.length === 3 &&
    obj.r.length > 0;
};

export const order = (arr, str) => {
  function compare(x, y) {
    if (x[str] < y[str]) return 1;
    if (x[str] > y[str]) return -1;
    return 0;
  }

//   convert arr of strings to arr of objects,
//   sort by values, return arr converted back to strings
  let arr2 = arr.map(nr => objFromNr(nr));
  arr2.sort(compare);
  return arr2.map(obj => nrFromObj(obj));
}
