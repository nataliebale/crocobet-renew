import { Injectable } from '@angular/core';
import { HttpService, BaseUrl } from '@crc/shared';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  constructor(private readonly apiService: HttpService) {}

  getRequest(fromDate: string, toDate: string, amount: number, offSet: number) {
    const path = `/rest/transaction/transfers/${fromDate}/${toDate}/${amount}/${offSet}`;
    // const path = `/rest/transaction/transfers/2021-12-10/2021-12-27/11/0`;
    const baseUrl: BaseUrl = 'apiUrl';
    return this.apiService.get$<any>({ path, baseUrl });
  }
}
