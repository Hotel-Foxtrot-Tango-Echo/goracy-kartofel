import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Platform } from '@ionic/angular';
import { map, tileLayer, Map, Marker, icon, LatLng, LatLngBounds } from 'leaflet';
import { FeatureGroup } from 'leaflet';
import { RepeatersMap } from 'src/app/shared/services/repeaterMap.service';


@Component({
  selector: 'mapy73pl-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit, OnInit, OnChanges {

  @Input() moveMarkerA = 0;
  @Input() moveMarkerO = 0;
  @Input() userUpdateLatLng = false
  @Input() markers: Array<RepeatersMap> | null = null;
  @Output() radioMove = new EventEmitter<LatLng>

  private isDekstop: boolean = false;

  private moveMarker: Marker

  id = 'mapy73pl';
  map: Map;

  constructor(    
    private changeDetectorRef: ChangeDetectorRef,
    public platform: Platform
  ) {
    // this.platform.resize.subscribe(async () => {
    //   console.log('Resize event detected');
    // });
    this.moveMarker  = new Marker({
      lat: 54.836219,
      lng: 18.296227,
    })
    this.moveMarker.setIcon(
      icon({ //0-none
          iconUrl: `/assets/map/m.png`,
          iconSize: [26, 39],
          iconAnchor: [13, 39],
          popupAnchor: [23, -20],
          shadowSize: [0, 0],
          className: 'c-move',
        })
    ).setZIndexOffset(9000)
    this.moveMarker.options['draggable'] = true;
    
    //this.moveMarker.addTo(this.map);

    this.moveMarker.on('drag', () => {
      this.radioMove.emit(this.moveMarker.getLatLng())
      //console.log(leafletMarker.getLatLng())
    })

    
  }

  ngOnInit(): void {
    this.isDekstop = this.platform.is('desktop')
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.userUpdateLatLng && this.map && (changes['moveMarkerO'] || changes['moveMarkerA'])) {
      //console.log(changes['moveMarkerA']?.currentValue,changes['moveMarkerO']?.currentValue,)
      this.moveMarker.setLatLng({lat: this.moveMarkerA, lng: this.moveMarkerO})  
      this.map.fitBounds(new LatLngBounds([this.moveMarker.getLatLng()]),{maxZoom:7});   
    }
    // if (changes.markers && this.map) {
    //   this.updateMarkers(this.markers);
    // }
    //this.updateMarkers(this.markers);
    //console.log('map - on changes')
  }

  ngAfterViewInit() {
    //const initialState = { lng: 19.1381114, lat: 52.335064, zoom: 7 };
    this.map = map(this.id) //.setView([initialState.lat, initialState.lng], initialState.zoom) 

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // this.moveMarker.on('mouseover', (e) => {
    //   this.map.getContainer().style.cursor = 'help';
    //   console.log(e)
    // });

    // this.moveMarker.on('mouseout', (e) => {
    //   this.map.getContainer().style.cursor = 'move';
    //   console.log(e)
    // });

    // setTimeout(() => {
    //   this.updateMarkers(this.markers);
    //   //check02
    //   //window.dispatchEvent(new Event('resize')); 
    // },100)
  }

  removeMarkers() {
    this.map.eachLayer((layer) => {
      // Ignore tile layer
      if (layer.options?.attribution) return;

      // Previous (markers)
      layer.remove();
    });
  }

  updateMarkers(markers: Array<RepeatersMap> | null) {
    this.removeMarkers();
    //const groupMove = new FeatureGroup([this.moveMarker]);
    this.moveMarker.addTo(this.map);
    if (!markers?.length) {
      setTimeout(() => {
        this.map.fitBounds(new LatLngBounds([this.moveMarker.getLatLng()]),{maxZoom:7});   
      },20)  
      return;
    }

    const leafletMarkers = markers.map(o => createMarker(o,this.isDekstop))
    //leafletMarkers.push(this.moveMarker)
    const group = new FeatureGroup(leafletMarkers);
    group.addTo(this.map);



    //this.changeDetectorRef.markForCheck(); 

    setTimeout(() => {
      window.dispatchEvent(new Event('resize')); 
    },10)   

    setTimeout(() => {
      this.map.fitBounds(group.getBounds(),{maxZoom:7});   
    },20)
   
  }
}



function createMarker(repeatersMap: RepeatersMap, isDekstop: boolean) {
  const leafletMarker = new Marker({
    lat: repeatersMap.a,
    lng: repeatersMap.o,
  });

  //los
  if(repeatersMap.a === 51.041297 && repeatersMap.o === 18.666708) {
    if(isDekstop) {
      leafletMarker.bindTooltip('<strong>Ogólnopolskie Spotkanie Krótkofalowców ŁOŚ</strong>')
    }
    leafletMarker.setIcon(
      icon({ //0-none
          iconUrl: `/assets/map/los.png`,
          iconSize: [26, 39],
          iconAnchor: [13, 39],
          popupAnchor: [23, -20],
          shadowSize: [0, 0]
        })
    ); 
    const today:Date = new Date(new Date().toISOString().slice(0,10))
    const event:Date = new Date('2025-05-23')
    const dateDiff = ((event.valueOf()-today.valueOf()) / (1000 * 60 * 60 * 24))
    let tekst = 'właśnie trwa!'
    if(dateDiff > 1 ) {
      tekst = `za ${dateDiff} dni`
    } else if (dateDiff === 1 ) {
      tekst = `już jutro!`
    }
    leafletMarker.bindPopup(`<div><strong>ŁOŚ</strong> ${tekst} <a target="_blank" href="https://www.youtube.com/watch?v=DsddevXFyek">film</a></div>`)

    return leafletMarker;       
  }

  if(isDekstop) {
    let tooltipName = ''
    if(repeatersMap.x.length > 3) {
      tooltipName = `<strong>(${repeatersMap.x.length} szt.)</strong>`
    } else if(repeatersMap.x.length > 1) {
      tooltipName = `<strong>(${repeatersMap.x.map(o => o.i).toString()})</strong>`
    } else if(repeatersMap.x.length === 1) {
      tooltipName = `${repeatersMap.x[0].i}`
    }
  
    leafletMarker.bindTooltip(tooltipName)
  }


  let iconName = '0'
  if(repeatersMap.x.length > 1) {
    iconName = '9'
  } else if(repeatersMap.x[0].r > -1) {
    iconName = 'r'
  } else if(repeatersMap.x.length === 1) {
    if(['2m','70cm','10m','6m','4m','23cm'].indexOf(repeatersMap.x[0].b) > -1) {
      iconName = repeatersMap.x[0].b
    }
  } 

  leafletMarker.setIcon(
    icon({ //0-none
        iconUrl: `/assets/map/${iconName}.png`,
        iconSize: [26, 39],
        iconAnchor: [13, 39],
        popupAnchor: [23, -20],
        shadowSize: [0, 0]
      })
  );

  let cont = ''
  repeatersMap.x.forEach(r => {

    //cross
    if(r.r > -1) {
      cont += `<div><strong>${r.i}</strong> cross ${r.o} <span class="rpt-open" data-i="${r.i}" data-b="${r.b}" data-k="${r.k}" data-r="${r.r}">szczegóły</span></div>`;
    } else {
      cont += `<div><strong>${r.i}</strong> ${r.x.toFixed(4)}&nbsp;MHz <span class="rpt-open" data-i="${r.i}" data-b="${r.b}" data-k="${r.k}" data-r="-1">szczegóły</span></div>`;
    }
  })

  leafletMarker.bindPopup(cont)

  return leafletMarker;
}
