import { Component, OnInit } from '@angular/core';
import { IonHeader } from '@ionic/angular/standalone';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  imports: [IonHeader],  
})
export class StartPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
