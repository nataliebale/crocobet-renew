import { HttpParams } from '@angular/common/http';
import { HttpMethod, HttpResponseType } from '../../types';
import { EnvironmentConfig } from '../../environment';

export type ExecuteDeleteParameters = ExecuteGetParameters;
export type BaseUrl = keyof EnvironmentConfig;

export interface ExecuteGetParameters {
  headers?: Record<string, string>;
  params?: HttpParams;
  path: string;
  baseUrl?: BaseUrl;
  customBaseUrl?: string;
  responseType?: HttpResponseType;
}

export interface ExecuteParameters<T> extends ExecuteGetParameters {
  body?: T | null;
  method: HttpMethod;
}

export interface ExecutePatchPostPutParameters<T> extends ExecuteGetParameters {
  body?: T;
}
