import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';

@Component({
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.scss'],
})
export class ModalNovoComponent implements OnInit {

  bsConfig?: Partial<BsDatepickerConfig> = {
    isAnimated: true,
    containerClass: 'theme-dark-blue',
    dateInputFormat: 'DD/MM/YYYY hh:mm'
  };
  registerForm: FormGroup = new FormGroup({});
  file?: File;

  private _closeData = new BehaviorSubject(null);

  get onClose() {
    return this._closeData.asObservable();
  }

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private locale: BsLocaleService
  ) {
    this.locale.use('pt-br');
  }

  ngOnInit() {
    this.validation();
  }

  validation(): void {
    this.registerForm = this.fb.group({
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      imagemUrl: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  onFileChange(ev: any) {
    const reader = new FileReader();
    if (ev.target.files && ev.target.files.length) {
      this.file = ev.target.files;
    }
  }

  get _f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    this._closeData.next(Object.assign({ evento: this.registerForm.value, file: this.file}));
    this._closeData.complete();
    this.bsModalRef.hide();
  }

}
