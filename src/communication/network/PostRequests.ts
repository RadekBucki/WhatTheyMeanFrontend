import {api} from '../Config';
import {Utils} from './Utils';
import {AnalyseResponse} from '../Types';
import {Post} from '../Endpoints';

export interface PostRequestHookInterface {
  post: PostRequestsHook
}

export interface PostRequestsHook {
  postRegisterFile: (file: File) => Promise<AnalyseResponse>;
  postRegisterUrl: (url: string) => Promise<AnalyseResponse>;
}

export const usePostRequests = (): PostRequestsHook => {
  const postRegisterFile = async (file: File): Promise<AnalyseResponse> => {

    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(Post.REGISTER_FILE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return Utils.mapResponse<AnalyseResponse>(response);
  };

  const postRegisterUrl = async (url: string): Promise<AnalyseResponse> => {
    const response = await api.post(Post.REGISTER_URL, null, {
      params: {
        url: url,
      },
    });

    return Utils.mapResponse<AnalyseResponse>(response);
  };

  return {
    postRegisterFile,
    postRegisterUrl,
  };
};
