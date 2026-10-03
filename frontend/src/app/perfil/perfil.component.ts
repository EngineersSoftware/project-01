import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected initial(): string {
    return this.auth.username().slice(0, 1).toUpperCase();
  }

  protected expiresLabel(): string {
    const date = this.auth.expiresAt();
    if (!date) {
      return 'Sin fecha';
    }

    return new Intl.DateTimeFormat('es', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  }

  protected logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
