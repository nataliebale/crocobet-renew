import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpRequestInit {
  headers?: HttpHeaders;
  params?: HttpParams;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
}
