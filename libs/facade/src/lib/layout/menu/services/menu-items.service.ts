import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MenuItem } from '../entity/menu-items.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {
  constructor(private http: HttpClient) {}

  get(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`url`);
  }
}
