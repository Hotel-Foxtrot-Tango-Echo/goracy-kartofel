import { LanguageVersion } from "../../types/language-version";

export class CountryHelper {
  private countriesPl: Country[] = [
    {id:'pl',name:'Polska'},
    {id:'us',name:'USA'},
    {id:'at',name:'Austria'},
    {id:'be',name:'Belgia'},
    {id:'bg',name:'Bułgaria'},
    {id:'by',name:'Białoruś'},
    {id:'ch',name:'Szwajcaria'},
    {id:'cz',name:'Czechy'},
    {id:'de',name:'Niemcy'},
    {id:'dk',name:'Dania'},
    {id:'es',name:'Hiszpania'},
    {id:'fi',name:'Finlandia'},
    {id:'fr',name:'Francja'},
    {id:'hu',name:'Węgry'},
    {id:'is',name:'Islandia'},
    {id:'lt',name:'Litwa'},
    {id:'lv',name:'Łotwa'},
    {id:'ee',name:'Estonia'},
    {id:'nl',name:'Holandia'},
    {id:'no',name:'Norwegia'},
    {id:'ro',name:'Rumunia'},
    {id:'ru',name:'Rosja'},
    {id:'se',name:'Szwecja'},
    {id:'si',name:'Słowenia'},
    {id:'sk',name:'Słowacja'},
    {id:'ua',name:'Ukraina'},
    // {id:'gb',name:'Wielka Brytania'}
//    {id:'it',name:'Włochy'},
  ];

  private countriesEu: Country[] = [
    // {id:'pl',name:'Polska'},
    // {id:'at',name:'Österreich'},
    // {id:'be',name:'België'},
    // {id:'bg',name:'България'},
    // {id:'by',name:'Беларусь'},
    // {id:'ch',name:'Schweiz'},
    // {id:'cz',name:'Česká republika'},
    // {id:'de',name:'Deutschland'},
    // {id:'dk',name:'Danmark'},
    // {id:'es',name:'España'},
    // {id:'fi',name:'Suomi'},
    // {id:'fr',name:'France'},
    // {id:'hu',name:'Magyarország'},
    // {id:'is',name:'Ísland'},
    // {id:'it',name:'Italia'},
    // {id:'lt',name:'Lietuvos Respublika'},
    // {id:'lv',name:'Latvijas Republika'},
    // {id:'nl',name:'Nederland'},
    // {id:'no',name:'Norge'},
    // {id:'ro',name:'România'},
    // {id:'ru',name:'Россия'},
    // {id:'se',name:'Sverige'},
    // {id:'si',name:'Slovenija'},
    // {id:'sk',name:'Slovenská republika'},
    // {id:'ua',name:'Україна'},
    // // {id:'gb',name:'United Kingdom'}
  ];

  public getCountriesByLanguage(code: LanguageVersion): Country[] {
    if(code === LanguageVersion.EU) {
      return this.countriesEu
    }
    return this.countriesPl
  }

}

export interface Country {
  id: string;
  name: string;
}