import { LanguageVersion } from "../../types/language-version";
import { RepeaterType } from "../../types/repeater-type";

export class RepeaterTypeHelper {
  private repTypesPl: RptrType[] = [
    {id: RepeaterType.FM, name:'FM'},
    {id: RepeaterType.DSTAR_DV, name:'DSTAR/DV'},
    //{id: RepeaterType.ATV, name:'ATV'}, // do wyciecia - nie uzywane
    {id: RepeaterType.ECHOLINK, name:'Echolink'},
    {id: RepeaterType.DMR, name:'DMR'},
    //{id: RepeaterType.APCO_25, name:'APCO-25'}, //do wyciecia tylk 2 przemieniki
    {id: RepeaterType.C4FM_FUSION, name:'C4FM/Fusion'},
    {id: RepeaterType.FM_LINK, name:'FM-Link'},
    {id: RepeaterType.FM_POLAND, name:'FM-Poland'},
    //{id: RepeaterType.TETRA, name:'Tetra'}, // trza sie temu bardziej przyjzec
    {id: RepeaterType.UNKNOWN, name:'Nieznany'},

    
  ];

  public getTypesByLanguage(code: LanguageVersion): RptrType[] {
    return this.repTypesPl
  }

}

export interface RptrType{
  id: RepeaterType;
  name: string;
}
