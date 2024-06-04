import type { IError, ErrorClass, ISerializedError } from "@/types";

/**
 * CustomError
 */
export default class CustomError extends Error implements IError {
  private static errorTypes: Array<ErrorClass> = [];
  public static type = "CustomError";
  public code: null | string = null;
  public type = "CustomError";

  /**
   * Constructor
   * @param {ISerializedError} options
   */
  constructor({ code, type, message }: ISerializedError) {
    super(message);
    this.code = code;
    this.type = type;
  }

  /**
   * RegisterErrorType
   * @param {IError} ErrorType
   * @return {CustomError}
   */
  public static registerErrorType(
    ErrorType: ErrorClass
  ): new (args: ISerializedError) => CustomError {
    if (this.errorTypes.includes(ErrorType)) {
      return this;
    }
    this.errorTypes.push(ErrorType);

    return this;
  }

  /**
   * FromJSON
   * @param {ISerializedError} options
   * @return {CustomError}
   */
  public static fromJSON(options: ISerializedError): CustomError {
    const { type } = options;
    const FoundErrorType = this.errorTypes.find(
      (errorType) => errorType.type === type
    );

    if (FoundErrorType) {
      return new FoundErrorType(options.message);
    }

    return new CustomError(options);
  }

  /**
   * To Json
   * @return {ISerializedError}
   */
  public toJSON(): ISerializedError {
    return {
      code: this.code,
      type: this.type,
      message: this.message,
    };
  }
}
