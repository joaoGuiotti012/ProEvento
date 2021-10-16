import { Component, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ToastService } from './toast.service';


@Component({
  selector: 'infra-toasts',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  host: { '[class.ngb-toasts]': 'true' }
})
export class ToastComponent {

  constructor(public toastService: ToastService) { }

  isTemplate(toast: any) { 
    console.log(toast.textOrTpl instanceof TemplateRef);
    
    return toast.textOrTpl instanceof TemplateRef; 
  }

}
