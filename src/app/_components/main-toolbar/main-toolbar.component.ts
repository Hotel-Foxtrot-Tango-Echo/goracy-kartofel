import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
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
export class MainToolbarComponent  {

  @Input() showInfo = false
  // @Output() logoClicked = new EventEmitter<void>();
  // @Output() infoClicked = new EventEmitter<void>();

  isOnline: boolean = false;
  networkStatus$: Subscription = Subscription.EMPTY;
  savedPathCount = 0

  private subSink = new SubSink();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,   
    private userSaveService: UserSaveService,
    
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
    this.checkNetworkStatus();
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


  goToNews() {
    console.log('go go')
  }
}
