import { InputContext } from "./input-context";

export class StringCalculator {
  private static readonly DEFAULT_DELIMITER = ',';

  public add(numbers: string): number {
    const cleanedInput = numbers.trim();

    if (!cleanedInput) {
      return 0;
    }

    const { delimiter, payload } = this.detectDelimiter(cleanedInput);

    const values = payload.split('\n')
      .map(value => this.parseNumbers(value, delimiter))
      .reduce((acc, cur) => acc.concat(...cur), []);

    this.validate(values);

    if (values.length == 1) {
      return values[0];
    }

    return values.reduce((acc, cur) => acc += cur, 0);
  }

  private parseNumbers(line: string, delimiter: string): number[] {
    return line.split(delimiter)
      .map(value => parseInt(value.trim()));
  }

  private validate(values: number[]): void {
    const negativeValues = values.filter(value => value < 0);
    if (negativeValues.length !== 0) {
      throw new Error(`Negative not allowed: ${negativeValues.join(',')}`);
    }
  }

  private detectDelimiter(payload: string): InputContext {
    if (!payload.startsWith('//')) {
      return {
        delimiter: StringCalculator.DEFAULT_DELIMITER,
        payload,
      }
    }

    const endOfFirstLinePos = payload.indexOf('\n');
    return {
      // The delimiter starts at the position right after
      // the `//` sign which is 2
      delimiter: payload.substring(2, endOfFirstLinePos),
      payload: payload.substring(endOfFirstLinePos + 1)
    }
  }
}