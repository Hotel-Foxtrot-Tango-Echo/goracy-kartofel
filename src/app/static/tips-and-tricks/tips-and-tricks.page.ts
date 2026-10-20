import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TITLE_SEP, TITLE_BASE } from 'src/app/shared/const';
import { dmrLink } from 'src/app/start-page/start-page.page';

const staticDmr = require("../../type/dmr-allowed.json");


@Component({
  selector: 'app-tips-and-tricks',
  templateUrl: './tips-and-tricks.page.html',
  styleUrls: ['./tips-and-tricks.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush      
})
export class TipsAndTricksPage implements OnInit {

  dmrLink: dmrLink[] = staticDmr

  siteName = 'Porady i wskazówki'

  constructor(
        private title: Title,   
  ) { }

  ngOnInit(): void {
    //this.title.setTitle(this.siteName + TITLE_SEP + TITLE_BASE)
  }  

  ionViewWillEnter() {
    this.title.setTitle(this.siteName + TITLE_SEP + TITLE_BASE)
  }

}
