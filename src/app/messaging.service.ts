import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  constructor(private httpClient: HttpClient) {}

  subscribeToNotification(token: string) {
    console.log('token');
    this.httpClient
      .post(`${BASE_URL}/subscription`, { token: token })
      .subscribe((data) => console.log(data));
  }
}
