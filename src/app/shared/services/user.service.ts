import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserSaveService {

  private savedPath: Map<string,RptrPatch> = new Map()

  private savedCount = new BehaviorSubject<number>(0)

  public getSavedPath(): RptrPatch[] {
    return Array.from(this.savedPath, ([key, obj]) => ({ ...obj })).sort((a,b) => (a.i > b.i) ? 1 : ((b.i > a.i) ? -1 : 0))
  }

  public getObsSavedPathCount(): Observable<number> {
    return this.savedCount.asObservable();
  }

  public addPatch(rptrPatch: RptrPatch): void {
    this.savedPath.set(JSON.stringify(rptrPatch),{...rptrPatch})
    this.savedCount.next(this.savedPath.size)
  }

  public addPatchs(rptrPatchs: Map<string,RptrPatch>): void {
    rptrPatchs.forEach(rptrPatch => {
      this.savedPath.set(JSON.stringify(rptrPatch),rptrPatch)
    })
    this.savedCount.next(this.savedPath.size)
  }

  public removePatch(rptrPatch: RptrPatch): void {
    this.savedPath.delete(JSON.stringify(rptrPatch))
    this.savedCount.next(this.savedPath.size)
  }

  public removePatchByHash(rptrPatchHash: string): void {
    this.savedPath.delete(rptrPatchHash)
    this.savedCount.next(this.savedPath.size)
  }  

  public removePatchs(rptrPatchs: Map<string,RptrPatch>): void {
    rptrPatchs.forEach(rptrPatch => {
      this.savedPath.delete(JSON.stringify(rptrPatch))
    })    
    this.savedCount.next(this.savedPath.size)
  }  

  public getCountOfSaved(rptrPatchs: Map<string,RptrPatch>): number {
    const aTmp = [...this.savedPath.keys()].filter(o => [...rptrPatchs.keys()].includes(o))
    return aTmp.length
  }

  public isExist(rptrPatch: RptrPatch): boolean {
    return this.savedPath.has(JSON.stringify(rptrPatch))
  }


}

export const defaultRptrPatch: RptrPatch = {
  i: '',
  b: '',
  k: 0,
  r: -1
}

export interface RptrPatch {
  i: string;
  b: string;  //RepeaterBand
  k: number;  //key
  r: number;  // cross > -1 , no cross === -1
}
