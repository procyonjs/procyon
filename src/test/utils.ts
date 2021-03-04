import test from 'ava';
import { trycatch } from '../utils';

// utils.trycatch
test('trycatch returns result of a if no error is thrown', (t) => {
  t.is(trycatch(() => 'hello world', () => 'goodbye world'), 'hello world');
});

test('trycatch passes the error from a to b', (t) => {
  trycatch(() => { throw new Error('foo bar baz buzz') }, (e) => { t.is(e.message, 'foo bar baz buzz') });
});

test('trycatch returns the result from b if an error is thrown', (t) => {
  t.is(trycatch(() => { throw new Error(); return 'baz buzz' }, () => 'foo bar'), 'foo bar');
});

test('trycatch doesn\'t catch errors from b', (t) => {
  try {
    trycatch(() => { throw new Error() }, () => { throw new Error('baz buzz') });
    t.fail();
  } catch (e) {
    t.is(e.message, 'baz buzz');
  }
});
