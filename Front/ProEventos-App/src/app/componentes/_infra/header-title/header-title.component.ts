import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'infra-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.scss']
})
export class HeaderTitleComponent implements OnInit {

  @Input('title') title = 'Title';
 
  constructor() { }

  ngOnInit() {
  }

}
