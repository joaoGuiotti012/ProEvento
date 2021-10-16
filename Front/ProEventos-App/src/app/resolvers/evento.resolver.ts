import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventoResolve implements Resolve<Evento> {

  constructor(
    private service: EventoService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<any> | Promise<any> | any {
    if (route.params?.modal) {
      return this.service.getById(route.params?.modal)
        .pipe(
          map(res => {
            return res;
          }),
          catchError(() => {
            return of(null);
          })
        );
    }
  }

}
