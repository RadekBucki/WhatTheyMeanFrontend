import { api } from '../Config';
import { Utils } from './Utils';
import { Analyse } from '../Types';
import {Get} from "../Endpoints";

export interface GetRequestsHook {
  getAnalyze: (uuid: string) => Promise<Analyse>;
  getAnalyzeHistory: () => Promise<Analyse[]>;
}

export const useGetRequests = (): GetRequestsHook => {

  const getAnalyze = async (uuid: string): Promise<Analyse> => {
    try {
      const response = await api.get(Get.ANALYZE + uuid);
      return Utils.mapResponse<Analyse>(response);
    } catch (error) {
      throw error;
    }
  };

  const getAnalyzeHistory = async (): Promise<Analyse[]> => {
    try {
      const response = await api.get(Get.ANALYZE_HISTORY);
      return Utils.mapResponse<Analyse[]>(response);
    } catch (error) {
      throw error;
    }
  };

  return {
    getAnalyze,
    getAnalyzeHistory,
  };
};
