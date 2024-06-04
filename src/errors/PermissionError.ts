import CustomError from "./CustomError";
import type { IError } from "@/types";

/**
 * Permission Error
 */
class PermissionError extends CustomError implements IError {
  public static type = "PERMISSION_ERROR";
  public name: string;

  /**
   * Constructor
   * @param {string} message
   */
  constructor(message: string) {
    super({ code: null, type: PermissionError.type, message });
    this.name = this.constructor.name;
  }
}

CustomError.registerErrorType(PermissionError);
export default PermissionError;
