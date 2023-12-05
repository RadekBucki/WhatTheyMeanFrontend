import { api } from '../Config';
import { Utils } from './Utils';
import { Analyse } from '../Types';
import {Get} from '../Endpoints';

export interface GetRequestHookInterface {
  get: GetRequestsHook
}

export interface GetRequestsHook {
  getAnalyze: (uuid: string) => Promise<Analyse>;
  getAnalyzeHistory: (uuids: string[]) => Promise<Analyse[]>;
}

export const useGetRequests = (): GetRequestsHook => {

  const getAnalyze = async (uuid: string): Promise<Analyse> => {
    const response = await api.get(Get.ANALYZE + uuid);
    return Utils.mapResponse<Analyse>(response);
  };

  const getAnalyzeHistory = async (content: string[]): Promise<Analyse[]> => {
    const serializedUuids = content.join(',');
    const response = await api.get(`${Get.ANALYZE_HISTORY}?uuids=${serializedUuids}`);

    return Utils.mapResponse<Analyse[]>(response);
  };

  return {
    getAnalyze,
    getAnalyzeHistory,
  };
};
