import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  
  toasts: any[] = [];

  show(title: string = 'Modal', textOrTpl: string | TemplateRef<any>, options: any = {}) {
  
    this.toasts.push({ title, textOrTpl, ...options });
    
    setTimeout(() => {
      this.toasts.pop();
    }, 4000);
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
