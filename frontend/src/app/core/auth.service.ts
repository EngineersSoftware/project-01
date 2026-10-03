import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { API_BASE_URL } from './api';

const TOKEN_KEY = 'auth_token';

interface LoginResponse {
  token: string;
}

interface JwtPayload {
  sub?: string;
  exp?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_BASE_URL}/api/auth/login`, { username, password })
      .pipe(tap((response) => this.saveToken(response.token)));
  }

  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const payload = this.readPayload(token);
    const expiresAt = payload?.exp ? payload.exp * 1000 : 0;
    if (!payload?.sub || expiresAt <= Date.now()) {
      this.logout();
      return false;
    }

    return true;
  }

  username(): string {
    const token = this.getToken();
    return (token && this.readPayload(token)?.sub) || 'Usuario';
  }

  expiresAt(): Date | null {
    const token = this.getToken();
    const exp = token ? this.readPayload(token)?.exp : undefined;
    return exp ? new Date(exp * 1000) : null;
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  private readPayload(token: string): JwtPayload | null {
    try {
      const part = token.split('.')[1];
      const normalized = part.replace(/-/g, '+').replace(/_/g, '/');
      const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
      return JSON.parse(atob(padded)) as JwtPayload;
    } catch {
      return null;
    }
  }
}
