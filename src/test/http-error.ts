import test from 'ava';
import {HttpError} from '../errors';

test('HTTP error stores status code', t => {
  const myError = new HttpError(502);
  t.is(myError.status, 502);
});

test('HTTP error stores message', t => {
  const myError = new HttpError(404, 'Hello testing world');
  t.is(myError.message, 'Hello testing world');
});
