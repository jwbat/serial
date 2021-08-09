export const nrFromObj = obj => {
  let { p, s, h, v, q, r } = obj;
  return `${ p }-${ s }${ h }-V${ v }-${ q }_REV${ r }`;
};

export const formatQ = Q => String(Q).padStart(3, 0);

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
  //  convert arr of strings to arr of objects,
  //  sort by values, return arr converted back to strings
  function compare(x, y) {
    if (x[str] < y[str]) return 1;
    if (x[str] > y[str]) return -1;
    return 0;
  }
  let arr2 = arr.map(nr => objFromNr(nr));
  arr2.sort(compare);
  return arr2.map(obj => nrFromObj(obj));
}

export const sortByQ = arr => {
  return order(arr, 'q');
};

export const filter = (nrs, fltrObj) => {
  let nrObjects = nrs.map(n => objFromNr(n));
  let fltrObjKeys = Object.keys(fltrObj)
    .filter(key => fltrObj[key].length > 0 && key !== 'q');
  fltrObjKeys.forEach(key => {
    nrObjects = nrObjects.filter(obj => obj[key] === fltrObj[key]);
  });
  return nrObjects.map(obj => nrFromObj(obj));
};

const randInt = (low, high) => Math.floor(Math.random() * (high - low + 1) + low);
const randP = () => ['ART', 'CHI', 'GDO', 'SAM'][randInt(0, 3)];
const randS = () => String(randInt(3, 6));
const randH = () => ['R', 'L'][randInt(0, 1)];
const randV = () => ['100', '110', '120', '130', '112', '135'][randInt(0, 5)];
const randR = () => ['A', 'B', 'C', 'AB'][randInt(0, 3)];

export const getRandom = n => Q => {
  // begin w/the highest sequence number
  const arr = [];
  for (let i = 0; i < n; i++) {
    const obj = {
      p: randP(),
      s: randS(),
      h: randH(),
      v: randV(),
      q: formatQ(Q),
      r: randR(),
    };
    const nr = nrFromObj(obj);
    arr.push(nr);
    Q++;
  }
  return arr;
};

export const jsonFromNrs = nrs => {
  const jsonArray = [];
  let nrObjects = nrs.map(n => objFromNr(n));
  nrObjects.forEach(obj => {
    jsonArray.push({
      'Program': obj.p,
      'Size': obj.s,
      'Hand': obj.h,
      'Version': obj.v,
      'Sequence': obj.q,
      'Revision': obj.r
    });
  });
  return jsonArray;
};

export const csvToJson = csvString => {
  const keys = ['p', 's', 'h', 'v', 'q', 'r'];
  let lines = csvString.split(/\r|\n/);
//    const nrlines = lines.slice(1).map(l => l.length ? l : '');
  lines = lines.filter(l => l.length > 0).slice(1);
  let objects = lines.map(line => {
    const fields = line.split(',');
    return Object.fromEntries(keys.map((key, i) => [key, fields[i]]))
  });
//    console.log('nrs: ', nrs);
   return objects;
};
//   let nrs = objects.map(obj => nrFromObj(obj));

