import { Injectable } from '@angular/core';
import { BaseUrl, HttpService } from '@crc/shared';
import { SecurityOptions } from '../entity/security-options';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {
  constructor(private readonly apiService: HttpService) {}

  getSubscriptionsFromServer(): Observable<SecurityOptions> {
    const path = `/rest/customer/subscriptions`;
    const baseUrl: BaseUrl = 'apiUrl';
    return this.apiService
      .get$<{ data: SecurityOptions }>({ path, baseUrl })
      .pipe(map((result) => result.data));
  }

  updateSubscriptionsOnServer(options: SecurityOptions) {
    const path = `/rest/customer/updateSubscriptions`;
    const baseUrl: BaseUrl = 'apiUrl';
    const body: SecurityOptions = options;

    return this.apiService.post$({ path, baseUrl, body });
  }
}
