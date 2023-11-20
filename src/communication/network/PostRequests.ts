import {Post} from "../Endpoints";
import {api} from "../Config";
import {Utils} from "./Utils";
import {AnalyseResponse} from "../Types";

export class PostRequests {

  static postRegisterFile(file: File): Promise<AnalyseResponse> {
    const formData = new FormData()
    formData.append("file", file)
    return api.post(Post.REGISTER_FILE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(Utils.mapResponse<AnalyseResponse>)
      .catch(Utils.handleError)
  }

  static postRegisterUrl(url: string): Promise<AnalyseResponse> {
    return api.post(Post.REGISTER_URL, null, {
      params: {
        'url': url,
      }
    }).then(Utils.mapResponse<AnalyseResponse>)
      .catch(Utils.handleError)
  }
}
