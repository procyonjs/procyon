/**
 * Call function a. If it succeeds, return it's result. If it throws an error, call function b and return its result.
 * @param a This function is called immediately. If it succeeds, the result is returned.
 * @param b If function a throws an error, the error is passed to function b. The result of that is then returned.
 */
export default function trycatch(a: () => any, b: (error: Error) => any) {
  try {
    return a();
  } catch (error: any) {
    return b(error);
  }
}
