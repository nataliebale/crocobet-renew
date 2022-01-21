import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProfileMenuItem } from '../entity/profile-menu.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileMenuService {
  constructor(private http: HttpClient) {}

  get(): Observable<ProfileMenuItem[]> {
    return this.http.get<ProfileMenuItem[]>(`url`);
  }
}
