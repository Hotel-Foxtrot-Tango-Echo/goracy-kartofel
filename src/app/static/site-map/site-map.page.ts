import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TITLE_SEP, TITLE_BASE } from 'src/app/shared/const';
import { FilterService } from 'src/app/shared/services/filter.service';
import { dmrLink } from 'src/app/start-page/start-page.page';

const staticDmr = require("../../type/dmr-allowed.json");


@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.page.html',
  styleUrls: ['./site-map.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush    
})
export class SiteMapPage implements OnInit {

  siteName = 'Mapa strony'
  dmrLink: dmrLink[] = staticDmr

  constructor(
        private title: Title,
    private filterService: FilterService,
    private route: Router,        
  ) { }

  ngOnInit(): void {
    //this.title.setTitle(this.siteName + TITLE_SEP + TITLE_BASE)
  }  

  ionViewWillEnter() {
    this.title.setTitle(this.siteName + TITLE_SEP + TITLE_BASE)
  }

  showAllRepeaterOnMap() {
    this.filterService.setInitFilterDataRptr()
     setTimeout(() => {
      this.route.navigate(['/mapa-przemiennikow']); 
    },20)       
  }    
}
