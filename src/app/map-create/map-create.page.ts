import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from '../shared/services/filter.service';
import { dmrLink } from '../start-page/start-page.page';


const allowedDmr: dmrLink[] = require("../type/dmr-allowed.json");


@Component({
  selector: 'app-map-create',
  templateUrl: './map-create.page.html',
  styleUrls: ['./map-create.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush    
})
export class MapCreatePage implements OnInit {

  typeFromUrl = ''
  countryFromUrl = ''
  allowedDmrCountry: string[] = allowedDmr.map(o => o.c)


  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router, 
    private filterService: FilterService,
  ) {}  



  ngOnInit() {

    this.typeFromUrl = this.activatedRoute.snapshot.paramMap.get('type') as string;
    this.countryFromUrl = this.activatedRoute.snapshot.paramMap.get('country') as string;

    let isPathAllowed = false
    if(this.typeFromUrl === 'fm-poland') {
      if(['pl','us'].includes(this.countryFromUrl)) {
        this.filterService.setFmPolandFilterDataRptr([this.countryFromUrl])     
        isPathAllowed = true
      }
    } else if(this.typeFromUrl === 'dmr') {
      const idAllowedKey = this.allowedDmrCountry.indexOf(this.countryFromUrl)

      if(idAllowedKey > -1) {
        this.filterService.setDMRFilterDataRptr([this.countryFromUrl])
        isPathAllowed = true
      }      
    }

    if(!isPathAllowed) {
      this.route.navigate(['/przemienniki-krotkofalarskie.jpeg']);     
    } else {
      setTimeout(() => {
        this.route.navigate(['/mapa-przemiennikow']);
      },20)  
    }
  }   
 
  refreshPage() {
    document.location.reload();
  }  

}
