import CustomError from "./CustomError";
import type { IError } from "@/types";

/**
 * Authentication Error
 */
class AuthenticationError extends CustomError implements IError {
  public static type = "AUTHENTICATION_ERROR";
  public name: string;

  /**
   * Constructor
   * @param {string} message
   */
  constructor(message: string) {
    super({ code: null, type: AuthenticationError.type, message });
    this.name = this.constructor.name;
  }
}

CustomError.registerErrorType(AuthenticationError);
export default AuthenticationError;
