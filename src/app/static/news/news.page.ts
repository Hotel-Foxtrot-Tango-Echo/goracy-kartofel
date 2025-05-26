import { ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TITLE_SEP, TITLE_BASE } from 'src/app/shared/const';
import { DataService, Message } from 'src/app/shared/services/data.service';


@Component({
  selector: 'mapy73pl-news',
  templateUrl: 'news.page.html',
  styleUrls: ['news.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsPage implements OnInit {

  siteName = 'Aktualności'

  private data = inject(DataService);
  
  constructor(
        private title: Title,
        private meta: Meta,
  ) {}

  ngOnInit() {
    //this.modalCtrl.dismiss();
    this.title.setTitle(this.siteName + TITLE_SEP + TITLE_BASE)
  }
  
  getMessages(): Message[] {
    return this.data.getMessages();
  }

  ionViewWillEnter() {
    this.updateMetaDescription();
  }

  // goToHome() {
  //   setTimeout(() => {
  //     this.route.navigate(['/']);
  //   },20)    
  //   setTimeout(() => {
  //     window.dispatchEvent(new Event('resize')); 
  //   },300)  
  // }

  private updateMetaDescription() {
    //console.log(this.meta.getTag(`name='description'`))
    let des = 'Export przemienników do OpenGD77 z dodaniem do stref (dla Polski rozróznienie na okregi SR1,SR2,..,SR9) typy: DMR i FM (dla przemiennikow fmLink i fmPoland do..'

    this.meta.updateTag(
      { name: 'description', content: des },
      `name='description'`
    );
  }
}
