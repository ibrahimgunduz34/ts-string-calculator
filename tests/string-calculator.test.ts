import { expect } from 'chai';
import { StringCalculator } from '../src/string-calculator';

describe('StringCalculator Test', () => {
  let calculator: StringCalculator;

  beforeEach(() => {
    calculator = new StringCalculator();
  });

  describe('When the input is an empty string', () => {
    it('should return zero', () => {
      const expected = 0;
      const input = '';
      const actual = calculator.add(input);
      expect(actual).to.eql(expected);
    });
  });

  describe('When the input contains only one single number', () => {
    it('should return the number from the original input', () => {
      const expected = 2;
      const input = '2';
      const actual = calculator.add(input);
      expect(actual).to.eql(expected);
    });
  });

  describe('When the input consists of two numbers', () => {
    it('should return sum of the numbers', () => {
      const expected = 56;
      const input = '21,35';
      const actual = calculator.add(input);
      expect(actual).to.eql(expected);
    });
  });

  describe('When the input consists of unknown amount of numbers', () => {
    it('should return sum of the numbers', () => {
      const numbers = [];
      const limit = 10;

      for (let i = 0; i < limit; i++) {
        numbers.push(i);
      }

      const expected = ((limit - 1) * limit) / 2;
      const input = numbers.join(',');
      const actual = calculator.add(input);
      expect(actual).to.eql(expected);
    })
  })

  describe('When the numbers in the input string are separated by new line characters', () => {
    it('should return sum of the numbers', () => {
      const expected = 93;
      const input = '21\n32\n40';
      const actual = calculator.add(input);
      expect(actual).to.eql(expected);
    });
  });
  
  describe('When the numbers in the input string are separated by new line characters and comma signs', () => {
    it('should return sum of the numbers', () => {
      const expected = 93;
      const input = '21\n32,40';
      const actual = calculator.add(input);
      expect(actual).to.eql(expected);
    });
  });

  describe('when the numbers are separated by a custom delimiter', () => {
    it('should return sum of the numbers', () => {
      const expected = 56;
      const input = '//;\n24;32';
      const actual = calculator.add(input);
      expect(actual).to.eql(expected);
    });
  });

  describe('when the numbers in multiple lines are separated by a custom delimiter', () => {
    it('should return sum of the numbers', () => {
      const expected = 101;
      const input = '//;\n24\n32;45';
      const actual = calculator.add(input);
      expect(actual).to.eql(expected);
    });
  });

  describe('when the input contains a negative number', () => {
    it('should throw an error with the expected error message', () => {
      const input = '1,-2,-3';
      const expectedErrorMessage = 'Negative not allowed: -2,-3';
      try {
        calculator.add(input);
        throw new Error('It should have thrown an exception!');
      } catch (error: any) {
        expect(error.message).to.eql(expectedErrorMessage)
      }
    });
  });

  describe('when the input contains a negative number', () => {
    it('should throw an error with the expected error message', () => {
      const input = '1\n3,-2\n-3';
      const expectedErrorMessage = 'Negative not allowed: -2,-3';
      try {
        calculator.add(input);
        throw new Error('It should have thrown an exception!');
      } catch (error: any) {
        expect(error.message).to.eql(expectedErrorMessage)
      }
    });
  });
});