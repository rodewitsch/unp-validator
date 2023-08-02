import { strict as assert } from 'assert';
import { isValid } from '../index';

assert.equal(isValid('9999999999'), false); // more than 9 numbers
assert.equal(isValid('999999999'), false); // out of legal range
assert.equal(isValid('100000001'), false); // out of legal range
assert.equal(isValid('192266398'), true); // right legal UNP
assert.equal(isValid('KE7810709'), true); // right individual UNP
assert.equal(isValid('193232698'), true); // right legal UNP
assert.equal(isValid('KE9999999'), false); // wrong individual UNP
