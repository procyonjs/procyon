import test from 'ava';

test('foo', t => {
  t.pass();
});

test('bar', t => {
  t.is('hello', 'hello');
});
