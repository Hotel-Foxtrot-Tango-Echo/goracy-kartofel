import { Component,Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

import { isPlatformBrowser } from '@angular/common';
declare const gtag: Function;

@Component({
  selector: 'mapy73pl',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,

  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.addGAScript();
      this.router.events.pipe(
          filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
          //console.log('/#'+event.urlAfterRedirects)
          gtag('event', 'page_view', {
              page_path: event.urlAfterRedirects
          })
      })
    }
      
  }

  addGAScript() {
    let gtagScript: HTMLScriptElement = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-YWXF54V3N3';
    document.head.prepend(gtagScript);
    gtag('config', 'G-YWXF54V3N3');
  }  
}

