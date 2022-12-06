type ResultType = "success" | "error";

export default class ResponseOrError<
  ResponseType,
  ErrorType extends string | undefined
> {
  protected result: ResultType;
  protected errorType?: ErrorType;
  protected error?: unknown;
  protected response?: ResponseType;

  protected constructor(
    result: "success" | "error",
    payload: { response?: ResponseType; errorType?: ErrorType; error?: unknown }
  ) {
    this.result = result;
    this.errorType = payload.errorType;
    this.error = payload.error;
    this.response = payload.response;
  }

  public static success<T>(response?: T) {
    return new ResponseOrError<T, undefined>("success", { response });
  }

  public static error<T extends string>(
    errorType: T,
    error: unknown = new Error()
  ) {
    return new ResponseOrError<undefined, T>("error", { errorType, error });
  }

  public isFailure() {
    return this.result === "error";
  }

  public isSuccess() {
    return this.result === "success";
  }

  public getResponse() {
    return this.response;
  }

  public getError() {
    return { type: this.errorType, error: this.error };
  }
}
