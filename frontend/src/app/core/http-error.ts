import { HttpErrorResponse } from '@angular/common/http';

export function messageFromHttpError(error: HttpErrorResponse, fallback: string): string {
  if (error.status === 0) {
    return 'No hay conexión con el backend. Revisa que esté corriendo en el puerto 8080.';
  }

  if (typeof error.error === 'string' && error.error.trim()) {
    return error.error;
  }

  if (error.status === 400) {
    return 'Revisa los datos e inténtalo de nuevo.';
  }

  if (error.status === 401) {
    return 'Usuario o contraseña incorrectos.';
  }

  return fallback;
}
