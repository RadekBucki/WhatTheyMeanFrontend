import { api } from '../Config';
import { Utils } from './Utils';
import { Analyse } from '../Types';
import {Get} from '../Endpoints';

export interface GetRequestsHook {
  getAnalyze: (uuid: string) => Promise<Analyse>;
  getAnalyzeHistory: (uuid: string[]) => Promise<Analyse[]>;
}

export const useGetRequests = (): GetRequestsHook => {

  const getAnalyze = async (uuid: string): Promise<Analyse> => {
    const response = await api.get(Get.ANALYZE + uuid);
    return Utils.mapResponse<Analyse>(response);
  };

  const getAnalyzeHistory = async (uuids: string[]): Promise<Analyse[]> => {
    const queryParams = uuids.map((uuid, index) => {
      const param = `uuids=${encodeURIComponent(uuid)}`;
      return index === 0 ? param : `&${param}`;
    }).join('');

    const urlWithParams = `${Get.ANALYZE_HISTORY}?${queryParams}`;

    const response = await api.get(urlWithParams);
    return Utils.mapResponse<Analyse[]>(response);
  };

  return {
    getAnalyze,
    getAnalyzeHistory,
  };
};
