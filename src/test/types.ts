import test from 'ava';
import * as types from '../types';

// ===================== SCALAR TYPES =====================
// STRING and RSTRING
test('STRING type accepts strings', (t) => {
  t.is(types.STRING('Hello world'), true);
});

test('STRING type accepts null', (t) => {
  t.is(types.STRING(null), true);
});

test('STRING type rejects non-strings', (t) => {
  t.is(types.STRING(5), false);
});

test('RSTRING type accepts strings', (t) => {
  t.is(types.RSTRING('Hello world'), true);
});

test('RSTRING type rejects null', (t) => {
  t.is(types.RSTRING(null), false);
});

// NUMBER and RNUMBER
test('NUMBER type accpets integers', (t) => {
  t.is(types.NUMBER(56), true);
});

test('NUMBER type accepts floating-points', (t) => {
  t.is(types.NUMBER(5.27), true);
);

test('NUMBER type accepts null', (t) => {
  t.is(typed.NUMBER(null), true);
});

test('NUMBER type rejects non-numbers', (t) => {
  t.is(types.NUMBER('hello'), false);
});

test('RNUMBER type accepts integers', (t) => {
  t.is(types.RNUMBER(56), true);
});

test('RNUMBER type accepts floats', (t) => {
  t.is(types.RNUMBER(5.7627), true);
});

test('RNUMBER type rejects null', (t) => {
  t.is(types.RNUMBER(null), false);
});

// BOOLEAN and RBOOLEAN
test('BOOLEAN type accepts booleans', (t) => {
  t.is(types.BOOLEAN(true), true);
  t.is(types.BOOLEAN(false), true);
});

test('BOOLEAN type accepts null', (t) => {
  t.is(types.BOOLEAN(null), true);
});

test('BOOLEAN type rejects non-bools', (t) => {
  t.is(types.BOOLEAN(7), false);
});

test('RBOOLEAN type rejects null', (t) => {
  t.is(types.RBOOLEAN(null), false);
});

// ID and RID
test('ID serializes like STRING', (t) => {
  t.is(types.ID, types.STRING);
});

test('RID serializes like RSTRING', (t) => {
  t.is(types.RID, types.RSTRING);
});

// ===================== METHOD TYPES =====================
// ARRAY and RARRAY
test('ARRAY type', (t) => {
  const myArrayType = types.ARRAY(types.STRING); // An array of strings
  const myArrayTest = ['hello', 'world', 'foo', 'bar'];
  t.is(myArrayType(myArrayTest), true);
  t.is(myArrayType(null), true);
  t.is(myArrayType.gql, '[String]');
});

test('ARRAY type 2', (t) => {
  const myArrayType = types.ARRAY(types.STRING);
  t.is(myArrayType(['hello', 5, 'world']), false);
});

test('RARRAY', (t) => {
  const myRArrayType = types.RARRAY(types.STRING);
  t.is(myRArrayType(null), false);
});

// INTERFACE and RINTERFACE
test('INTERFACE', (t) => {
  const myInterface = types.INTERFACE('test', { foo: types.STRING, bar: types.RBOOLEAN });
  t.is(myInterface({ bar: true }), true);
  t.is(myInterface({ foo: 'Hi', bar: false }), true);
  t.is(myInterface({ buzz: 'bizz' }), false);
  t.is(myInterface(null), true);
});

test('RINTERFACE', (t) => {
  const myInterface = types.RINTERFACE('test', { foo: types.STRING });
  t.is(myInterface(null), false);
});

// UNION and RUNION
test('UNION accepts types in the union and null', (t) => {
  const myUnion = types.UNION(types.STRING, types.BOOLEAN);
  t.is(myUnion('hello'), true);
  t.is(myUnion(false), true);
  t.is(myUnion(null), true);
});

test('RUNION rejects null', (t) => {
  const myUnion = types.RUNION(types.STRING, types.BOOLEAN);
  t.is(myUnion(null), false);
});
// Since all the R-types are made using the R method, no tests of it are required