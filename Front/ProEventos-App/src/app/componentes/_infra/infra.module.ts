import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { HeaderTitleComponent } from './header-title/header-title.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [ToastComponent, HeaderTitleComponent ],
  declarations: [ToastComponent, HeaderTitleComponent ]
})
export class InfraModule { }
