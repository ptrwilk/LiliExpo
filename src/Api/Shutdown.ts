import { put } from "./../Helpers/ApiHelper";

export const shutdown = (seconds: number): Promise<void> => {
  return put(`shutdown?seconds=${seconds}`);
};

export const shutdownNow = (): Promise<void> => {
  return put("shutdown/now");
};
