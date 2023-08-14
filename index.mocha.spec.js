import { describe, test } from 'mocha';
import * as assert from 'node:assert';

import parseParams , { parseByType, stringToBoolean } from './index.js';


describe('Main parseParams method', () => {
  test('should throw when there is no object passed', () => {
    assert.throws(() => {
      const result = parseParams('not an object', new URLSearchParams(''));
    },
    {
      message: 'baseObject property must be declared and a object'
    })
  });

  test('should throw when there is no URLSearchParams and is passed as null', () => {
    assert.throws(() => {
      const result = parseParams({ item1: 0}, null, null);
      
    }, 
    {
      message:  'search params must be initialized like "new URLSearchParams(query)"'
    });
  });

  test('should throw when the array separator is null', () => {
    assert.throws(() => {
      const result = parseParams({ item1: 0}, new URLSearchParams(''), null);
    }, 
    {
      message: 'arr separator must not be empty'
    });  
  });
});


describe('parseByType method', () => {
  test('should throw when the variable type is not string', () => {
    assert.throws(() => {
      parseByType(true, 'name', ',');
    },
    {
      message: 'variable and type must be strings'
    });
  });

  test('should test the parsed value from query string value', () => {
    const toBeParsed = [
      { value: 'toString', type: 'string', expected: 'toString' },
      { value: 'yEs', type: false, expected: true, },
      { value: '100', type: 0, expected: 100 },
      { value: 'var1,var2', type: [], expected: [ 'var1', 'var2' ] },
    ]
  
    for(const toParse of toBeParsed) {
      assert.deepEqual(
        parseByType(toParse.value, toParse.type, ','), 
        toParse.expected, 
        `type (${typeof(toParse.type)}) is failing`
      );
    }
  });
});


describe('stringToBoolean method', () => {
  test('test variations of true values', () => {
    const trueStrings = ['yes', 'YeS', '1', 'true', 'TrUe'];
  
    for(const string of trueStrings) {
      assert.strictEqual(stringToBoolean(string), true);
    }
  });
  
  test('test variations of false values', () => {
    const falseStrings = ['no', 'nO', '0', undefined, null];
  
    for(const string of falseStrings) {
      assert.strictEqual(stringToBoolean(string), false);
    }  
  });
});




