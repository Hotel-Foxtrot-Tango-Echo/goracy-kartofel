import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LocatorHelper } from 'src/app/shared/helper/locator.helper';
import { defalutRepeaterDataLocation, defaultRepeaterData} from 'src/app/shared/services/repeaterPage.service';

@Component({
  selector: 'mapy73pl-repeater-info',
  templateUrl: './repeater-info.component.html',
  styleUrls: ['./repeater-info.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepeaterInfoComponent  {

  @Input() repeaterDataLocation = defalutRepeaterDataLocation;
  @Input() bandName = ''
  @Input() repeaterData = defaultRepeaterData;

  @Input() showMoreData = true
  @Input() showLocationTitle = false

  qthLocator = ''
  
  ngOnInit() {
    if(this.repeaterDataLocation.a != 0) {
      this.qthLocator = LocatorHelper.posToLocator(this.repeaterDataLocation.a,this.repeaterDataLocation.o)
    }
  }
}

