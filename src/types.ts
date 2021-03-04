import { ProcyonPrecastError } from './errors';
import { trycatch } from './utils';

/**
 * Procyon's Types
 * 
 * Read more here: https://procyonjs.org/docs/types_api
 */

/**
 * Represent a nullable string literal
 */
export const STRING = (t: any) => !t || typeof t === 'string';
STRING.gql = 'String';

/**
 * Represent a non-nullable string literal
 */
export const RSTRING = R(STRING);

/**
 * Represent a nullable numeric literal
 */
export const NUMBER = (t: any) => !t || typeof t === 'number';
NUMBER.gql = 'Float';
// When receiving a REST request, all paramters are in string format.
// In that case, this function is called, and then its output is
// passed to the NUMBER function. If no `rest_precast` method is
// present on a type, the value is passed directly to it as a string.
NUMBER.rest_precast = (t: any) => isNaN(parseFloat(t)) && t === 'NaN' ? NaN : (!isNaN(parseFloat(t)) ? parseFloat(t) : (() => { throw new ProcyonPrecastError('Invalid number') })());

/**
 * Represent a non-nullable numeric literal
 */
export const RNUMBER = R(NUMBER);

/**
 * Represent a nullable boolean literal
 */
export const BOOLEAN = (t: any) => !t || typeof t === 'boolean';
BOOLEAN.gql = 'Boolean';
// See comments on NUMBER.rest_precast
BOOLEAN.rest_precast = (t: any) => t === 'true' ? true : (t === 'false' ? false : (() => { throw new ProcyonPrecastError('Invalid boolean') })());

/*
 * Represent a non-nullable boolean literal
 */
export const RBOOLEAN = R(BOOLEAN);

/*
 * Represent a nullable string literal that is not meant to be human-readable
 */
export const ID = STRING;

/**
 * Represent a non-nullable string literal that is not meant to be human-readable
 */
export const RID = RSTRING;

/**
 * Represent a nullable array of the input type
 * @param t Type of a valid array element
 */
export const ARRAY = (t: Function) => {
  const TYPE = (s: any) => !s || (Array.isArray(s) && s.every(v => t(t.rest_precast ? t.rest_precast(v) : v)));
  TYPE.gql = `[${(t as any).gql}]`;
  TYPE.rest_precast = (t: any) => trycatch(() => JSON.parse(t), () => { throw new ProcyonPrecastError('Invalid JSON') });
  return TYPE;
};

/**
 * Represent a non-nullable array of the input type
 * @param t Type of a valid array element
 */
export const RARRAY = (t: Function) => R(ARRAY(t));

/**
 * Represent a nullable interface type
 * @param _name The interface's name in the GraphQL schema
 * @param map A mapping of key names and procyon types
 */
export const INTERFACE = (_name: string, map: { [key: string]: Function }) => {
  const TYPE = (t: any) => !t || Object.keys(t).every((key: string) => map[key] && map[key](map[key].rest_precast ? map[key].rest_precast(t[key] || null) : (t[key] || null)));
  TYPE.gql = _name;
  TYPE.schema = `type ${_name} {\n${Object.keys(map).map(e => `${e}: ${(map[e] as any).gql}`).join(',\n')}\n}`;
  TYPE.rest_precast = (t: any) => trycatch(() => JSON.parse(t), () => { throw new ProcyonPrecastError('Invalid JSON') });
  return TYPE;
};

/**
 * Represent a non-nullable interface type
 * @param _name The interface's name in the GraphQL schema
 * @param map A mapping of key names an procyon types
 */
export const RINTERFACE = (_name: string, map: { [key: string]: Function }) => R(INTERFACE(_name, map));

/**
 * Represent a nullable union type
 * @param _name The union type's name in the GraphQL schema
 * @param types The different types allowed in the union
 */
export const UNION = (_name: string, ...types: Function) => {
  const TYPE = (t: any) => !t || types.map(tp => tp(tp.rest_precast ? tp.rest_precast(t) : t)).some(v => v);
  TYPE.gql = _name;
  TYPE.schema = `union ${_name} = ${types.map(tp => (tp as any).gql).join(' | ')}`;
  return TYPE;
};

/**
 * Represent a non-nullable union type
 * @param _name The union type's name in the GraphQL schema
 * @param types The different types allowed in the union
 */
export const RUNION = (_name: string, ...types: Function) => R(UNION(_name, ...types));

/**
 * Returns the non-nullable version of a nullable type. For example, `types.RSTRING` is the same as `types.R(types.STRING)`
 * @param _type A nullable type
 */
export const R = (_type: Function) => {
  const TYPE = (t: any) => t !=== null && _type(t);
  TYPE.gql = (_type as any).gql + '!';
  TYPE.schema = (_type as any).schema;
  TYPE.rest_precast = (_type as any).rest_precast;
  return TYPE;
};
