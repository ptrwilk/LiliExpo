import axios from "axios";
import { map } from "rxjs/operators";
import { Observable, from } from "rxjs";

const withUrl = (path: string) => `${"http://192.168.0.178:5001"}/${path}`;

export const put = <T>(path: string, body?: any): Promise<T> => {
  return axios.put(withUrl(path), body);
};
