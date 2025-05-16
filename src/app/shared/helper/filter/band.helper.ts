import { LanguageVersion } from "../../types/language-version";
import { RepeaterBand } from "../../types/repeater-band";

export class RepeaterBandHelper {
  private repBandPl: RptrBand[] = [
    {id: RepeaterBand.M10, name:'10m'},
    {id: RepeaterBand.M6, name:'6m'},
    {id: RepeaterBand.M4, name:'4m'},
    {id: RepeaterBand.M2, name:'2m'},
    {id: RepeaterBand.CM70, name:'70cm'},
    {id: RepeaterBand.CM23, name:'23cm'},
   ];

  public getBandsByLanguage(code: LanguageVersion): RptrBand[] {
    return this.repBandPl
  }

}

export interface RptrBand{
  id: RepeaterBand;
  name: string;
}
