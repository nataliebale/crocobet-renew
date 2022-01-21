export enum HttpRequestType {
  DELETE = 'DELETE',
  GET = 'GET',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT'
}

export type HttpResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';

export enum HttpResponseCode {
  OK = 200,
  INCORRECT_OLD_PASSWORD = 465
}

export type HttpMethod =
  | 'DELETE'
  | 'GET'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PUT';
