import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: User = {} as User;
  returnUrl: string = '';
  loading = false;

  constructor(
    public router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/inicio';
  }

  login() {
    if (this.model.userName.length > 0 && this.model.password.length > 0) {
      this.loading = true;
      this.auth.login(this.model)
        .subscribe(
          () => {
            this.router.navigate([this.returnUrl]);
            this.toast.success('Logado com sucesso!', 'LOGADO');
            this.loading = false;
          },
          err => {
            this.toast.error('Falha ao realizae o login, usuário ou senha incorretos!', 'ERRO')
            this.loading = false;
          }
        )
    };
  }

}
