import { describe, test, expect } from '@jest/globals'

import parseParams , { parseByType, stringToBoolean } from './index.js';


describe('Main parseParams method', () => {
  test('should throw when there is no object passed', () => {
    expect(() => {
      const result = parseParams('not an object', new URLSearchParams(''));
    }).toThrow();
  });

  test('should throw when there is no URLSearchParams and is passed as null', () => {
    expect(() => {
      const result = parseParams({ item1: 0}, null, null);
      
    }).toThrow()
  });

  test('should throw when the array separator is null', () => {
    expect(() => {
      const result = parseParams({ item1: 0}, new URLSearchParams(''), null);
    }).toThrow();  
  });
});


describe('parseByType method', () => {
  test('should throw when the variable type is not string', () => {
    expect(() => {
      parseByType(true, 'name', ',');
    }).toThrow();
  });

  test('should test the parsed value from query string value', () => {
    const toBeParsed = [
      { value: 'toString', type: 'string', expected: 'toString' },
      { value: 'yEs', type: false, expected: true, },
      { value: '100', type: 0, expected: 100 },
      { value: 'var1,var2', type: [], expected: [ 'var1', 'var2' ] },
    ]
  
    for(const toParse of toBeParsed) {
      expect(
        parseByType(toParse.value, toParse.type, ','), 
      ).toEqual(
        toParse.expected, 
      );
    }
  });
});


describe('stringToBoolean method', () => {
  test('test variations of true values', () => {
    const trueStrings = ['yes', 'YeS', '1', 'true', 'TrUe'];
  
    for(const string of trueStrings) {
      expect(stringToBoolean(string)).toBe(true);
    }
  });
  
  test('test variations of false values', () => {
    const falseStrings = ['no', 'nO', '0', undefined, null];
  
    for(const string of falseStrings) {
      expect(stringToBoolean(string)).toBe(false);
    }
  });
});