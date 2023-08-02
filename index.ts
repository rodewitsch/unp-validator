const positionWeights = [29, 23, 19, 17, 13, 7, 5, 3];
const firstLetterValues = {
  A: 10,
  B: 11,
  C: 12,
  E: 14,
  H: 17,
  K: 20,
  M: 22,
};
const secondLetterValues = {
  A: 0,
  B: 1,
  C: 2,
  E: 3,
  H: 4,
  K: 5,
  M: 6,
  O: 7,
  P: 8,
  T: 9,
};
const availableLegalRanges = [
  [10000000, 18999999],
  [20000000, 28999999],
  [30000000, 38999999],
  [40000000, 48999999],
  [50000000, 58999999],
  [60000000, 68999999],
  [70000000, 78999999],
];
const allowedFirstChar = [
  ['1', '2', '3', '4', '5', '6', '7'],
  ['A', 'B', 'C', 'E', 'H', 'K', 'M'],
];

function checkLength(unp: string): boolean {
  return unp.length === 9;
}

function checkType(unp: string): boolean {
  return allowedFirstChar[0].includes(unp[0]) || allowedFirstChar[1].includes(unp[0]);
}

function checkAvailableLegalRanges(unp: string): boolean {
  const unpNumber = Number(unp);
  return !availableLegalRanges.some((range) => {
    return unpNumber >= range[0] && unpNumber <= range[1];
  });
}

function checkIndividualRange(unp: string): boolean {
  const unpNumber = Number(unp.replace(/\D/g, ''));
  return unpNumber >= 1 && unpNumber <= 9999999;
}

function getType(unp: string): string {
  if (allowedFirstChar[0].includes(unp[0])) return 'legal';
  if (allowedFirstChar[1].includes(unp[0])) return 'individual';
  return '';
}

export function isValid(unp: string): boolean {
  if (!checkLength(unp)) return false;
  if (!checkType(unp)) return false;
  const type = getType(unp);
  let splittedUNP = unp.split('');
  if (type === 'legal' && !checkAvailableLegalRanges(unp)) return false;
  if (type === 'individual') {
    if (!checkIndividualRange(unp)) return false;
    // @ts-ignore
    splittedUNP[0] = firstLetterValues[splittedUNP[0]].toString();
    // @ts-ignore
    splittedUNP[1] = secondLetterValues[splittedUNP[1]].toString();
  }
  const UNPsum = splittedUNP.slice(0, -1).reduce((acc, curr, index) => {
    return acc + Number(curr) * positionWeights[index];
  }, 0);
  const controlNumber = UNPsum - 11 * Math.floor(UNPsum / 11);
  if (controlNumber !== Number(splittedUNP[splittedUNP.length - 1])) return false;
  return true;
}
