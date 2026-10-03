import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { messageFromHttpError } from '../core/http-error';

type PanelState = {
  status: 'loading' | 'ok' | 'error';
  text: string;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  protected readonly auth = inject(AuthService);
  private readonly api = inject(ApiService);

  protected readonly publico = signal<PanelState>({ status: 'loading', text: '' });
  protected readonly privado = signal<PanelState>({ status: 'loading', text: '' });

  constructor() {
    this.reload();
  }

  protected reload(): void {
    this.publico.set({ status: 'loading', text: 'Consultando el endpoint público…' });
    this.privado.set({ status: 'loading', text: 'Consultando el endpoint privado…' });

    this.api.publico().subscribe({
      next: (text) => this.publico.set({ status: 'ok', text }),
      error: (error: HttpErrorResponse) =>
        this.publico.set({
          status: 'error',
          text: messageFromHttpError(error, 'No se pudo leer el endpoint público.'),
        }),
    });

    this.api.privado().subscribe({
      next: (text) => this.privado.set({ status: 'ok', text }),
      error: (error: HttpErrorResponse) =>
        this.privado.set({
          status: 'error',
          text: messageFromHttpError(error, 'No se pudo leer el endpoint privado.'),
        }),
    });
  }
}
