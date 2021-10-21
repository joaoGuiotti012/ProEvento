import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Evento } from '@app/models/Evento';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  private loadingSubmit = new BehaviorSubject<boolean>(false);

  public get loadingSubmit$(): Observable<boolean> {
    return this.loadingSubmit.asObservable();
  }

  public get _f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  /**
   * createForm
   */
  public createForm(): void {
    this.form = this.fb.group({
      local: ['', [Validators.required]],
      dataEvento: ['', [Validators.required]],
      tema: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ]],
      qtdPessoas: ['', [
        Validators.required,
        Validators.max(120000)
      ]],
      imagemURL: [''],
      telefone: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
    });
  }

  submitForm(value: Evento) {
    if(this.form.invalid) return;

    console.log(value);
    this.loadingSubmit.next(true);
    setTimeout(() => {
      this.loadingSubmit.next(false);
    }, 600);
  }

}
