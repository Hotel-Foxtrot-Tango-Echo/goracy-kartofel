import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SwUpdate, VersionEvent, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';
import { TITLE_SEP, TITLE_BASE } from 'src/app/shared/const';
import { FilterDataRptr } from 'src/app/shared/services/filter.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.page.html',
  styleUrls: ['./site-map.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush    
})
export class SiteMapPage implements OnInit,OnDestroy {

  siteName = 'Mapa strony'
  isNewVesrion = false;
  private subSink = new SubSink();
  

  constructor(
        private title: Title,
        private swUpdate: SwUpdate,
        private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.subSink.sink = this.swUpdate.versionUpdates.subscribe({
      next:(versionEvent: VersionEvent) => {
          console.log(versionEvent)    
          if(versionEvent.type === 'VERSION_READY') {
            setTimeout(() => {
              this.isNewVesrion = true
              this.changeDetectorRef.markForCheck();    
            },200)     
          }
      }
    })  
    this.title.setTitle(this.siteName + TITLE_SEP + TITLE_BASE)
  }  

  ngOnDestroy():void {
    this.subSink.unsubscribe();
  }

  refreshPage() {
    document.location.reload();
  }

}
