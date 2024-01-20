// confirmation-dialog.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  confirm(message?: string): boolean {
    return window.confirm(message || 'Are you sure?');
  }
}