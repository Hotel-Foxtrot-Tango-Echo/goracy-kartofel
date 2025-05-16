import { Injectable } from '@angular/core';
import { Country, CountryHelper } from '../helper/filter/countries.helper';
import { LanguageVersion } from '../types/language-version';
import { RepeaterStatusHelper, RptrStatus } from '../helper/filter/status.helper';
import { RepeaterTypeHelper, RptrType } from '../helper/filter/type.helper';
import { RepeaterBandHelper, RptrBand } from '../helper/filter/band.helper';
import { BehaviorSubject, Observable } from 'rxjs';
import { RepeaterAllData } from './repeaterPage.service';
import { ExportList } from '../helper/export.helper';



@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private lastFilterDataRptr = new BehaviorSubject<FilterDataRptr>({...defaultFilterDataRptr})

  private actualLanguage = LanguageVersion.PL
  private countryHelper = new CountryHelper()
  private repeaterStatusHelper = new RepeaterStatusHelper()
  private repeaterTypesHelper = new RepeaterTypeHelper()
  private repeaterBandHelper = new RepeaterBandHelper()

  public getObsLastFilterDataRptr(): Observable<FilterDataRptr> {
    return this.lastFilterDataRptr.asObservable();
  }

  // public setLastFilterDataRptToRepeater(oRepeater: RepeaterInfo) {
  //   this.lastFilterDataRptr.next({
  //     text: '"'+oRepeater.i+'"',
  //     country: [oRepeater.c],
  //     status: [oRepeater.s],
  //     type: oRepeater.t.split(''),
  //     band: oRepeater.b.split(''),
  // })

    public setLastFilterDataRptToRepeater(rep: RepeaterAllData) {

      let types: {[keys:string]: string} = {}
      const bands = Object.keys(rep.x)
      bands.forEach( band => {
        rep.x[band].forEach(x => {
          x.t.split('').forEach(type => {
            types[type] = 'a'
          })
        })
      })

      this.lastFilterDataRptr.next({
        text: '"'+rep.i+'"',
        country: [rep.c],
        status: ['1','2','3','4','5','6'],
        type: [...Object.keys(types)],
        band: [...bands],
    })
  }

  public setLastFilterDataRptToRepeaterExport(exportList: ExportList) {


    this.lastFilterDataRptr.next({
      text: '"'+exportList.i+'"',
      country: [exportList.c],
      status: ['1','2','3','4','5','6'],
      type: [...exportList.m],
      band: [exportList.b],
  })
}  

  // export interface RepeaterInfo {
  //   i: string; //name
  //   c: string; //Country
  //   s: string; //RepeaterStatus
  //   t: string; //RepeaterType
  //   b: string; //RepeaterBand
  //   q: string; //qth locator
  //   p: string; //qth place 
  //   a: number; //latitude 
  //   o: number; //longitude
  //   e: string; //wysokosc npm
  //   v: string; //RepeaterActivation
  //   x: string; //open_tx if some RepeaterActivation
  //   g: string; //Wysokość nad poziomem gruntu
  // } 
  

  public getCountries(): Country[] {
    return this.countryHelper.getCountriesByLanguage(this.actualLanguage)
  }

  public getStatus(): RptrStatus[] {
    return this.repeaterStatusHelper.getStatusByLanguage(this.actualLanguage)
  }

  public getTypes(): RptrType[] {
    return this.repeaterTypesHelper.getTypesByLanguage(this.actualLanguage)
  }

  public getBands(): RptrBand[] {
    return this.repeaterBandHelper.getBandsByLanguage(this.actualLanguage)
  }  
}

export const defaultFilterDataRptr: FilterDataRptr = {
  text: null,
  country: ['pl'],
  status: ['4','5','3','2','1'],
  type: ['a','e','i','j'],
  band: ['2m','70cm','23cm'],
}

export interface FilterDataRptr {
  text: string|null;
  country: string[]; 
  status: string[];  //RepeaterStatus
  type: string[];  //RepeaterType
  band: string[]; //RepeaterBand
}

// WORKING = '1',		1	 - 	4
// UNKNOWN = '4',		4	 - 	5
// TESTING = '8',		8	 - 	3
// BUILDING = '16',		16	 - 	2
// PLANNED = '32'		32	 - 	1