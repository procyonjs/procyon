import test from 'ava';
import {trycatch} from '../utils';

test('trycatch returns result of a if no error is thrown', t => {
  t.is(
    trycatch(
      () => 'hello world',
      () => 'goodbye world'
    ),
    'hello world'
  );
});

test('trycatch passes the error from a to b', t => {
  trycatch(
    () => {
      throw new Error('foo bar baz buzz');
    },
    error => {
      t.is(error.message, 'foo bar baz buzz');
    }
  );
});

test('trycatch returns the result from b if an error is thrown', t => {
  t.is(
    trycatch(
      () => {
        throw new Error('fizz');
      },
      () => 'foo bar'),
    'foo bar'
  );
});

test('trycatch doesn\'t catch errors from b', t => {
  try {
    trycatch(
      () => {
        throw new Error('fizz');
      },
      () => {
        throw new Error('baz buzz');
      });
    t.fail();
  } catch (error: Error) {
    t.is(error.message, 'baz buzz');
  }
});
