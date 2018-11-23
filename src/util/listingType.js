export const rules = {
  'upper-latin': index => String.fromCharCode(Number(index) + 65),
  'lower-latin': index => String.fromCharCode(Number(index) + 97),
  'decimal': index => Number(index) + 1,
  'none': () => null
};
