import axios from "axios";
import { ApiUri } from "../global";

const withUrl = (path: string) => `${ApiUri}/${path}`;

const useCancelationToken = () => {
  const source = axios.CancelToken.source();

  setTimeout(() => {
    source.cancel();
  }, 2000);

  return source.token;
};

export const put = <T>(path: string, body?: any): Promise<T> => {
  return new Promise((resolve, reject) => {
    axios
      .put(withUrl(path), body, { cancelToken: useCancelationToken() })
      .then((response) => resolve(response.data))
      .catch((e) => reject(e));
  });
};

export const get = <T>(path: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    axios
      .get(withUrl(path), { cancelToken: useCancelationToken() })
      .then((response) => resolve(response.data))
      .catch((e) => reject(e));
  });
};
