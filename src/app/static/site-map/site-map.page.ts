import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TITLE_SEP, TITLE_BASE } from 'src/app/shared/const';

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.page.html',
  styleUrls: ['./site-map.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush    
})
export class SiteMapPage implements OnInit {

  siteName = 'Mapa strony'

  constructor(
        private title: Title,
  ) {}

  ngOnInit() {
    this.title.setTitle(this.siteName + TITLE_SEP + TITLE_BASE)
  }

}
