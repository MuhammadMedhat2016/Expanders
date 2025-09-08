export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public statusMessage: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
