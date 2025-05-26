import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { Platform } from '@ionic/angular';
import { Subscription, merge, of, fromEvent, map } from 'rxjs';
import { UserSaveService } from 'src/app/shared/services/user.service';
import { SubSink } from 'subsink';


@Component({
  selector: 'mapy73pl-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainToolbarComponent implements OnInit,OnDestroy  {

  @Input() showInfo = false
  @Input() repCount = 0
  // @Output() logoClicked = new EventEmitter<void>();
  // @Output() infoClicked = new EventEmitter<void>();

  isOnline: boolean = true;
  networkStatus$: Subscription = Subscription.EMPTY;
  savedPathCount = 0
  isNewVesrion = false;
  isDekstop = false;
  offlineReady = false;


  private subSink = new SubSink();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,   
    private userSaveService: UserSaveService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private swUpdate: SwUpdate,
    public platform: Platform
  ) {}  

  ngOnDestroy():void {
    this.networkStatus$.unsubscribe();
    this.subSink.unsubscribe();
  }

  ngOnInit(): void {
    this.subSink.sink = this.userSaveService.getObsSavedPathCount().subscribe({next:(count) => {
      this.savedPathCount = count
      this.changeDetectorRef.markForCheck();
    }})   
    this.subSink.sink = this.userSaveService.getObsIsNewVesrion().subscribe({next:(status) => {
      this.isNewVesrion = status
      this.changeDetectorRef.markForCheck();
    }}) 
    this.subSink.sink = this.userSaveService.getObsOfflineReady().subscribe({next:(status) => {
      this.offlineReady = status
      this.changeDetectorRef.markForCheck();
    }})     
    this.subSink.sink = this.swUpdate.versionUpdates.subscribe({
      next:(versionEvent: VersionEvent) => {
        //console.log(versionEvent)    
        if(versionEvent.type === 'VERSION_READY') {
          this.userSaveService.updateIsNewVersion(true)
          this.userSaveService.updateOfflineReady(true)
        } else if (versionEvent.type === 'NO_NEW_VERSION_DETECTED') {
          this.userSaveService.updateOfflineReady(true)
        }
      }
    })      
    if (isPlatformBrowser(this.platformId)) {
      this.checkNetworkStatus();
    }

    this.isDekstop = this.platform.is('desktop')   
  }

  private checkNetworkStatus() {
    this.isOnline = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe(status => {
        //console.log('status', status);
        this.isOnline = status;
        this.changeDetectorRef.markForCheck();
      });
  }  

  refreshPage() {
    document.location.reload();
  }
}
