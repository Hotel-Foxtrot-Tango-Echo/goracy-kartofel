
const fs = require('fs')
const cmp = require('compress-json')

const someFile = '../../all-repeaters-tmp.json';

const pathFile = '../../public/api/v2/test/random-data.json'



fs.readFile(someFile, 'utf8', function (err,read) {
  if (err) {
    return console.log(err);
  }

  let orgRep = []
  let mod = []
  let allHash = {}
  allHash['0'] = {a: 0, o: 0}


  all = JSON.parse(read);

  all.forEach(rep => {

      orgRep.push(orgRep)

      //ladujemy pozycje
      const locHashs = Object.keys(rep.h)
      locHashs.forEach(locHash => {
        if(locHash != '0'){
          allHash[locHash] = {a: rep.h[locHash].a, o: rep.h[locHash].o}
        }
      })


      //ladujemy przemieniki jedno pasmowe
      const bands = Object.keys(rep.x)
      bands.forEach((band) => {
        rep.x[band].forEach((repParm,key) => {

          let bandName =  band
          if(band === '2m') {
          } else if(band === '70cm') {
          } else if(band === '10m') {
          } else if(band === '6m') {
          } else if(band === '4m') {
          } else if(band === '23cm') {
          } else {
            console.log(rep.i,band)
          }

          // jesli jest przemiennikiem 1 pasmowym to dodajemy noarmlanie, dla cross inna sciezka
          if(repParm?.tx?.f && repParm?.rx?.f) {
            const shortObj = {
              i: rep.i,
              c: rep.c,
              s: repParm.s,
              t: repParm.t,
              b: bandName,
              k: key,
              x: repParm?.tx?.f ? repParm.tx.f : 0,
              h: repParm.h,
              r: -1,
              o: "",
              l: locator(rep.h[repParm.h].a,rep.h[repParm.h].o)
            }
            //if(shortObj.h !== '0') {
              mod.push(shortObj)
            //}
            // console.log(shortObj)
          }
        })
      })

    //ladujemy przemienniki cross
    if('r' in rep) {
      rep.r.forEach((bandKeys,id) => {
        const bands = bandKeys.map(o => Object.keys(o))
        //console.log(rep.i,id,bandKeys,bands.toString())
        const mastBand = Object.keys(bandKeys[0])[0]
        const mastBandKey = bandKeys[0][mastBand]
        masterRep = rep.x[mastBand][mastBandKey]
        //console.log(mastBand, mastBandKey,masterRep)


        const shortObj = {
          i: rep.i,
          c: rep.c,
          s: masterRep.s,
          t: masterRep.t,
          b: mastBand,
          k: mastBandKey,
          x: 0,
          h: masterRep.h,
          r: id,
          o: bands.toString(),
          l: locator(rep.h[masterRep.h].a,rep.h[masterRep.h].o)
        }
        //if(shortObj.h !== '0') {
          mod.push(shortObj)
        //}
      })
    }
    

    //   if(rep.i === 'OH2RCH') {
    //     console.log(rep.h)
    // }
    
  });





    let compress = []
    compress.push(allHash)
    compress.push(mod)
    //compress.push(orgRep)



    compress = cmp.compress(compress)
    compress = JSON.stringify(compress)

    fs.writeFile(pathFile, compress, 'utf8', function (err) {
      if (err) return console.log(err);
    });       
    console.log(pathFile,'done')

    

});


const locator = (a,o) => {
  return LocatorHelper.posToLocator(a,o);
}



class LocatorHelper {

  static isValidA(a){
    return (a >= -90 && a <= 90)
  }

  static isValidO(o){
    return (o >= -180 && o <= 180)
  }

  static isValidLocator(locator){
    return locator.match(/^[A-Ra-r][A-Ra-r]\d\d[A-Xa-x][A-Xa-x]$/) !== null;
  }

  static n2s(n) {
    return String.fromCharCode(n + 65);
  }

  static s2n(s) {
    return s.toUpperCase().charCodeAt(0) - 65;
  } 

  static deg2Rad(deg) {
    return  (deg % 360) * Math.PI / 180;
  }

  static rad2Deg(rad){
    return (rad / Math.PI *180) % 360;
  } 

  static posToLocator (lat, lng) {
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



  static locatorToPos(loc) {
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

  static distanceKm(locFrom, locTo) {
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
  

  static distanceKmAndDeg(locFrom, locTo) {
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