import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TITLE_SEP, TITLE_BASE } from 'src/app/shared/const';

@Component({
  selector: 'app-cookie-info',
  templateUrl: './cookie-info.page.html',
  styleUrls: ['./cookie-info.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CookieInfoPage implements OnInit {

  siteName = 'Mechanizmy cookies w serwisie'

  constructor(
        private title: Title,
  ) {}

  ngOnInit() {
    this.title.setTitle(this.siteName + TITLE_SEP + TITLE_BASE)
  }


}
