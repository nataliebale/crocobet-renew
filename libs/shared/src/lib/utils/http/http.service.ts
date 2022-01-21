import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { EnvironmentService } from '../../environment';
import { HttpRequestType } from '../../types';
import { HttpRequestInit } from './http-request-init';
import {
  ExecuteDeleteParameters,
  ExecuteGetParameters,
  ExecuteParameters,
  ExecutePatchPostPutParameters
} from './execude-parameters';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private execute$<ResponseT, RequestT>({
    body = null,
    baseUrl = 'apiUrl',
    headers,
    method,
    path,
    params,
    responseType,
    customBaseUrl
  }: ExecuteParameters<RequestT>): Observable<ResponseT> {
    const init: HttpRequestInit = { params, responseType };
    if (headers) {
      init.headers = new HttpHeaders(headers);
    }

    let customRequestUrl;
    if (customBaseUrl) {
      customRequestUrl = customBaseUrl + path;
    }
    const url =
      customRequestUrl || this.environmentService.config[baseUrl] + path;
    const requestOptions = new HttpRequest<RequestT>(method, url, body, init);
    return this.http.request<ResponseT>(requestOptions).pipe(
      filter(({ type }) => type === HttpEventType.Response),
      map((response) => (response as HttpResponse<ResponseT>).body)
    ) as Observable<ResponseT>;
  }

  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly http: HttpClient
  ) {}

  delete$<ResponseT>(params: ExecuteDeleteParameters): Observable<ResponseT> {
    return this.execute$<ResponseT, void>({
      ...params,
      method: HttpRequestType.DELETE
    });
  }

  get$<ResponseT>(params: ExecuteGetParameters): Observable<ResponseT> {
    return this.execute$<ResponseT, void>({
      ...params,
      method: HttpRequestType.GET
    });
  }

  patch$<ResponseT, RequestT>(
    params: ExecutePatchPostPutParameters<RequestT>
  ): Observable<ResponseT> {
    return this.execute$<ResponseT, RequestT>({
      ...params,
      method: HttpRequestType.PATCH
    });
  }

  post$<ResponseT, RequestT>(
    params: ExecutePatchPostPutParameters<RequestT>
  ): Observable<ResponseT> {
    return this.execute$<ResponseT, RequestT>({
      ...params,
      method: HttpRequestType.POST
    });
  }

  put$<ResponseT, RequestT>(
    params: ExecutePatchPostPutParameters<RequestT>
  ): Observable<ResponseT> {
    return this.execute$<ResponseT, RequestT>({
      ...params,
      method: HttpRequestType.PUT
    });
  }
}
