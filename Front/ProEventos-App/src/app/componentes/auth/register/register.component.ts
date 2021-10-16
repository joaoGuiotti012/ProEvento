import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.validation();
  }

  validation() {
    this.registerForm = this._fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      passwords: this._fb.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', [Validators.required]]
      }, { validator: this.comparaSenhas })
    });
  }

  comparaSenhas(fb: any) {
    const confirmSenhaCtrl = fb.get('confirmPassword') as FormGroup;
    if (confirmSenhaCtrl.errors == null || 'mismatch' in confirmSenhaCtrl.errors) {
      if (fb.get('password').value !== confirmSenhaCtrl.value) {
        confirmSenhaCtrl.setErrors({ mismatch: true });
      } else {
        confirmSenhaCtrl.setErrors(null);
      }
    }
  }

  get f(): FormGroup {
    return this.registerForm as FormGroup;
  }

  control(controlName: string) {
    return this.registerForm.get(controlName) as FormGroup;
  }

  isInvalidControl(controlName: string) {
    return this.f.get(controlName)?.errors && this.f.get(controlName)?.touched;
  }

  onSubmit() {
    if (this.f.invalid) return;

    let user = Object.assign(
      { password: this.f.get('passwords.password')?.value },
      this.f.value) as User;

    this.auth.register(user)
      .subscribe((res: any) => {
        this.router.navigate(['/login']);
        this.toast.success('Novo usuário cadastrado!', 'SUCESSO')
      }, err => {
        this.toast.error('Falha ao realizar o cadastro!', 'ERRO')
      });
  }

}
