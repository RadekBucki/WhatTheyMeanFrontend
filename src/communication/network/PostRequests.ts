import {Post} from "../Endpoints";
import {api} from "../Config";
import {Utils} from "./Utils";

export class PostRequests {

  static postRegisterFile(file: File): Promise<string> {
    const formData = new FormData()
    formData.append("file", file)
    return api.post(Post.REGISTER_FILE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(res => {
      return res.data;
    })
      .catch(Utils.handleError)
  }

  static postRegisterUrl(url: string): Promise<string> {
    return api.post(Post.REGISTER_URL, null, {
      params: {
        'url': url,
      }
    }).then(res => {
      return res.data;
    })
      .catch(Utils.handleError)
  }
}
