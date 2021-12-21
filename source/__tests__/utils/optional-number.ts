import { optionalNumber } from 'utils/guard';
import assert from 'riteway-jest';

describe('utils/guard/optional-number.ts', () => {
  assert({
    given: '"1" as string',
    should: 'return 1',
    actual: optionalNumber('1'),
    expected: 1,
  });

  assert({
    given: '1 as number',
    should: 'return 1',
    actual: optionalNumber(1),
    expected: 1,
  });

  assert({
    given: 'array',
    should: 'return null',
    actual: optionalNumber([]),
    expected: null,
  });

  assert({
    given: 'string',
    should: 'return null',
    actual: optionalNumber('string'),
    expected: null,
  });

  assert({
    given: 'boolean',
    should: 'return null',
    actual: [optionalNumber(true), optionalNumber(false)],
    expected: [null, null],
  });

  assert({
    given: 'undefined',
    should: 'return null',
    // eslint-disable-next-line unicorn/no-useless-undefined
    actual: optionalNumber(undefined),
    expected: null,
  });
});
