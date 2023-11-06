import {AxiosError, AxiosResponse} from "axios";

export class Utils {
  static mapResponse<T>(response: AxiosResponse): T {
    return response.data as T;
  }

  static handleError(error: AxiosError): never {
    throw error;
  }
}
