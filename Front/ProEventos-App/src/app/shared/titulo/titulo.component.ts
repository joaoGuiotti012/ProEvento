import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {

  @Input() title = 'Bootstrap';
  @Input() subTitle = 'Since 2021';
  @Input() iconClass = 'fa fa-home';
  @Input() buttonLabel = 'Listar';
  @Input() showButton = true;

  @Output('callbackButton') callbackButton = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {

  }

  listar() {
    this.callbackButton.emit({});
  }

}
