import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slides: { image: string; text?: string }[] = [];
  activeSlideIndex = 0;

  constructor() {
    for (let i = 1; i < 4; i++) {
      this.slides.push({
        image: `${environment.API}/wwwroot/img/img1.png`
      })
    }
   }

  ngOnInit() {
  }

}
