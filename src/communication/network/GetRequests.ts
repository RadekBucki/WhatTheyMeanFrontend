import {Get} from "../Endpoints";
import {api} from "../Config";
import {Utils} from "./Utils";


export class GetRequests {

  static getAnalyze(id: number): Promise<string[]> {
    return api.get(Get.ANALYZE + id)
      .then(res => {
        return res.data;
      })
      .catch(Utils.handleError)
  }

  static getAnalyzeHistory(): Promise<string[]> {
    return api.get(Get.ANALYZE_HISTORY)
      .then(Utils.mapResponse<string[]>)
      .catch(Utils.handleError)
  }
}
