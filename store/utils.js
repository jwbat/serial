export const nrFromObj = obj => {
  let { p, s, h, v, q, r } = obj;
  return `${ p }-${ s }${ h }-V${ v }-${ q }_REV${ r }`;
};

export const formatQ = Q => String(Q).padStart(3, 0);

// nr:  'ART-4R-V120-003_REVC'
// obj: { p: 'ART', s: '4', h: 'R', v: '120', q: '003', r: 'C' }
export const objFromNr = nr => {
  if (!nr) return {};
  try {
    const arr = nr.split(/[-_]+/);
    const p = arr[0];
    const s = arr[1][0];
    const h = arr[1][1];
    const v = arr[2].slice(1);
    const q = arr[3];
    const r = arr[4].slice(3)[0];
    return { p, s, h, v, q, r };
  }
  catch {
    return ;
  }
};

export const QFromItem = item => item.Q;

export const isValid = nrObj => {
  return nrObj.p.length > 0 &&
    nrObj.s.length > 0 &&
    nrObj.h.length > 0 &&
    nrObj.v.length > 1 &&
    nrObj.r.length > 0;
};

export const fieldsFromItem = item => {
  const nr = item.nr;
  return { ...objFromNr(nr), name: item.name, date: item.date };
};

export const itemFromFields = fields => {
  const { p, s, h, v, q, r, name, date  } = fields;
  const Q = +q;
  const nr = nrFromObj({ p, s, h, v, q, r });
  return { Q, nr, name, date };
};

export const sortItems = (items, str) => {
  //  convert arr of items to arr of field objects
  //  sort by str, return sorted arr of items
  function compare(x, y) {
    if (x[str] < y[str]) return 1;
    if (x[str] > y[str]) return -1;
    return 0;
  }
  let fieldsArr = items.map(item => fieldsFromItem(item));
  fieldsArr.sort(compare);
  return fieldsArr.map(fields => itemFromFields(fields));
}

export const sortByQ = items => {
  return sortItems(items, 'q');
};

export const filter = (items, fltrObj) => {
  let fieldsArr = items.map(item => fieldsFromItem(item));

  let fltrObjKeys = Object.keys(fltrObj)
    .filter(key => fltrObj[key].length > 0 && key !== 'q');

  fltrObjKeys.forEach(key => {
    fieldsArr = fieldsArr.filter(obj => obj[key] === fltrObj[key]);
  });
  return fieldsArr.map(fields => itemFromFields(fields));
};

const randInt = (low, high) => Math.floor(Math.random() * (high - low + 1) + low);
const randP = () => ['ART', 'CHI', 'GDO', 'SAM'][randInt(0, 3)];
const randS = () => String(randInt(3, 6));
const randH = () => ['R', 'L'][randInt(0, 1)];
const randV = () => ['100', '110', '120', '130', '112', '135'][randInt(0, 5)];
const randR = () => ['A', 'B', 'C', 'AB'][randInt(0, 3)];

const randName = () => ['Joe', 'Elmer', 'Sue', 'Yoko', 'Chad'][randInt(0, 4)];


export const getDate = () => {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, 0);
  const date = String(new Date().getDate()).padStart(2, 0);
  return `${ month }-${ date }-${ year }`;
};

const newRandomDate = () => {
  const year = 21;
  const month = randInt(6, 12);
  const day = randInt(1, 30);
  return `${ year }-${ month }-${ day }`;
};

export const getNRandomItems = n => Q => {
  // begin w/the highest sequence number
  const items = [];
  for (let i = 0; i < n; i++) {
    const nrObj = {
      p: randP(),
      s: randS(),
      h: randH(),
      v: randV(),
      q: formatQ(Q),
      r: randR(),
    };
    const item = { 
      Q, 
      nr: nrFromObj(nrObj), 
      name: randName(), 
      date: getDate()
    };
    items.push(item);
    Q++;
  }
  return items;
};

export const jsonFromItems = items => {
  if (!items || items.length < 1) return [];
  const jsonArray = [];

  let fieldsArr = items.map(item => fieldsFromItem(item));
  fieldsArr.forEach(obj => {
    jsonArray.push({
      'Program': obj.p,
      'Size': obj.s,
      'Hand': obj.h,
      'Version': obj.v,
      'Sequence': obj.q,
      'Revision': obj.r,
      'Name': obj.name,
      'Date': obj.date
    });
  });
  return jsonArray;
};

export const csvToJson = csvString => {
  const keys = ['p', 's', 'h', 'v', 'q', 'r', 'name', 'date'];
  let lines = csvString.split(/\r|\n/);

  lines = lines.filter(line => line.length > 0).slice(1);
  let objects = lines.map(line => {
    const fields = line.split(',');
    if (fields.length !== 8) return 'error';
    return Object.fromEntries(keys.map((key, i) => [key, fields[i].trim()]));
  });
  if (objects.includes('error')) return false;
  return objects;
};
