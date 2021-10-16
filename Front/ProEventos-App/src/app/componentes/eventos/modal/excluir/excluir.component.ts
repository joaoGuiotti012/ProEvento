import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';

@Component({
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.scss']
})
export class ModalExcluirComponent implements OnInit {

  body: string = '';

  private _closeData = new BehaviorSubject<boolean>(false);

  get onClose() {
    return this._closeData.asObservable();
  }

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {

  }

  onSubmit() {
    this._closeData.next(true);
    this._closeData.complete();
    this.bsModalRef.hide();
  }

}
