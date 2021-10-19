import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from './titulo/titulo.component';

@NgModule({
  declarations: [TituloComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TituloComponent
  ],providers: [
    
  ]
})
export class SharedModule { }
