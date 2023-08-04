import {
  allowedFirstChar,
  availableLegalRanges,
  firstLetterValues,
  secondLetterValues,
  positionWeights,
} from './constants';
import { ValidationOptions } from './interfaces';

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

export function isValid(unp: string, options?: ValidationOptions): boolean {
  if (!checkLength(unp)) return false;
  if (!checkType(unp)) return false;
  const type = getType(unp);
  if(options?.only && options.only !== type) return false;
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
