// @ts-ignore
import  normalize from 'normalize-strings';
import { OpenGD77Helper } from './openGD77.helper';


export class ExportHelper {

  static getCsvTexFromExportList(exportsList: ExportList[]): string {
    let text = "Lp.,Nazwa,Pasmo,Rx,Rx CTCSS,Rx DCS,Tx,QTH,QTH lokator,Latitude,Longitute,Informacje\n"
    exportsList.forEach((o,k) => {
      text += `${k + 1},${o.i},${o.b},${o.r.toFixed(6)},${o.z},${o.d},${o.t.toFixed(6)},${o.p.replace(/,/g, ' ')},${o.q},${o.a?o.a.toFixed(8):''},${o.o?o.o.toFixed(8):''},https://mapy73.pl/repeater/${o.i.replace(/\/R/, '.R')}\n`
    })
    return text;
  }

  static getChirpTexFromExportList(exportsList: ExportList[]): string {
    let text = "Location,Name,Frequency,Duplex,Offset,Tone,rToneFreq,cToneFreq,DtcsCode,DtcsPolarity,RxDtcsCode,CrossMode,Mode,TStep,Skip,Power,Comment,URCALL,RPT1CALL,RPT2CALL,DVCODE\n"
    exportsList.forEach((o,k) => {
      const isCross = o.b.includes('/');

      const cAr = []
      //default for chip validator
      cAr[6] = '67.0'
      cAr[7] = '67.0'
      cAr[8] = '023'
      cAr[9] = 'NN'
      cAr[10] = '023'
      cAr[11] = 'Tone->Tone'


      cAr[0] = k + 1
      cAr[1] = `"${o.i}"`
      cAr[2] = o.t
      if(isCross) {
        cAr[3] = 'split'
        cAr[4] = o.r     
      } else {
        const relase = o.r   
        const result = (relase - o.t)
        cAr[4] = result.toFixed(6)
        if(result === 0) {
          cAr[3] = ''
        } else if(result > 0) {
          cAr[3] = '+'
        } else {
          cAr[3] = '-'
          cAr[4] = (result * -1).toFixed(6)
        }   
      }
      if(o.z.length) { // c: 123.0
        cAr[5] = 'Tone'                
        cAr[6] = o.z            
      } else if(o.d.length) { // d: 023
        cAr[5] = 'DTCS'
        cAr[8] = `"${o.d}"`
      }

      let mainMode = ''
      if(o.m.includes('e')){ // DMR ='e',
        mainMode = 'DMR'
      } else if(o.m.includes('g')){ // C4FM_FUSION =	'g',
        mainMode = 'DN'
      } else if(o.m.includes('b')){ // DSTAR_DV	='b',
        mainMode = 'DV' 
      } else {
        // FM ='a',
        // FM_POLAND ='j',
        // FM_LINK ='i',
        mainMode = 'NFM' 
      } 
      cAr[12] = mainMode
      cAr[13] = 12.5
      cAr[15] = `"50W"`
      cAr[16] = `"${normalize(o.p)}"`
      cAr[20] = ''          

      text += cAr.toString()+"\n"
    })
    return text;
  }

  static getIcomTexFromExportList(exportsList: ExportList[]): string {
    //let text = "Group No;Group Name;Name;Sub Name;Repeater Call Sign;Gateway Call Sign;Frequency;Dup;Offset;Mode;TONE;Repeater Tone;RPT1USE;Position;Latitude;Longitude;UTC Offset\n"
      let text = "Group No,Group Name,Name,Sub Name,Repeater Call Sign,Gateway Call Sign,Frequency,Dup,Offset,Mode,TONE,Repeater Tone,RPT1USE,Position,Latitude,Longitude,UTC Offset\n"

    exportsList.forEach((o,k) => {
      //const isCross = o.b.includes('/');
      const cAr = []
      cAr[0] = o.c.charCodeAt(0) * 2 + o.c.charCodeAt(1)
      cAr[1] = o.c
      
      //cAr[2] = `"${normalize(o.p)}"`
      cAr[2] = o.i

      cAr[3] = o.q
      cAr[4] = o.i
      cAr[6] = o.t
      const result = (o.r - o.t)
      if(result === 0) {
        cAr[7] = 'OFF'
      } else if(result > 0) {
        cAr[7] = 'DUP+'
        cAr[8] = result.toFixed(6)
      } else {
        cAr[7] = 'DUP-'
        cAr[8] = (result * -1).toFixed(6)
      }  

      let mainMode = ''
      let bSkipImport = true
      if(o.m.includes('b')){ // DSTAR_DV	='b',
        mainMode = 'DV' 
        bSkipImport = false
      } else if(o.m.includes('a') || o.m.includes('j')  || o.m.includes('i')){ // FM ='a',FM_POLAND ='j', FM_LINK ='i',
        mainMode = 'FM-N'
        bSkipImport = false
      } else {
        // DMR ='e',
        // C4FM_FUSION =	'g',
        mainMode = 'skip' 
        bSkipImport = true
      } 
      cAr[9] = mainMode      
      if(o.z.length) { // c: 123.0
        cAr[10] = 'TSQL'                
        cAr[11] = ''+o.z+'Hz'
      } else if(o.d.length) { // d: 023
        cAr[10] = 'DTCS'
        cAr[11] = `"${o.d}"`
      } else {
        cAr[10] = 'OFF'
      }
      cAr[12] = 'YES'
      if(o.a) {
        cAr[13] = 'Exact'
        cAr[14] = o.a
        cAr[15] = o.o
      } else {
        cAr[13] = 'None'
      }

      cAr[16] = '--:--'

      if(!bSkipImport) {
        text += cAr.toString()+"\n"

      }
    })
    return text;
  }

  static getYaesuTexFromExportList(exportsList: ExportList[]): string {
    let text = ''
    let number = 1;

    exportsList.forEach((o,k) => {
      const cAr = []
      cAr[0] = number
      cAr[1] = o.t     
      cAr[2] = o.r

      //default
      cAr[9] = '67.0 Hz'
      cAr[10] = '023'
      cAr[11] = '1500 Hz'
      cAr[12] = 'RX 00'
      cAr[13] = 'TX 00'
      cAr[14] = 'HIGH'
      cAr[15] = 'OFF'
      cAr[16] = 'NO'
      cAr[17] = '12.5KHz'
      cAr[18] = 'ON'
      cAr[19] = 'OFF'
      cAr[20] = `"${normalize(o.p)}"`
      cAr[21] = '0'

      const result = (o.r - o.t)
      if(result === 0) {
        cAr[3] = 0
        cAr[4] = 'OFF'
        cAr[18] = 'OFF'
      } else if(result > 0) {
        cAr[3] = result.toFixed(5)
        cAr[4] = '+RPT'
      } else {
        cAr[3] = (result * -1).toFixed(5)
        cAr[4] = '-RPT'
      }  

      let mainMode = ''
      let bSkipImport = true
      if(o.m.includes('g')){  // C4FM_FUSION =	'g',
        mainMode = 'DN' 
        bSkipImport = false
      } else if(o.m.includes('a') || o.m.includes('j')  || o.m.includes('i')){ // FM ='a',FM_POLAND ='j', FM_LINK ='i',
        mainMode = 'FM'
        bSkipImport = false
      } else {
        // DMR ='e',
        // DSTAR_DV	='b',
        mainMode = 'skip' 
        bSkipImport = true
      } 
      cAr[5] = 'FM'
      cAr[6] = mainMode     
      cAr[7] = o.i
 
      if(o.z.length) { // c: 123.0
        cAr[8] = 'TONE'                
        cAr[9] = ''+o.z+' Hz'
      } else if(o.d.length) { // d: 023
        cAr[8] = 'DTCS'
        cAr[10] = `${o.d}`
      } else {
        cAr[8] = 'OFF'
      }


      if(!bSkipImport) {
        text += cAr.toString()+"\n"
        number++;

      }
    })
    while(number < 501) {
      const cAr = []
      cAr[0] = number
      cAr[21] = '0'
      text += cAr.toString()+"\n"
      number++;
    }
    return text;
  }  

  static getOpenGD77FilesFromExportList(exportsList: ExportList[]): FileData[] {
    const aFiles:FileData[] = []

    let zoneData = "Zone Name;Channel1;Channel2;Channel3;Channel4;Channel5;Channel6;Channel7;Channel8;Channel9;Channel10;Channel11;Channel12;Channel13;Channel14;Channel15;Channel16;Channel17;Channel18;Channel19;Channel20;Channel21;Channel22;Channel23;Channel24;Channel25;Channel26;Channel27;Channel28;Channel29;Channel30;Channel31;Channel32;Channel33;Channel34;Channel35;Channel36;Channel37;Channel38;Channel39;Channel40;Channel41;Channel42;Channel43;Channel44;Channel45;Channel46;Channel47;Channel48;Channel49;Channel50;Channel51;Channel52;Channel53;Channel54;Channel55;Channel56;Channel57;Channel58;Channel59;Channel60;Channel61;Channel62;Channel63;Channel64;Channel65;Channel66;Channel67;Channel68;Channel69;Channel70;Channel71;Channel72;Channel73;Channel74;Channel75;Channel76;Channel77;Channel78;Channel79;Channel80\n";
    let tgData = "TG List Name;Contact1;Contact2;Contact3;Contact4;Contact5;Contact6;Contact7;Contact8;Contact9;Contact10;Contact11;Contact12;Contact13;Contact14;Contact15;Contact16;Contact17;Contact18;Contact19;Contact20;Contact21;Contact22;Contact23;Contact24;Contact25;Contact26;Contact27;Contact28;Contact29;Contact30;Contact31;Contact32\n";
    let contactsData = "Contact Name;ID;ID Type;TS Override\n";
    let channelsfData = "Channel Number;Channel Name;Channel Type;Rx Frequency;Tx Frequency;Bandwidth (kHz);Colour Code;Timeslot;Contact;TG List;DMR ID;TS1_TA_Tx;TS2_TA_Tx ID;RX Tone;TX Tone;Squelch;Power;Rx Only;Zone Skip;All Skip;TOT;VOX;No Beep;No Eco;APRS;Latitude;Longitude;Use Location\n";

    let Contacts: {[key:string]: string[]}  = {}
    let TalkGroups: {[key:string]: string[]}  = {}
    let CountryCount: {[key:string]: number}  = {}
    let Zones: {[key:string]: string[]}  = {}
    let number = 1;

    exportsList.forEach((o,k) => {
      let isDMR = false
      let bSkipImport = true
      let nameSuffix = ''
      if(o.m.includes('e')){ // DMR ='e', 
        bSkipImport = false
        isDMR = true;
      } else if(o.m.includes('i')){ //FM_LINK ='i',
        bSkipImport = false
        nameSuffix = ' fmLink'
      } else if( o.m.includes('j')){ //FM_POLAND ='j'
        bSkipImport = false
        nameSuffix = ' fmPoland'
      }  else if(o.m.includes('a') ){ // FM ='a'
        bSkipImport = false
      } else {
        // DSTAR_DV	='b',
        // C4FM_FUSION =	'g',
        bSkipImport = true
      } 

      if(!bSkipImport) {
        const repName = OpenGD77Helper.retrieveCorrectChanelName(o.i+nameSuffix)
        const repCountry = o.c.toUpperCase()
        if(!(repCountry in CountryCount)) {
          CountryCount[repCountry] = 1
        }
        const countryZoneName = OpenGD77Helper.retrieveZoneName(`${repCountry}-PART${CountryCount[repCountry]}`)

        if(countryZoneName in Zones) {
          Zones[countryZoneName] = [...Zones[countryZoneName],repName]
          if(Zones[countryZoneName].length >= 80) {
            CountryCount[repCountry] += 1
          }
        } else {
          Zones[countryZoneName] = [repName]
        }

        if(repCountry === 'PL') {
          const plPrefix = repName.slice(0,3);
          if(['SR0','SR1','SR2','SR3','SR4','SR5','SR6','SR7','SR8','SR9'].includes(plPrefix)) {
            const plPrefixZoneName = OpenGD77Helper.retrieveZoneName(`${repCountry}-${plPrefix}`)
            if(!(plPrefixZoneName in Zones)) {
              Zones[plPrefixZoneName] = []
            }
            if(Zones[plPrefixZoneName].length < 80) {
              Zones[plPrefixZoneName] = [...Zones[plPrefixZoneName],repName]
            }
          }
        }

        const cAr = []
        cAr[0] = number++
        cAr[1] = repName
        cAr[2] = 'Analogue'
        cAr[3] = o.t     
        cAr[4] = o.r
        cAr[5] = 12.5
        cAr[13] = 'None'
        cAr[14] = o.z.length? o.z : 'None'
        cAr[15] = 'Disabled'        
        cAr[16] = 'Master'
        cAr[17] = 'No'
        cAr[18] = 'No'
        cAr[19] = 'No'
        cAr[20] = 0
        cAr[21] = 'Off'
        cAr[22] = 'No'
        cAr[23] = 'No'
        cAr[24] = 'None'
        cAr[25] = 0
        cAr[26] = 0
        cAr[27] = 'No'
        if(o.a) {
          cAr[25] = o.a
          cAr[26] = o.o
          cAr[27] = 'Yes'
        }        

        if(isDMR) {
          const repListName = OpenGD77Helper.retrieveTalkListName(repName)
          let allGroups: string[] = []
          o.e1.forEach(id => {
            const gName = OpenGD77Helper.retrieveGroupName(id,1)
            allGroups.push(gName)
            Contacts[gName] = [gName,''+id,'Group',''+1]
          })
          o.e2.forEach(id => {
            const gName = OpenGD77Helper.retrieveGroupName(id,2)
            allGroups.push(gName)
            Contacts[gName] = [gName,''+id,'Group',''+2]
          })      
          if(allGroups.length) {
            allGroups[32] ='toCut'
            TalkGroups[repListName] = allGroups.slice(0,32)  
          }
          //dmr updates
          cAr[2] = 'Digital'
          cAr[5] = ''
          cAr[6] = o.f
          cAr[7] = 1
          cAr[8] = 'None'
          cAr[9] = repListName
          cAr[10] = 'None'
          cAr[11] = 'Off'
          cAr[12] = 'Off'
          cAr[13] = ''
          cAr[14] = ''
          cAr[15] = ''

        }

        //todo chanels
        channelsfData += cAr.join(';')+"\n"
      }


    })


    Object.keys(Contacts).forEach(cKey => {
      contactsData += Contacts[cKey].join(';')+"\n"
    })
    Object.keys(TalkGroups).forEach(cKey => {
      tgData += cKey+';'+TalkGroups[cKey].join(';')+"\n"
    })
    Object.keys(Zones).sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0)).forEach(cKey => {
      Zones[cKey][80] ='toCut'
      zoneData += cKey+';'+Zones[cKey].slice(0,80).join(';')+"\n"
    })    

    aFiles.push({name: 'Zones.csv', data: zoneData})
    aFiles.push({name: 'TG_Lists.csv', data: tgData})
    aFiles.push({name: 'Contacts.csv', data: contactsData})
    aFiles.push({name: 'Channels.csv', data: channelsfData})
    
    
    return aFiles;
  }

}

export interface FileData {
  name: string;
  data: string;
}

export interface ExportList{
  i: string; //name
  s: string; //RepeaterStatus
  c: string; //country
  m: string[]; //RepeaterType
  b: string; //RepeaterBand
  r: number; //rx
  z: string; //rx CTCSS
  d: string; //rx DCS
  t: number; //tx
  p: string; // p: 'Warszawa Ursus', miejsce
  a: number;// a: 52.194374, latitude
  o: number;// o: 20.886109 longitute
  q: string; // locator AB90xy
  h: string; //JSON.stringify(rptrPatch)
  f: string; //rx Color Code (DMR)  ACT_CC ='f',
  e1: number[]; // e - DMR - TS1
  e2: number[]; // e - DMR - TS2
}

export const defaultExportList: ExportList = {
  i: '', 
  s: '', 
  c: '',
  m: [], 
  b: '', 
  r: 0, 
  z: '',
  d: '',
  t: 0, 
  p: '', 
  a: 0,
  o: 0,
  q: '',
  h: '',
  f: '',
  e1: [],
  e2: []
}