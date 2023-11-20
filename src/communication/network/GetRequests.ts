import {Get} from "../Endpoints";
import {api} from "../Config";
import {Utils} from "./Utils";
import {Analyse} from "../Types";


export class GetRequests {

  static getAnalyze(uuid: string): Promise<Analyse> {
    return api.get(Get.ANALYZE + uuid)
      .then(Utils.mapResponse<Analyse>)
      .catch(Utils.handleError)
  }

  static getAnalyzeHistory(): Promise<Analyse[]> {
    return api.get(Get.ANALYZE_HISTORY)
      .then(Utils.mapResponse<Analyse[]>)
      .catch(Utils.handleError)
  }
}
