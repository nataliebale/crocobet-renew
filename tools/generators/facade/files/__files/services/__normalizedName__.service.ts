import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { <%= feature.className %> } from '../entity/<%= feature.fileName %>.interface.ts';

@Injectable({
  providedIn: 'root'
})
export class <%= feature.className %>Service {
  constructor(private http: HttpClient) {}

  get(): Observable<<%= feature.className %>[]> {
    return this.http.get<<%= feature.className %>[]>(`url`);
  }
}
