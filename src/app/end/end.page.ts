import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

const staticRptEnd: RptEndShort[] = require("./rpt-end.json");


@Component({
  selector: 'app-end',
  templateUrl: './end.page.html',
  styleUrls: ['./end.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush    
})
export class EndPage implements OnInit {
  hTitle = 'Wygasające przemienniki w Polsce'

  staticRptEnd: RptEndShort[] = staticRptEnd

  rptEnd: RptEnd[] = []
  dateToday = new Date();

  constructor(
    private title: Title,
    private route: Router, 
  ) {}  

  ngOnInit() {
    this.rptEnd = []
    staticRptEnd.forEach(rpt => {
      const dateRpt = new Date(rpt.d);
      const dayDiff = Math.round((dateRpt.getTime() - this.dateToday.getTime()) / (1000 * 60 * 60 * 24))
      if(dayDiff < 90 && dayDiff > 1) {
        this.rptEnd.push({...rpt, c: dayDiff})
      }      
    })
    if(this.rptEnd.length) {
      this.rptEnd.sort((a,b) => (a.c > b.c) ? 1 : ((b.c > a.c) ? -1 : 0))
    }
  }

  ionViewWillEnter() {
      this.title.setTitle(`${this.hTitle}`) 
  }

  repeaterLink(i: string) {
    return  this.route.createUrlTree(['/repeater',i.replace(/\/R/, '.R')]);
  }     

}

interface RptEnd extends RptEndShort {
  c: number; // calculate days from today 
}

interface RptEndShort {
  i: string; //name
  d: string; //date
}