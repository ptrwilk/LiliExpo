import { put, get } from "./../Helpers/ApiHelper";

export const shutdown = (seconds: number): Promise<void> => {
  return put(`shutdown?seconds=${seconds}`);
};

export const shutdownNow = (): Promise<void> => {
  return put("shutdown/now");
};

export const shutdownStop = (): Promise<void> => {
  return put("shutdown/stop");
};

export const getShutdownState = (): Promise<number> => {
  return get("shutdown/state");
};
