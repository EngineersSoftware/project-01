import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);

  publico(): Observable<string> {
    return this.http.get(`${API_BASE_URL}/api/publico`, { responseType: 'text' });
  }

  privado(): Observable<string> {
    return this.http.get(`${API_BASE_URL}/api/privado`, { responseType: 'text' });
  }
}
