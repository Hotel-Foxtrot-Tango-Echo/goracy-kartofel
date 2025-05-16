import { LanguageVersion } from "../../types/language-version";
import { RepeaterStatus } from "../../types/repeater-status";

export class RepeaterStatusHelper {
  private repStatusPl: RptrStatus[] = [
    {id: RepeaterStatus.WORKING, name:'działający'},
    {id: RepeaterStatus.DISABLED, name:'wyłączony'},
    {id: RepeaterStatus.UNKNOWN, name:'nieznany'},
    {id: RepeaterStatus.TESTING, name:'testowy'},
    {id: RepeaterStatus.BUILDING, name:'budowany'},
    {id: RepeaterStatus.PLANNED, name:'planowany'},
  ];

  private repStatusEu: RptrStatus[] = [
    // {id: RepeaterStatus.WORKING, name:'working'},
    // {id: RepeaterStatus.DISABLED, name:'disabled'},
    // {id: RepeaterStatus.UNKNOWN, name:'unknown'},
    // {id: RepeaterStatus.TESTING, name:'testing'},
    // {id: RepeaterStatus.BUILDING, name:'building'},
    // {id: RepeaterStatus.PLANNED, name:'planned'},
  ];  


  public getStatusByLanguage(code: LanguageVersion): RptrStatus[] {
    if(code === LanguageVersion.EU) {
      return this.repStatusEu
    }
    return this.repStatusPl
  }

  public getStatusByLanguageAndId(code: LanguageVersion, id: string): string{
    const aStatus = this.getStatusByLanguage(code).filter(o => {
      if(o.id === id) {
        return true
      }
      return false
    })
    if(aStatus.length) {
      return aStatus[0].name
    }
    return ''
  }

}

export interface RptrStatus {
  id: RepeaterStatus;
  name: string;
}