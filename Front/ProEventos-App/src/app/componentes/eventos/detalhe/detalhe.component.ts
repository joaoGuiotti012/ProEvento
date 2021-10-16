import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';
import { environment } from 'src/environments/environment';

const REDES: any[] = [
  { name: 'YOUTUBE', icon: 'fab fa-youtube' },
  { name: 'INSTAGRAM', icon: 'fab fa-instagram' },
  { name: 'FACEBOOK', icon: 'fab fa-facebook' },
  { name: 'TWITTER', icon: 'fab fa-twitter' },
  { name: 'GOOGLE', icon: 'fab fa-google' },
  { name: 'LINKEDIN', icon: 'fab fa-linkedin' },
  { name: 'PINTEREST', icon: 'fab fa-pinterest' },
  { name: 'WHATSAPP', icon: 'fab fa-whatsapp' },
  { name: 'TELEGRAM', icon: 'fab fa-telegram' },
  { name: 'SKYPE', icon: 'fab fa-skype' },
  { name: 'VIMEO', icon: 'fab fa-vimeo' },
];

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.scss']
})
export class DetalheComponent implements OnInit {
  RESOURCES = `${environment.API}/Resources/Img/`;
  registerForm: any = new FormGroup({}) as FormGroup;
  file: any;
  imagemURL = '';
  evento: Evento = new Evento();
  loading$ = new BehaviorSubject<boolean>(true);
  fileImage: any;

  RedeSocialIcons: any = {
    YOUTUBE: { icon: "fab fa-youtube" },
    INSTAGRAM: { icon: "fab fa-instagram" },
    FACEBOOK: { icon: "fab fa-facebook" },
    TWITTER: { icon: "fab fa-twitter" },
    GOOGLE: { icon: "fab fa-google" },
    LINKEDIN: { icon: "fab fa-linkedin" },
    PINTEREST: { icon: "fab fa-pinterest" },
    WHATSAPP: { icon: "fab fa-whatsapp" },
    TELEGRAM: { icon: "fab fa-telegram" },
    SKYPE: { icon: "fab fa-skype" },
    VIMEO: { icon: "fab fa-vimeo" },
  }

  get loading() {
    return this.loading$.asObservable();
  }

  bsConfig?: Partial<BsDatepickerConfig> = {
    isAnimated: true,
    containerClass: 'theme-dark-blue',
    dateInputFormat: 'DD/MM/YYYY hh:mm'
  };

  constructor(
    private service: EventoService,
    private fb: FormBuilder,
    private locale: BsLocaleService,
    private toast: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.validation();
    this.carregaEvento();
    this.locale.use('pt-br');
  }

  carregaEvento() {
    let id = this.activatedRoute.snapshot.params['id'];
    this.service.getById(id)
      .subscribe((res: any) => {
        this.evento = Object.assign({}, res);
        this.imagemURL = res.imagemURL;
        this.fileImage = this.RESOURCES + res.imagemURL;
        this.registerForm.patchValue(this.evento);
        this.evento.lotes.forEach(lote => {
          this.registerForm.get('lotes').push(this.criarLote(lote));
        });
        this.evento.redesSociais.forEach(rede => {
          this.registerForm.get('redesSociais').push(this.criarRedeSocial(rede))
        });
        console.log();
        this.loading$.next(false);
      }).add(() => {
        this.loading$.next(false);
      })
  }

  resetEvento() {
    this.validation();
    this.carregaEvento();
  }

  validation(): void {
    this.registerForm = this.fb.group({
      id: [''],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      qtdPessoas: [null, [Validators.required, Validators.max(120000)]],
      imagemURL: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      lotes: this.fb.array([]),
      redesSociais: this.fb.array([])
    })
  }

  get redeSociais() {
    return this.control('redesSociais').controls;
  }

  criarRedeSocial(rede?: any): FormGroup {
    return this.fb.group({
      id: [rede?.id || -1],
      nome: [rede?.nome, [Validators.required]],
      url: [rede?.url, [Validators.required]],
    })
  }

  adicionarRedeSocial() {
    this.registerForm.get('redesSociais').push(this.criarRedeSocial());
  }

  removerRedeSocial(i: number) {
    this.registerForm.get('redesSociais').removeAt(i);
  }

  get lotes() {
    return this.control('lotes').controls;
  }
  criarLote(lote?: any): FormGroup {
    return this.fb.group({
      id: [lote?.id || -1],
      nome: [lote?.nome, [Validators.required]],
      qtd: [lote?.qtd, [Validators.required]],
      preco: [lote?.preco, [Validators.required]],
      dataInicio: [lote?.dataInicio],
      dataFim: [lote?.dataFim]
    });
  }

  adicionarLote() {
    this.registerForm.get('lotes').push(this.criarLote());
  }

  removerLote(i: number) {
    this.registerForm.get('lotes').removeAt(i);
  }

  control(controlName: string) {
    return this.registerForm.get(controlName);
  }

  onFileChange(ev: any) {
    const reader = new FileReader();
    this.file = ev.target.files;

    reader.onload = (event: any) => {
      this.imagemURL = event.target.result;
      this.fileImage = event.target.result;
      this.registerForm.get('imagemURL').setValue(this.file[0].name, { emitModelToViewChange: false });
    };

    reader.readAsDataURL(this.file[0]);
  }

  get _f() {
    return this.registerForm.controls;
  }

  clearFormAll() {
    this.registerForm.reset();
  }

  uploadImagem(res: any): Promise<Evento> {
    return new Promise((resolve) => {
      if (!!res.file && this.registerForm.get('imagemURL').value !== '') {
        let fileName = `${Date.now().toString().trim()}.${res.file[0].type.split("/")[1]}`;
        this.service.upload(res.file, fileName).subscribe(() => {
          res.evento.imagemURL = fileName;
          this.imagemURL = this.evento.imagemURL;
          this.fileImage = this.RESOURCES + fileName;
        }, err => {

        }).add(() => {
          resolve(res.evento)
        });
      } else {
        resolve(res.evento)
      }
    })
  }

  async onSubmit() {
    if (this.registerForm.invalid) return;
    let data = Object.assign({ evento: this.registerForm.value, file: this.file });
    let eventoToUpdate: Evento = await this.uploadImagem(data);

    eventoToUpdate.redesSociais.map((rede: any) => {
      if (rede.id === -1) {
        delete rede.id;
      }
    })
    eventoToUpdate.lotes.map((lote: any) => {
      if (lote.id === -1) {
        delete lote.id;
      }
    })

    console.log(eventoToUpdate);

    this.service.update(eventoToUpdate)
      .subscribe(
        (res) => {
          this.resetEvento();
          this.toast.success(`O evento ${eventoToUpdate.tema}, foi alterado!`, 'Sucesso')
        },
        err => {
          this.toast.error('ERRO', JSON.stringify(err));
          console.error(JSON.stringify(err));
        }
      )
  }

  get arrayRedesIcons(): any[] {
    let iconsArray: any = [];
    Object.keys(this.RedeSocialIcons).forEach((key: string) => {
      const icon: string = this.RedeSocialIcons[key].icon;
      iconsArray.push({ nome: key[0].toUpperCase() + key.substring(1).toLocaleLowerCase(), icon: icon });
    });
    return iconsArray;
  }

  getNomeFromIcons(icon: string): string {
    let nome = this.arrayRedesIcons
      .filter((r: any) => r.icon === icon)[0].nome as string;
    return nome[0].toUpperCase() + nome.substring(1).toLocaleLowerCase();
  }

  isSelected(nome: string, icon: string) {
    let result = Object.keys(this.RedeSocialIcons)
      .find(k => this.RedeSocialIcons[k].icon === icon);
    return;
  }

  redirecionarUrl(url: string) {
    window.open(url, "_blank");
  }

  public model: any;

  formatter = (state: any) => state.name;

  search: OperatorFunction<string, readonly { name: string, icon: string }[]> = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter((term: any) => term.length >= 2),
    map((term: any) => REDES.filter(
      (state: any) => new RegExp(term, 'mi').test(state.name)).slice(0, 10)
    )
  )

}


