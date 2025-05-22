import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';
import { TITLE_SEP, TITLE_BASE } from 'src/app/shared/const';

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.page.html',
  styleUrls: ['./site-map.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush    
})
export class SiteMapPage implements OnInit {

  siteName = 'Mapa strony'
  isNewVesrion = false;

  constructor(
        private title: Title,
        private swUpdate: SwUpdate,
        private changeDetectorRef: ChangeDetectorRef,
  ) {

    async () => {
      try {
        const updateFound = await this.swUpdate.checkForUpdate();
        console.log(updateFound ? 'A new version is available.' : 'Already on the latest version.');
        setTimeout(() => {
          this.isNewVesrion = true;
          this.changeDetectorRef.markForCheck();
        },0)        
      } catch (err) {
        console.error('Failed to check for updates:', err);
      }
    }

  }

  downoladLast() {
    console.log('1')
    this.swUpdate.versionUpdates
    .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
    .subscribe(evt => {
      console.log('2- done')
      //if (promptUser(evt)) {
        // Reload the page to update to the latest version.
        document.location.reload();
      // }
    });
  }

  ngOnInit() {
    this.title.setTitle(this.siteName + TITLE_SEP + TITLE_BASE)
  }

}
