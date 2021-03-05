export default class ProcyonPrecastError extends Error {
  constructor(message: string) {
    super(`Failed to prepare for typecheck: ${message}`);
  }
}
