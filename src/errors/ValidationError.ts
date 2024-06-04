import CustomError from "./CustomError";
import type { IError } from "@/types";

/**
 * Validation Error
 */
class ValidationError extends CustomError implements IError {
  public static type = "VALIDATION_ERROR";
  public name: string;

  /**
   * Constructor
   * @param {string} message
   */
  constructor(message: string) {
    super({ code: null, type: ValidationError.type, message });
    this.name = this.constructor.name;
  }
}

CustomError.registerErrorType(ValidationError);
export default ValidationError;
