import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos';
 

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  /**
   *
   */
  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }

  redirectListar() {
    this.router.navigateByUrl("/evento/listar");
  }
}
