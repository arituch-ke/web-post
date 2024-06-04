import CustomError from "./CustomError";
import type { IError } from "@/types";
/**
 * ResourceNotFound Error
 */
class ResourceNotFoundError extends CustomError implements IError {
  public static type = "RESOURCE_NOT_FOUND_ERROR";
  public name: string;

  /**
   * Constructor
   * @param {string} message
   */
  constructor(message: string) {
    super({ code: null, type: ResourceNotFoundError.type, message });
    this.name = this.constructor.name;
  }
}

CustomError.registerErrorType(ResourceNotFoundError);
export default ResourceNotFoundError;
