export const TYPES = {
  LATIN: { UPPER: 'upper-latin', LOWER: 'lower-latin' },
  DECIMAL: 'decimal',
  NONE: 'none'
};

export const rules = {
  [TYPES.LATIN.UPPER]: index => String.fromCharCode(Number(index) + 65),
  [TYPES.LATIN.LOWER]: index => String.fromCharCode(Number(index) + 97),
  [TYPES.DECIMAL]: index => Number(index) + 1
};
