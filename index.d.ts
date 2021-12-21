declare module 'riteway-jest' {
  interface Assertion<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly given: any;
    readonly should: string;
    readonly actual: T;
    readonly expected: T;
  }

  // eslint-disable-next-line import/no-default-export
  export default function assert<T>(assertion: Assertion<T>): void;
}
