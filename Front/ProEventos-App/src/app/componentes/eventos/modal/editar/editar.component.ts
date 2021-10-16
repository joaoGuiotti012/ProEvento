import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';
import { Evento } from 'src/app/models/Evento';

@Component({
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class ModalEditarComponent implements OnInit {

  evento: Evento = Object.assign({});
  file: any = null;
  bsConfig?: Partial<BsDatepickerConfig> = {
    isAnimated: true,
    containerClass: 'theme-dark-blue',
    dateInputFormat: 'DD/MM/YYYY hh:mm'
  };
  imgUrl = '';
  registerForm: FormGroup = new FormGroup({});

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
    this.imgUrl = this.evento.imagemURL;
    this.evento.imagemURL = '';
    this.validation();
  }

  validation(): void {
    try {
      this.registerForm = this.fb.group({
        local: [this.evento.local || '', Validators.required],
        dataEvento: [this.evento.dataEvento || '', Validators.required],
        tema: [this.evento.tema, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        qtdPessoas: [this.evento.qtdPessoas || '', [Validators.required, Validators.max(120000)]],
        imagemURL: [this.evento.imagemURL || '', Validators.required],
        telefone: [this.evento.telefone || '', Validators.required],
        email: [this.evento.email || '', [Validators.required, Validators.email]],
      });
    } catch (error) {

    }
  }

  get _f() {
    return this.registerForm.controls;
  }

  onFileChange(ev: any) {
    const reader = new FileReader();
    if (ev.target.files && ev.target.files.length) {
      this.file = ev.target.files;
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    this._closeData.next(Object.assign({ evento: this.registerForm.value, file: this.file }));
    this._closeData.complete();
    this.bsModalRef.hide();
  }


}
