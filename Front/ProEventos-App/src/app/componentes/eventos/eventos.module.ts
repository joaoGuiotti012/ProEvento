import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventosComponent } from './eventos.component';
import { ModalExcluirComponent } from './modal/excluir/excluir.component';
import { ModalNovoComponent } from './modal/novo/novo.component';
import { ModalEditarComponent } from './modal/editar/editar.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EventoResolve } from '@app/resolvers/evento.resolver';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { DetalheComponent } from './detalhe/detalhe.component';
import { InfraModule } from '../_infra/infra.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from "ngx-currency";
import { DateTimeFormatPipe } from '@app/pipes/DateTimeFormat.pipe';
import { SharedModule } from '@app/shared/shared.module';
import { ListaComponent } from './lista/lista.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: EventosComponent,
    children: [
      {
        path: '',
        component: FormComponent
      },
      {
        path: 'listar',
        component: ListaComponent
      },
      {
        path: ':id/detalhado',
        component: DetalheComponent,
      },
    ]
  },
  {
    path: ':modal',
    component: EventosComponent,
    resolve: {
      evento: EventoResolve
    }
  },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InfraModule,
    TabsModule.forRoot(),
    RouterModule.forChild(routes),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxCurrencyModule,
    SharedModule
  ],
  declarations: [
    EventosComponent,
    DetalheComponent,
    ModalEditarComponent,
    ModalNovoComponent,
    ModalExcluirComponent,
    DateTimeFormatPipe,
    ListaComponent,
    FormComponent
  ],
  exports: [],
  providers: []
})
export class EventosModule { }
