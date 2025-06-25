import { Injectable } from '@angular/core';
import { FilterDataRptr } from './filter.service';
import { HttpClient } from '@angular/common/http';
import {  map, Observable } from 'rxjs';
import {  Compressed, decompress } from 'compress-json'
import { ApiDataBaseVersion } from './repeaterPage.service';
import { environment } from 'src/environments/environment';
import { LocatorHelper } from '../helper/locator.helper';


@Injectable({
  providedIn: 'root'
})
export class RepeaterMapService {
  private mapHash: MapHash = {}

  private mapData: MapData[] =  []

  constructor(
    private http: HttpClient
  ) {}

  public serverTest(): Observable<void> {
    if(this.mapData.length) {
      return this.http
      .get<ApiDataBaseVersion>(environment.host+'/api/v2/test/data')
       .pipe( 
         map(() => {
           return ;
         })
       ) 
    } else { 
      return this.http
      .get<Compressed>(environment.host+'/api/v2/test/random-data')
        //.pipe(delay(5000))
       .pipe( 
         map(o=> {
           try {
             const [hash, data] = decompress(o )
             this.mapHash = hash
             this.mapData = data
             return;
           } catch (error) {
             throw new Error('Valid token not returned');
           }      
         })
       ) 
    }
 
  }  

  public getRepeaterByFilterData(filterDataRptr: FilterDataRptr): RepeatersMap[] {
    // console.log('filtr',filterDataRptr)

    if(!filterDataRptr.country.length) {
      return []
    }    

    let tmpRepeatersMap: MapData[] = this.mapData
    if(filterDataRptr.text) {
      // console.log('t',tmpRepeatersMap.length)

      const regex = /".*"/g;
      const found = filterDataRptr.text.match(regex);
      if(found?.length) {
        const name = found[0].slice(1,-1);
        tmpRepeatersMap = tmpRepeatersMap.filter(o => o.i === name)
        // console.log(name,tmpRepeatersMap)
        // console.log('a',tmpRepeatersMap.length)

      } else {
        const filterText = filterDataRptr.text
        tmpRepeatersMap = tmpRepeatersMap.filter(o => o.i.includes(filterText))
        // console.log('b',tmpRepeatersMap.length)

      }
    }    

    tmpRepeatersMap = tmpRepeatersMap.filter(o => filterDataRptr.country.includes(o.c))
    //  console.log('1',tmpRepeatersMap.length)

    tmpRepeatersMap = tmpRepeatersMap.filter(o => filterDataRptr.status.includes(o.s))
    // console.log('2',tmpRepeatersMap.length)

    tmpRepeatersMap = tmpRepeatersMap.filter(o =>  {
      const aTypes = o.t.split('');
      for (let i = 0; i < aTypes.length; i++) {
        if (filterDataRptr.type.includes(aTypes[i])) {
          return true;
        }
      }
      return false
    })
    //console.log('3',tmpRepeatersMap.length)



    // tmpRepeatersMap = tmpRepeatersMap.filter(o =>  {
    //   const aBands = o.b.split('');
    //   for (let i = 0; i < aBands.length; i++) {
    //     if (filterDataRptr.band.includes(aBands[i])) {
    //       return true;
    //     }
    //   }
    //   return false
    // })
    tmpRepeatersMap = tmpRepeatersMap.filter(o => filterDataRptr.band.includes(o.b))
    //console.log('4',tmpRepeatersMap.length)

    if(filterDataRptr.range.isRangeActive) {
      tmpRepeatersMap = tmpRepeatersMap.filter(o => LocatorHelper.distanceKm(filterDataRptr.range.radioLocator,o.l) <= filterDataRptr.range.rangeMax)
    }


    let tmpObj: { [key: string]: RepeatersMap; } = {}
    tmpRepeatersMap.forEach(rep => {
      if (!(rep.h in tmpObj)) {
        tmpObj[rep.h] = {...this.mapHash[rep.h],x:[]}
      }
      tmpObj[rep.h].x.push(rep)
    })

    // let mapFast = new Map<string, RepeatersMap>();
    // tmpRepeatersMap.forEach(rep => {
    //   if (!mapFast.has(rep.h)) {
    //     mapFast.set(rep.h,{...this.mapHash[rep.h],x:[]})
    //   }
    // })

    //console.log(Object.values(tmpObj))

    return Object.values(tmpObj)
      
  }

    public issetRepeaterOnMap(name: string): boolean {
      let aRepeaterFound = this.mapData.filter(o => o.i === name)
      if(aRepeaterFound.length) {
        return true
      }
      return false
    }

}

export interface RepeatersMap {
  a: number; //latitude 
  o: number; //longitude
  x: MapData[]
}

export interface MapHash {
  [key:string]: MapHashLoc
}

interface MapHashLoc {
  a: number; //latitude 
  o: number; //longitude
}

export interface MapData {
  i: string; //name
  c: string; //Country
  s: string; //RepeaterStatus
  t: string; //RepeaterType
  b: string; //RepeaterBand
  k: number; //key
  x: number; //tx
  h: string; //hash
  r: number; //id cross -1 no cross
  o: string; // cross text
  l: string; //locator
}

