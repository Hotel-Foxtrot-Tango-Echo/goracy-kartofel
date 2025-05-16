

export class LocatorHelper {

  static isValidA(a: number): boolean {
    return (a >= -90 && a <= 90)
  }

  static isValidO(o: number): boolean {
    return (o >= -180 && o <= 180)
  }

  static isValidLocator(locator:string):boolean {
    return locator.match(/^[A-Ra-r][A-Ra-r]\d\d[A-Xa-x][A-Xa-x]$/) !== null;
  }

  static n2s(n:number):string {
    return String.fromCharCode(n + 65);
  }

  static s2n(s:string):number {
    return s.toUpperCase().charCodeAt(0) - 65;
  } 

  static deg2Rad(deg:number) {
    return  (deg % 360) * Math.PI / 180;
  }

  static rad2Deg(rad:number){
    return (rad / Math.PI *180) % 360;
  } 

  static posToLocator (lat:number, lng:number) {
    const longitude = lng + 180;
    const latitude = lat + 90;

    const fieldLng = LocatorHelper.n2s(Math.floor(longitude / 20));
    const fieldLat = LocatorHelper.n2s(Math.floor(latitude / 10));

    const squareLng = Math.floor(longitude % 20 / 2);
    const squareLat = Math.floor(latitude % 10);

    const subsquareLng = LocatorHelper.n2s(Math.floor((longitude % 20 % 2) * 12)).toLowerCase();
    const subsquareLat = LocatorHelper.n2s((latitude % 10 - squareLat) * 24).toLowerCase();

    return fieldLng + fieldLat + squareLng + squareLat + subsquareLng + subsquareLat;
  };



  static locatorToPos(loc: string): [number,number] {
    const fieldLng = LocatorHelper.s2n(loc[0]) * 20;
    const fieldLat = LocatorHelper.s2n(loc[1]) * 10;
    const squareLng = Number.parseInt(loc[2]) * 2;
    const squareLat = Number.parseInt(loc[3]);
    const subsquareLng = (LocatorHelper.s2n(loc[4]) + 0.5) / 12;
    const subsquareLat = (LocatorHelper.s2n(loc[5]) + 0.5) / 24;

    return [
      fieldLat + squareLat + subsquareLat - 90,
      fieldLng + squareLng + subsquareLng - 180
    ];
  };  

  static distanceKm(locFrom:string, locTo:string) {
    const fromCoords = LocatorHelper.locatorToPos(locFrom);
    const toCoords = LocatorHelper.locatorToPos(locTo);
    const dLat = LocatorHelper.deg2Rad(toCoords[0] - fromCoords[0]);
    const dLon = LocatorHelper.deg2Rad(toCoords[1] - fromCoords[1]);
    const fromLat = LocatorHelper.deg2Rad(fromCoords[0]);
    const toLat = LocatorHelper.deg2Rad(toCoords[0]);
    const a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(fromLat) * Math.cos(toLat);
    const b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(b * 6371)
  };  
  

  static distanceKmAndDeg(locFrom:string, locTo:string) {
    const fromCoords = LocatorHelper.locatorToPos(locFrom);
    const toCoords = LocatorHelper.locatorToPos(locTo);
    const dLat = LocatorHelper.deg2Rad(toCoords[0] - fromCoords[0]);
    const dLon = LocatorHelper.deg2Rad(toCoords[1] - fromCoords[1]);
    const fromLat = LocatorHelper.deg2Rad(fromCoords[0]);
    const toLat = LocatorHelper.deg2Rad(toCoords[0]);
    const a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(fromLat) * Math.cos(toLat);
    const b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const y = (dLon) * Math.cos(fromLat) * Math.cos(toLat);
    const x = Math.sin(toLat) - Math.sin(fromLat) * Math.cos(b);

    let az = Math.atan2(y, x);

    if (az < 0) {
      az += 2 * Math.PI;
    }

    return [Math.round(b * 6371),Math.round(LocatorHelper.rad2Deg(az))]
  };  

 

}

export const defaultMarkerInfo:MarkerInfo = {
  a: 54.836219,
  o: 18.296227,
  l:'JO94du'
}

export interface MarkerInfo {
  a: number; //latitude
  o: number; //longitude
  l: string //locator
}
