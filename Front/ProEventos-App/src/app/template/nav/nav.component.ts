import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


  @Output('trocarTema') trocarTema = new EventEmitter<boolean>();

  user: any;

  constructor(public auth: AuthService) {
    this.auth.userLogged.subscribe((u) => this.user = u);
  }

  ngOnInit() { }

  logout() {
    this.auth.logout();
  }

  handleChangeTema(value: boolean) {
    this.trocarTema.emit(value);
  }
  
}
