import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';
//import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
//     ServiceWorkerModule.register('ngsw-worker.js', {
//   enabled: !isDevMode(),
//   // Register the ServiceWorker as soon as the application is stable
//   // or after 30 seconds (whichever comes first).
//   registrationStrategy: 'registerWhenStable:30000'
// })
],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideHttpClient(), provideClientHydration(withEventReplay()),],
  bootstrap: [AppComponent],
})
export class AppModule {}
