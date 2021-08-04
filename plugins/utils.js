// const utils = {
// 
//   nrToObj(nr) {
//     const p = nr.slice(0, 3);
//     const s = nr.slice(4, 5);
//     const h = nr.slice(5, 6);
//     const v = nr.slice(8, 11);
//     const q = nr.slice(12, 15);
//     const r = nr.slice(19);
//     return { p, s, h, v, q, r };
//   },
// 
//   objToNr(obj) {
//     const { p, s, h, v, q, r } = obj;
//     return `${ p }-${ s }${ h }-V${ v }-${ q }_REV${ r }`;
//   },
// 
//   getQ(nr) {
//     return nr.slice(12, 15);
//   },
// 
//   emptyObj: { p: '', s: '', h: '', v: '', q: '', r: '' },
// };
// 
// export default ({ app }, inject) => {
//   inject('nrToObj', nrToObj);
//   inject('objToNr', objToNr);
//   inject('getQ', getQ);
//   inject('emptyObj', emptyObj);
// }
