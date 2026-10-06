import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TITLE_SEP, TITLE_BASE } from 'src/app/shared/const';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class PrivacyPolicyPage implements OnInit {

  siteName = 'Polityka prywatności'

  constructor(
        private title: Title,
  ) {}

  ngOnInit() {
    this.title.setTitle(this.siteName + TITLE_SEP + TITLE_BASE)
  }


}
