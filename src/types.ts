import {ProcyonPrecastError} from './errors';
import {trycatch} from './utils';

/**
 * Procyon's Types
 *
 * Read more here: https://procyonjs.org/docs/types_api
 */
export type ProcyonType = ((t: any, precast?: boolean) => boolean) & {gql: string; schema?: string; rest_precast?: ((t: any) => any)};

/**
 * Returns the non-nullable version of a nullable type. For example, `types.RSTRING` is the same as `types.R(types.STRING)`
 * @param _type A nullable type
 */
export const R = (_type: ProcyonType) => {
  const TYPE = (t: any, precast?: boolean) => t !== null && _type(t, precast);
  TYPE.gql = _type.gql + '!';
  TYPE.schema = _type.schema;
  TYPE.rest_precast = _type.rest_precast;
  return TYPE;
};

/**
 * Represent a nullable string literal
 */
export const STRING = (t: any, precast?: boolean) => t === null || typeof t === 'string';
STRING.gql = 'String';

/**
 * Represent a non-nullable string literal
 */
export const RSTRING = R(STRING);

/**
 * Represent a nullable numeric literal
 */
export const NUMBER = (t: any, precast?: boolean) => t === null || typeof t === 'number';
NUMBER.gql = 'Float';
// When receiving a REST request, all paramters are in string format.
// In that case, this function is called, and then its output is
// passed to the NUMBER function. If no `rest_precast` method is
// present on a type, the value is passed directly to it as a string.
NUMBER.rest_precast = (t: any) => Number.isNaN(Number.parseFloat(t)) && t === 'NaN' ? Number.NaN : (Number.isNaN(Number.parseFloat(t)) ? (() => {
  throw new ProcyonPrecastError('Invalid number');
})() : Number.parseFloat(t));

/**
 * Represent a non-nullable numeric literal
 */
export const RNUMBER = R(NUMBER);

/**
 * Represent a nullable boolean literal
 */
export const BOOLEAN = (t: any, precast?: boolean) => t === null || typeof t === 'boolean';
BOOLEAN.gql = 'Boolean';
// See comments on NUMBER.rest_precast
BOOLEAN.rest_precast = (t: any) => t === 'true' ? true : (t === 'false' ? false : (() => {
  throw new ProcyonPrecastError('Invalid boolean');
})());

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
export const ARRAY = (t: ProcyonType) => {
  const TYPE = (s: any, precast?: boolean) => s === null || (Array.isArray(s) && s.every(v => t(precast ? (t.rest_precast ? t.rest_precast(v) : v) : v)));
  TYPE.gql = `[${t.gql}]`;
  TYPE.rest_precast = (t: any) => trycatch(() => JSON.parse(t), () => {
    throw new ProcyonPrecastError('Invalid JSON');
  });
  return TYPE;
};

/**
 * Represent a non-nullable array of the input type
 * @param t Type of a valid array element
 */
export const RARRAY = (t: ProcyonType) => R(ARRAY(t));

const ifUndefined = (v: any, fallback: any) => v === undefined ? fallback : v;

/**
 * Represent a nullable interface type
 * @param _name The interface's name in the GraphQL schema
 * @param map A mapping of key names and procyon types
 */
export const INTERFACE = (_name: string, map: {[key: string]: ProcyonType}) => {
  const TYPE = (t: any, precast?: boolean) => t === null || Object.keys(t).every((key: string) => map[key]?.((precast ? (map[key].rest_precast ? map[key].rest_precast?.(ifUndefined(t[key], null)) : ifUndefined(t[key], null)) : ifUndefined(t[key], null))));
  TYPE.gql = _name;
  TYPE.schema = `type ${_name} {\n${Object.keys(map).map(key => `${key}: ${map[key].gql}`).join(',\n')}\n}`;
  TYPE.rest_precast = (t: any) => trycatch(() => JSON.parse(t), () => {
    throw new ProcyonPrecastError('Invalid JSON');
  });
  return TYPE;
};

/**
 * Represent a non-nullable interface type
 * @param _name The interface's name in the GraphQL schema
 * @param map A mapping of key names an procyon types
 */
export const RINTERFACE = (_name: string, map: {[key: string]: ProcyonType}) => R(INTERFACE(_name, map));

/**
 * Represent a nullable union type
 * @param _name The union type's name in the GraphQL schema
 * @param types The different types allowed in the union
 */
export const UNION = (_name: string, ...types: ProcyonType[]) => {
  const TYPE = (t: any, precast?: boolean) => !t || types.map(tp => tp(precast ? (tp.rest_precast ? tp.rest_precast(t) : t) : t)).some(v => v);
  TYPE.gql = _name;
  TYPE.schema = `union ${_name} = ${types.map(tp => tp.gql).join(' | ')}`;
  return TYPE;
};

/**
 * Represent a non-nullable union type
 * @param _name The union type's name in the GraphQL schema
 * @param types The different types allowed in the union
 */
export const RUNION = (_name: string, ...types: ProcyonType[]) => R(UNION(_name, ...types));
